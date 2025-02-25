from fastapi import APIRouter

router = APIRouter()

@router.get("/canales")
def get_canales():
    return {"message": "Lista de canales"}

