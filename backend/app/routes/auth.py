from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.database import SessionLocal
from app.models.usuario import Usuario
from app.schemas.usuario_schema import UsuarioBase, UsuarioOut
from app.utils.seguridad import encriptar, verificar, crear_token

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/usuarios", response_model=UsuarioOut)
def crear_usuario(usuario: UsuarioBase, db: Session = Depends(get_db)):
    if db.query(Usuario).filter(Usuario.id_usuario == usuario.id_usuario).first():
        raise HTTPException(status_code=400, detail="Usuario ya existe")
    hashed = encriptar(usuario.contraseña)
    nuevo = Usuario(id_usuario=usuario.id_usuario, contraseña=hashed)
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

@router.post("/login")
def login(usuario: UsuarioBase, db: Session = Depends(get_db)):
    db_usuario = db.query(Usuario).filter(Usuario.id_usuario == usuario.id_usuario).first()
    if not db_usuario or not verificar(usuario.contraseña, db_usuario.contraseña):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    token = crear_token({"sub": usuario.id_usuario})
    return {"access_token": token, "token_type": "bearer"}
