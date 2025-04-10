from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.database import SessionLocal
from app.models.usuario import Usuario
from app.schemas.usuario_schema import UsuarioBase, UsuarioOut
from app.utils.seguridad import encriptar, verificar, crear_token

router = APIRouter()

# Dependency para obtener la sesión de la DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 🔹 Crear usuario
@router.post("/usuarios", response_model=UsuarioOut)
def crear_usuario(usuario: UsuarioBase, db: Session = Depends(get_db)):
    """
    Crea un nuevo usuario en la base de datos.
    - Verifica si el usuario ya existe.
    - Encripta la contraseña antes de guardarla.
    """
    # Verificar si el usuario ya existe
    if db.query(Usuario).filter(Usuario.id_usuario == usuario.id_usuario).first():
        raise HTTPException(status_code=400, detail="El usuario ya existe")
    
    # Encriptar la contraseña
    hashed_password = encriptar(usuario.contraseña)
    
    # Crear el nuevo usuario
    nuevo_usuario = Usuario(id_usuario=usuario.id_usuario, contraseña=hashed_password)
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario

# 🔹 Login de usuario
@router.post("/login")
def login(usuario: UsuarioBase, db: Session = Depends(get_db)):
    """
    Autentica a un usuario y genera un token JWT si las credenciales son válidas.
    """
    # Buscar al usuario en la base de datos
    db_usuario = db.query(Usuario).filter(Usuario.id_usuario == usuario.id_usuario).first()
    if not db_usuario or not verificar(usuario.contraseña, db_usuario.contraseña):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    
    # Generar token JWT
    token = crear_token({"sub": usuario.id_usuario})
    return {"access_token": token, "token_type": "bearer"}