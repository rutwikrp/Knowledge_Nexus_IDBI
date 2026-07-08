from fastapi import APIRouter, Query
from services.graph_service import GraphService

router = APIRouter()

@router.get("/graph")
def get_graph(query: str | None = Query(default=None)):
    service = GraphService()
    return service.get_graph(query)