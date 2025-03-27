from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.models.database import SessionLocal
from app.models.cliente import Cliente
from app.schemas.cliente_schema import ClienteBase, ClienteOut
from app.utils.auth_dependency import obtener_usuario_actual

router = APIRouter()

# 👉 Dependency para obtener la sesión de la DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 🔐 Todas las rutas están protegidas por JWT usando Depends(obtener_usuario_actual)

# 🔹 Obtener todos los clientes
@router.get("/clientes", response_model=list[ClienteOut], dependencies=[Depends(obtener_usuario_actual)])
def listar_clientes(db: Session = Depends(get_db)):
    return db.query(Cliente).all()

# 🔹 Obtener un cliente por ID
@router.get("/clientes/{id}", response_model=ClienteOut, dependencies=[Depends(obtener_usuario_actual)])
def obtener_cliente(id: str, db: Session = Depends(get_db)):
    cliente = db.query(Cliente).filter(Cliente.id == id).first()
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return cliente

# 🔹 Crear cliente
@router.post("/clientes", response_model=ClienteOut, dependencies=[Depends(obtener_usuario_actual)])
def crear_cliente(cliente: ClienteBase, db: Session = Depends(get_db)):
    existe = db.query(Cliente).filter(Cliente.id == cliente.id).first()
    if existe:
        raise HTTPException(status_code=400, detail="Cliente ya existe")
    nuevo = Cliente(**cliente.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

# 🔹 Actualizar cliente
@router.put("/clientes/{id}", response_model=ClienteOut, dependencies=[Depends(obtener_usuario_actual)])
def actualizar_cliente(id: str, datos: ClienteBase, db: Session = Depends(get_db)):
    cliente = db.query(Cliente).filter(Cliente.id == id).first()
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    for attr, value in datos.dict().items():
        setattr(cliente, attr, value)
    db.commit()
    return cliente

# 🔹 Eliminar cliente
@router.delete("/clientes/{id}", dependencies=[Depends(obtener_usuario_actual)])
def eliminar_cliente(id: str, db: Session = Depends(get_db)):
    cliente = db.query(Cliente).filter(Cliente.id == id).first()
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    db.delete(cliente)
    db.commit()
    return {"message": "Cliente eliminado"}
