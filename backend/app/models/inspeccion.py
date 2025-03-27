from sqlalchemy import Column, String, Date, ForeignKey
from app.models.database import Base

class Inspeccion(Base):
    __tablename__ = "inspecciones"

    id_inspeccion = Column(String, primary_key=True, index=True)
    placa = Column(String, ForeignKey("vehiculos.placa"), nullable=False)
    fecha = Column(Date, nullable=False)
