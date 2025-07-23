from pydantic import BaseModel
from typing import Optional

class LocationCreate(BaseModel):
    city: str
    country: str
    address: Optional[str] = None

class LocationResponse(BaseModel):
    id: str
    city: str
    country: str
    address: Optional[str] = None

    class Config:
        from_attributes = True
