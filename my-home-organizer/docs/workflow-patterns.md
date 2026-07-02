# Workflow Patterns

## Ciclo TDD

1. Escribir un test que falle.
2. Ejecutar los tests.
3. Implementar la funcionalidad mínima.
4. Ejecutar los tests nuevamente.
5. Refactorizar sin romper tests.

## Ruff Resolution

1. Ejecutar `ruff check src`.
2. Corregir imports no utilizados.
3. Ajustar formato y reglas.
4. Volver a ejecutar Ruff.

## Planning

- Identificar requerimientos.
- Dividir en tareas pequeñas.
- Priorizar backend primero.
- Mantener commits atómicos.

## Integration Testing

- Validar endpoints con `httpx.AsyncClient`.
- Probar rutas principales y errores.

## Systematic Debugging

- Revisar logs en FastAPI.
- Inspeccionar respuestas HTTP.
- Aislar componentes en React.
