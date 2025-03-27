from pydantic import BaseModel

class DetalleFacturaBase(BaseModel):
    id_detalle: str
    id_factura: str
    id_servicio: str
    precio: float

class DetalleFacturaOut(DetalleFacturaBase):
    class Config:
        orm_mode = True
