# Guía de Contribución — postgrado Posgrado

Leé este documento antes de hacer tu primer commit. Estas convenciones existen para que el trabajo de 4 personas en paralelo no genere caos.

---

## 1. Estrategia de Ramas (workflow obligatorio de la cátedra)

```
main            ← Solo releases taggeados (vX.Y.Z) + CHANGELOG actualizado. NUNCA commits directos
  │               ni merges de feat/fix. Solo recibe `dev` en un release.
  └── dev       ← Rama de integración (nace de `main`). Acá vuelven todas las ramas de trabajo.
        └── feat/T7-us-core-001-inscripcion   ← Tu rama de trabajo (nace de `dev`)
        └── feat/T12-planilla-asistencia
        └── fix/validacion-dni-duplicado
```

**Regla de oro: Si no es un Pull Request contra `dev`, no existe.**

---

## 2. Nomenclatura de Ramas

Las ramas de trabajo nacen de `dev` y vuelven a `dev`:

```
feat/T{N}-descripcion-corta     ← N = número de tarea del plan
fix/descripcion-corta
```

El ID de la historia de usuario puede ir dentro de la descripción si suma contexto.

**Ejemplos válidos:**
- `feat/T1-scaffold-estructura`
- `feat/T7-us-core-001-inscripcion`
- `fix/validacion-dni-duplicado`

**Ejemplos inválidos:**
- `mi-rama` ← sin contexto
- `feature/US-CORE-001-...` ← formato viejo, usar `feat/T{N}-...`
- `develop` ← la rama de integración se llama `dev`
- `wip` ← nunca mergear Work In Progress

---

## 3. Convención de Commits (Conventional Commits)

Formato: `tipo(alcance): descripción en presente, sin mayúscula inicial, sin punto final`

**El 100% de los commits** sigue Conventional Commits. Nada de `wip`, `cambios`, `fix varios`.

```
feat(core): agrega validación de DNI en formulario de inscripción
fix(auth): corrige expiración de JWT refresh token
docs(api): actualiza swagger para endpoint de documentos
test(semaforo): agrega tests para regla de semaforo rojo en Maestría
refactor(legajo): extrae lógica de transición de estados a clase LegajoStateMachine
chore(ci): configura pipeline de GitHub Actions para linting
```

**Tipos válidos:**

| Tipo | Cuándo usarlo |
|------|--------------|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Cambios en documentación |
| `test` | Agrega o modifica tests |
| `refactor` | Refactorización sin cambio de comportamiento |
| `docker` | Cambios en Dockerfiles o `docker-compose.yml` |
| `chore` | Tareas de mantenimiento (CI, dependencias) |

**Referencia al requisito:** Si el commit implementa un requisito del SRS, incluirlo:
```
feat(core): implementa upload de PDFs con validación MIME

Implementa RF-CORE-002. El sistema verifica magic bytes del archivo
antes de almacenarlo, independientemente del Content-Type del cliente.
```

---

## 4. Pull Requests

### Cuándo abrir un PR
- Cuando la historia de usuario está **funcionando** (no cuando está "casi lista")
- Cuando los tests pasan localmente
- Cuando el linter no tiene errores

### Qué incluir en el PR

**Título:** Igual que el título de la historia de usuario. Ej: `[US-CORE-001] Formulario de inscripción de aspirantes`

**Descripción (template):**
```markdown
## ¿Qué hace este PR?
[Descripción de qué implementa en 2-3 oraciones]

## Historia de usuario
Cierra #[número de issue en GitHub] — US-CORE-001

## Cambios principales
- [Lista de cambios relevantes]

## Cómo probarlo
1. Levantar el ambiente: `docker compose up -d`
2. Ir a `http://localhost:5173/inscripcion`
3. Completar el formulario con datos válidos
4. Verificar que el legajo aparece en el dashboard del coordinador

## Screenshots (si hay cambios de UI)
[Imagen o GIF del antes/después]

## Checklist del DoD
- [ ] Tests pasando, cuando existan (`uv run pytest` / `pnpm test`, a futuro)
- [ ] Linter sin errores
- [ ] Swagger actualizado (si hay endpoints nuevos)
- [ ] Probado en la máquina de otro integrante
- [ ] CHANGELOG.md actualizado en `[Unreleased]`
```

### Code Review: qué revisar

Como **reviewer**, enfocate en:
1. **¿La lógica de negocio es correcta?** (¿el semáforo calcula bien? ¿la transición de estados es válida?)
2. **¿Hay problemas de seguridad?** (¿se validan las entradas? ¿el endpoint tiene auth guard?)
3. **¿Los tests cubren los casos edge?** (null, strings vacíos, valores límite)
4. **¿El código es entendible?** (nombres claros, funciones cortas, comentarios donde hacen falta)

NO es responsabilidad del reviewer:
- Encontrar typos de UI (eso va en un issue separado)
- Revisar que el diseño "se vea lindo" (eso es del QA/UX)

---

## 5. Workflow Paso a Paso

```bash
# 1. Siempre trabajar desde dev actualizado
git checkout dev
git pull origin dev

# 2. Crear rama para la tarea
git checkout -b feat/T7-us-core-001-inscripcion

# 3. Desarrollar, commitear frecuentemente (no solo al final)
git add .
git commit -m "feat(core): agrega campos básicos del formulario de inscripción"
git commit -m "feat(core): agrega validación de DNI y email"

# 4. Antes de abrir el PR: sincronizar con dev
git fetch origin dev
git rebase origin/dev
# Si hay conflictos: resolverlos, luego git rebase --continue

# 5. Push y abrir PR en GitHub
git push origin feat/T7-us-core-001-inscripcion
# Abrir PR en GitHub contra la rama dev (NUNCA contra main)

# 6. Después del merge: limpiar rama local
git checkout dev
git pull origin dev
git branch -d feat/T7-us-core-001-inscripcion
```

### Releases (solo `dev` → `main`)

- Versionado **SemVer** en tags: `v0.y.z` mientras el sistema sea inestable.
- `CHANGELOG.md` en formato [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/): lo nuevo se acumula en `[Unreleased]` y en el release se mueve a la sección de la versión.

```bash
git checkout main
git merge --no-ff dev
# Actualizar CHANGELOG.md: [Unreleased] → [X.Y.Z] - AAAA-MM-DD, y commitear
git commit -am "docs: actualiza changelog para vX.Y.Z"
git tag -a vX.Y.Z -m "release: vX.Y.Z"
git push origin main --tags
```

---

## 6. Variables de Entorno

**NUNCA commitear el archivo `.env`**. Está en `.gitignore`.

Cuando agregues una variable nueva:
1. Agregala a `.env.example` con un valor de ejemplo (no real)
2. Documentala en el comentario del `.env.example`
3. Mencionala en la descripción del PR

```bash
# .env.example
DATABASE_URL=postgresql://postgrado_user:password@postgres:5432/postgrado_dev
JWT_SECRET=cambiar-en-produccion-por-secreto-seguro-32chars-min
SMTP_HOST=smtp.example.com
SMTP_PORT=587
STORAGE_PATH=/var/postgrado-storage  # Ruta donde se almacenan los PDFs
```

---

## 7. Comandos Útiles

```bash
# Levantar ambiente completo (postgres + backend + frontend)
docker compose up -d

# Ver logs del backend en tiempo real
docker compose logs -f backend

# Dependencias del backend (uv, dentro de backend/)
uv sync                   # instala según pyproject.toml + uv.lock
uv add <paquete>          # agrega dependencia y actualiza uv.lock

# Dependencias y scripts del frontend (pnpm, dentro de frontend/)
pnpm install
pnpm lint
pnpm build

# Migraciones de base de datos (Alembic)
docker compose exec backend alembic upgrade head
docker compose exec backend alembic revision --autogenerate -m "descripcion"

# Tests (a futuro, todavía no hay suite)
uv run pytest             # backend
# pnpm test              # frontend (a futuro: todavía no hay script de tests)

# Acceder a la base de datos
docker compose exec postgres psql -U postgrado_user -d postgrado_dev
```

---

*¿Dudas sobre el proceso? → Canal `#postgrado-general` en Github Discussion o Issues en GitHub.*
