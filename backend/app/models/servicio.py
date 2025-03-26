from sqlalchemy import Column, String, Numeric
from app.models.database import Base

class Servicio(Base):
    __tablename__ = "servicios"

    id_servicio = Column(String, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    precio = Column(Numeric(10, 2), nullable=False)
