from ingestion.ingest_document import ingest_pdf


class DocumentService:

    def upload(self, pdf_path: str):
        """
        Ingest a PDF into the knowledge base.

        Args:
            pdf_path (str): Path to the PDF file.

        Returns:
            dict: Information about the ingested document.
        """
        return ingest_pdf(pdf_path)