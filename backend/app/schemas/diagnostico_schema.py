from pydantic import BaseModel
from datetime import date

class DiagnosticoBase(BaseModel):
    id_diagnostico: str
    placa: str
    fecha: date

class DiagnosticoOut(DiagnosticoBase):
    class Config:
        orm_mode = True
