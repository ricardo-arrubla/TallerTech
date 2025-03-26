from app.models.database import Base, engine
from app.models.cliente import Cliente
from app.models.vehiculo import Vehiculo


Base.metadata.create_all(bind=engine)

