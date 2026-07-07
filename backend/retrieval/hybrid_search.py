from retrieval.vector_search import search as vector_search
from retrieval.bm25_search import BM25Searcher

bm25 = BM25Searcher()


def hybrid_search(query,
                  vector_k=20,
                  bm25_k=20):

    vector_results = vector_search(
        query,
        top_k=vector_k
    )

    bm25_results = bm25.search(
        query,
        top_k=bm25_k
    )

    merged = {}

    for row in vector_results:

        merged[row["id"]] = row

    for row, score in bm25_results:

        if row["id"] not in merged:

            merged[row["id"]] = row

    return list(merged.values())