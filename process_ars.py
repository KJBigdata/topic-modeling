import os
import requests
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

def filter_xsn(pos_token_list):
    FILTER_XSN = ['님께', '들', '께', '상', '별', '씩', '님.', '분께', '쪽', '당', '꾼들', '님들', '삼', '쯤', '분들', '건', '요', '합', '랑',
                  '좀', '님이', '님들께', '째', '짜리', '칠', '팔', '분이', '시', '확', '이', '처', '여', '가', '간', '행', '권들', '차씩', '일',
                  '배', '네', '된', '측', '삼이', '성이름', '하', '될', '득', '있', '분님', '예', '란', '내', '류', '들이', '번', '거', '잔',
                  '십', '사', '길', '분들께', '되', '들께', '화기간', '할', '속', '제미터', '걸', '권당', '세', '신', '돈', '채', '죠', '유', '엘',
                  '기', '치', '돼', '적립', '들폰', '여형', '꾼이', '꾼들이', '막', '님건', '주분', '화점', '긴', '납', '적등본', '본', '이분',
                  '형주택청약', '봤', '분정', '경', '차번호', '님거', '용대출', '주', '형주택', '영', '불', '육', '및', '차당', '럴', '대', '칭',
                  '성함', '균', '님꺼', '급', '님명', '좌', '용들', '화공사', '들분', '표', '다', '성가', '권별', '때쯤', '형화', '듣', '권이', '님말',
                  '님할', '군', '님명의', '수', '화시오', '들건', '됐', '성님', '님별', '융', '꾼들말', '적거래', '정', '네들', '석', '꾼이분', '삼삼',
                  '민', '씩요', '냐', '입', '것', '뷰', '찍', '웹', '들꺼', '뷰점', '씨', '추', '화기금', '화요', '님껀', '들쪽', '적적']
    filtered_xsn = []
    for t in pos_token_list:
        if t.find('XSN') != -1:
            if t[t.find('XSN'):].replace('XSN', '') in FILTER_XSN:
                filtered_xsn.append(t[:t.find('XSN')])
            else:
                filtered_xsn.append(t)
        else:
            filtered_xsn.append(t)
    return filtered_xsn


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
                        raw_tokens = filter_xsn(raw_tokens)
                        tokens.append(''.join(raw_tokens).replace('NNG','').replace('NNP','').replace('XSN', '').replace('XPN', ''))
        nn_tokens = [t for t in tokens if len(t) >= 2]
        sent_tokens.append(nn_tokens)
        one_line_tokens.extend(nn_tokens)

    return sent_tokens, one_line_tokens

def sub_speaker_tag(stt_text):
    import re
    text = re.sub(re.compile(r"\[(C|F)\]"), '', stt_text)
    return text

def analyze_intent(speak):
    url = "http://3.34.31.139:5001/intent581"
    if isinstance(speak, str):
        stt_list = speak.split('. ')
    else:
        stt_list = speak

    common_top_50 = ['여보세요', '안녕하세요', '알겠습니다', '잠시만요', '케이비 국민 은행입니다', '안녕하십니까',
                     '잠깐만요', '잠시만 기다려주세요', '잠시만 기다려주시겠습니까', '확인 감사합니다', '고객님 기다려주셔서 감사합니다',
                     '무엇을 도와드릴까요', '네 알겠습니다', '잠시 통화 가능하십니까', '네 안녕하세요', '기다려주셔서 감사합니다',
                     '반갑습니다', '수고하세요', '고객님 무엇을 도와드릴까요', '아 네 알겠습니다', '수고하십니다', '네 여보세요',
                     '기다리겠습니다', '지금', '잠시 만요', '잠시만 기다려주시기 바랍니다', '잠시만 기다려 주시기 바랍니다', '아 알겠습니다',
                     '예 알겠습니다', '확인해 보겠습니다', '아 여보세요', '네 기다리겠습니다', '그래서', '만기 진심으로 축하드립니다',
                     '아 잠시만요', '아 예 알겠습니다', '이용해 주셔서 감사합니다', '네 안녕하십니까', '네 수고하세요', '제가',
                     '고객님 기다려서 감사합니다', '좋은 하루 되시기 바랍니다', '확인해 드리겠습니다', '네 확인 감사합니다', '수고 많으십니다',
                     '안녕하십니다', '합니다', '국민 은행입니다']
    daily = []
    content_list = []
    for stt in stt_list:
        filtered_tag_stt = sub_speaker_tag(stt)
        if filtered_tag_stt in common_top_50:
            daily.append(stt)
        else:
            params = {'question': filtered_tag_stt}
            response = requests.get(url, params=params)
            label = eval(response.text)['intent'][0]['label']
            if label[1:].split(']')[0] == '일상':
                daily.append(stt)
            else:
                # print(f"{label} : {filtered_tag_stt}")
                content_list.append(stt)

    return content_list, daily

def filter_daily_docs(docs_list):
    filtered_content = []
    daily_list = []
    for i in tqdm(range(len(docs_list)),desc='filter daily conversation'):
        content_list, daily = analyze_intent(docs_list[i])
        filtered_content.append(content_list)
        daily_list.append(daily)
    return filtered_content, daily_list

def process_speak_tag(speak):
    speak_processed = []
    for i, s in enumerate(speak):
        if i == 0:
            if s[:3] == '[N]':
                speak_processed.extend(speak)
                break
            else:
                speak_processed.append(s)
        else:
            if speak[i - 1][:3] == speak[i][:3]:
                speak_processed.append(speak[i][3:])
            else:
                speak_processed.append(speak[i])

    return '. '.join(speak_processed)


if __name__ == '__main__':
    ars_df1 = load_stt(os.path.join(os.getcwd(), 'without_stwords_df1.pickle'))
    ars_df2 = load_stt(os.path.join(os.getcwd(), 'without_stwords_df2.pickle'))
    ars_df = pd.concat([ars_df1, ars_df2])

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
    # print(Counter([len(c) for c in one_line_tokens]))
    # for c in [c for c in list(Counter(one_line_tokens).most_common()) if
    #           (c[0].find('XSN') != -1) or (c[0].find('XPN') != -1)]:
    #     if c[1] != 1:
    #         print(c)
    # merged_df = load_stt('merged_df.pkl')
    # ex = merged_df.copy()
    # filtered_content, daily_list = filter_daily_docs(ex['speak'])
    # ex['content'] = filtered_content
    # ex['content'] = ex['content'].apply(lambda x : '. '.join(x))
    # save_stt('filtered_merged_df.pkl', ex)
    # filtered_merged_df = load_stt('filtered_merged_df.pkl')
    # print(filtered_merged_df[['content', 'speak']])
    # print(filtered_merged_df.shape)