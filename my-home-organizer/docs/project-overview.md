# Descripción del proyecto

My Home Organizer es una aplicación full-stack para organizar el hogar. Permite gestionar:

- Cajas de mudanza.
- Inventario del hogar.
- Gestión de ropa y closet.
- Gestión de documentos importantes.

## Arquitectura

- Backend: FastAPI + SQLite sin ORM.
- Frontend: React 18 + Vite + Material UI.
- Comunicación: API REST.
- Pruebas: pytest en backend, Vitest y React Testing Library en frontend.

## Estructura

- `packages/backend`: código de la API, modelos y pruebas.
- `packages/frontend`: aplicación React, hooks y componentes.
- `.github`: instrucciones, herramientas y memoria.
- `docs`: documentación del proyecto.

## Instalación

### Backend

```bash
cd packages/backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### Frontend

```bash
cd packages/frontend
npm install
```

## Ejecución

### Backend

```bash
cd packages/backend
uvicorn src.main:app --reload
```

### Frontend

```bash
cd packages/frontend
npm run dev
```

## Puertos

- Backend: `http://localhost:8000`
- Frontend: `http://localhost:5173`
