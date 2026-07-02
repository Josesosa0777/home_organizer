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

## Testing
### Backend
```bash
cd packages/backend
python -m pytest
```

### Frontend
```bash
cd packages/frontend
npm test
```

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
