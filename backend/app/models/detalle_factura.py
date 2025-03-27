from sqlalchemy import Column, String, Numeric, ForeignKey
from app.models.database import Base

class DetalleFactura(Base):
    __tablename__ = "detalle_factura"

    id_detalle = Column(String, primary_key=True, index=True)
    id_factura = Column(String, ForeignKey("facturas.id_factura"), nullable=False)
    id_servicio = Column(String, ForeignKey("servicios.id_servicio"), nullable=False)
    precio = Column(Numeric(10, 2), nullable=False)
