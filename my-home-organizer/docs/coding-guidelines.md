# Coding Guidelines

## Python

- Usar type hints en todas las funciones y clases.
- Usar `pathlib` para rutas.
- Registrar eventos y errores con `logging`.
- No usar `print()`.
- Validar datos con Pydantic.
- Manejar errores HTTP con `HTTPException`.

## FastAPI

- Definir `response_model` cuando sea posible.
- Validar parámetros de consulta y cuerpo.
- Usar `status` para códigos HTTP.
- Evitar lógica de negocio en la capa de rutas.

## React

- Componentes pequeños y reutilizables.
- Separar lógica de datos en hooks.
- No hardcodear URLs, usar `import.meta.env.VITE_API_URL`.
- Usar React Query para sincronización de datos.
