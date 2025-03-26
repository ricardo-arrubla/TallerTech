##Main de Backend

from fastapi import FastAPI
from app.routes import clientes, consumos, canales
from app.routes import servicios

app = FastAPI()

app.include_router(clientes.router)
app.include_router(consumos.router)
app.include_router(canales.router)
app.include_router(servicios.router)


@app.get("/")
def read_root():
    return {"message": "Backend funcionando correctamente 🚀"}

from app.models.cliente import Cliente
from app.models.vehiculo import Vehiculo
from app.models.database import engine
from sqlalchemy.orm import declarative_base

Base = Cliente.__bases__[0]  # Obtener Base declarada
Base.metadata.create_all(bind=engine)
