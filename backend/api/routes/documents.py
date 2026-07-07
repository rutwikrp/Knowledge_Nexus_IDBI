from fastapi import APIRouter, UploadFile, File
import shutil
import os
from sqlalchemy import text
from db.session import engine

from services.document_service import DocumentService

router = APIRouter(prefix="/documents", tags=["Documents"])

service = DocumentService()

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return service.upload(file_path)

@router.get("")
def get_documents():

    with engine.connect() as conn:

        rows = conn.execute(
            text("""
                SELECT
                    d.id,
                    d.title,
                    COUNT(c.id) AS chunks
                FROM documents d
                LEFT JOIN chunks c
                    ON d.id = c.document_id
                GROUP BY d.id
                ORDER BY d.id DESC
            """)
        ).mappings().all()

    return [
        {
            "id": str(row["id"]),
            "title": row["title"],
            "chunks": row["chunks"],
            "status": "Indexed",
        }
        for row in rows
    ]