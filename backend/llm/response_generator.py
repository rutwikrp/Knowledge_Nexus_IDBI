from retrieval.pipeline import retrieve
from llm.prompt_builder import PromptBuilder
from llm.provider_factory import get_provider


class ResponseGenerator:

    def __init__(self):
        self.provider = get_provider()

    def generate(self, query):

        retrieved_chunks = retrieve(query)

        prompt = PromptBuilder.build(
            query,
            retrieved_chunks
        )

        answer = self.provider.generate(prompt)

        sources = []

        for chunk, rerank_score in retrieved_chunks:

            sources.append({
                "id": chunk["id"],
                "content": chunk["content"],
                "document_name": chunk["document_name"],
                "page_number": chunk["page_number"],
                "distance": chunk.get("distance"),
                "rerank_score": float(rerank_score)
            })

        return {
            "question": query,
            "answer": answer,
            "sources": sources
        }