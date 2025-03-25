from sqlalchemy import Column, String, Date
from app.models.database import Base

class Cliente(Base):
    __tablename__ = "clientes"

    id = Column(String, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    tecnomecanica = Column(Date, nullable=False)
