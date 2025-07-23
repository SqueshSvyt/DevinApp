from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
from app.repositories.container_repository import ContainerRepository
from app.schemas.container import ContainerCreate, ContainerUpdate, ContainerResponse, ContainerListResponse
from app.models.container import Container
import math

class ContainerService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.repository = ContainerRepository(db)

    async def get_containers_with_filters(
        self,
        skip: int = 0,
        limit: int = 10,
        search: Optional[str] = None,
        type_filter: Optional[str] = None,
        tenant_filter: Optional[str] = None,
        purpose_filter: Optional[str] = None,
        status_filter: Optional[str] = None,
        has_alerts: Optional[bool] = None
    ) -> ContainerListResponse:
        containers, total = await self.repository.get_all(
            skip=skip,
            limit=limit,
            search=search,
            type_filter=type_filter,
            tenant_filter=tenant_filter,
            purpose_filter=purpose_filter,
            status_filter=status_filter,
            has_alerts=has_alerts
        )
        
        container_responses = []
        for container in containers:
            container_response = await self._convert_to_response(container)
            container_responses.append(container_response)
        
        pages = math.ceil(total / limit) if limit > 0 else 1
        page = (skip // limit) + 1 if limit > 0 else 1
        
        return ContainerListResponse(
            containers=container_responses,
            total=total,
            page=page,
            size=limit,
            pages=pages
        )

    async def get_container_by_id(self, container_id: str) -> Optional[ContainerResponse]:
        container = await self.repository.get_by_id(container_id)
        if not container:
            return None
        return await self._convert_to_response(container)

    async def create_container(self, container_data: ContainerCreate) -> ContainerResponse:
        existing = await self.repository.get_by_name(container_data.name)
        if existing:
            raise ValueError(f"Container with name '{container_data.name}' already exists")
        
        container = await self.repository.create(container_data)
        return await self._convert_to_response(container)

    async def update_container(self, container_id: str, container_data: ContainerUpdate) -> Optional[ContainerResponse]:
        container = await self.repository.update(container_id, container_data)
        if not container:
            return None
        return await self._convert_to_response(container)

    async def delete_container(self, container_id: str) -> bool:
        return await self.repository.delete(container_id)

    async def get_performance_metrics(self, type_filter: Optional[str] = None) -> Dict[str, Any]:
        containers, _ = await self.repository.get_all(type_filter=type_filter)
        
        physical_containers = [c for c in containers if c.type == "physical"]
        virtual_containers = [c for c in containers if c.type == "virtual"]
        
        return {
            "physical": {
                "count": len(physical_containers),
                "avg_yield": 63.0,
                "total_yield": 81.0,
                "avg_utilization": 80.0,
                "yield_data": [45, 52, 63, 58, 71, 69, 75],
                "utilization_data": [75, 82, 80, 85, 78, 83, 80]
            },
            "virtual": {
                "count": len(virtual_containers),
                "avg_yield": 45.0,
                "total_yield": 67.0,
                "avg_utilization": 65.0,
                "yield_data": [32, 38, 45, 41, 52, 48, 55],
                "utilization_data": [60, 68, 65, 70, 62, 67, 65]
            }
        }

    async def _convert_to_response(self, container: Container) -> ContainerResponse:
        location_data = None
        if container.location:
            location_data = {
                "city": container.location.city,
                "country": container.location.country,
                "address": container.location.address
            }

        return ContainerResponse(
            id=container.id,
            name=container.name,
            type=container.type,
            tenant=container.tenant,
            purpose=container.purpose,
            seed_types=container.seed_types or [],
            location=location_data,
            notes=container.notes,
            settings={
                "shadow_service_enabled": container.shadow_service_enabled,
                "copied_environment_from": None,
                "robotics_simulation_enabled": None,
                "ecosystem": None
            },
            environment={
                "air_temperature": None,
                "humidity": None,
                "co2": None,
                "nursery_station": None,
                "cultivation_area": None
            },
            inventory={
                "tray_ids": [],
                "panel_ids": []
            },
            metrics={
                "yield_kg": None,
                "space_utilization_percentage": None
            },
            status=container.status,
            created=container.created,
            modified=container.modified,
            has_alert=container.has_alert
        )
