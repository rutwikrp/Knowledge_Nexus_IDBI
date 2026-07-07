from pydantic import BaseModel


class DashboardResponse(BaseModel):
    documents: int
    chunks: int
    questions: int