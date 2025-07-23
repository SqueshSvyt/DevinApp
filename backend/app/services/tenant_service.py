from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.repositories.tenant_repository import TenantRepository
from app.schemas.tenant import TenantResponse

class TenantService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.repository = TenantRepository(db)

    async def get_all_tenants(self) -> List[TenantResponse]:
        tenant_names = await self.repository.get_all()
        return [
            TenantResponse(id=name, name=name)
            for name in tenant_names
        ]
