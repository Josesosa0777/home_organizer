# Requerimientos funcionales

## Casos de uso

### Cajas de mudanza
- Crear items con categoría `box`.
- Registrar `box_number`, `destination_room` y estado `sealed` en metadata.
- Filtrar por categoría y nombre.

### Inventario del hogar
- Crear items con categoría `item`.
- Registrar ubicación, valor y garantía en metadata.
- Consultar y editar entradas existentes.

### Gestión de ropa y closet
- Crear items con categoría `clothing`.
- Registrar tipo, color, estación y última vez usado en metadata.
- Buscar por nombre y filtrar por categoría `clothing`.

### Gestión de documentos importantes
- Crear items con categoría `document`.
- Registrar tipo de documento, fecha de expiración e issuer en metadata.
- Poder archivar documentos importantes.

## Filtros

- `category`: filtrar por categoría válida.
- `archived`: filtrar por estado archivado.
- `search`: búsqueda parcial en nombre.

## Estadísticas

El endpoint `/api/stats` debe devolver:
- total de items.
- total por categoría: `box`, `item`, `clothing`, `document`.
