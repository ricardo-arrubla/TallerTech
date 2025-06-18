from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles  # NUEVO
from fastapi.responses import FileResponse  # NUEVO
from pathlib import Path  # NUEVO
from app.routes import (
    clientes, consumos, canales,
    servicios, facturas, detalle_factura,
    diagnosticos, detalle_diagnostico,
    inspecciones, detalle_inspeccion,
    vehiculos, citas,
    auth  # Importamos el router de auth.py donde se definen las rutas /usuarios y /login
)

from app.models.database import engine, Base
from app.models import (
    cliente, vehiculo, servicio, cita, factura,
    diagnostico, inspeccion  
)




app = FastAPI(title="API de Gestión de Taller", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://tallertech.vercel.app",  # Producción
        "http://localhost:5173",          # Desarrollo
        "*"                               # Temporal para pruebas
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


# ============= RUTAS API (con prefijo /api) =============
# IMPORTANTE: Agregar prefijo /api a todas las rutas para evitar conflictos
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

# Ruta API de health check
@app.get("/api/health")
def health_check():
    return {"message": "🚗 Backend de Taller funcionando correctamente"}

# ============= CONFIGURACIÓN ARCHIVOS ESTÁTICOS =============
# Obtener la ruta del directorio static (donde estará el frontend construido)
static_dir = Path(__file__).parent.parent / "static"

# Solo configurar archivos estáticos si el directorio existe
if static_dir.exists():
    print(f"✅ Sirviendo archivos estáticos desde: {static_dir}")
    
    # Montar los assets (JS, CSS, imágenes, etc.)
    app.mount("/assets", StaticFiles(directory=str(static_dir / "assets")), name="assets")
    
    # Ruta específica para la raíz - servir index.html
    @app.get("/")
    async def serve_root():
        index_path = static_dir / "index.html"
        if index_path.exists():
            return FileResponse(str(index_path))
        else:
            return {"message": "🚗 API de Gestión de Taller", "docs": "/docs"}
    
    # Catch-all para todas las rutas que no sean API - para React Router
    @app.get("/{path:path}")
    async def serve_frontend(path: str):
        # Si es una ruta de API o documentación, no interferir
        if (path.startswith("api/") or 
            path.startswith("docs") or 
            path.startswith("redoc") or
            path.startswith("openapi.json")):
            # FastAPI manejará estas rutas automáticamente
            return
        
        # Para todas las demás rutas, servir index.html (React Router se encarga del routing)
        index_path = static_dir / "index.html"
        if index_path.exists():
            return FileResponse(str(index_path))
        else:
            return {"message": "Frontend no disponible"}
else:
    print("⚠️  Directorio static no encontrado - solo API disponible")
    
    # Ruta de fallback cuando no hay frontend
    @app.get("/")
    def read_root():
        return {
            "message": "🚗 Backend de Taller funcionando correctamente",
            "docs": "/docs",
            "api_health": "/api/health"
        }

# Crear todas las tablas (solo para desarrollo, no en producción)
Base.metadata.create_all(bind=engine)

# ============= CONFIGURACIÓN DEL SERVIDOR =============
import os
import uvicorn

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    print(f"🚀 Iniciando servidor en puerto {port}")
    uvicorn.run("app.main:app", host="0.0.0.0", port=port)