# My Home Organizer

Aplicación full-stack para organizar el hogar con un modelo base `Item` que reúne cuatro casos de uso: cajas de mudanza, inventario del hogar, gestión de ropa y gestión de documentos importantes.

## Características

- Backend con FastAPI y SQLite sin ORM.
- Frontend con React 18, Vite y Material UI.
- Filtros por categoría, archivado y búsqueda.
- Estadísticas globales por categoría.
- Pruebas unitarias con pytest y Vitest.
- Configuración guiada para TDD y calidad.

## Estructura

- `packages/backend`: API REST con FastAPI.
- `packages/frontend`: aplicación React.
- `.github`: instrucciones y agentes.
- `docs`: documentación de proyecto, requerimientos, pruebas y flujo.

## Instalación

### Backend

```bash
cd packages/backend
/usr/local/bin/python3 -m pip install -r requirements.txt
```

### Frontend

```bash
cd packages/frontend
npm install
```

## Ejecución

### Opción 1: Ejecutar ambos servidores en paralelo

**Terminal 1 - Backend:**
```bash
cd packages/backend
/usr/local/bin/python3 -m uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd packages/frontend
npm run dev
```

**Acceder a la aplicación:**
- Frontend: http://localhost:5173
- API Backend: http://localhost:8000
- Documentación interactiva (Swagger): http://localhost:8000/docs

### Opción 2: Ejecutar solo backend (para pruebas API)

```bash
cd packages/backend
/usr/local/bin/python3 -m uvicorn src.main:app --reload
```

## Testing

### Backend - Todos los tests

```bash
cd packages/backend
/usr/local/bin/python3 -m pytest -v
```

### Backend - Tests con cobertura

```bash
cd packages/backend
/usr/local/bin/python3 -m pytest --cov=src
```

### Frontend - Tests

```bash
cd packages/frontend
npm test
```

## Validación de Calidad

### Backend - Ruff (Linting y formato)

```bash
cd packages/backend
/usr/local/bin/python3 -m ruff check src/ tests/
```

### Frontend - ESLint

```bash
cd packages/frontend
npm run lint
```

### Frontend - Build

```bash
cd packages/frontend
npm run build
```

## Enlaces a docs

- `docs/project-overview.md`
- `docs/functional-requirements.md`
- `docs/testing-guidelines.md`
- `docs/coding-guidelines.md`
- `docs/workflow-patterns.md`
