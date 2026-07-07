from fastapi import APIRouter

router = APIRouter(prefix="/graph", tags=["Graph"])

service = None  # Placeholder for the graph service

@router.get("")
def get_graph():
    # Placeholder implementation for fetching graph data
    return {
        "nodes": [
            {"id": "1", "label": "Terraform"},
            {"id": "2", "label": "AWS"},
            {"id": "3", "label": "Docker"},
        ],
        "edges": [
            {
                "id": "1",
                "source": "1",
                "target": "2",
                "label": "uses",
            },
            {
                "id": "2",
                "source": "2",
                "target": "3",
                "label": "runs",
            },
        ],
    }