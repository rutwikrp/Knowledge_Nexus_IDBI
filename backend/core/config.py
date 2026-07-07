import os
from dotenv import load_dotenv

load_dotenv()

LLM_PROVIDER = os.getenv(
    "LLM_PROVIDER",
    "openai"
)

OPENAI_MODEL = os.getenv(
    "OPENAI_MODEL",
    "gpt-5.4-mini"
)