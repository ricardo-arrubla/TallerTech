from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.models.database import SessionLocal
from app.models.cita import Cita
from app.schemas.cita_schema import CitaBase, CitaOut

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/citas", response_model=list[CitaOut])
def listar_citas(db: Session = Depends(get_db)):
    return db.query(Cita).all()

@router.get("/citas/{id_cita}", response_model=CitaOut)
def obtener_cita(id_cita: str, db: Session = Depends(get_db)):
    cita = db.query(Cita).filter(Cita.id_cita == id_cita).first()
    if not cita:
        raise HTTPException(status_code=404, detail="Cita no encontrada")
    return cita

@router.post("/citas", response_model=CitaOut)
def crear_cita(cita: CitaBase, db: Session = Depends(get_db)):
    existe = db.query(Cita).filter(Cita.id_cita == cita.id_cita).first()
    if existe:
        raise HTTPException(status_code=400, detail="La cita ya existe")
    nueva = Cita(**cita.dict())
    db.add(nueva)
    db.commit()
    db.refresh(nueva)
    return nueva

@router.put("/citas/{id_cita}", response_model=CitaOut)
def actualizar_cita(id_cita: str, datos: CitaBase, db: Session = Depends(get_db)):
    cita = db.query(Cita).filter(Cita.id_cita == id_cita).first()
    if not cita:
        raise HTTPException(status_code=404, detail="Cita no encontrada")
    for attr, value in datos.dict().items():
        setattr(cita, attr, value)
    db.commit()
    return cita

@router.delete("/citas/{id_cita}")
def eliminar_cita(id_cita: str, db: Session = Depends(get_db)):
    cita = db.query(Cita).filter(Cita.id_cita == id_cita).first()
    if not cita:
        raise HTTPException(status_code=404, detail="Cita no encontrada")
    db.delete(cita)
    db.commit()
    return {"message": "Cita eliminada"}
