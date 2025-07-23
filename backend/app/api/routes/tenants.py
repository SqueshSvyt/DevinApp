from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.core.db import get_async_db
from app.schemas.tenant import TenantResponse
from app.services.tenant_service import TenantService

router = APIRouter()

@router.get("/", response_model=List[TenantResponse])
async def get_tenants(db: AsyncSession = Depends(get_async_db)):
    service = TenantService(db)
    return await service.get_all_tenants()
