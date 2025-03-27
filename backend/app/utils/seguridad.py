from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta

# Encriptado de contraseñas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Clave secreta y config del token
SECRET_KEY = "clave-super-secreta"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def encriptar(pwd: str) -> str:
    return pwd_context.hash(pwd)

def verificar(pwd: str, hashed: str) -> bool:
    return pwd_context.verify(pwd, hashed)

def crear_token(data: dict, tiempo: int = ACCESS_TOKEN_EXPIRE_MINUTES):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=tiempo)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
