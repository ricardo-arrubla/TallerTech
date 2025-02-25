from fastapi import APIRouter

router = APIRouter()

@router.get("/clientes")
async def obtener_clientes():
    return {"message": "Lista de clientes"}
