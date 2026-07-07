from retrieval.pipeline import retrieve

query = "What is a Terraform module?"

results = retrieve(query)

print(f"\nQuery: {query}\n")

for rank, (row, score) in enumerate(results, start=1):
    print("=" * 80)
    print(f"Rank: {rank}")
    print(f"Score: {score:.4f}")
    print(f"Document: {row.document_name}")
    print(f"Page: {row.page_number}")
    print("-" * 80)
    print(row.content[:600])
    print()