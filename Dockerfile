# Usar una imagen base de Python
FROM python:3.11-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo de requirements desde backend
COPY backend/requirements.txt .

# Instalar las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todo el código del backend manteniendo la estructura
COPY backend/ .

# Crear el directorio para la base de datos si no existe
RUN mkdir -p /app/data

# Exponer el puerto
EXPOSE 8000

# Usar shell para manejar la variable de entorno PORT
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]