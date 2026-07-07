from fastapi import APIRouter

from api.schemas.chat import ChatRequest
from services.chat_service import ChatService

router = APIRouter(prefix="/chat", tags=["Chat"])

service = ChatService()


@router.post("")
def ask_question(request: ChatRequest):
    return service.ask(request.question)