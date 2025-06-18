# Etapa 1: Construir el frontend con Vite
FROM node:18-alpine AS frontend-build

WORKDIR /app

# Copiar package.json del frontend (usando comillas para manejar espacios)
COPY "frontend gestion-clientes-frontend/package*.json" ./

# Instalar dependencias del frontend
RUN npm install

# Copiar el código del frontend
COPY "frontend gestion-clientes-frontend/" ./

# Construir la aplicación frontend (Vite genera carpeta 'dist')
RUN npm run build

# Etapa 2: Configurar el backend con FastAPI
FROM python:3.11-slim

WORKDIR /app

# Copiar requirements del backend
COPY backend/requirements.txt .

# Instalar dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código del backend
COPY backend/ .

# Copiar los archivos construidos del frontend (Vite usa 'dist')
COPY --from=frontend-build /app/dist ./static

# Crear directorio para la base de datos
RUN mkdir -p /app/data

# Exponer el puerto
EXPOSE $PORT

# Ejecutar la aplicación con uvicorn
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port $PORT"]