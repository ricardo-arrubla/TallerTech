from sqlalchemy import Column, String, Date, ForeignKey
from app.models.database import Base

class Diagnostico(Base):
    __tablename__ = "diagnosticos"

    id_diagnostico = Column(String, primary_key=True, index=True)
    placa = Column(String, ForeignKey("vehiculos.placa"), nullable=False)
    fecha = Column(Date, nullable=False)
