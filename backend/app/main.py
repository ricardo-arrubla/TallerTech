# main.py

from fastapi import FastAPI
<<<<<<< Updated upstream
=======
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
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

=======
# CORS: Permite las solicitudes desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, usar la URL específica de Railway
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Montar archivos estáticos del frontend (solo si existe la carpeta static)
if os.path.exists("static"):
    app.mount("/static", StaticFiles(directory="static"), name="static")

# Rutas de API - TODAS con prefijo /api
app.include_router(clientes.router, prefix="/api")
app.include_router(consumos.router, prefix="/api")
app.include_router(canales.router, prefix="/api")
app.include_router(vehiculos.router, prefix="/api")
app.include_router(citas.router, prefix="/api")
app.include_router(servicios.router, prefix="/api")
app.include_router(facturas.router, prefix="/api")
app.include_router(detalle_factura.router, prefix="/api")
app.include_router(diagnosticos.router, prefix="/api")
app.include_router(detalle_diagnostico.router, prefix="/api")
app.include_router(inspecciones.router, prefix="/api")
app.include_router(detalle_inspeccion.router, prefix="/api")
app.include_router(auth.router, prefix="/api")
>>>>>>> Stashed changes

# Ruta de salud del backend
@app.get("/api/health")
def health_check():
    return {"message": "🚗 Backend de Taller funcionando correctamente"}

<<<<<<< Updated upstream

# Crear todas las tablas (solo para desarrollo, no en producción)
Base.metadata.create_all(bind=engine)
=======
# Servir el frontend para todas las rutas que no sean de API
@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    # Si es una ruta de API, no interceptar (esto no debería pasar)
    if full_path.startswith("api/"):
        return {"error": "API route not found"}
    
    # Verificar si el archivo existe en static
    if full_path and os.path.exists(f"static/{full_path}") and os.path.isfile(f"static/{full_path}"):
        return FileResponse(f"static/{full_path}")
    
    # Para aplicaciones SPA (React Router), servir index.html para todas las rutas
    index_path = "static/index.html"
    if os.path.exists(index_path):
        return FileResponse(index_path)
    
    return {"message": "🚗 Backend de Taller funcionando correctamente - Frontend no encontrado"}

# Ruta raíz para servir el frontend
@app.get("/")
async def root():
    index_path = "static/index.html"
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"message": "🚗 Backend de Taller funcionando correctamente - Frontend no encontrado"}

# Crear todas las tablas (solo para desarrollo, no en producción)
Base.metadata.create_all(bind=engine)

# Para Railway
import uvicorn

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port)
>>>>>>> Stashed changes
