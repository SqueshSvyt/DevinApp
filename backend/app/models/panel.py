from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.db import Base
from datetime import datetime

class Panel(Base):
    __tablename__ = "panels"
    
    id = Column(String, primary_key=True)
    rfid_tag = Column(String, nullable=True)
    utilization_percentage = Column(Integer, nullable=True)
    crop_count = Column(Integer, nullable=True)
    is_empty = Column(Boolean, default=True)
    provisioned_at = Column(DateTime, default=datetime.utcnow)
    container_id = Column(String, ForeignKey("containers.id"), nullable=False)
    
    container = relationship("Container", back_populates="panels")
    location = relationship("PanelLocation", back_populates="panel")
