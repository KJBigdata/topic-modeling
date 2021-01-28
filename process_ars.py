import os
import glob
import pickle
import pandas as pd
import numpy as np
from tqdm import tqdm
from collections import Counter

def load_stt(abs_path):
    pd.set_option('display.max_columns', 500)
    pd.set_option('display.max_rows', 500)
    with open(abs_path, 'rb') as f:
        df = pickle.load(f)
    return df

def save_stt(abs_path, file):
    with open(abs_path, 'wb') as f:
        pickle.dump(file, f)

def get_nn_tokens_comb(ars_df, pos_list=['NNG', 'NNP', 'XPN', 'XSN']):
    import re
    sent_tokens = []
    one_line_tokens = []
    for ix in tqdm(range(ars_df.shape[0]), desc='Processing Tokens'):
        tokens = []
        for i in range(len(ars_df.total_token.iloc[ix])):
            for w in ars_df.total_token.iloc[ix][i]['word']:
                raw_tokens = [f"{t['pos']}{t['raw']}" if t['pos'] in pos_list else '' for t in w['token']]
                if ''.join(raw_tokens) != '':
                    pos = re.sub(re.compile(r'([ㄱ-힣])'), '', ''.join(raw_tokens))
                    if (pos == 'XSN') or (pos == 'XPN'):
                        pass
                    else:
                        tokens.append(''.join(raw_tokens).replace('NNG','').replace('NNP','').replace('XSN', '').replace('XPN', ''))
        nn_tokens = [t for t in tokens if len(t) >= 2]
        sent_tokens.append(nn_tokens)
        one_line_tokens.extend(nn_tokens)

    return sent_tokens, one_line_tokens


ars_df1 = load_stt(os.path.join(os.getcwd(), 'without_stwords_df1.pickle'))
ars_df2 = load_stt(os.path.join(os.getcwd(), 'without_stwords_df2.pickle'))
ars_df = pd.concat([ars_df1, ars_df2])
# ars_df = load_stt('without_stwords.pickle')


if isinstance(ars_df.d2c.iloc[0],dict):
    ars_df.d2c = ars_df.d2c.apply(lambda x : [{'label': i[0], 'score': i[1]} for i in x.items()])

sent_tokens, one_line_tokens = get_nn_tokens_comb(ars_df)
ars_df['tokens'] = sent_tokens
key_sentence = ars_df.key_sentence.apply(lambda x : x[np.argmax([d['score'] for d in x])]['raw']).to_list()
ars_df['key_sentence'] = key_sentence

if list(ars_df.columns) not in ['max_date']:
    ars_df['max_date'] = max(ars_df.date)

if list(ars_df.columns) not in ['min_date']:
    ars_df['min_date'] = min(ars_df.date)

if 'sttta_id' in ars_df.columns:
    ars_df.index = ars_df.sttta_id

ars_df = ars_df[['category1', 'category2', 'category3',
                 'content', 'date', 'd2c', 'key_sentence',
                 'tokens', 'kpe', 'entity', 'max_date', 'min_date']]

save_stt(os.path.join(os.getcwd(), 'without_sample_output.pkl'), ars_df)
#print(Counter([len(c) for c in one_line_tokens]))
# for c in [c for c in list(Counter(one_line_tokens).most_common()) if
#           (c[0].find('XSN') != -1) or (c[0].find('XPN') != -1)]:
#     if c[1] != 1:
#         print(c)