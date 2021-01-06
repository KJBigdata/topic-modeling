import os
import glob
import pickle
import pandas as pd
from tqdm import tqdm
from utils import tokenize_kbsta, tokenize_mecab, analyze_docs
from textcleaner.cleaner_news import RsnNewsCleaner

def check_dir(dir):
    if not os.path.isdir(dir):
        print(f"make {dir} path")
        os.mkdir(dir)

def load_pickle_data(abs_path:str):
    """Load pickle data

        Args:
            abs_path: pickle data to be loaded
        Returns:
            a list of dictionary

    """
    with open(abs_path, 'rb') as f:
        whole_doc = pickle.load(f)

    print(f"Load {abs_path}...")
    return whole_doc

def extract_sample(whole_len, sample_n=60):
    import random
    random.seed(10)
    idx = random.sample(range(0, whole_len), sample_n)

    return idx


def make_example(input_dir='./data/sample_naver_news_2020.pkl',
                 output_path='./data/sample_100_news.tsv',
                 sample_n=60):
    docs = load_pickle_data(input_dir)

    sample_idx = extract_sample(len(docs), sample_n)
    sample_docs = [docs[ix] for ix in sample_idx]
    sample_df = pd.DataFrame(sample_docs)[['press', 'category', 'date', 'title', 'content']]

    sample_df.to_csv(output_path, sep='\t', index=False)

    return sample_df

def load_input_data(dir='./data/uploads', filename=None):
    '''It returns data for user to input in UI Tool
    Args:
        dir: input data path which is saved
    Returns:
        pandas dataframe
    '''
    # 업로드한 샘플데이터 로드
    if os.path.exists(dir):
        file_list = glob.glob(os.path.join(dir, '*.tsv'))
        print(f"read {file_list}")
        if file_list == []:
            raise ValueError("Check dir of tsv file uploaded")
        else:
            if filename is None:
                if len(file_list) == 1:
                    abs_path = file_list[0]
                else:
                    raise ValueError("Input specific filename to load!")
            else:
                abs_path = [f for f in glob.glob(os.path.join(dir, '*.tsv')) if f.find(filename) != -1][0]

    print(abs_path)
    input_df = pd.read_csv(abs_path, sep='\t')
    input_df.drop(input_df.filter(regex="Unname"), axis=1, inplace=True)
    return input_df

def cleansing_input_data(input_raw_data:pd.DataFrame, docs_column:str='content'):
    '''It returns cleaned input data
    Args:
        input_raw_data : raw data for user to input
        docs_column : column of docs to be analyzed
    Returns:
        dataframe with cleaned docs
    '''
    cleaned_input_data = input_raw_data.copy()

    # 샘플데이터 클렌징
    cleaner = RsnNewsCleaner()
    docs = []

    for doc in input_raw_data[docs_column]:
        docs.extend(cleaner.clean(doc))
    cleaned_input_data[docs_column] = docs

    return cleaned_input_data


def cols2category(input_data):
    columns = ['date', 'content', 'd2c', 'key_sentence', 'entity', 'tokens', 'max_date', 'min_date']
    category_cols = [c for c in input_data.columns if c not in columns]
    cols_dic = {c: f'category{i + 1}' for i, c in enumerate(category_cols)}

    return [c if c in columns else cols_dic[c] for c in input_data.columns]


def preprocess(filename=None, docs_column='content'):
    input_raw_data = load_input_data(filename=filename)
    input_raw_data.columns = cols2category(input_raw_data)
    cleaned_input_data = cleansing_input_data(input_raw_data, docs_column=docs_column)

    result = analyze_docs(cleaned_input_data['content'])

    cleaned_input_data['d2c'] = [r['d2c'] for r in result]
    cleaned_input_data['key_sentence'] = [r['key_sentence'] for r in result]
    cleaned_input_data['tokens'] = [r['tokens'] for r in result]
    cleaned_input_data['entity'] = [r['entity'] for r in result]

    cleaned_input_data['max_date'] = max(cleaned_input_data.date)
    cleaned_input_data['min_date'] = min(cleaned_input_data.date)

    cleaned_input_data = cleaned_input_data.dropna(axis=0)

    pd.set_option('display.max_columns', 100)
    check_dir('./data/output')
    cleaned_input_data.to_pickle(os.path.join('./data/output','sample_output.pkl'))
    print("Done with preprocessing input data ")

def generate_wordcloud(tokens_data:list, file_name='wordcloud'):
    import os
    import matplotlib.pyplot as plt
    from wordcloud import WordCloud
    from collections import Counter

    token_list = []
    for l in tokens_data:
        token_list.extend(l)

    print(Counter(token_list).most_common()[:10])
    wc = WordCloud(font_path='./data/font.ttf',
                   width=1600, height=800, max_words=150,
                   background_color='white',colormap="Dark2").generate(' '.join(token_list))
    plt.switch_backend('Agg')
    fig = plt.figure(figsize=(10,5))
    plt.imshow(wc, interpolation='bilinear')
    plt.axis("off")

    target_path = f"./data/vis/{file_name}.png"
    check_dir("./data/vis")

    fig.savefig(target_path)

    return target_path
