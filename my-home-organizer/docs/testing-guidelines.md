# Testing Guidelines

## Backend

- Usar `pytest` y `pytest-asyncio`.
- Ejecutar tests contra SQLite en memoria o base de datos temporaria.
- Validar respuestas HTTP y casos de error.
- Evitar dependencias externas en tests.

### Requisitos
- Crear item.
- Obtener item.
- Actualizar item.
- Eliminar item.
- Listar items.
- Filtrar por categoría.
- Filtrar por archived.
- Búsqueda por nombre.
- Toggle archive.
- Stats.
- Casos de error 404 y validaciones.

## Frontend

- Usar Vitest y React Testing Library.
- Crear pruebas unitarias para componentes.
- Validar la renderización y los callbacks.
- Evitar pruebas E2E.

## Patrones de pruebas

- `describe` para agrupar tests.
- `it` para casos individuales.
- Mockear llamadas de API cuando sea necesario.
- Probar componentes aislados.
