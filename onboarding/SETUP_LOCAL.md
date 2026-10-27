# Setup del Entorno Local — Guía Paso a Paso

Esta guía te lleva desde cero hasta tener el sistema corriendo localmente. **Seguí cada paso en orden.** Si algo falla, hay una sección de Troubleshooting al final.

> **Stack del proyecto:** backend en `backend/` con **FastAPI + Python 3.12** (dependencias con **uv**, SQLAlchemy + Alembic) y frontend en `frontend/` con **React 19 + TypeScript + Vite** (dependencias con **pnpm**). Base de datos **PostgreSQL 18.6**.

---

## Requisitos Previos

Antes de empezar, verificá que tenés instalado:

```bash
git --version          # Necesitás 2.x o superior
docker --version       # Docker 24.x o superior
docker compose version # Compose 2.x (incluido en Docker Desktop)
```

Eso es todo. **Python y Node.js corren dentro de Docker**, no necesitás instalarlos en tu máquina para el flujo principal. Si querés trabajar fuera de Docker (linter en el editor, correr el backend o el front a mano), instalá:

- [uv](https://docs.astral.sh/uv/) → en `backend/`: `uv sync` y `uv run uvicorn main:app --reload`
- [pnpm](https://pnpm.io/) → en `frontend/`: `pnpm install` y `pnpm dev`

**Instaladores:**
- Git: https://git-scm.com
- Docker Desktop: https://www.docker.com/products/docker-desktop

> En Windows: usá **PowerShell** o **Git Bash** para los comandos. El `cmd` clásico no interpreta correctamente algunos paths y variables de entorno.

---
## Paso 0: Fork del repositorio
El encargado del equipo hacer un fork del repositorio de la catedra.
Cada miembro se suma al repositorio como colaborador.

## Paso 1: Clonar el Repositorio

```bash
# Reemplazá [NOMBRE-EQUIPO] con el nombre de tu equipo (lo da el docente via GitHub Classroom)
git clone https://github.com/utn-frlp-dev2026/postgrado-[NOMBRE-EQUIPO].git

cd postgrado-[NOMBRE-EQUIPO]

# Verificar que estás en la rama principal
git branch
# Deberías ver: * main

# Para trabajar, pasate a la rama de integración
git checkout dev
```

---

## Paso 2: Configurar Variables de Entorno

```bash
# Copiar el archivo de ejemplo (nunca editarlo directamente)
cp .env.example .env
```

**Para desarrollo local el `.env.example` ya tiene valores funcionales.** No necesitás cambiar nada para empezar. Solo en producción deberás reemplazar contraseñas y secretos.

```bash
# Verificar que el archivo fue creado
ls -la .env      # Linux / Mac
dir .env         # Windows PowerShell
```

El `.env` nunca se commitea a Git (está en `.gitignore`). Si alguien del equipo agrega una variable nueva, debe actualizarla en `.env.example` con un valor de ejemplo.

---

## Paso 3: Levantar los Servicios con Docker

```bash
docker compose up -d
```

Este comando descarga las imágenes y levanta tres servicios:

```
postgres   → PostgreSQL 18.6 (imagen oficial postgres:18.6)
backend    → FastAPI + Python 3.12 (puerto 8000)
frontend   → React 19 + Vite (puerto 5173)
```

La primera vez puede tardar 3–5 minutos según tu conexión. Las siguientes veces son casi instantáneas porque las imágenes quedan en caché.

**Verificar que todo levantó correctamente:**

```bash
docker compose ps
```

Deberías ver los servicios `postgres` (healthy), `backend` (`8000->8000`) y `frontend` (`5173->5173`). El puerto de Postgres en el host es `5432` salvo que definas `DB_PORT` en el `.env`.

> El campo **STATUS** debe decir **Up**. Si dice **Restarting** o **Exit**, algo salió mal → ir a Troubleshooting.

---

## Paso 4: Migraciones y Datos de Prueba

**No tenés que hacer nada a mano:** al arrancar, el contenedor `backend` ejecuta `init_db.py`, que aplica las migraciones de Alembic y carga el seed automáticamente. Cuando aparezca una migración nueva en `dev`, alcanza con reiniciar el backend (`docker compose restart backend`) o correrla explícitamente:

```bash
# Aplicar todas las migraciones pendientes
docker compose exec backend alembic upgrade head
```

**¿Cómo sé qué versión está aplicada?**

```bash
docker compose exec backend alembic current
# Muestra el hash de la migración activa, por ej: a1b2c3d4 (head)
```

**¿Cómo ver el historial de migraciones?**

```bash
docker compose exec backend alembic history --verbose
```

**Verificar que las tablas existen:**

```bash
docker compose exec postgres psql -U postgrado_user -d postgrado_dev

# Dentro del prompt psql:
\dt
# Deberías ver las tablas del sistema (cohortes, legajos, etc.)

# Para salir:
\q
```

---

## Paso 5: Verificar que Todo Funciona

Abrí estos URLs en tu navegador:

| URL | Qué deberías ver |
|-----|-----------------|
| `http://localhost:5173` | Frontend (React + Vite) |
| `http://localhost:5173/cohortes` | Pantalla de cohortes (consume `GET /api/v1/cohortes`) |
| `http://localhost:8000/health` | Liveness del backend: `{"status":"ok"}` |
| `http://localhost:8000/api/v1/health` | Health con chequeo de la base de datos |
| `http://localhost:8000/api/v1/docs` | Swagger UI (generado automáticamente por FastAPI) |

> **Tip:** El Swagger en `/api/v1/docs` es la documentación viva de tu API. Podés probar los endpoints directamente desde ahí durante el desarrollo. El frontend llama a `/api/*` y el proxy de Vite lo reenvía al backend.

**Credenciales de prueba (cargadas por el seed):**

| Rol | Email | Contraseña |
|-----|-------|-----------|
| Coordinador | `admin@fenix.test` | `Admin1234!` |
| Docente | `docente@fenix.test` | `Docente1234!` |
| CPR | `cpr@fenix.test` | `Cpr1234!` |

---

## Paso 6: Configurar el Editor — VS Code

### Extensiones para el backend (FastAPI + Python)

```bash
code --install-extension ms-python.python           # Python oficial de Microsoft
code --install-extension ms-python.pylance           # IntelliSense y type checking
code --install-extension charliermarsh.ruff          # Linter + formatter (reemplaza flake8 + black)
code --install-extension ms-python.debugpy           # Debugger de Python
code --install-extension bradlc.vscode-tailwindcss   # Autocompletado de clases Tailwind
code --install-extension ms-azuretools.vscode-docker # Docker integrado
```

### Extensiones para el frontend (React + TypeScript)

```bash
code --install-extension dbaeumer.vscode-eslint      # ESLint
code --install-extension esbenp.prettier-vscode      # Prettier
```

### Extensiones comunes

```bash
code --install-extension eamodio.gitlens             # Historial de Git en el editor
code --install-extension streetsidesoftware.code-spell-checker  # Corrector ortográfico
code --install-extension humao.rest-client           # Probar APIs desde archivos .http
```

El proyecto incluye `.vscode/settings.json` con la configuración recomendada. El linter se aplica automáticamente al guardar.

---

## Comandos del Día a Día

### Gestión del ambiente Docker

```bash
# Levantar todo (hacé esto al empezar a trabajar)
docker compose up -d

# Ver logs en tiempo real
docker compose logs -f backend      # Solo el backend
docker compose logs -f frontend     # Solo el frontend
docker compose logs -f              # Todos los servicios

# Reiniciar un servicio (útil después de cambiar variables de entorno)
docker compose restart backend

# Detener todo (al terminar de trabajar)
docker compose down
```

---

### Dependencias y calidad de código

```bash
# ── Backend (uv, en backend/) ────────────────────────────────
uv sync                                  # instala según pyproject.toml + uv.lock
uv add <paquete>                         # agrega una dependencia (commiteá pyproject.toml y uv.lock)
uv run uvicorn main:app --reload         # correr el backend fuera de Docker

# ── Frontend (pnpm, en frontend/) ────────────────────────────
pnpm install
pnpm dev                                 # dev server en http://localhost:5173
pnpm lint
pnpm build

# ── Tests (a futuro: todavía no hay suite en el scaffold) ────
uv run pytest
pnpm test
```

---

### Migraciones de base de datos (Alembic)

```bash
# Crear una nueva migración a partir de cambios en los modelos SQLAlchemy
docker compose exec backend alembic revision --autogenerate -m "agrega columna beca a legajos"

# Aplicar migraciones pendientes
docker compose exec backend alembic upgrade head

# Ver migración actual
docker compose exec backend alembic current

# Revertir la última migración (con cuidado)
docker compose exec backend alembic downgrade -1
```

---

### Acceso directo a la base de datos

```bash
# Conectarse con psql
docker compose exec postgres psql -U postgrado_user -d postgrado_dev

# Comandos útiles dentro de psql:
#   \dt             → listar tablas
#   \d legajos      → describir la tabla legajos (columnas, tipos, constraints)
#   \x              → activar modo vertical (más legible para filas con muchas columnas)
#   \q              → salir

# Consulta rápida sin entrar al prompt interactivo:
docker compose exec postgres psql -U postgrado_user -d postgrado_dev -c "SELECT id, dni, estado FROM legajos LIMIT 5;"
```

---

## Troubleshooting

### ❌ `docker compose up` falla con "port is already in use"

**Error:** `bind: address already in use` — algún puerto (5432, 5173, 8000) está ocupado.

```bash
# Ver qué proceso ocupa el puerto (Mac / Linux)
lsof -i :5432
lsof -i :8000

# En Windows PowerShell
netstat -ano | findstr :5432

# Solución A: detener el proceso que ocupa el puerto
# Solución B (Postgres): definir otro puerto de host en .env
# Ejemplo: DB_PORT=5433
```

---

### ❌ El servicio `backend` en estado "Restarting"

```bash
# Ver el error exacto
docker compose logs backend --tail=50

# Causas frecuentes:
# 1. La DB no terminó de iniciar → esperar 30 seg y correr: docker compose restart backend
# 2. Error de sintaxis en el código → el log muestra el traceback completo
# 3. Variable de entorno faltante → revisar que .env existe y tiene DATABASE_URL
# 4. Puerto 8000 ocupado por otra app → ver troubleshooting anterior
```

---

### ❌ `alembic upgrade head` falla con "connection refused"

**Causa:** La base de datos no terminó de iniciar (el healthcheck de Docker puede tardar).

```bash
# Verificar que el servicio postgres está "healthy" (no solo "Up")
docker compose ps
# Si dice "starting" esperar 30 segundos

# Intentar nuevamente
docker compose exec backend alembic upgrade head

# Si sigue fallando, verificar DATABASE_URL en .env:
# El host debe ser "postgres" (nombre del servicio en docker-compose), no "localhost"
# Ej: postgresql://postgrado_user:<password>@postgres:5432/postgrado_dev
```

---

### ❌ La app levanta pero el frontend no puede conectar al backend (CORS / 404)

```bash
# Verificar que el backend responde
curl http://localhost:8000/health
# Debe responder: {"status":"ok"}

# El frontend llama a /api/* y el proxy de Vite lo reenvía al backend.
# Si tocaste vite.config.ts, reiniciar el frontend
docker compose restart frontend
```

---

### ❌ `ModuleNotFoundError` en el backend

**Causa:** La dependencia no está en `pyproject.toml`/`uv.lock`, o la imagen quedó desactualizada.

```bash
# Agregar la dependencia con uv (en backend/) y commitear pyproject.toml + uv.lock
uv add <paquete>

# Reconstruir la imagen del backend para incluirla
docker compose build backend --no-cache
docker compose up -d backend
```

---

### ❌ En Windows: "exec format error" o scripts que no se ejecutan

**Causa:** Saltos de línea CRLF (Windows) en scripts que esperan LF (Unix).

```bash
# Configurar Git para no convertir saltos de línea al clonar
git config core.autocrlf false

# Si ya clonaste con CRLF, corregirlo:
git rm --cached -r .
git reset --hard
```

---

### ❌ Todo está roto. Quiero empezar desde cero.

```bash
# ⚠️ Esto borra la base de datos y todos los datos locales
docker compose down -v      # -v elimina los volúmenes (base de datos incluida)
docker compose up -d

# Migraciones y seed se vuelven a aplicar solos (init_db.py al arrancar el backend)
```

---

### ❌ El Swagger de FastAPI (`/api/v1/docs`) no muestra mis endpoints nuevos

**Causa:** FastAPI genera el Swagger en tiempo de ejecución, pero si el servidor tiene un error de importación, algunos routers no se cargan.

```bash
# Ver el error de carga
docker compose logs backend --tail=30

# El error más común: un import circular o un schema de Pydantic mal definido
# Buscar en el log: "ImportError" o "ValidationError"
```

---

## Checklist de Salida — Kickoff Semana 3

Antes de dar por terminado el kickoff, **todos los integrantes** del equipo deben poder completar esta lista de forma independiente:

```
AMBIENTE
[ ] git clone del repositorio del equipo funciona
[ ] docker compose up -d levanta los 3 servicios (postgres, backend, frontend) sin errores
[ ] docker compose ps muestra todos los servicios en estado "Up"

APLICACIÓN
[ ] http://localhost:8000/health responde {"status":"ok"}
[ ] http://localhost:8000/api/v1/health responde OK (DB conectada)
[ ] http://localhost:8000/api/v1/docs muestra el Swagger
[ ] http://localhost:5173/cohortes lista las cohortes sin errores de consola

BASE DE DATOS
[ ] init_db.py corrió sin errores (ver docker compose logs backend)
[ ] psql \dt muestra las tablas del sistema

GIT
[ ] Podés crear una rama feat/T{N}-... desde dev, commitear (Conventional Commits) y abrir un PR contra dev
```

> Si algún integrante no puede completar este checklist, **el equipo resuelve el bloqueo antes de avanzar al Sprint 1.** Un ambiente roto en una sola máquina es un riesgo real para la integración continua.
