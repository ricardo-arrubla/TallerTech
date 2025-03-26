from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.models.database import SessionLocal
from app.models.vehiculo import Vehiculo
from app.schemas.vehiculo_schema import VehiculoBase, VehiculoOut

router = APIRouter()

# 👉 Dependency para obtener la sesión de la DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 🔹 Obtener todos los vehículos
@router.get("/vehiculos", response_model=list[VehiculoOut])
def listar_vehiculos(db: Session = Depends(get_db)):
    return db.query(Vehiculo).all()

# 🔹 Obtener un vehículo por placa
@router.get("/vehiculos/{placa}", response_model=VehiculoOut)
def obtener_vehiculo(placa: str, db: Session = Depends(get_db)):
    vehiculo = db.query(Vehiculo).filter(Vehiculo.placa == placa).first()
    if not vehiculo:
        raise HTTPException(status_code=404, detail="Vehículo no encontrado")
    return vehiculo

# 🔹 Crear un vehículo
@router.post("/vehiculos", response_model=VehiculoOut)
def crear_vehiculo(vehiculo: VehiculoBase, db: Session = Depends(get_db)):
    existe = db.query(Vehiculo).filter(Vehiculo.placa == vehiculo.placa).first()
    if existe:
        raise HTTPException(status_code=400, detail="Vehículo ya existe")
    nuevo = Vehiculo(**vehiculo.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

# 🔹 Actualizar un vehículo
@router.put("/vehiculos/{placa}", response_model=VehiculoOut)
def actualizar_vehiculo(placa: str, datos: VehiculoBase, db: Session = Depends(get_db)):
    vehiculo = db.query(Vehiculo).filter(Vehiculo.placa == placa).first()
    if not vehiculo:
        raise HTTPException(status_code=404, detail="Vehículo no encontrado")
    for attr, value in datos.dict().items():
        setattr(vehiculo, attr, value)
    db.commit()
    return vehiculo

# 🔹 Eliminar un vehículo
@router.delete("/vehiculos/{placa}")
def eliminar_vehiculo(placa: str, db: Session = Depends(get_db)):
    vehiculo = db.query(Vehiculo).filter(Vehiculo.placa == placa).first()
    if not vehiculo:
        raise HTTPException(status_code=404, detail="Vehículo no encontrado")
    db.delete(vehiculo)
    db.commit()
    return {"message": "Vehículo eliminado"}
