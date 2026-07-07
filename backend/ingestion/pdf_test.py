
from pdf_loader import extract_pdf_text

text = extract_pdf_text(
    "TheTerraformBook_sample.pdf"
)

print(text[:500])