import pickle
import gensim
import numpy as np
from collections import Counter
from tqdm import tqdm

def create_bigram_model(tokens_list, min_count=5, threshold=100):
    # higher threshold fewer phrases
    print('creating bigram_model...')
    return gensim.models.Phrases(tokens_list, min_count=min_count, threshold=threshold, delimiter=b'_')


def create_trigram_model(tokens_list, bigram, min_count=5, threshold=100):
    print('creating trigram_model...')
    return gensim.models.Phrases(bigram[tokens_list], min_count=min_count, threshold=threshold, delimiter=b'_')


def convert_to_bigram_tokens(tokens_list, bigram):
    return [bigram[tokens] for tokens in tokens_list]


def convert_to_trigram_tokens(tokens_list, bigram, trigram):
    return [trigram[bigram[tokens]] for tokens in tokens_list]

# create dictionary
def create_dictionary(tokened_list):
    return gensim.corpora.Dictionary(tokened_list) #id2word

def filter_tokens(tokens_list, entity_list, l_bound=10, h_bound=90):
    per = [entity['raw'] for i in tqdm(range(len(entity_list)), desc='Filtering NER:PER')
           for entity in entity_list[i] if entity['category'] == 'PER']
    word_counter = Counter([word for words in tokens_list for word in words])
    for i in tqdm(range(len(per)), desc='Deleting PER KEYs'):
        del word_counter[per[i]]
    l_bound = np.percentile(sorted(list(word_counter.values())), l_bound)
    h_bound = np.percentile(sorted(list(word_counter.values())), h_bound)
    filter = [k for k, b in word_counter.items() if b > l_bound and b < h_bound]

    filtered_tokens = [[token for token in tokens_list[i] if token in filter]
                       for i in tqdm(range(len(tokens_list)), desc='Filtering Tokens for modeling')]

    return filtered_tokens

def filter_infreq(dictionary, tokens_list):
    word_counter = Counter((word for words in tokens_list for word in words))
    l_bound = np.percentile(sorted(list(word_counter.values())), 10)
    h_bound = np.percentile(sorted(list(word_counter.values())), 90)
    print(f"Filter low_bound : {l_bound}, high_bound : {h_bound}")
    removal_word_idxs = {
        dictionary.token2id[word] for word, count in word_counter.items() if count > h_bound or count < l_bound
    }

    dictionary.filter_tokens(removal_word_idxs)
    dictionary.compactify()
    print(f"filtered dictionary size : {len(dictionary)}")

    return dictionary

# create bow
def create_bow(tokens_list, id2word):
    return [id2word.doc2bow(tokens) for tokens in tokens_list]

# create corpus & dictionary
def make_corpus(tokens_list, filter=False, tf_idf=False, save=False):

    dictionary = create_dictionary(tokens_list)
    print(f"original dictionary size : {len(dictionary)}")
    if filter:
        dictionary = filter_infreq(dictionary, tokens_list)
    else:
        pass

    corpus = create_bow(tokens_list, dictionary)

    # tfidf transform 적용
    if tf_idf is True:
        tfidf = gensim.models.TfidfModel(corpus)
        corpus = tfidf[corpus]

    if save:
        save_corpus(dictionary, corpus)

    return corpus, dictionary

#save dicitonary & corpus
def save_corpus(dictionary, corpus,
                dict_path = "lda/model/lda_dict.gensim", corpus_path = "lda/model/gensim_corpus.pkl"):
    import os
    if not os.path.isdir('lda/model'):
        print(f"make {'lda/model'} path")
        os.mkdir('lda/model')
    dictionary.save(dict_path)

    with open(corpus_path, 'wb') as file:
        pickle.dump(corpus, file)
