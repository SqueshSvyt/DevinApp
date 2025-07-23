from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from app.core.db import get_async_db
from app.schemas.container import ContainerCreate, ContainerUpdate, ContainerResponse, ContainerListResponse
from app.services.container_service import ContainerService

router = APIRouter()

@router.get("/", response_model=ContainerListResponse)
async def get_containers(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    search: Optional[str] = Query(None),
    type_filter: Optional[str] = Query(None),
    tenant_filter: Optional[str] = Query(None),
    purpose_filter: Optional[str] = Query(None),
    status_filter: Optional[str] = Query(None),
    has_alerts: Optional[bool] = Query(None),
    db: AsyncSession = Depends(get_async_db)
):
    service = ContainerService(db)
    return await service.get_containers_with_filters(
        skip=skip, limit=limit, search=search,
        type_filter=type_filter, tenant_filter=tenant_filter,
        purpose_filter=purpose_filter, status_filter=status_filter,
        has_alerts=has_alerts
    )

@router.get("/performance", response_model=dict)
async def get_performance_metrics(
    type_filter: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_async_db)
):
    service = ContainerService(db)
    return await service.get_performance_metrics(type_filter=type_filter)

@router.get("/{container_id}", response_model=ContainerResponse)
async def get_container(
    container_id: str,
    db: AsyncSession = Depends(get_async_db)
):
    service = ContainerService(db)
    container = await service.get_container_by_id(container_id)
    if not container:
        raise HTTPException(status_code=404, detail="Container not found")
    return container

@router.post("/", response_model=ContainerResponse)
async def create_container(
    container_data: ContainerCreate,
    db: AsyncSession = Depends(get_async_db)
):
    service = ContainerService(db)
    try:
        return await service.create_container(container_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{container_id}", response_model=ContainerResponse)
async def update_container(
    container_id: str,
    container_data: ContainerUpdate,
    db: AsyncSession = Depends(get_async_db)
):
    service = ContainerService(db)
    container = await service.update_container(container_id, container_data)
    if not container:
        raise HTTPException(status_code=404, detail="Container not found")
    return container

@router.delete("/{container_id}")
async def delete_container(
    container_id: str,
    db: AsyncSession = Depends(get_async_db)
):
    service = ContainerService(db)
    success = await service.delete_container(container_id)
    if not success:
        raise HTTPException(status_code=404, detail="Container not found")
    return {"message": "Container deleted successfully"}
