from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.core.db import Base

class PanelLocation(Base):
    __tablename__ = "panel_locations"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    wall = Column(String, nullable=False)
    slot_number = Column(Integer, nullable=False)
    panel_id = Column(String, ForeignKey("panels.id"), nullable=False)
    
    panel = relationship("Panel", back_populates="location")
