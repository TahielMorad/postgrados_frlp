# Implementation Plan — Sistema de Posgrado (UTN FRLP)

Plan de implementación por tickets. Cada ticket se trabaja en su rama desde `dev`
y se mergea de vuelta a `dev`; `main` solo recibe releases taggeados.

Leyenda: `[x]` completado · `[ ]` pendiente

## Release v0.1.0 — Scaffold mínimo (27/10/2026)

### T1 — Setup del workflow + scaffold del repo · `feat/T1-scaffold-estructura`
_Commits: a78ebaf, merge 9905519_
- [x] Rama `dev` creada desde `main`
- [x] `CHANGELOG.md` con entrada `[Unreleased]` (Keep a Changelog)
- [x] Estructura `backend/` + `frontend/` + `docker-compose.yml` + `.env.example` + `README.md`
- [x] `.gitignore` para Python/uv y Node/pnpm (y bytecode versionado eliminado)
- [x] README arranca con "Cómo levantar"

### T2 — Backend mínimo (FastAPI + uv) · `feat/T2-backend-minimo`
_Commits: 9912539, merge ee7aadc_
- [x] Proyecto gestionado con `uv` (`pyproject.toml` + `uv.lock`)
- [x] `GET /health` → `{"status": "ok"}`
- [x] Endpoint de dominio: `GET /api/v1/cohortes`
- [x] Conexión a PostgreSQL configurada vía `DATABASE_URL`

### T3 — Frontend mínimo (React + Vite + pnpm) · `feat/T3-frontend-minimo`
_Commits: beb61b1, merge 394ca74_
- [x] Proyecto gestionado con `pnpm` (`pnpm-lock.yaml`)
- [x] Pantalla que consume `GET /api/v1/cohortes` con estados loading / error / vacío
- [x] Proxy de Vite: `/api/*` → backend

### T4 — Docker Compose de desarrollo · `feat/T4-docker-compose-dev`
_Commits: b5a1781, merge 7d55ce2_
- [x] Servicios `postgres` (18.6), `backend`, `frontend`
- [x] Dockerfiles simples (sin multi-stage) con uv y pnpm
- [x] `docker compose up` levanta los 3 servicios; `/health` OK; frontend muestra datos
- [x] README con instrucciones verificables en máquina limpia

### T5 — Release v0.1.0 · merge `dev` → `main` + tag `v0.1.0`
- [x] T1–T4 mergeados a `dev`, sin ramas `feat/*` huérfanas
- [x] `CHANGELOG.md`: `[Unreleased]` → `[v0.1.0] - 2026-10-27`
- [x] Merge `dev` → `main` + tag anotado `v0.1.0`

### Fixes integrados en el release
- [x] `fix/docs-workflow-stack` — docs alineadas al workflow `dev` y al stack uv/pnpm (5d11545)
- [x] `fix/backend-startup-and-api-errors` — arranque abortado si fallan migraciones, logs de init_db, `.env` fuera de Docker, errores legibles en el front (8f3c195, 7991333, fd7022f, 129f1a8)
- [x] `fix/ci-pipeline` — CI con uv, pnpm y build del compose (2cd2e40)
- [x] `fix/docs-consistency` — rutas, versiones y guía de `.env` corregidas (b1133ff)

## Pendientes para próximas versiones
- [ ] Migración Alembic 002: índices de `legajos.dni`, `legajos.email`, `legajos.numero_legajo` y `usuarios.email` que declaran los modelos y faltan en la 001
- [ ] Autenticación en `POST /legajos/{id}/documentos` y sacar valores hardcodeados de `routers/legajos.py` (cohorte de respaldo, año y prefijo de legajo)
- [ ] Pydantic: reemplazar `class Config` por `model_config`; reemplazar `datetime.utcnow` (deprecado)
- [ ] Tests (pytest / Vitest) y smoke test del compose en CI
- [ ] Usar `@tanstack/react-query` (ya instalado) o quitar la dependencia
