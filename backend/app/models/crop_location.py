from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.core.db import Base

class CropLocation(Base):
    __tablename__ = "crop_locations"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    type = Column(String, nullable=False)
    tray_id = Column(String, ForeignKey("trays.id"), nullable=True)
    panel_id = Column(String, ForeignKey("panels.id"), nullable=True)
    row = Column(Integer, nullable=True)
    column = Column(Integer, nullable=True)
    channel = Column(Integer, nullable=True)
    position = Column(Integer, nullable=True)
    
    crops = relationship("Crop", back_populates="location")
