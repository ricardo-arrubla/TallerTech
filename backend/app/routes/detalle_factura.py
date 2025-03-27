from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.models.database import SessionLocal
from app.models.detalle_factura import DetalleFactura
from app.schemas.detalle_factura_schema import DetalleFacturaBase, DetalleFacturaOut

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/detalle-factura", response_model=list[DetalleFacturaOut])
def listar_detalles(db: Session = Depends(get_db)):
    return db.query(DetalleFactura).all()

@router.get("/detalle-factura/{id_detalle}", response_model=DetalleFacturaOut)
def obtener_detalle(id_detalle: str, db: Session = Depends(get_db)):
    detalle = db.query(DetalleFactura).filter(DetalleFactura.id_detalle == id_detalle).first()
    if not detalle:
        raise HTTPException(status_code=404, detail="Detalle no encontrado")
    return detalle

@router.post("/detalle-factura", response_model=DetalleFacturaOut)
def crear_detalle(detalle: DetalleFacturaBase, db: Session = Depends(get_db)):
    existe = db.query(DetalleFactura).filter(DetalleFactura.id_detalle == detalle.id_detalle).first()
    if existe:
        raise HTTPException(status_code=400, detail="El detalle ya existe")
    nuevo = DetalleFactura(**detalle.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

@router.put("/detalle-factura/{id_detalle}", response_model=DetalleFacturaOut)
def actualizar_detalle(id_detalle: str, datos: DetalleFacturaBase, db: Session = Depends(get_db)):
    detalle = db.query(DetalleFactura).filter(DetalleFactura.id_detalle == id_detalle).first()
    if not detalle:
        raise HTTPException(status_code=404, detail="Detalle no encontrado")
    for attr, value in datos.dict().items():
        setattr(detalle, attr, value)
    db.commit()
    return detalle

@router.delete("/detalle-factura/{id_detalle}")
def eliminar_detalle(id_detalle: str, db: Session = Depends(get_db)):
    detalle = db.query(DetalleFactura).filter(DetalleFactura.id_detalle == id_detalle).first()
    if not detalle:
        raise HTTPException(status_code=404, detail="Detalle no encontrado")
    db.delete(detalle)
    db.commit()
    return {"message": "Detalle eliminado"}
