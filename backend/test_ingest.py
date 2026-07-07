from ingestion.pdf_loader import extract_pdf_text
from ingestion.chunker import chunk_text

text = extract_pdf_text("TheTerraformBook_sample.pdf")

chunks = chunk_text(text)

print(len(chunks))