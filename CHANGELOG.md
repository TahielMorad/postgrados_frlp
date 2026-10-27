# Changelog — Sistema de Posgrado

Todos los cambios notables de este proyecto se documentan en este archivo.

Formato basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/).
Este proyecto sigue [Versionado Semántico](https://semver.org/lang/es/).

## [Unreleased]

## [v0.1.0] - 2026-10-27

### Added
- Workflow de Git: rama de integración `dev`, ramas `feat/T{N}-*` / `fix/*` y releases taggeados en `main`
- `IMPLEMENTATION_PLAN.md` con el estado de cada ticket
- Backend mínimo: FastAPI gestionado con uv, `GET /health` (liveness) y `GET /api/v1/cohortes`
- Frontend mínimo: pantalla `/cohortes` (React + Vite + pnpm) con estados de carga, error y lista vacía, y proxy de Vite `/api/*` → backend
- Docker Compose de desarrollo con `postgres:18.6`, backend y frontend (Dockerfiles simples)
- README con la sección "Cómo levantar" verificable en máquina limpia

### Changed
- Backend movido de `src/core/` a `backend/` y de pip/`requirements.txt` a uv (`pyproject.toml` + `uv.lock`)
- Frontend migrado de npm a pnpm y del puerto 3000 al 5173
- CORS configurable con `CORS_ORIGINS`
- CI reescrito para uv, pnpm y build del compose
- CONTRIBUTING, SETUP_LOCAL y guías de entrega alineadas al workflow `dev` y al stack real

### Fixed
- El backend no arrancaba: faltaba `email-validator` y bcrypt 5 rompía passlib (se fija `bcrypt<4.1`)
- El arranque se aborta si fallan las migraciones (antes seguía al seed con el esquema roto)
- Los logs de migraciones y seed de `init_db` no se veían
- El backend fuera de Docker ignoraba el `.env`
- Mensajes de error legibles en el frontend para errores de validación (422) y backend caído (502)
- El CI corría npm sobre el backend Python y rutas inexistentes

### Removed
- Bytecode de Python (`__pycache__/*.pyc`) que estaba versionado por error
- Servicio MailHog del compose de desarrollo
