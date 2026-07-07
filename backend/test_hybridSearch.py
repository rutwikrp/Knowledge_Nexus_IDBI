from retrieval.hybrid_search import hybrid_search

query = "What is a Terraform module?"

results = hybrid_search(
    query=query,
    vector_k=10,
    bm25_k=10
)

print(f"\nHybrid Search Results for: {query}\n")

for i, row in enumerate(results, start=1):
    print("=" * 80)
    print(f"Rank: {i}")
    print(f"Document: {row.document_name}")
    print(f"Page: {row.page_number}")
    print(f"Chunk ID: {row.id}")
    print("-" * 80)
    print(row.content[:600])
    print()