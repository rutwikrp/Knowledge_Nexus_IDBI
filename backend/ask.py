from llm.response_generator import ResponseGenerator


def main():

    generator = ResponseGenerator()

    print("=" * 60)
    print(" Enterprise AI Knowledge Assistant")
    print("=" * 60)

    while True:

        query = input("\nAsk a question ('exit' to quit): ").strip()

        if query.lower() == "exit":
            print("\nGoodbye!")
            break

        if not query:
            continue

        print("\nSearching knowledge base...\n")

        result = generator.generate(query)

        print("=" * 60)
        print("Answer")
        print("=" * 60)
        print(result["answer"])

        print("\nSources")
        print("-" * 60)

        for chunk, score in result["sources"]:

            print(
                f"- {chunk.document_name} "
                f"(Page {chunk.page_number})"
            )


if __name__ == "__main__":
    main()