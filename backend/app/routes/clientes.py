from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.database import get_db
from app.models.cliente_model import Cliente
from app.schemas.cliente_schema import ClienteBase, ClienteOut

router = APIRouter()

@router.post("/clientes", response_model=ClienteOut)
def crear_cliente(cliente: ClienteBase, db: Session = Depends(get_db)):
    db_cliente = db.query(Cliente).filter(Cliente.id == cliente.id).first()
    if db_cliente:
        raise HTTPException(status_code=400, detail="Cliente ya existe")
    nuevo = Cliente(**cliente.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

@router.get("/clientes", response_model=list[ClienteOut])
def listar_clientes(db: Session = Depends(get_db)):
    return db.query(Cliente).all()
