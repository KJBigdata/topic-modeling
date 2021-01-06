"""텍스트 처리 기능을 위한 모듈.

  Typical usage example:

  sub_regex_pattern(text)

"""
import re

CONDITION = '((뉴스)|(기자)|(이미지)|(사진)|(기사)|(=>)|(=)|(페이스북)|(카카오톡)|(트위터)' \
                '|(SNS)|(일보)|(그림)|(번역)|(포스트)|(구독)|(영상)|(앵커)|(바로가기)|(끝)' \
                '|(인터뷰)|(NEWS)|(클릭)|(신문)|(서울)|(이투데이)|(이데일리)|(일간스포츠)' \
                '|(닷컴)|(제공)|(마감)|(업데이트)|(전화)|(메일)|(제보)|(그래프)|(닷컴)|(종목)' \
                '|(검색)|(동영상)|(표)|(시세)|(주가)|(증시)|(추이)|(동향)|(진단)|(한경탐사봇)' \
                '|(카톡)|(하이라이트)|(연합)|(캐스터)|(리포트)|(비즈니스)|(확인)|(투데이)|(노아은행)' \
                '|(포토)|(산업증권)|(Newspim)|(java)|(MARKETPOINT)|(href)|(html)|' \
                '(target)|(바로가기)|(구독)|(로그인)|(PDF)|ⓒ|©|(Copyright)|(\(c\))|(\(C\))' \
                '|(무단 ?전재)|(재배포)|(저작권자)|(@)|(에디터)|(온라인부)|(슈퍼개미)|(특집)|(TV)' \
                '|(증권시장부)|(그래픽)|(편집자주))'

NEWS_REGEX_PATTERN = {
    'big_bracket' : r'[\【\[][ a-zA-Z가-힣0-9=\/,.]+([\(\[][ a-zA-Z가-힣0-9=\/,.]+[\]\)])?'
                    r'[ a-zA-Z가-힣0-9=\/,.]+[\]\】]',
    'small_bracket' : f"[\(\<)]([ a-zA-Z가-힣0-9\/=_.,-]+)?{CONDITION}"
                      f"([ a-zA-Z가-힣0-9\/=_.,-]+)?[\)\>]",
    'forbidden_char' : r'[^( |\n|\t)0-9a-zA-ZF가-힣一-龥_*%!@#$&\(\)\[\]<>【】\?\"\'./+,-=~₩€]+',
    'email': r'[a-zA-Z0-9*_.+-]+@([a-zA-Z0-9*-]+\.[a-zA-Z0-9*-.]+)?',
    'reporter': r'\/?([가-힣]{2,4}=)?[가-힣]{2,4} ?(기자|선임기자|수습기자|특파원|객원기자)',
    'url' : r'[\(\[]?(http:\/\/|https:\/\/|www\.)([a-zA-Z0-9*-]{2,}'
            r'(\.|\/|\?|=|-|%)?){1,}[\)\]]?',
    'image' : r'(\/? ?(사진) ?(출처)? ?(=) ?[가-힣|0-9|a-z]+ ?(제공|기자)?)|'
              r'\/? ?(사진)(제공)? ?(=) ?[가-힣|0-9|a-z]+',
    'datetime' : r'((날짜 :|최종수정|기사입력|기사수정|입력|날짜|승인|기사등록|등록|작성|수정)(\s+)?)?'
                 r'\d{4}[\.\-]\d{1,2}[\.\-]\d{1,2}\.?(\s{1,3})?(\(?\d{2}:\d{2}(:\d{2})?\)?)?'
}

def is_hangul_character(char: str) -> bool:
    """Check if character is in the Hangul Jamo block"""

    value = ord(char)
    return (value >= 4352) and (value <= 4607)


def is_hangul(string: str) -> bool:
    """Check if all characters are in the Hangul Jamo block"""

    return all(is_hangul_character(i) for i in string)

def sub_regex_pattern(text: str,
                      pattern_key=['big_bracket', 'small_bracket', 'forbidden_char',
                                   'email', 'reporter', 'url', 'image', 'datetime']) -> list:
    """remove several regex patterns from news and extract phrase matched to check if it works
    Args:
        text: raw text
    Returns:
        cleaned_text : cleaned text by regex patterns
    """

    for key in pattern_key:
        regex_pattern = re.compile(NEWS_REGEX_PATTERN[key])
        cleaned_text = regex_pattern.sub('', text)
        text = cleaned_text

    return cleaned_text

def replace_quotation_mark(text: str) -> str:
    """It returns text with quatation marks replaced into normal one

    Args:
        text: text with weird quotation marks

    Returns:
        text with quatation marks replaced

    """
    text = text.replace('`', "'")
    text = text.replace(' ́', "'")
    text = text.replace('‘', "'")
    text = text.replace('’', "'")
    text = text.replace('“', '"')
    text = text.replace('”', '"')

    return text

def replace_consecutive_space(text: str) -> str:
    """It return text with multiple spaces replaced into one

    Args:
        text: text with multiple spaces

    Returns:
        text with one space
    """
    consecutive_space_pattern = re.compile('\s\s+')
    cleaned_text = consecutive_space_pattern.sub(' ', text)

    return cleaned_text
