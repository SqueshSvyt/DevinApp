from sqlalchemy import Column, Integer, String, DateTime, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.core.db import Base

class CropMetric(Base):
    __tablename__ = "crop_metrics"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    crop_id = Column(String, ForeignKey("crops.id"), nullable=False)
    recorded_at = Column(DateTime, nullable=False)
    height_cm = Column(Float, nullable=True)
    leaf_count = Column(Integer, nullable=True)
    stem_diameter_mm = Column(Float, nullable=True)
    leaf_area_cm2 = Column(Float, nullable=True)
    biomass_g = Column(Float, nullable=True)
    health_score = Column(Float, nullable=True)
    disease_detected = Column(Boolean, default=False)
    pest_detected = Column(Boolean, default=False)
    stress_level = Column(Float, nullable=True)
    temperature_c = Column(Float, nullable=True)
    humidity_percent = Column(Float, nullable=True)
    light_intensity_umol = Column(Float, nullable=True)
    ph_level = Column(Float, nullable=True)
    ec_level = Column(Float, nullable=True)
    nitrogen_ppm = Column(Float, nullable=True)
    phosphorus_ppm = Column(Float, nullable=True)
    potassium_ppm = Column(Float, nullable=True)
    calcium_ppm = Column(Float, nullable=True)
    magnesium_ppm = Column(Float, nullable=True)
    
    crop = relationship("Crop", back_populates="metrics")
