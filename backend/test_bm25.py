from retrieval.bm25_search import BM25Searcher

bm25 = BM25Searcher()

results = bm25.search(
    "What is a Terraform module?"
)

for row, score in results:

    print("=" * 80)

    print(score)

    print(row.document_name)

    print(row.page_number)

    print(row.content[:600])