import sys

from services.document_service import DocumentService


def main():

    if len(sys.argv) != 2:
        print("\nUsage:")
        print("python scripts/ingest.py <pdf_path>\n")
        sys.exit(1)

    pdf_path = sys.argv[1]

    service = DocumentService()

    try:

        result = service.upload(pdf_path)

        print("\nDocument ingested successfully!\n")

        # If ingest_pdf returns a dictionary
        if isinstance(result, dict):

            if "document_name" in result:
                print(f"Document : {result['document_name']}")

            if "chunks" in result:
                print(f"Chunks   : {result['chunks']}")

            if "document_id" in result:
                print(f"ID       : {result['document_id']}")

        else:
            print(result)

    except Exception as e:

        print(f"\nError: {e}")

        sys.exit(1)


if __name__ == "__main__":
    main()