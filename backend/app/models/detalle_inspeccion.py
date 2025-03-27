from sqlalchemy import Column, String, ForeignKey
from app.models.database import Base

class DetalleInspeccion(Base):
    __tablename__ = "detalle_inspeccion"

    id_detalle = Column(String, primary_key=True, index=True)
    id_inspeccion = Column(String, ForeignKey("inspecciones.id_inspeccion"), nullable=False)
    parte = Column(String, nullable=False)
    estado = Column(String, nullable=False)
