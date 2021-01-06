import os
import json
import pprint

import pandas as pd
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_restful import Api

from utils import listing_daterange, find_string_idx, hlight_term, analyze_single_doc
from data_loader import check_dir, load_pickle_data, preprocess, generate_wordcloud
from lda.pipeline import Pipeline
from lda.lda_corpus import *
from lda.lda_trainer import LDATrainer
from lda.lda_topic_modeling import TopicModeler

UPLOAD_FOLDER = './data'
ALLOWED_EXTENSIONS = set(['tsv'])

app = Flask(__name__, static_url_path='')
app.config['JSON_AS_ASCII'] = False
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

if os.path.isfile('./data/output/sample_output.pkl'):
    input_data = load_pickle_data('./data/output/sample_output.pkl')
else:
    input_data = None

topic_model = None
representative_docs_df = None
relevant_docs_df = None
ngram = 'not_used'

pd.set_option('display.max_columns', 500)
pd.set_option('display.max_rows', 500)

def make_docs_info(tokens_list):
    global topic_model
    global representative_docs_df
    global relevant_docs_df

    if os.path.isdir("./data/docs"):
        print('Representative and Relevant Docs exist..')
        pass

    else :
        print(f"make data/docs path and datas")
        print(f"successfully make {os.path.join(os.getcwd(), 'data/docs')}")
        os.mkdir(os.path.join(os.getcwd(), 'data/docs'))

        pipeline = Pipeline(input_data, ['all'], ['all'], ['all'], ngram=ngram, tokens_list=tokens_list)
        topic_model = pipeline.topic_modeling()
        topic_model.filtered_df = pipeline.filtered_df

        representative_docs_df = topic_model.get_representative_docs(topic_model.model, topic_model.corpus,
                                                                     list(topic_model.filtered_df.index),
                                                                     topic_model.filtered_df['content'].to_list())
        representative_docs_df.to_pickle(os.path.join('./data/docs', 'representative_docs.pkl'))
        relevant_docs_df = topic_model.get_relevant_docs(topic_model.model, topic_model.corpus,
                                                         list(topic_model.filtered_df.index),
                                                         topic_model.filtered_df['content'].to_list())
        relevant_docs_df.to_pickle(os.path.join('./data/docs','relevant_docs.pkl'))

    return jsonify({'result':'success'})

@app.route('/sample_download', methods=['GET'])
def sample_download():
    if request.method == 'GET':
        res = request.args.get('filename')
        print(f"Download sample data : {res}")

        return send_from_directory(app.config['UPLOAD_FOLDER'], filename=res)


@app.route('/upload', methods=['POST'])
def file_upload():
    if request.method == 'POST':
        global input_data

        target = os.path.join(UPLOAD_FOLDER, 'uploads')
        check_dir(target)

        print("welcome to upload")
        file = request.files['file']
        destination = "/".join([target, file.filename])
        print(f"filename : {file.filename}")
        file.save(destination)
        preprocess(filename=file.filename)
        input_data = load_pickle_data('./data/output/sample_output.pkl')

    return jsonify({'result': 'success'})


@app.route('/validate', methods=['GET', ' POST'])
def validate():
    file_name = request.args.get('filename')

    response = {}

    if os.path.isfile(f"data/vis/{file_name}.png"):
        response['result'] = True
    else:
        response['result'] = False

    return jsonify(response)


@app.route('/data/vis', methods=['GET', 'POST'])
def output():
    if request.method == 'GET':
        res = request.args.get('filename')
        filename = f"{res}.png"

        target_path = generate_wordcloud(filter_tokens(input_data['tokens'].to_list()))

        return send_from_directory(directory=os.path.join(app.config['UPLOAD_FOLDER'], 'vis')
                                   , filename=filename)


@app.route('/model', methods=['GET', 'POST'])
def modeling():
    if request.method in ['GET', 'POST']:
        global topic_model

        response = {}

        if os.path.isfile("lda/model/lda_model.gensim"):
            response['result'] = True
            print('Model Loading..')
        else:
            # prepare dictionary, corpus
            tokens_list = input_data['tokens'].to_list()
            entity_list = input_data['entity'].to_list()
            tokens_list = filter_tokens(tokens_list, entity_list)

            if ngram in ['bigram', 'trigram']:
                bigram = create_bigram_model(tokens_list, min_count=5, threshold=100)
                tokens_list = convert_to_bigram_tokens(tokens_list, bigram)
            else:
                pass

            print('Model Training..')
            # modeling
            trainer = LDATrainer(tokens_list=tokens_list, tf_idf=False)
            try:
                trainer.train(trainer.corpus, trainer.dictionary, num_topics=9, passes=30, workers=4, iterations=30,
                              chunksize=50,
                              save=True)
                response['result'] = True

            except Exception as ex:
                print(ex)

                response['result'] = False
            make_docs_info(tokens_list)
            with open('data/docs/filtered_tokens.pkl', 'wb') as f:
                pickle.dump(tokens_list, f)

    return jsonify(response)

@app.route('/filtered_data', methods=['GET', 'POST'])
def filter_input_data():
    global topic_model
    global representative_docs_df
    global relevant_docs_df
    print('---------------Start---------------')

    if request.method in ['GET', 'POST']:
        category1 = request.args.getlist('category1')
        if 'category2' in input_data.columns:
            category2 = request.args.getlist('category2')
        else:
            category2 = []
        if 'category3' in input_data.columns:
            category3 = request.args.getlist('category3')
        else:
            category3 = []

        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')
        print(category1, category2, category3, start_date, end_date)

        if os.path.isdir("./data/docs"):
            print('Filtered tokens Loading..')
            filtered_tokens = load_pickle_data('data/docs/filtered_tokens.pkl')
            pipeline = Pipeline(input_data, category1, category2, category3, start_date, end_date,
                                ngram=ngram, tokens_list=filtered_tokens)
            print(pipeline.filtered_df.head())
            topic_model = pipeline.topic_modeling()
            topic_model.filtered_df = pipeline.filtered_df

            index_list = list(topic_model.filtered_df.index)

            print('Representative and Relevant Docs Loading..')
            representative_docs_df = load_pickle_data('data/docs/representative_docs.pkl')
            representative_docs_df = representative_docs_df[representative_docs_df.Doc_Id.isin(index_list)]

            relevant_docs_df = load_pickle_data('data/docs/relevant_docs.pkl')
            relevant_docs_df = relevant_docs_df[relevant_docs_df.Doc_Id.isin(index_list)]

            print('--------------Pipelined--------------')
            print(f"filtered corpus list num : {len(topic_model.corpus)}")
            print(f"text num : {len(topic_model.filtered_df['content'])}")
            print(f"columns of filtered df : {topic_model.filtered_df.columns}")
            print(topic_model.filtered_df.shape, representative_docs_df.shape, relevant_docs_df.shape)
            print(topic_model.topic_coordinates)

        else:
            raise ValueError('You must make representative & relevant docs df at first')

    result = topic_model.filtered_df.to_json(orient='columns', force_ascii=False)

    # pprint.pprint(json.loads(result), indent=4)

    return result


@app.route('/raw_content', methods=['GET', 'POST'])
def get_document():
    if request.method in ['GET', 'POST']:
        doc = request.args.getlist('raw_content')
        result = topic_model.filtered_df['content'].to_json(orient='columns', force_ascii=False)

        return result


@app.route('/topic_coordinates', methods=['GET', 'POST'])
def get_topic_coordinates():
    '''
    It returns coordinates of topic clusters
    '''

    if request.method in ['GET', 'POST']:
        topic_coordinates = topic_model.topic_coordinates

    result = topic_model.topic_coordinates.to_json(orient='columns', force_ascii=False)
    pprint.pprint(json.loads(result), indent=4)

    return result


@app.route('/top_salient_terms', methods=['GET', 'POST'])
def get_default_salient_terms():
    '''
    It returns top 30 salient terms
    '''

    if request.method in ['GET', 'POST']:
        top_salient_terms = topic_model.topic_info[topic_model.topic_info.Category == 'Default']

    result = top_salient_terms.to_json(orient='columns', force_ascii=False)
    # pprint.pprint(json.loads(result), indent=4)

    return result


@app.route('/topic_relevance', methods=['GET', 'POST'])
def caculate_relevance():
    '''
    It returns topic keywords list of topic#, sorted by relevance
    '''
    topic_info = topic_model.topic_info

    if request.method in ['GET', 'POST']:
        topic_num = int(request.args.get('topic'))
        _lambda = float(request.args.get('lambda'))

        stdf = topic_model.sorted_topic_keyword(topic_info=topic_info,
                                                topic=topic_num, _lambda=_lambda)
        # print('----------------')
         # print(topic_info)
        # print(stdf.iloc[:30, :])

    result = stdf.to_json(orient='columns', force_ascii=False)
    # pprint.pprint(json.loads(result), indent=4)

    return result


@app.route('/topic_dist_term', methods=['GET', 'POST'])
def load_topic_dist_term():
    '''
    It returns conditional topic distribution of term in topics
    '''
    token_tabel = topic_model.token_table

    if request.method in ['GET', 'POST']:
        term = request.args.get('term')

        topic_dist = token_tabel[token_tabel['Term'] == term].reset_index()[['Topic', 'Freq', 'Term']]
        result = topic_dist.to_json(orient='columns', force_ascii=False)

        # print('----------------')
        # pprint.pprint(json.loads(result), indent=4)
    return result


@app.route('/representative_docs_by_topic', methods=['GET', 'POST'])
def show_representative_docs():
    global topic_model
    global representative_docs_df
    global relevant_docs_df
    if not isinstance(topic_model.filtered_df, pd.DataFrame):
        print(topic_model.filtered_df)
        raise ValueError("filtered_df must be generated by user defiend category option")

    if request.method in ['GET', 'POST']:
        topic = request.args.get('topic')
        top_doc_n = request.args.get('top_doc_n', default=5, type=int)
        topic_keyword = request.args.get('topic_keyword')

        if (topic == 'all') and (topic_keyword is None):
            print('show representative docs')
            representative_docs_df = pd.concat([grp.sort_values(['Topic_Perc_Contrib'], ascending=False).head(1)
                                         for i, grp in representative_docs_df.groupby('Topic_Num')])
            representative_docs_df.reset_index(drop=True, inplace=True)
            result = representative_docs_df

        else:
            print('show relevant docs')
            relevant_doc = {'ix': [], 'hlight_sentence': []}

            keyword = topic_keyword
            if topic == 'all':
                relevant_topics_df = pd.concat([grp.sort_values(['Topic_Perc_Contrib'], ascending=False).head(5)
                                            for i, grp in relevant_docs_df.groupby('Topic_Num')])
            else:
                relevant_topics_df = relevant_docs_df[relevant_docs_df.Topic_Num == int(topic)]
            relevant_topics_df = relevant_topics_df.sort_values(['Topic_Perc_Contrib'], ascending=False)

            for i, (p, t) in enumerate(relevant_topics_df[['Topic_Perc_Contrib', 'Text']].values):

                if '_' in topic_keyword:
                    gram = topic_keyword.split('_')
                    ids = [find_string_idx(t, g) for g in gram]
                    if max(ids) == -1:
                        pass
                    elif min(ids) > 0:
                        keyword = gram[0]
                        relevant_doc['ix'].append(i)
                    else:
                        keyword = gram[ids.index(max(ids))]
                        relevant_doc['ix'].append(i)
                    # relevant_doc['hlight_sentence'].append(hlight_term(t, keyword))

                elif find_string_idx(t, keyword) != -1:
                    relevant_doc['ix'].append(i)
                    # relevant_doc['hlight_sentence'].append(hlight_term(t, keyword))

            result = relevant_docs_df.loc[relevant_docs_df.index[relevant_doc['ix']]]
            # result['hlight_sentence'] = relevant_doc['hlight_sentence']
            result = result.head(top_doc_n)

        result = result.to_json(orient='columns', force_ascii=False)

    # pprint.pprint(json.loads(result), indent=4)
    return result


@app.route('/analyze_doc', methods=['GET', 'POST'])
def analyze_documentation():
    if request.method in ['GET', 'POST']:
        doc_id = request.args.get('doc_id')

        if isinstance(doc_id, str):
            doc_id = int(doc_id)

        doc_info = topic_model.get_doc_info(doc_id)

        doc = topic_model.filtered_df['content'].to_list()[doc_id]
        doc_analyzed = analyze_single_doc(doc)

        doc_info.update(doc_analyzed)

    # pprint.pprint(doc_info)
    return jsonify(doc_info)


if __name__ == '__main__':
    app.run('0.0.0.0', port=5002, debug=True)
