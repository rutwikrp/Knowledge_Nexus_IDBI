import os

from dotenv import load_dotenv
from openai import OpenAI

from .base import LLMProvider

load_dotenv()


class OpenAIProvider(LLMProvider):

    def __init__(self):

        self.client = OpenAI(
            api_key=os.getenv("OPENAI_API_KEY")
        )

        self.model = os.getenv(
            "OPENAI_MODEL",
            "gpt-5.5"
        )

    def generate(self, prompt: str) -> str:

        response = self.client.chat.completions.create(

            model=self.model,

            temperature=0,

            messages=[
                {
                    "role": "system",
                    "content":
                    "You are an Enterprise AI Knowledge Assistant."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return response.choices[0].message.content