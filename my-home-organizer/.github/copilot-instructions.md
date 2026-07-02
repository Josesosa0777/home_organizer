# Copilot Instructions

## Contexto
Este repositorio contiene un proyecto de organización del hogar llamado `my-home-organizer`.
El objetivo es construir una aplicación full-stack que gestione cajas de mudanza, inventario del hogar, ropa y documentos importantes con un modelo base `Item`.

## Referencias
Usar estos documentos como guía principal:
- `docs/project-overview.md`
- `docs/functional-requirements.md`
- `docs/testing-guidelines.md`
- `docs/coding-guidelines.md`
- `docs/workflow-patterns.md`

## Principios
- TDD: Red-Green-Refactor.
- Cambios pequeños y verificables.
- Validar antes de hacer commit.

## Setup — Backend (FastAPI + Python)

### 1. Crear y activar ambiente virtual
```bash
cd packages/backend
python -m venv .venv

# Activar (Windows)
.venv\Scripts\activate

# Activar (Mac/Linux)
source .venv/bin/activate
```

### 2. Instalar dependencias
```bash
pip install -r requirements.txt
```

### 3. Ejecutar servidor
```bash
python -m uvicorn src.main:app --reload --port 8001
```

Backend disponible en: http://localhost:8001
Swagger / API Docs: http://localhost:8001/docs

## Setup — Frontend (React + Vite)

### 1. Instalar dependencias
```bash
cd packages/frontend
npm install
```

### 2. Variable de entorno
Archivo `packages/frontend/.env`:
```
VITE_API_URL=
```
El proxy de Vite redirige `/api/*` a `http://localhost:8001` automaticamente. No se necesita URL absoluta.

### 3. Ejecutar servidor de desarrollo
```bash
npm run dev
```

Frontend disponible en: http://localhost:5173

## Ejecución — dos terminales en paralelo

| Terminal | Comando |
|----------|---------|
| **Backend** | `cd packages/backend` → activar `.venv` → `python -m uvicorn src.main:app --reload --port 8001` |
| **Frontend** | `cd packages/frontend` → `npm run dev` |

## Testing
### Backend
```bash
cd packages/backend
python -m pytest -v
```

### Frontend
```bash
cd packages/frontend
npm test
```

## Endpoints principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/items` | Listar items (filtros: category, archived, search) |
| `POST` | `/api/items` | Crear item |
| `PATCH` | `/api/items/{id}` | Actualizar item |
| `DELETE` | `/api/items/{id}` | Eliminar item |
| `PATCH` | `/api/items/{id}/archive` | Archivar / restaurar |
| `GET` | `/api/stats` | Estadísticas por categoría |

## NO usar
- Playwright
- Cypress
- Selenium

## Uso de agentes
Usar `@tdd-developer` y `@code-reviewer` cuando se necesite:
- `@tdd-developer`: para construir tests y seguir ciclos Red-Green-Refactor.
- `@code-reviewer`: para revisar calidad de código y resolver errores de Ruff/ESLint.

## Git
- Usar commits convencionales.
- Trabajar en ramas de feature.

## Ruff
```bash
cd packages/backend
ruff check src
```
