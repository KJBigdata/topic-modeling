"""RSN news 텍스트 데이 처리를 위한 모듈.

"""
import re
from .cleaner_base import AbstractCleaner
from .utils.text import sub_regex_pattern, replace_consecutive_space, replace_quotation_mark
from typing import List


class RsnNewsCleaner(AbstractCleaner):
    """Cleaner class for RSN NEWS.

    """
    def __init__(self):
        super().__init__()

    def _clean(self, text: str, use_kss: bool = True) -> str:
        """It return text with regex pattern phrase removed from RSN news

        Args:
            text: raw RSN news

        Returns:
            text with regex pattern phrase removed
        """
        cleaned_text = replace_quotation_mark(text)

        if use_kss:
            import kss
            sentences = kss.split_sentences(cleaned_text)
            sentences = self.delete_copyright_kss_pattern(sentences)
            cleaned_text = ' '.join(sentences)

        cleaned_text = sub_regex_pattern(cleaned_text)
        cleaned_text = replace_consecutive_space(cleaned_text)
        return cleaned_text.strip()

    def delete_copyright_kss_pattern(self, sentences: List) -> List:
        """It return text with copyright phrase removed from RSN news

        Args:
            sentences: splitted sentences by kss

        Returns:
            sentences with copyright phrase removed
        """

        last_three_sentences = sentences[-3:]
        cleaned_sentences = list(map(self._is_copyright_pattern, last_three_sentences))
        try:
            end_index = cleaned_sentences.index(True)
            last_three_sentences = last_three_sentences[:end_index]
        except ValueError:
            pass
        return sentences[:-3] + last_three_sentences

    def _is_copyright_pattern(self, sentence: str) -> bool:
        first_pattern = re.compile(r'ⓒ|©|(copyrights?)|(\(c\))|(저작권자)', re.I)
        second_pattern = re.compile(r'(무단 ?전재)|(재배포)')
        result = first_pattern.search(sentence) and second_pattern.search(sentence) and (len(sentence) <= 150)
        return result
