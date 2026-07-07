
from retrieval.hybrid_search import hybrid_search
from retrieval.reranker import Reranker

reranker = Reranker()


def retrieve(query):

    candidates = hybrid_search(
        query,
        vector_k=20,
        bm25_k=20
    )

    reranked = reranker.rerank(
        query,
        candidates,
        top_k=5
    )

    return reranked