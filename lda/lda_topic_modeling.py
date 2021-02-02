import pandas as pd
import numpy as np
import pickle
import json
from gensim import corpora, models
from gensim.models.coherencemodel import CoherenceModel
import pyLDAvis.gensim
from tqdm import tqdm

class TopicModeler:
    '''Topic model'''
    def __init__(self, dictionary=None, corpus=None):
        if (dictionary and corpus) is None :
            self.model, self.dictionary, self.corpus = self._load()
        else:
            self.model, _, _ = self._load()
            self.dictionary = dictionary
            self.corpus = corpus

        self.topic_coordinates, self.topic_info, self.token_table, self.topic2id = self.prepare_topic_data()

        self.filtered_df = pd.DataFrame()

    def _load(self, model_path="lda/model/lda_model.gensim", dict_path="lda/model/lda_dict.gensim"):
        '''사전에 학습한 모델을 불러옵니다, 모델 및 딕셔너리 필요'''
        model = models.ldamodel.LdaModel.load(model_path)
        dictionary = corpora.Dictionary.load(dict_path)
        corpus = pickle.load(open('lda/model/gensim_corpus.pkl', 'rb'))

        return model, dictionary, corpus

    def get_topic_list(self):
        '''
        해당 모델이 표현하고 있는 주제 리스트를 출력합니다.
        각 주제들의 이름을 알 수는 없지만 어떤 단어들이 주제를 이루고 있는지,
        그리고 각각의 단어들의 성분이 어떻게 되는지 간단하게 알아볼 수 있습니다.
        '''
        return self.model.print_topics()

    def get_tokens_topic(self, tokens:list):
        '''
        Tokens list가 표현하는 토픽 리스트를 출력합니다.
        '''

        corpus = self.dictionary.doc2bow(tokens)

        for temp in self.model[corpus]:
            print(temp)

        return self.model[corpus]

    def get_doc_info(self, doc_id:int):
        if not isinstance(doc_id, int):
            raise TypeError("doc_id must be int type")

        doc_info = {}
        doc_info['doc_id'] = doc_id
        doc_topic_dist = self.model[self.corpus[doc_id]]
        doc_info['topic_dist'] = [(self.topic2id[str(c[0])], float(c[1])) for c in doc_topic_dist]

        return doc_info

    def prepare_topic_data(self):
        topic_coordinates, topic_info, token_table, *args = pyLDAvis.gensim.prepare(self.model,
                                                                                    self.corpus,
                                                                                    self.dictionary)
        import re

        regex = re.compile(r'[^가-힣]')
        topic2id = json.loads(topic_coordinates['topics'].to_json())
        
        top_keywords = [(topic2id[str(c[0])], c[1]) for c in self.model.show_topics(len(topic_coordinates.topics.to_list()))]
        top_keywords = sorted(top_keywords, key=lambda x: (x[0]), reverse=False)
        top_keywords = [re.sub(regex, ' ', c[1]).split()[:3] for c in top_keywords]

        topic_coordinates['Keywords'] = top_keywords

        return topic_coordinates, topic_info, token_table, topic2id

    def show_topic_modeling(self):
        prepared_data = pyLDAvis.gensim.prepare(self.model,
                                                self.corpus,
                                                self.dictionary)
        pyLDAvis.show(prepared_data)

    def get_representative_docs(self, ldamodel, corpus, docs_id:list, texts:list):
        '''
        It returns dominant topic by document
        '''
        if not isinstance(texts, list):
            raise TypeError("texts must be list of tokens list type")

        # Init output
        representative_docs = pd.DataFrame()

        # Get main topic in each document
        for i in tqdm(range(len(ldamodel[corpus])), desc='Making representative docs'):
            row = [(p[0], p[1], texts[i]) for p in ldamodel[corpus][i]]
            row = sorted(row, key=lambda x: (x[1]), reverse=True)
            # Get the Dominant topic, Perc Contribution and Keywords for each document
            for j, (topic_num, prop_topic, doc) in enumerate(row):
                # if j == 0:  # => dominant topic
                wp = ldamodel.show_topic(topic_num)
                topic_keywords = [word for word, prop in wp]
                representative_docs = representative_docs.append(pd.Series([docs_id[i], self.topic2id[str(topic_num)],
                                                                            round(prop_topic,4), topic_keywords, doc]),
                                                                 ignore_index=True)

        representative_docs.columns = ['Doc_Id', 'Topic_Num', 'Topic_Perc_Contrib', 'Keywords', 'Text']
        
        
        #representative_docs = pd.concat([grp.sort_values(['Topic_Perc_Contrib'], ascending=False).head(1)
        #                              for i, grp in representative_docs.groupby('Topic_Num')])
        #representative_docs.reset_index(drop=True, inplace=True)

        return representative_docs

    def get_relevant_docs(self, ldamodel, corpus, docs_id:list, texts:list):
        '''
        It returns dominant topic by document
        '''
        if not isinstance(texts, list):
            raise TypeError("texts must be list of tokens list type")

        # Init output
        relevant_docs = pd.DataFrame()

        # Get main topic in each document
        for i in tqdm(range(len(ldamodel[corpus])), desc='Making relevant docs'):
            row = sorted(ldamodel[corpus][i], key=lambda x: (x[1]), reverse=True)
            # Get the Dominant topic, Perc Contribution and Keywords for each document
            for j, (topic_num, prop_topic) in enumerate(row):
                if j == 0:  # => dominant topic
                    wp = ldamodel.show_topic(topic_num)
                    topic_keywords = [word for word, prop in wp]
                    relevant_docs = relevant_docs.append(pd.Series([self.topic2id[str(topic_num)],
                                                                      round(prop_topic, 4), topic_keywords]),
                                                           ignore_index=True)
                else:
                    break

        # Add original text to the end of the output
        contents = pd.Series(texts)
        relevant_docs = pd.concat([relevant_docs, contents], axis=1)
        relevant_docs.index = docs_id
        relevant_docs.reset_index(inplace=True)
        relevant_docs.columns = ['Doc_Id', 'Topic_Num', "Topic_Perc_Contrib", "Keywords", "Text"]

        return relevant_docs



    @staticmethod
    def sorted_topic_keyword(topic_info:pd.DataFrame, topic=1, _lambda=1):
        '''
        It returns a dataframe using _lambda
        to calculate term relevance of a given topic.
        '''
        if not isinstance(topic_info,pd.DataFrame):
            raise TypeError("topic_info is DataFrame, created using gensim.prepare()")

        tdf = topic_info[topic_info.Category == 'Topic' + str(topic)]

        if _lambda < 0 or _lambda > 1:
            _lambda = 1
        stdf = tdf.assign(relevance=_lambda * tdf['logprob'] + (1 - _lambda) * tdf['loglift'])

        return stdf.sort_values(by=['relevance', 'logprob'], ascending=False)

