from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.models.database import SessionLocal
from app.models.inspeccion import Inspeccion
from app.schemas.inspeccion_schema import InspeccionBase, InspeccionOut

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/inspecciones", response_model=list[InspeccionOut])
def listar_inspecciones(db: Session = Depends(get_db)):
    return db.query(Inspeccion).all()

@router.get("/inspecciones/{id_inspeccion}", response_model=InspeccionOut)
def obtener_inspeccion(id_inspeccion: str, db: Session = Depends(get_db)):
    inspeccion = db.query(Inspeccion).filter(Inspeccion.id_inspeccion == id_inspeccion).first()
    if not inspeccion:
        raise HTTPException(status_code=404, detail="Inspección no encontrada")
    return inspeccion

@router.post("/inspecciones", response_model=InspeccionOut)
def crear_inspeccion(inspeccion: InspeccionBase, db: Session = Depends(get_db)):
    existe = db.query(Inspeccion).filter(Inspeccion.id_inspeccion == inspeccion.id_inspeccion).first()
    if existe:
        raise HTTPException(status_code=400, detail="La inspección ya existe")
    nueva = Inspeccion(**inspeccion.dict())
    db.add(nueva)
    db.commit()
    db.refresh(nueva)
    return nueva

@router.put("/inspecciones/{id_inspeccion}", response_model=InspeccionOut)
def actualizar_inspeccion(id_inspeccion: str, datos: InspeccionBase, db: Session = Depends(get_db)):
    inspeccion = db.query(Inspeccion).filter(Inspeccion.id_inspeccion == id_inspeccion).first()
    if not inspeccion:
        raise HTTPException(status_code=404, detail="Inspección no encontrada")
    for attr, value in datos.dict().items():
        setattr(inspeccion, attr, value)
    db.commit()
    return inspeccion

@router.delete("/inspecciones/{id_inspeccion}")
def eliminar_inspeccion(id_inspeccion: str, db: Session = Depends(get_db)):
    inspeccion = db.query(Inspeccion).filter(Inspeccion.id_inspeccion == id_inspeccion).first()
    if not inspeccion:
        raise HTTPException(status_code=404, detail="Inspección no encontrada")
    db.delete(inspeccion)
    db.commit()
    return {"message": "Inspección eliminada"}
