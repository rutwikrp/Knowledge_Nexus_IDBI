from core.config import LLM_PROVIDER

from llm.providers.openai_provider import OpenAIProvider
from llm.providers.ollama import OllamaProvider


def get_provider():

    if LLM_PROVIDER == "openai":
        return OpenAIProvider()

    if LLM_PROVIDER == "ollama":
        return OllamaProvider()

    raise ValueError("Unsupported provider")