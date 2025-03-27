from sqlalchemy import Column, String
from app.models.database import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id_usuario = Column(String, primary_key=True, index=True)
    contraseña = Column(String, nullable=False)
