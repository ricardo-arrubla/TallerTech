from fastapi import APIRouter

router = APIRouter()

@router.get("/consumos")
def get_consumos():
    return {"message": "Lista de consumos"}
 
