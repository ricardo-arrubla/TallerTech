from pydantic import BaseModel
from datetime import date

class InspeccionBase(BaseModel):
    id_inspeccion: str
    placa: str
    fecha: date

class InspeccionOut(InspeccionBase):
    class Config:
        orm_mode = True
