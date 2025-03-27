from pydantic import BaseModel

class DetalleInspeccionBase(BaseModel):
    id_detalle: str
    id_inspeccion: str
    parte: str
    estado: str

class DetalleInspeccionOut(DetalleInspeccionBase):
    class Config:
        orm_mode = True
