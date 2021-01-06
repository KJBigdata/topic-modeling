import pandas as pd
import pprint
from data_loader import load_pickle_data, preprocess
from utils import listing_daterange, find_string_idx, hlight_term, analyze_docs
from lda.lda_trainer import LDATrainer
from lda.lda_corpus import *
from lda.lda_topic_modeling import TopicModeler
from lda.pipeline import Pipeline

if __name__ == '__main__':
	preprocess('sample_100_news.tsv')
	input_raw_data = load_pickle_data('./data/output/sample_output.pkl')

	#prepare dictionary, corpus
	tokens_list = input_raw_data['tokens']
	bigram = create_bigram_model(tokens_list, min_count=5, threshold=50)
	tokens_list = convert_to_bigram_tokens(tokens_list, bigram)


	#modeling
	trainer = LDATrainer(tokens_list=tokens_list, tf_idf=False)
	# trainer.train(trainer.corpus, trainer.dictionary, num_topics=6, passes=5, workers=4, iterations=10, chunksize=50,
	# 			  save=True)
	# trainer.fit_optimal_topic_model(trainer.corpus, trainer.dictionary, tokens_list,
	# 								passes=30, workers=4, iterations=20, chunksize=400,
	# 								limit=10, start=2, step=2)

	topic_model = TopicModeler()
	print(topic_model.sorted_topic_keyword(topic_model.topic_info, topic=1, _lambda=0.5))
	# topic_model.show_topic_modeling()

	print("\n토픽 리스트")
	for i, topic_list in enumerate(topic_model.get_topic_list()):
		print(topic_list)
		print(topic_model.model.get_topic_terms(i, 5))
		print('-------------------------------------')

	print("\n문서 관점")
	print(f"document raw content: {input_raw_data['content'][9]}")
	print(f"document tokens list : {tokens_list[9]}")
	print(f"document의 bow format : {topic_model.corpus[9]}")
	print('\n')
	doc_topic_dist = topic_model.model.get_document_topics(topic_model.corpus[9])
	sorted_doc_topic = sorted(doc_topic_dist, key=lambda x:x[1], reverse=True)

	print(f"document를 대표하는 토픽 분포 : {sorted_doc_topic}")

	print("\ndocument의 단어 관점")
	words = [topic_model.dictionary[word_id] for word_id, count in topic_model.corpus[9]]
	term_corona_topic_dist = topic_model.model.get_term_topics(words[words.index('코로나')], minimum_probability=0)
	sorted_term_topic = sorted(term_corona_topic_dist, key=lambda x: x[1], reverse=True)
	print('\n')
	print(f"코로나 단어에 할당된 토픽 분포 {sorted_term_topic}")

	print("\n 문서 토픽 분석하기")
	token = ['코로나', '바이러스', '쿠팡', '물류']
	print(token)
	print(topic_model.get_topic_list())

	# print("\n 토픽 분포 시각화...")
	# topic_model.show_topic_modeling()

	#document 상세사항
	pipeline = Pipeline(input_raw_data, ['all'], ['all'])
	topic_model = pipeline.topic_modeling()
	topic_model.filtered_df = pipeline.filtered_df

	rep_doc_by_topic = topic_model.get_representative_docs(topic_model.model, topic_model.corpus, topic_model.filtered_df['content'].to_list())
	pd.set_option('display.max_columns', 500)
	pd.set_option('display.max_rows', 500)
	
	print(rep_doc_by_topic.head())

	for p, t in rep_doc_by_topic[['Topic_Perc_Contrib', 'Text']].head().values:
		if find_string_idx(t, '코로나') != -1:
			print(p, hlight_term(t, '코로나'))


