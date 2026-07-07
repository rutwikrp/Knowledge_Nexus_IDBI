from retrieval.vector_search import search

results = search("How do I provision infrastructure?")

for row in results:

    print("\n-------------------")

    print(f"ID: {row.id}")

    print(f"Distance: {row.distance}")

    print(
        f"Document: {row.document_name}"
    )

    print(
        f"Page: {row.page_number}"
    )

    print(row.content)