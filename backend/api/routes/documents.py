from fastapi import APIRouter, UploadFile, File
import shutil
import os

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