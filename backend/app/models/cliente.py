from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from .database import metadata
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base(metadata=metadata)

class Cliente(Base):
    __tablename__ = "clientes"

    id = Column(String, primary_key=True, index=True)
    nombre = Column(String)
    telefono = Column(String)
    email = Column(String)

    vehiculos = relationship("Vehiculo", back_populates="cliente")
 
