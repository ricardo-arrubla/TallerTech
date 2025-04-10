from pydantic import BaseModel

class UsuarioBase(BaseModel):
    id_usuario: str
    contraseña: str

class UsuarioOut(BaseModel):
    id_usuario: str

    class Config:
        from_attributes = True  # Para mapear desde ORM