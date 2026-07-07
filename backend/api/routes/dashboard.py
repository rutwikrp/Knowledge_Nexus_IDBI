from fastapi import APIRouter

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("")
def dashboard():

    return {
        "documents": 12,
        "chunks": 430,
        "questions": 58
    }