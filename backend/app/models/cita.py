from sqlalchemy import Column, String, Date, Time, ForeignKey
from app.models.database import Base

class Cita(Base):
    __tablename__ = "citas"

    id_cita = Column(String, primary_key=True, index=True)
    id_cliente = Column(String, ForeignKey("clientes.id"), nullable=False)
    placa = Column(String, ForeignKey("vehiculos.placa"), nullable=False)
    fecha = Column(Date, nullable=False)
    hora = Column(Time, nullable=False)
    id_servicio = Column(String, ForeignKey("servicios.id_servicio"), nullable=False)
