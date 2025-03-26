from pydantic import BaseModel

class VehiculoBase(BaseModel):
    placa: str
    marca: str
    modelo: str
    cliente_id: str

class VehiculoOut(VehiculoBase):
    class Config:
        orm_mode = True
