from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.models.database import SessionLocal
from app.models.detalle_inspeccion import DetalleInspeccion
from app.schemas.detalle_inspeccion_schema import DetalleInspeccionBase, DetalleInspeccionOut

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/detalle-inspeccion", response_model=list[DetalleInspeccionOut])
def listar_detalles(db: Session = Depends(get_db)):
    return db.query(DetalleInspeccion).all()

@router.get("/detalle-inspeccion/{id_detalle}", response_model=DetalleInspeccionOut)
def obtener_detalle(id_detalle: str, db: Session = Depends(get_db)):
    detalle = db.query(DetalleInspeccion).filter(DetalleInspeccion.id_detalle == id_detalle).first()
    if not detalle:
        raise HTTPException(status_code=404, detail="Detalle no encontrado")
    return detalle

@router.post("/detalle-inspeccion", response_model=DetalleInspeccionOut)
def crear_detalle(detalle: DetalleInspeccionBase, db: Session = Depends(get_db)):
    existe = db.query(DetalleInspeccion).filter(DetalleInspeccion.id_detalle == detalle.id_detalle).first()
    if existe:
        raise HTTPException(status_code=400, detail="El detalle ya existe")
    nuevo = DetalleInspeccion(**detalle.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

@router.put("/detalle-inspeccion/{id_detalle}", response_model=DetalleInspeccionOut)
def actualizar_detalle(id_detalle: str, datos: DetalleInspeccionBase, db: Session = Depends(get_db)):
    detalle = db.query(DetalleInspeccion).filter(DetalleInspeccion.id_detalle == id_detalle).first()
    if not detalle:
        raise HTTPException(status_code=404, detail="Detalle no encontrado")
    for attr, value in datos.dict().items():
        setattr(detalle, attr, value)
    db.commit()
    return detalle

@router.delete("/detalle-inspeccion/{id_detalle}")
def eliminar_detalle(id_detalle: str, db: Session = Depends(get_db)):
    detalle = db.query(DetalleInspeccion).filter(DetalleInspeccion.id_detalle == id_detalle).first()
    if not detalle:
        raise HTTPException(status_code=404, detail="Detalle no encontrado")
    db.delete(detalle)
    db.commit()
    return {"message": "Detalle eliminado"}
