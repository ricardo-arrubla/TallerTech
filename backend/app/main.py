# main.py

from fastapi import FastAPI
from app.routes import (
    clientes, consumos, canales,
    servicios, facturas, detalle_factura,
    diagnosticos, detalle_diagnostico,
    inspecciones, detalle_inspeccion,
    vehiculos, citas
)

from app.models.database import engine, Base  # Base ya está declarada correctamente
from app.models import (
    cliente, vehiculo, servicio, cita, factura,
    diagnostico, inspeccion  
)

app = FastAPI(title="API de Gestión de Taller", version="1.0")

# Rutas
app.include_router(clientes.router)
app.include_router(consumos.router)
app.include_router(canales.router)
app.include_router(vehiculos.router)
app.include_router(citas.router)
app.include_router(servicios.router)
app.include_router(facturas.router)
app.include_router(detalle_factura.router)
app.include_router(diagnosticos.router)
app.include_router(detalle_diagnostico.router)
app.include_router(inspecciones.router)
app.include_router(detalle_inspeccion.router)
app.include_router(citas.router)


@app.get("/")
def read_root():
    return {"message": "🚗 Backend de Taller funcionando correctamente"}


# Crear todas las tablas (solo para desarrollo, no en producción)
Base.metadata.create_all(bind=engine)
