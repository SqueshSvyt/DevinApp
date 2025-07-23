from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.core.db import Base

class InventoryMetric(Base):
    __tablename__ = "inventory_metrics"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    container_id = Column(String, ForeignKey("containers.id"), nullable=False)
    date = Column(Date, nullable=False)
    nursery_station_utilization = Column(Integer, nullable=True)
    cultivation_area_utilization = Column(Integer, nullable=True)
    air_temperature = Column(Float, nullable=True)
    humidity = Column(Integer, nullable=True)
    co2_level = Column(Integer, nullable=True)
    yield_kg = Column(Float, nullable=True)
    
    container = relationship("Container", back_populates="inventory_metrics")
