from pypdf import PdfReader


def extract_pdf_text(path):
    reader = PdfReader(path)

    pages = []

    for page_num, page in enumerate(reader.pages, start=1):

        pages.append(
            {
                "page_number": page_num,
                "text": page.extract_text() or ""
            }
        )

    return pages