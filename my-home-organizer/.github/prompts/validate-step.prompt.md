# Validate Step Prompt

Para validar cambios:

1. Ejecuta las pruebas relevantes.
2. Comprueba el lint correspondiente.
3. Verifica la instalación y configuración.
4. Resuelve cualquier fallo antes de avanzar.

### Comandos típicos
- Backend: `cd packages/backend && python -m pytest`
- Frontend: `cd packages/frontend && npm test`
- Ruff: `cd packages/backend && ruff check src`
- ESLint: `cd packages/frontend && npm run lint`
