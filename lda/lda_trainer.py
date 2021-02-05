import numpy as np
from tqdm import tqdm
import gensim
from gensim.models.ldamulticore import LdaMulticore
from gensim.models.coherencemodel import CoherenceModel
from lda.lda_corpus import make_corpus
from data_loader import check_dir

class LDATrainer:
    """docstring for LDAModelHandler"""
    def __init__(self, tokens_list, tf_idf:bool = False):
        # 학습에 사용될 코퍼스 데이터, 정수 인코딩 딕셔너리
        self.tokens_list = tokens_list
        self.corpus , self.dictionary = make_corpus(tokens_list, tf_idf=False, save=True)
        # 모델 객체 저장 변수
        self.best_model = None

    def train(self, corpus, dictionary, num_topics=5,
              per_word_topics=False, passes=30,
              workers=4, iterations=10, chunksize=200, save=False):

        model = LdaMulticore(corpus=corpus,
                             id2word=dictionary,
                             num_topics=num_topics,
                             per_word_topics=per_word_topics,
                             minimum_phi_value=0.005,
                             passes=passes,
                             workers=workers,
                             iterations=iterations,
                             chunksize= chunksize,
                             random_state=93)
        if save:
            self.save_model(lda_model=model)

        return model

    def _compute_model_performance(self, model):
        '''모델의 성능 지표 2가지를 측정하여 출력합니다'''
        cm = CoherenceModel(model=model,
                            corpus=self.corpus,
                            texts=self.tokens_list,
                            dictionary=self.dictionary,
                            coherence="c_v")

        coherence = cm.get_coherence()
        perplexity = model.log_perplexity(self.corpus)

        print("Coherence:", coherence)
        print('Perplexity:', perplexity)

    def fit_optimal_topic_model(self, corpus, dictionary,
                                passes=30, workers=4, iterations=10, chunksize=200,
                                limit=30, start=5, step=2, save=True):
        """
        Compute c_v coherence for various number of topics

        Parameters:
        ----------
        corpus : corpus
        dictionary : id2word
        tokens_list : List of input tokens
        passes : Training freq
        iterations : Loop freq by document
        chunksize : Num of input docs for training model
        limit : Max num of topics
        start : Start point of num topic
        end : Step for iterations

        Returns:
        -------
        best_model : Fitted model correspoonding to the best topic num
        """

        coherence_values = []
        model_list = []
        for num_topics in tqdm(range(start, limit, step), desc="Fitting optimal num topics"):
            lda_model = self.train(corpus=corpus, dictionary=dictionary, num_topics=num_topics,
                                   passes=passes, workers=workers, iterations=iterations, chunksize=chunksize)
            model_list.append(lda_model)
            coherencemodel = CoherenceModel(model=lda_model, texts=self.tokens_list, corpus=corpus,
                                            dictionary=dictionary, coherence='c_v')
            cv = coherencemodel.get_coherence()
            coherence_values.append(cv)
            print('\n')
            print(f"coherence_value of num_topics #{num_topics}: {cv}")

        print(f'coherence value of best model is {coherence_values[np.argmax(coherence_values)]}')
        print(f'num_topic of best model is {range(start, limit, step)[np.argmax(coherence_values)]}')

        self.best_model = model_list[np.argmax(coherence_values)]
        self._compute_model_performance(self.best_model)

        if save:
            self.save_model(lda_model=self.best_model)

        return self.best_model

    def save_model(self, lda_model, model_path = "lda/model/lda_model.gensim"):
        check_dir('lda/model')
        lda_model.save(model_path)
        print(f"successfully saved in {model_path}")





