from sqlalchemy import Column, String, Numeric, ForeignKey
from app.models.database import Base

class DetalleDiagnostico(Base):
    __tablename__ = "detalle_diagnostico"

    id_detalle = Column(String, primary_key=True, index=True)
    id_diagnostico = Column(String, ForeignKey("diagnosticos.id_diagnostico"), nullable=False)
    componente = Column(String, nullable=False)
    valor = Column(Numeric(10, 2), nullable=False)
