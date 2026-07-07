from fastapi import FastAPI

from api.routes.chat import router as chat_router
from api.routes.documents import router as document_router
from api.routes.dashboard import router as dashboard_router

app = FastAPI(
    title="Internal AI Knowledge Platform",
    version="1.0.0"
)

app.include_router(chat_router)
app.include_router(document_router)
app.include_router(dashboard_router)


@app.get("/")
def root():
    return {
        "message": "Internal AI Knowledge Platform API"
    }