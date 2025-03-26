from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.models.database import SessionLocal
from app.models.servicio import Servicio
from app.schemas.servicio_schema import ServicioBase, ServicioOut

router = APIRouter()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 🔹 Listar todos los servicios
@router.get("/servicios", response_model=list[ServicioOut])
def listar_servicios(db: Session = Depends(get_db)):
    return db.query(Servicio).all()

# 🔹 Obtener un servicio por ID
@router.get("/servicios/{id_servicio}", response_model=ServicioOut)
def obtener_servicio(id_servicio: str, db: Session = Depends(get_db)):
    servicio = db.query(Servicio).filter(Servicio.id_servicio == id_servicio).first()
    if not servicio:
        raise HTTPException(status_code=404, detail="Servicio no encontrado")
    return servicio

# 🔹 Crear un nuevo servicio
@router.post("/servicios", response_model=ServicioOut)
def crear_servicio(servicio: ServicioBase, db: Session = Depends(get_db)):
    existe = db.query(Servicio).filter(Servicio.id_servicio == servicio.id_servicio).first()
    if existe:
        raise HTTPException(status_code=400, detail="El servicio ya existe")
    nuevo = Servicio(**servicio.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

# 🔹 Actualizar un servicio
@router.put("/servicios/{id_servicio}", response_model=ServicioOut)
def actualizar_servicio(id_servicio: str, datos: ServicioBase, db: Session = Depends(get_db)):
    servicio = db.query(Servicio).filter(Servicio.id_servicio == id_servicio).first()
    if not servicio:
        raise HTTPException(status_code=404, detail="Servicio no encontrado")
    for attr, value in datos.dict().items():
        setattr(servicio, attr, value)
    db.commit()
    return servicio

# 🔹 Eliminar un servicio
@router.delete("/servicios/{id_servicio}")
def eliminar_servicio(id_servicio: str, db: Session = Depends(get_db)):
    servicio = db.query(Servicio).filter(Servicio.id_servicio == id_servicio).first()
    if not servicio:
        raise HTTPException(status_code=404, detail="Servicio no encontrado")
    db.delete(servicio)
    db.commit()
    return {"message": "Servicio eliminado"}
