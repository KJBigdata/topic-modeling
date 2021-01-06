from tqdm import tqdm
import pandas as pd
import requests

def listing_daterange(start_date, end_date):
    from datetime import datetime, timedelta

    try:
        dt_format = '%Y%m%d'
        start = datetime.strptime(start_date, dt_format)
        end = datetime.strptime(end_date, dt_format)
        date_generated = [datetime.strftime(start + timedelta(days=x), dt_format)
                          for x in range(0, (end - start).days)]
        return date_generated

    except:
        raise ValueError("day is out of range for month")

    return df_index.strftime("%Y%m%d")

def find_string_idx(string, term):
    if '_' in term :
        term_list = term.split(' ')
        idx_list = []
        for t in term_list:
            if string != [] :
                idx = string.find(t)
                idx_list.append(idx)
            elif string == [] :
                pass
        if -1 in idx_list:
            idx = max(idx_list)
        elif idx_list == [] :
            idx = -1
        else :
            idx = min(idx_list)

    else :
        if string != [] :
            idx = string.find(term)
        elif string == [] :
            idx = -1

    return idx


def hlight_term(string, term):
    try:
        idx = find_string_idx(string, term)

        if idx - 20 < 0:
            if string != []:
                begin = 0
                result = string[begin:begin + 150] + '...........'
            else :
                result = '.....본문 없음......'
        else:
            begin = idx - 20
            result = '...........' + string[begin:begin + 150] + '...........'

        return result

    except Exception as ex:
        print(ex)
        return string

def tokenize_kbsta(docs_list):
    url = 'http://3.34.18.1:8080/analyze'
    headers = {'apikey': 'naJovd6E9TtxKzQhYIsbM3qdl43KsnqP'}
    token_list = []
    for i in tqdm(range(len(docs_list)), desc='Tokenizing docs'):
        params = {'text': docs_list[i], 'tasks': ['bnlp', 'kse']}
        response = requests.get(url, headers=headers, params=params)

        nouns = []
        if response.status_code == 200:
            document = response.json().get('sentence', None)
            if document is None:
                return nouns

            for sentence in document:
                for word in sentence['word']:
                    for token in word['token']:
                        if token['pos'] in ['NNG', 'NNP']:
                            nouns.append(token['raw'])
        else:
            pass
        result = [n for n in nouns if len(n) > 1]
        token_list.append(result)

    return token_list

def analyze_docs(docs_list):
    import pprint
    url = 'http://3.34.18.1:8080/analyze'
    headers = {'apikey': 'naJovd6E9TtxKzQhYIsbM3qdl43KsnqP'}

    analyzed_list = []
    passed_ix = []
    for i in tqdm(range(len(docs_list)), desc='Analyzing docs'):
        result = analyze_single_doc(docs_list[i], url, headers, tasks='bnlp,kse,ner,d2c')

        if result['tokens'] != None:
            analyzed_list.append(result)
        elif result['tokens'] == None:
            passed_ix.append(i)

    if passed_ix != []:
        print(f"passed_ix : {passed_ix}")
        for ix in passed_ix:
            print(docs_list[ix])
            result = analyze_single_doc(docs_list[ix], url, headers, tasks='bnlp,kse,ner,d2c')
            analyzed_list.insert(ix, result)

    return analyzed_list

def analyze_single_doc(doc:str, url:str, headers:dict, tasks:str):
    params = {'text': doc, 'tasks': tasks}
    response = requests.get(url, headers=headers, params=params)

    nouns = []

    if response.status_code == 200:
        response = eval(response.text)
        document = response.get('sentence', None)
        if document is None:
            return nouns

        for sentence in document:
            for word in sentence['word']:
                for token in word['token']:
                    if token['pos'] in ['NNG', 'NNP']:
                        nouns.append(token['raw'])

        tokens = [n for n in nouns if len(n) > 1]
        d2c = response['d2c']
        key_info = response['sentence'][response['kse'][0]['idx']]
        key_sentence = {'start': key_info['start'], 'raw': key_info['raw'], 'entity': key_info['entity']}

        entities = [{'raw': entity['raw'], 'category': entity['category']} for i in range(len(response['sentence']))
                    for entity in response['sentence'][i]['entity']]

        result = {'d2c': d2c, 'key_sentence': key_sentence['raw'], 'entity': entities,
                  'doc': doc, 'tokens': tokens}
    else:
        print('Response Error')
        result = {'d2c': None, 'key_sentence': None, 'entity': None,
                  'doc': doc, 'tokens': None}

    return result


def tokenize_mecab(docs_list):
    from eunjeon import Mecab
    m = Mecab(dicpath='/usr/local/lib/mecab/dic/mecab-ko-dic')
    token_list = []
    for i in tqdm(range(len(docs_list)), desc='Tokenizing docs'):
        nouns = [t[0] for t in m.pos(docs_list[i]) if (t[1] in ['NNG', 'NNP']) and (len(t[0]) > 1)]
        token_list.append(nouns)

    return token_list


