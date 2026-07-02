# 🚀 Quick Start - My Home Organizer

## Backend (FastAPI + Python)

### 1. Crear y activar ambiente virtual

```bash
cd packages/backend

# Crear ambiente virtual
python -m venv .venv

# Activar (Windows)
.venv\Scripts\activate

# Activar (Mac/Linux)
source .venv/bin/activate
```

> Sabrás que está activo porque el prompt mostrará `(.venv)` al inicio.

### 2. Instalar dependencias

```bash
pip install -r requirements.txt
```

### 3. Ejecutar servidor

```bash
python -m uvicorn src.main:app --reload --port 8001
```

✅ Backend disponible en: **http://localhost:8001**
📚 Swagger / API Docs: **http://localhost:8001/docs**

---

## Frontend (React + Vite)

### 1. Instalar dependencias

```bash
cd packages/frontend
npm install
```

### 2. Configurar variable de entorno

Crea el archivo `packages/frontend/.env` (si no existe):

```
VITE_API_URL=
```

> El proxy de Vite redirige automáticamente `/api/*` → `http://localhost:8001`. No se necesita URL absoluta.

### 3. Ejecutar servidor de desarrollo

```bash
npm run dev
```

✅ Frontend disponible en: **http://localhost:5173**

---

## Resumen — dos terminales en paralelo

| Terminal | Comando |
|----------|---------|
| **Backend** | `cd packages/backend` → activar `.venv` → `python -m uvicorn src.main:app --reload --port 8001` |
| **Frontend** | `cd packages/frontend` → `npm run dev` |

---

## 🧪 Ejecutar Tests

### Backend

```bash
cd packages/backend
# (con .venv activo)
python -m pytest -v
```

### Frontend

```bash
cd packages/frontend
npm test
```

---

## 📋 Endpoints principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/items` | Listar items (filtros: category, archived, search) |
| `POST` | `/api/items` | Crear item |
| `PATCH` | `/api/items/{id}` | Actualizar item |
| `DELETE` | `/api/items/{id}` | Eliminar item |
| `PATCH` | `/api/items/{id}/archive` | Archivar / restaurar |
| `GET` | `/api/stats` | Estadísticas por categoría |
