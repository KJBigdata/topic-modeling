"""텍스트 처리 이외에 기본적으로 많이 사용하는 기능을 위한 모듈.

os level 혹은 기타 텍스트 전처리를 위해 필요한 함수들 이외의 필요한 것들을 위한 모듈.

  Typical usage example:

  safe_mkdir(dir_path)
"""


import os
import glob
from collections import Counter
import pickle
import pandas as pd
import psutil


def check_available_memory():
    """It returns remained memory as percentage

    Returns:
        available memory

    """
    memory = psutil.virtual_memory()
    return 100 * memory.available / memory.total

def check_process_memory():
    """It returns memory usage of current process

    Returns:
        usage of current process in GB

    """
    process = psutil.Process(os.getpid())
    return process.memory_info().rss / (1024 ** 3)

def safe_mkdir(path: str) -> None:
    """Recursively creates the directory and does not raise an exception

    Args:
      path: A target directory path

    To use:
    >>> safe_mkdir('target_directory_path')
    """
    os.makedirs(path, exist_ok=True)

def list_all_files(data_dir_path: str, extension: str = 'csv', recursive: bool = True) -> list:
    """Recursively returns absolute path of all files with extension in the input dir as a list

    Args:
        data_dir_path: A target directory path
        extension: A target file type
        recursive: find all files matching a glob-style pattern

    Returns:
        list of all file's path

    """
    path = os.path.join(data_dir_path, f"**/*.{extension}")
    files = glob.glob(path, recursive=recursive)
    return files

def show_dir_size(target_dir_path: str) -> float:
    """Returns the size of all files in a directory in B

    Args
        target_dir_path: A path of target dir path

    Returns:
        size of directory in GB

    Raises:
        FileNotFoundError : If no available target dir path is found.

    """
    total_size = 0
    if not os.path.isdir(target_dir_path):
        raise FileNotFoundError(f"{target_dir_path} is not directory!")

    for path, dirs, files in os.walk(target_dir_path):
        for file in files:
            f_path = os.path.join(path, file)
            total_size += (os.path.getsize(f_path) if os.path.isfile(f_path) else 0)
    return total_size / (1024 ** 3)

def show_file_size(target_file_path: str) -> float:
    """Returns the size of the file in MB

    Args:
        target_file_path: A path of target file path

    Returns:
        size of file in MB

    Raises:
        FileNotFoundError : If no available target file path is found.
    """

    if not os.path.isfile(target_file_path):
        raise FileNotFoundError(f"{target_file_path} is not file!")

    f_size = os.path.getsize(target_file_path)
    return f_size / (1024 ** 2)

def load_rsn_csv(absolute_file_path, only_news: bool = True):
    """Returns csv file

    Args:
        absolute_file_path: A absolute path of target csv file
        only_news : option only for news in rsn data(news, cafe, blog, youtube)

    Returns:
        csv
    """
    pd.set_option('display.max_columns', 20)
    with open(absolute_file_path, 'r') as file:
        rsn = pd.read_csv(file)
    if only_news:
        rsn = rsn.loc[rsn['CHANNEL'] == '뉴스']

    return rsn

def counting_by_press(news_dataframe, press_column: str) -> dict:
    """It returns summary of press

    Args:
        news_dataframe : dataframe consisting only of news
        press_column : which press column name is in dataframe

    Returns:
        Number of press in descending order

    """
    return dict(Counter(news_dataframe[press_column]).most_common())

def save_rsn_csv(cleaned_rsn_df, output_dir, file_name: str, header: bool = False):
    """Save cleaned rsn dataframe suitable for GCP Big Query(no header)

    Args:
        cleaned_rsn_df: cleaned rsn dataframe to save
        output_dir: output directory path
        file_name: file name to save
        header: header option

    """
    path = os.path.join(output_dir, f"{file_name}.csv")
    cleaned_rsn_df.to_csv(path, mode='w', header=header)

def save_cleaned_news(cleaned_news, output_dir: str, file_name: str):
    """Save cleaned news as pickle

    Args:
        cleaned_news: cleaned_news to save
        output_dir: output directory path
        file_name: file name to save

    """
    path = os.path.join(output_dir, f"{file_name}.pkl")
    with open(path, 'wb') as file:
        pickle.dump(cleaned_news, file)

def load_pickle_data(abs_path:str):
    with open(abs_path, 'rb') as f:
        whole_doc = pickle.load(f)
    return whole_doc