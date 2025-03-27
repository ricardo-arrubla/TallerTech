from sqlalchemy import Column, String, Date, Numeric, ForeignKey
from app.models.database import Base

class Factura(Base):
    __tablename__ = "facturas"

    id_factura = Column(String, primary_key=True, index=True)
    id_cliente = Column(String, ForeignKey("clientes.id"), nullable=False)
    placa = Column(String, ForeignKey("vehiculos.placa"), nullable=False)
    fecha = Column(Date, nullable=False)
    subtotal = Column(Numeric(10, 2), nullable=False)
    impuestos = Column(Numeric(10, 2), nullable=False)
    total = Column(Numeric(10, 2), nullable=False)
