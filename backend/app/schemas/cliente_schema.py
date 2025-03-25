from pydantic import BaseModel
from datetime import date

class ClienteBase(BaseModel):
    id: str
    nombre: str
    tecnomecanica: date

class ClienteOut(ClienteBase):
    class Config:
        orm_mode = True
