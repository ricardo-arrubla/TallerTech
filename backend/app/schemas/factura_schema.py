from pydantic import BaseModel
from datetime import date

class FacturaBase(BaseModel):
    id_factura: str
    id_cliente: str
    placa: str
    fecha: date
    subtotal: float
    impuestos: float
    total: float

class FacturaOut(FacturaBase):
    class Config:
        orm_mode = True
