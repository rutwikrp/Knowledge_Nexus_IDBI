from pydantic import BaseModel


class UploadResponse(BaseModel):
    message: str
    document_name: str
    chunks: int