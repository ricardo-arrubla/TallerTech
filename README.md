# TallerTech

TallerTech - Una pagina para los talleres de automóviles en Colombia

# 🚗 TallerTech — Backend de Gestión para Talleres Mecánicos en Colombia

**TallerTech** es un sistema de backend construido con **FastAPI** y **SQLAlchemy**, diseñado para gestionar todos los procesos de un taller de automóviles: clientes, vehículos, servicios, citas, facturas, diagnósticos e inspecciones.

---

## 🚀 Tecnologías utilizadas

- ⚙️ [FastAPI](https://fastapi.tiangolo.com/) – Framework moderno y rápido para APIs
- 🗃️ [SQLAlchemy](https://www.sqlalchemy.org/) – ORM para la base de datos
- 💾 [SQLite](https://www.sqlite.org/index.html) – Base de datos por defecto (puede migrarse a PostgreSQL)
- 🧠 [Pydantic](https://docs.pydantic.dev/) – Validación de datos
- 🔐 [python-jose](https://github.com/mpdavis/python-jose) – Manejo de JWT
- 🔑 [passlib](https://passlib.readthedocs.io/) – Encriptado de contraseñas

---

## 📁 Estructura del proyecto

gestion-clientes/ ├── backend/ │ └── app/ │ ├── main.py # Archivo principal de arranque │ ├── models/ # Modelos SQLAlchemy (tablas) │ ├── routes/ # Endpoints FastAPI │ ├── schemas/ # Modelos Pydantic │ ├── utils/ # Seguridad y autenticación JWT │ └── database.py # Conexión a la base de datos

---

## Ejecutar el frontend

C:\Users\Willi\gestion-clientes\frontend\gestion-clientes-frontend>npm run dev

## ▶️ ¿Cómo ejecutar el backend?

1. Abre una terminal en:

C:\Users\Willi\gestion-clientes\backend

2. Activa el entorno virtual:

```bash
venv\Scripts\activate

pip install -r requirements.txt

python -m uvicorn app.main:app --reload

http://localhost:8000/docs

utenticación con JWT
El sistema utiliza tokens JWT para proteger las rutas sensibles.

🔸 Crear un usuario
POST /usuarios
{
  "id_usuario": "admin",
  "contraseña": "1234"
}

🔸 Iniciar sesión
POST /login
{
  "id_usuario": "admin",
  "contraseña": "1234"
}

{
  "access_token": "eyJhbGciOiJIUzI1...",
  "token_type": "bearer"
}

Authorization: Bearer <token>



💾 Requisitos del entorno

requirements.txt
pip install -r requirements.txt

🧑‍💻 Autor
Proyecto desarrollado por Willi y Ricardo
TallerTech Backend - versión 1.0 🚀
Hecho con amor, código limpio y FastAPI.


```
