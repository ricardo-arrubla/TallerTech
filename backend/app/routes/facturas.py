from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.models.database import SessionLocal
from app.models.factura import Factura
from app.schemas.factura_schema import FacturaBase, FacturaOut

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/facturas", response_model=list[FacturaOut])
def listar_facturas(db: Session = Depends(get_db)):
    return db.query(Factura).all()

@router.get("/facturas/{id_factura}", response_model=FacturaOut)
def obtener_factura(id_factura: str, db: Session = Depends(get_db)):
    factura = db.query(Factura).filter(Factura.id_factura == id_factura).first()
    if not factura:
        raise HTTPException(status_code=404, detail="Factura no encontrada")
    return factura

@router.post("/facturas", response_model=FacturaOut)
def crear_factura(factura: FacturaBase, db: Session = Depends(get_db)):
    existe = db.query(Factura).filter(Factura.id_factura == factura.id_factura).first()
    if existe:
        raise HTTPException(status_code=400, detail="La factura ya existe")
    nueva = Factura(**factura.dict())
    db.add(nueva)
    db.commit()
    db.refresh(nueva)
    return nueva

@router.put("/facturas/{id_factura}", response_model=FacturaOut)
def actualizar_factura(id_factura: str, datos: FacturaBase, db: Session = Depends(get_db)):
    factura = db.query(Factura).filter(Factura.id_factura == id_factura).first()
    if not factura:
        raise HTTPException(status_code=404, detail="Factura no encontrada")
    for attr, value in datos.dict().items():
        setattr(factura, attr, value)
    db.commit()
    return factura

@router.delete("/facturas/{id_factura}")
def eliminar_factura(id_factura: str, db: Session = Depends(get_db)):
    factura = db.query(Factura).filter(Factura.id_factura == id_factura).first()
    if not factura:
        raise HTTPException(status_code=404, detail="Factura no encontrada")
    db.delete(factura)
    db.commit()
    return {"message": "Factura eliminada"}
