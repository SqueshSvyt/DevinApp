from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.models.container import Container

class TenantRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_all(self) -> List[str]:
        query = select(Container.tenant).distinct()
        result = await self.db.execute(query)
        return [tenant for tenant in result.scalars().all()]
