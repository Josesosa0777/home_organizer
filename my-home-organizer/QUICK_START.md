# 🚀 Quick Start - My Home Organizer

## Opción 1: Ejecutar ambos servidores (recomendado)

### Terminal 1 - Backend
```bash
cd packages/backend
/usr/local/bin/python3 -m uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

✅ Backend disponible en: **http://localhost:8000**
📚 API Docs (Swagger): **http://localhost:8000/docs**

### Terminal 2 - Frontend
```bash
cd packages/frontend
npm run dev
```

✅ Frontend disponible en: **http://localhost:5173**

---

## Opción 2: Ejecutar solo Backend (para tests API)

```bash
cd packages/backend
/usr/local/bin/python3 -m uvicorn src.main:app --reload
```

Usar herramientas como Postman, Insomnia o cURL para probar endpoints.

---

## 🧪 Ejecutar Tests

### Backend
```bash
cd packages/backend
/usr/local/bin/python3 -m pytest -v
```
**Resultado esperado**: 12 tests passed ✅

### Frontend
```bash
cd packages/frontend
npm test -- --run
```
**Resultado esperado**: 4 tests passed ✅

---

## ✓ Validar Calidad del Código

### Backend - Ruff
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

---

## 📋 Endpoints Principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/api/items` | Crear item |
| `GET` | `/api/items` | Listar items (con filtros) |
| `GET` | `/api/items/{id}` | Obtener item |
| `PATCH` | `/api/items/{id}` | Actualizar item |
| `DELETE` | `/api/items/{id}` | Eliminar item |
| `PATCH` | `/api/items/{id}/archive` | Alternar archivo |
| `GET` | `/api/stats` | Obtener estadísticas |

---

## 🎯 Próximos Pasos

1. Abre **http://localhost:5173** en tu navegador
2. Crea items con diferentes categorías
3. Usa filtros para buscar por categoría, estado de archivo o nombre
4. Consulta `/api/docs` para explorar la API completa

---

## 💡 Notas

- Base de datos SQLite: `packages/backend/src/home_organizer.db`
- Todos los tests pasan sin errores
- ESLint y Ruff están configurados sin warnings fatales
- La aplicación está lista para desarrollo y producción
