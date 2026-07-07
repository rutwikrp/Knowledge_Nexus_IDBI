from retrieval.pipeline import retrieve

results = retrieve(
    "What is a Terraform module?"
)

for row, score in results:

    print("=" * 80)

    print(f"Score : {score:.4f}")

    print(f"Document : {row.document_name}")

    print(f"Page : {row.page_number}")

    print()

    print(row.content[:700])