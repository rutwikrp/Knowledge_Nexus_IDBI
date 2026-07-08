from fastapi import APIRouter
from services.graph_service import GraphService

router = APIRouter(prefix="/graph", tags=["Graph"])

graph_service = GraphService()

@router.get("")
def get_graph():
    return graph_service.get_graph()