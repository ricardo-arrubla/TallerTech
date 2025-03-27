##Main de Backend

from fastapi import FastAPI
from app.routes import clientes, consumos, canales
from app.routes import servicios
from app.routes import facturas
from app.routes import detalle_factura
from app.routes import diagnosticos
from app.routes import detalle_diagnostico
from app.routes import inspecciones
from app.routes import detalle_inspeccion


app = FastAPI()

app.include_router(clientes.router)
app.include_router(consumos.router)
app.include_router(canales.router)
app.include_router(servicios.router)
app.include_router(facturas.router)
app.include_router(detalle_factura.router)
app.include_router(diagnosticos.router)
app.include_router(detalle_diagnostico.router)
app.include_router(inspecciones.router)
app.include_router(detalle_inspeccion.router)




@app.get("/")
def read_root():
    return {"message": "Backend funcionando correctamente 🚀"}

from app.models.cliente import Cliente
from app.models.vehiculo import Vehiculo
from app.models.database import engine
from sqlalchemy.orm import declarative_base

Base = Cliente.__bases__[0]  # Obtener Base declarada
Base.metadata.create_all(bind=engine)
