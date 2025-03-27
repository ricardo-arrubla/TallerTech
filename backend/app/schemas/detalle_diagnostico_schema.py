from pydantic import BaseModel

class DetalleDiagnosticoBase(BaseModel):
    id_detalle: str
    id_diagnostico: str
    componente: str
    valor: float

class DetalleDiagnosticoOut(DetalleDiagnosticoBase):
    class Config:
        orm_mode = True
