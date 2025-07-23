from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.core.db import Base

class TrayLocation(Base):
    __tablename__ = "tray_locations"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    shelf = Column(String, nullable=False)
    slot_number = Column(Integer, nullable=False)
    tray_id = Column(String, ForeignKey("trays.id"), nullable=False)
    
    tray = relationship("Tray", back_populates="location")
