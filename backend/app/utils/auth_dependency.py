from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from fastapi import Depends, HTTPException
from app.utils.seguridad import SECRET_KEY, ALGORITHM

# ⚙️ Este es el endpoint que recibe usuario y contraseña para obtener el token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# 🧠 Esta función se usa para verificar el token JWT en las rutas protegidas
def obtener_usuario_actual(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        usuario_id = payload.get("sub")
        if usuario_id is None:
            raise HTTPException(status_code=401, detail="Token inválido: sin usuario")
        return usuario_id
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")
