from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_, or_
from sqlalchemy.orm import selectinload
from typing import List, Optional, Tuple
from app.models.container import Container
from app.models.location import Location
from app.schemas.container import ContainerCreate, ContainerUpdate

class ContainerRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_all(
        self,
        skip: int = 0,
        limit: int = 10,
        search: Optional[str] = None,
        type_filter: Optional[str] = None,
        tenant_filter: Optional[str] = None,
        purpose_filter: Optional[str] = None,
        status_filter: Optional[str] = None,
        has_alerts: Optional[bool] = None
    ) -> Tuple[List[Container], int]:
        query = select(Container).options(selectinload(Container.location))
        
        filters = []
        
        if search:
            search_filter = or_(
                Container.name.ilike(f"%{search}%"),
                Container.tenant.ilike(f"%{search}%"),
                Container.purpose.ilike(f"%{search}%"),
                Container.status.ilike(f"%{search}%")
            )
            filters.append(search_filter)
        
        if type_filter:
            filters.append(Container.type == type_filter)
        
        if tenant_filter:
            filters.append(Container.tenant == tenant_filter)
        
        if purpose_filter:
            filters.append(Container.purpose == purpose_filter)
        
        if status_filter:
            filters.append(Container.status == status_filter)
        
        if has_alerts is not None:
            filters.append(Container.has_alert == has_alerts)
        
        if filters:
            query = query.where(and_(*filters))
        
        total_query = select(func.count(Container.id))
        if filters:
            total_query = total_query.where(and_(*filters))
        
        total_result = await self.db.execute(total_query)
        total = total_result.scalar()
        
        query = query.offset(skip).limit(limit).order_by(Container.modified.desc())
        result = await self.db.execute(query)
        containers = result.scalars().all()
        
        return list(containers), total

    async def get_by_id(self, container_id: str) -> Optional[Container]:
        query = select(Container).options(selectinload(Container.location)).where(Container.id == container_id)
        result = await self.db.execute(query)
        return result.scalar_one_or_none()

    async def get_by_name(self, name: str) -> Optional[Container]:
        query = select(Container).where(Container.name == name)
        result = await self.db.execute(query)
        return result.scalar_one_or_none()

    async def create(self, container_data: ContainerCreate) -> Container:
        location = None
        if container_data.location and container_data.type == "physical":
            location = Location(
                city=container_data.location.city,
                country=container_data.location.country,
                address=container_data.location.address
            )
            self.db.add(location)
            await self.db.flush()

        container = Container(
            name=container_data.name,
            type=container_data.type,
            tenant=container_data.tenant,
            purpose=container_data.purpose,
            seed_types=[seed.dict() for seed in container_data.seed_types],
            location_id=location.id if location else None,
            notes=container_data.notes,
            shadow_service_enabled=container_data.settings.shadow_service_enabled,
            ecosystem_connected=bool(container_data.settings.ecosystem)
        )
        
        self.db.add(container)
        await self.db.commit()
        
        query = select(Container).options(selectinload(Container.location)).where(Container.id == container.id)
        result = await self.db.execute(query)
        return result.scalar_one()

    async def update(self, container_id: str, container_data: ContainerUpdate) -> Optional[Container]:
        container = await self.get_by_id(container_id)
        if not container:
            return None

        update_data = container_data.dict(exclude_unset=True)
        
        if "location" in update_data and container.type == "physical":
            if container.location:
                for key, value in update_data["location"].items():
                    setattr(container.location, key, value)
            else:
                location = Location(**update_data["location"])
                self.db.add(location)
                await self.db.flush()
                container.location_id = location.id
            del update_data["location"]

        if "seed_types" in update_data:
            update_data["seed_types"] = [seed.dict() for seed in container_data.seed_types]

        if "settings" in update_data:
            settings = update_data["settings"]
            container.shadow_service_enabled = settings.get("shadow_service_enabled", container.shadow_service_enabled)
            container.ecosystem_connected = bool(settings.get("ecosystem"))
            del update_data["settings"]

        for key, value in update_data.items():
            setattr(container, key, value)

        await self.db.commit()
        await self.db.refresh(container)
        return container

    async def delete(self, container_id: str) -> bool:
        container = await self.get_by_id(container_id)
        if not container:
            return False

        await self.db.delete(container)
        await self.db.commit()
        return True

    async def get_tenants(self) -> List[str]:
        query = select(Container.tenant).distinct()
        result = await self.db.execute(query)
        return [tenant for tenant in result.scalars().all()]
