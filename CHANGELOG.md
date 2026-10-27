# Changelog — Sistema de Posgrado

Todos los cambios notables de este proyecto se documentan en este archivo.

Formato basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/).
Este proyecto sigue [Versionado Semántico](https://semver.org/lang/es/).

## [Unreleased]

### Added
- Workflow de Git: rama de integración `dev`, ramas `feat/T{N}-*` / `fix/*` y releases taggeados en `main`
- `IMPLEMENTATION_PLAN.md` con el estado de cada ticket
- Sección "Cómo levantar" en el README

### Changed
- Backend movido de `src/core/` a `backend/` (estructura por capa según TRD)

### Removed
- Bytecode de Python (`__pycache__/*.pyc`) que estaba versionado por error
