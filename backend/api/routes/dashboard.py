from fastapi import APIRouter

from services.dashboard_service import DashboardService

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("")
def dashboard():

    service = DashboardService()

    return service.get_stats()