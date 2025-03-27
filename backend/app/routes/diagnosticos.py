from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.models.database import SessionLocal
from app.models.diagnostico import Diagnostico
from app.schemas.diagnostico_schema import DiagnosticoBase, DiagnosticoOut

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/diagnosticos", response_model=list[DiagnosticoOut])
def listar_diagnosticos(db: Session = Depends(get_db)):
    return db.query(Diagnostico).all()

@router.get("/diagnosticos/{id_diagnostico}", response_model=DiagnosticoOut)
def obtener_diagnostico(id_diagnostico: str, db: Session = Depends(get_db)):
    diagnostico = db.query(Diagnostico).filter(Diagnostico.id_diagnostico == id_diagnostico).first()
    if not diagnostico:
        raise HTTPException(status_code=404, detail="Diagnóstico no encontrado")
    return diagnostico

@router.post("/diagnosticos", response_model=DiagnosticoOut)
def crear_diagnostico(diagnostico: DiagnosticoBase, db: Session = Depends(get_db)):
    existe = db.query(Diagnostico).filter(Diagnostico.id_diagnostico == diagnostico.id_diagnostico).first()
    if existe:
        raise HTTPException(status_code=400, detail="El diagnóstico ya existe")
    nuevo = Diagnostico(**diagnostico.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

@router.put("/diagnosticos/{id_diagnostico}", response_model=DiagnosticoOut)
def actualizar_diagnostico(id_diagnostico: str, datos: DiagnosticoBase, db: Session = Depends(get_db)):
    diagnostico = db.query(Diagnostico).filter(Diagnostico.id_diagnostico == id_diagnostico).first()
    if not diagnostico:
        raise HTTPException(status_code=404, detail="Diagnóstico no encontrado")
    for attr, value in datos.dict().items():
        setattr(diagnostico, attr, value)
    db.commit()
    return diagnostico

@router.delete("/diagnosticos/{id_diagnostico}")
def eliminar_diagnostico(id_diagnostico: str, db: Session = Depends(get_db)):
    diagnostico = db.query(Diagnostico).filter(Diagnostico.id_diagnostico == id_diagnostico).first()
    if not diagnostico:
        raise HTTPException(status_code=404, detail="Diagnóstico no encontrado")
    db.delete(diagnostico)
    db.commit()
    return {"message": "Diagnóstico eliminado"}
