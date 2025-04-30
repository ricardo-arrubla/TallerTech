from pydantic import BaseModel
from datetime import date

class ClienteBase(BaseModel):
    id: str
    nombre: str
    tecnomecanica: date
    email: str | None = None
    telefono: str | None = None
    direccion: str | None = None

class ClienteOut(ClienteBase):
    class Config:
        from_attributes = True  # Pydantic v2
