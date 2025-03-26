from pydantic import BaseModel

class ServicioBase(BaseModel):
    id_servicio: str
    nombre: str
    precio: float

class ServicioOut(ServicioBase):
    class Config:
        orm_mode = True
