# Usar una imagen base de Node.js para construir el frontend
FROM node:18-alpine as frontend-build

# Establecer el directorio de trabajo para el frontend
WORKDIR /app/frontend

# Copiar package.json y package-lock.json del frontend
COPY frontend/package*.json ./

# Instalar dependencias del frontend
RUN npm ci

# Copiar el código del frontend
COPY frontend/ .

# Construir el frontend para producción
RUN npm run build

# Usar una imagen base de Python para el backend
FROM python:3.11-slim

# Instalar Node.js para servir archivos estáticos si es necesario
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo de requirements desde backend
COPY backend/requirements.txt .

# Instalar las dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todo el código del backend manteniendo la estructura
COPY backend/ .

# Copiar los archivos construidos del frontend desde la etapa anterior
COPY --from=frontend-build /app/frontend/dist ./static

# Crear el directorio para la base de datos si no existe
RUN mkdir -p /app/data

# Exponer el puerto que Railway asignará
EXPOSE $PORT

# Comando para ejecutar la aplicación
CMD ["python", "-m", "app.main"]