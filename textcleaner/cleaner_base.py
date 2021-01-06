import itertools
from typing import Union, List, Tuple

TextInput = Union[str, List[str], Tuple[str]]


class AbstractCleaner:
    """Base class for all cleaners.

    """
    def __init__(self):
        pass

    def clean(self,
              text : TextInput, **kwargs
              ) -> List[str]:
        """cleansing text inputs from a string, a list/tuple of strings

        Args:
            text: a string, a list/tuple of strings

        Returns:
            a list of string(s)

        Raises:
            ValueError: An error occurred cleansing empty list/tuple or not TextInput

        """

        output = []
        if isinstance(text, str):
            cleaned_text = self._clean(text, **kwargs)
            output.append(cleaned_text)
        elif isinstance(text, (list, tuple)) and len(text) > 0 and (all(isinstance(t, str) for t in text)):
            cleaned_text = itertools.chain((self._clean(t, **kwargs) for t in text))
            output.extend(cleaned_text)
        else:
            raise ValueError(
                f"Input {text} is not valid. Should be a string, a list/tuple of strings."
            )

        return output

    def _clean(self, text, **kwargs):
        """Clean a string"""

        raise NotImplementedError
