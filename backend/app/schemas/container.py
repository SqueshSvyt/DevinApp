from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum

class ContainerType(str, Enum):
    physical = "physical"
    virtual = "virtual"

class ContainerPurpose(str, Enum):
    development = "development"
    research = "research"
    production = "production"

class ContainerStatus(str, Enum):
    created = "created"
    active = "active"
    maintenance = "maintenance"
    inactive = "inactive"

class LocationBase(BaseModel):
    city: str
    country: str
    address: Optional[str] = None

class SeedType(BaseModel):
    id: str
    name: str
    variety: Optional[str] = None
    supplier: Optional[str] = None
    batch_id: Optional[str] = None

class ContainerSettings(BaseModel):
    shadow_service_enabled: bool = False
    copied_environment_from: Optional[str] = None
    robotics_simulation_enabled: Optional[bool] = None
    ecosystem: Optional[Dict[str, Any]] = None

class ContainerEnvironment(BaseModel):
    air_temperature: Optional[float] = None
    humidity: Optional[float] = None
    co2: Optional[float] = None
    nursery_station: Optional[Dict[str, Any]] = None
    cultivation_area: Optional[Dict[str, Any]] = None

class ContainerInventory(BaseModel):
    tray_ids: List[str] = []
    panel_ids: List[str] = []

class ContainerMetrics(BaseModel):
    yield_kg: Optional[float] = None
    space_utilization_percentage: Optional[float] = None

class ContainerCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    type: ContainerType
    tenant: str = Field(..., min_length=1)
    purpose: ContainerPurpose
    seed_types: List[SeedType] = []
    location: Optional[LocationBase] = None
    notes: Optional[str] = None
    settings: ContainerSettings = ContainerSettings()
    environment: ContainerEnvironment = ContainerEnvironment()

class ContainerUpdate(BaseModel):
    tenant: Optional[str] = None
    purpose: Optional[ContainerPurpose] = None
    seed_types: Optional[List[SeedType]] = None
    location: Optional[LocationBase] = None
    notes: Optional[str] = None
    settings: Optional[ContainerSettings] = None
    environment: Optional[ContainerEnvironment] = None
    status: Optional[ContainerStatus] = None

class ContainerResponse(BaseModel):
    id: str
    name: str
    type: ContainerType
    tenant: str
    purpose: ContainerPurpose
    seed_types: List[SeedType]
    location: Optional[LocationBase] = None
    notes: Optional[str] = None
    settings: ContainerSettings
    environment: ContainerEnvironment
    inventory: ContainerInventory
    metrics: ContainerMetrics
    status: ContainerStatus
    created: datetime
    modified: datetime
    has_alert: bool

    class Config:
        from_attributes = True

class ContainerListResponse(BaseModel):
    containers: List[ContainerResponse]
    total: int
    page: int
    size: int
    pages: int
