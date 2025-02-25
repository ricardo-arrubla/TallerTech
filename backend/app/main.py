##Main de Backend

from fastapi import FastAPI
from app.routes import clientes, consumos, canales

app = FastAPI()

app.include_router(clientes.router)
app.include_router(consumos.router)
app.include_router(canales.router)

@app.get("/")
def read_root():
    return {"message": "Backend funcionando correctamente 🚀"}

