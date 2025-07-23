from pydantic import BaseModel

class TenantResponse(BaseModel):
    id: str
    name: str

    class Config:
        from_attributes = True
