import pandas as pd
from utils import listing_daterange
from data_loader import load_pickle_data
from lda.lda_trainer import LDATrainer
from lda.lda_corpus import *
from lda.lda_topic_modeling import TopicModeler

class Pipeline:
	def __init__(self, input_data:pd.DataFrame,
				 category1:list, category2:list, category3:list=None,
				 start_date=None, end_date=None,
				 ngram='bigram',
				 tokens_list=None
				 ):

		self.input_data = input_data

		if category1 == ['all']:
			self.category1 = list(set(input_data.category1))
		else:
			self.category1 = category1

		if category2 == ['all']:
			self.category2 = list(set(input_data.category2))
		else:
			self.category2 = category2

		if category3 == ['all']:
			try:
				self.category3 = list(set(input_data.category3))
			except Exception as ex:
				print(ex)
				self.category3 = []
		else:
			self.category3 = category3

		self.start_date = start_date
		self.end_date = end_date
		print(f"pipeline params : {self.category1}, {self.category2}, {self.category3},"
			  f" {self.start_date}, {self.end_date}")
		self.filtered_df = self.filter_input()

		self.tokens_list = tokens_list
		print(f"ngram option : {ngram}")
		print(ngram is 'not_used')
		if ngram in ['bigram', 'trigram', 'not_used']:
			self.ngram = ngram
		else:
			print(f"what ngram : {ngram}")
			raise ValueError("ngram is only bigram or trigram or not used")

	def filter_input(self):
		filtered_df = self.input_data.copy()
		filtered_df['sequence'] = [i for i in range(len(list(filtered_df.index)))]

		filtered_df.date = filtered_df.date.apply(lambda x : str(x))

		if (self.start_date and self.end_date) is not None:
			dt_list = listing_daterange(self.start_date, self.end_date)
			filtered_df = filtered_df[filtered_df['date'].isin(dt_list)]
		filtered_df = filtered_df[filtered_df['category1'].isin(self.category1)]
		if self.category2 != []:
			filtered_df = filtered_df[filtered_df['category2'].isin(self.category2)]
		if self.category3 != []:
			filtered_df = filtered_df[filtered_df['category3'].isin(self.category3)]
		return filtered_df

	def topic_modeling(self):
		if self.tokens_list is not None:
			tokens_list = [self.tokens_list[i] for i in self.filtered_df['sequence']]
		else:
			tokens_list = self.filtered_df['tokens']

			if self.ngram is 'bigram':
				bigram = create_bigram_model(tokens_list, min_count=5, threshold=100)
				tokens_list = convert_to_bigram_tokens(tokens_list, bigram)

			elif self.ngram is 'trigram':
				trigram = create_trigram_model(tokens_list, min_count=5, threshold=100)
				tokens_list = convert_to_bigram_tokens(tokens_list, trigram)

			elif self.ngram is 'not_used':
				pass
		print('-----pipelined-----')
		self.filtered_df = self.filtered_df[[c for c in self.filtered_df.columns if c not in ['sequence']]]
		corpus, dictionary = make_corpus(tokens_list)

		topic_modeler = TopicModeler(dictionary=dictionary, corpus=corpus)

		return topic_modeler
