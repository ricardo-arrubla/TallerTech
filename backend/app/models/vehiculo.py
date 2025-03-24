from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import metadata
from sqlalchemy.ext.declarative import declarative_base
from .cliente import Cliente  # 👈 necesario para relación

Base = declarative_base(metadata=metadata)

class Vehiculo(Base):
    __tablename__ = "vehiculos"

    placa = Column(String, primary_key=True, index=True)
    id_cliente = Column(String, ForeignKey("clientes.id"))
    marca = Column(String)
    modelo = Column(String)
    anio = Column(String)

    cliente = relationship("Cliente", back_populates="vehiculos")
