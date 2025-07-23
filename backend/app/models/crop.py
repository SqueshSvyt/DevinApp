from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.db import Base
import uuid
from datetime import datetime

class Crop(Base):
    __tablename__ = "crops"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    container_id = Column(String, ForeignKey("containers.id"), nullable=False)
    seed_type = Column(String, nullable=False)
    seed_date = Column(DateTime, nullable=True)
    transplanting_date_planned = Column(DateTime, nullable=True)
    harvesting_date_planned = Column(DateTime, nullable=True)
    transplanted_date = Column(DateTime, nullable=True)
    harvesting_date = Column(DateTime, nullable=True)
    age = Column(Integer, nullable=True)
    status = Column(String, nullable=False, default="germinating")
    overdue_days = Column(Integer, nullable=True)
    location_id = Column(Integer, ForeignKey("crop_locations.id"), nullable=True)
    
    container = relationship("Container", back_populates="crops")
    metrics = relationship("CropMetric", back_populates="crop")
    location = relationship("CropLocation", back_populates="crops")
