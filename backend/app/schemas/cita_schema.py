from pydantic import BaseModel
from datetime import date, time

class CitaBase(BaseModel):
    id_cita: str
    id_cliente: str
    placa: str
    fecha: date
    hora: time
    id_servicio: str

class CitaOut(CitaBase):
    class Config:
        orm_mode = True
