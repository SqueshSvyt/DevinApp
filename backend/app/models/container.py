from sqlalchemy import Column, String, Boolean, DateTime, JSON, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.core.db import Base
import uuid
from datetime import datetime

class Container(Base):
    __tablename__ = "containers"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    type = Column(String, nullable=False)
    name = Column(String, nullable=False, unique=True)
    tenant = Column(String, nullable=False)
    purpose = Column(String, nullable=False)
    location_id = Column(UUID(as_uuid=True), ForeignKey("locations.id"), nullable=True)
    status = Column(String, nullable=False, default="created")
    seed_types = Column(JSON, nullable=True)
    created = Column(DateTime, default=datetime.utcnow)
    modified = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    has_alert = Column(Boolean, default=False)
    notes = Column(String, nullable=True)
    shadow_service_enabled = Column(Boolean, default=False)
    ecosystem_connected = Column(Boolean, default=False)
    
    location = relationship("Location", back_populates="containers")
    crops = relationship("Crop", back_populates="container")
    panels = relationship("Panel", back_populates="container")
    trays = relationship("Tray", back_populates="container")
    inventory_metrics = relationship("InventoryMetric", back_populates="container")
