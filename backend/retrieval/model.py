from dataclasses import dataclass


@dataclass
class RetrievedChunk:

    chunk_id: int

    document_name: str

    page_number: int

    content: str

    vector_score: float | None = None

    rerank_score: float | None = None