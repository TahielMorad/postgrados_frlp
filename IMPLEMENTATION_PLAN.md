# Implementation Plan — Sistema de Posgrado (UTN FRLP)

Plan de implementación por tickets. Cada ticket se trabaja en su rama desde `dev`
y se mergea de vuelta a `dev`; `main` solo recibe releases taggeados.

Leyenda: `[x]` completado · `[ ]` pendiente

## Release v0.1.0 — Scaffold mínimo (27/10/2026)

### T1 — Setup del workflow + scaffold del repo · `feat/T1-scaffold-estructura`
- [ ] Rama `dev` creada desde `main`
- [ ] `CHANGELOG.md` con entrada `[Unreleased]` (Keep a Changelog)
- [ ] Estructura `backend/` + `frontend/` + `docker-compose.yml` + `.env.example` + `README.md`
- [ ] `.gitignore` para Python/uv y Node/pnpm (y bytecode versionado eliminado)
- [ ] README arranca con "Cómo levantar"

### T2 — Backend mínimo (FastAPI + uv) · `feat/T2-backend-minimo`
- [ ] Proyecto gestionado con `uv` (`pyproject.toml` + `uv.lock`)
- [ ] `GET /health` → `{"status": "ok"}`
- [ ] Endpoint de dominio: `GET /api/v1/cohortes`
- [ ] Conexión a PostgreSQL configurada vía `DATABASE_URL`

### T3 — Frontend mínimo (React + Vite + pnpm) · `feat/T3-frontend-minimo`
- [ ] Proyecto gestionado con `pnpm` (`pnpm-lock.yaml`)
- [ ] Pantalla que consume `GET /api/v1/cohortes` con estados loading / error / vacío
- [ ] Proxy de Vite: `/api/*` → backend

### T4 — Docker Compose de desarrollo · `feat/T4-docker-compose-dev`
- [ ] Servicios `postgres` (18.6), `backend`, `frontend`
- [ ] Dockerfiles simples (sin multi-stage) con uv y pnpm
- [ ] `docker compose up` levanta los 3 servicios; `/health` OK; frontend muestra datos
- [ ] README con instrucciones verificables en máquina limpia

### T5 — Release v0.1.0
- [ ] T1–T4 mergeados a `dev`, sin ramas `feat/*` huérfanas
- [ ] `CHANGELOG.md`: `[Unreleased]` → `[v0.1.0] - 2026-10-27`
- [ ] Merge `dev` → `main` + tag anotado `v0.1.0`

## Bloqueos / notas
- _(sin bloqueos)_
