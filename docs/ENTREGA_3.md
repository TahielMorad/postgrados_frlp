# Documentación de Entrega 3 — Backend y Frontend Integrados

**Proyecto:** Sistema de Gestión Académica de Posgrados · UTN FRLP · 2026  
**Entrega:** TP Entrega 3 — Integración Completa de Frontend y Backend REST API con Base de Datos PostgreSQL.

---

## 🚀 Guía de Despliegue Rápido (Docker Compose)

### Prerrequisitos
- **Docker** $\ge 24.0$ y **Docker Compose** $\ge 2.20$ instalado.

### Pasos para Ejecutar el Sistema Integrado

1. **Clonar / Ubicarse en la raíz del repositorio:**
   ```bash
   cd /var/www/postgrados_frlp
   ```

2. **Levantar todos los servicios con Docker Compose:**
   ```bash
   docker compose up -d --build
   ```

3. **Verificar el estado de los contenedores:**
   ```bash
   docker compose ps
   ```

Los servicios quedarán corriendo en los siguientes puertos:

| Servicio | Tecnología | URL / Puerto | Descripción |
|----------|------------|--------------|-------------|
| **Frontend Web** | React 19 + TypeScript + Vite | [http://localhost:3000](http://localhost:3000) | Interfaz web de aspirantes y coordinadores |
| **Backend REST API** | FastAPI + Python 3.12 | [http://localhost:8000/api/v1](http://localhost:8000/api/v1) | API REST del módulo Core |
| **Documentación Swagger** | OpenAPI 3.0 | [http://localhost:8000/api/v1/docs](http://localhost:8000/api/v1/docs) | Documentación interactiva de la API |
| **Servidor de Correo (MailHog)** | MailHog | [http://localhost:8025](http://localhost:8025) | Interfaz web para visualizar emails |
| **Base de Datos** | PostgreSQL 15 Alpine | `localhost:5432` | Base de datos relacional `postgrado_dev` |

---

## 🔑 Credenciales de Prueba (Demo)

El sistema cuenta con usuarios semilla precargados automáticamente durante el despliegue inicial:

| Rol | Email | Contraseña | Permisos |
|-----|-------|------------|----------|
| **Administrador / Coordinador (Principal)** | `admin@prueba.com` | `admin123` | Acceso completo al Panel de Legajos, Cambios de Estado y Filtros |
| **Coordinadora Académica** | `admin@fenix.test` | `Admin1234!` | Gestión de legajos y cohortes |
| **Docente** | `docente@fenix.test` | `Docente1234!` | Consulta de aspirantes matriculados |
| **CPR** | `cpr@fenix.test` | `Cpr1234!` | Acceso especializado |

---

## 📐 Arquitectura del Sistema

```
postgrados_frlp/
├── docker-compose.yml           # Orquestación de servicios en Docker
├── frontend/                    # Aplicación Web React 19 + TypeScript
│   ├── src/
│   │   ├── features/            # Módulos por dominio (inscripcion, legajos, documentos)
│   │   ├── pages/               # Páginas (LoginPage, LegajosPage, InscripcionPage)
│   │   ├── shared/
│   │   │   ├── api/             # Cliente HTTP apiFetch, legajosApi, authApi
│   │   │   └── auth/            # AuthContext y ProtectedRoute
│   │   └── routes/              # Configuración de rutas
├── src/core/                    # Backend REST API (FastAPI + Clean Architecture)
│   ├── main.py                  # Punto de entrada FastAPI y configuración de CORS
│   ├── database.py              # Engine y Session de SQLAlchemy
│   ├── security.py              # Hasheo bcrypt y firmas JWT
│   ├── init_db.py               # Ejecución de migraciones y Seed Data
│   ├── alembic/                 # Migraciones DDL versionadas de base de datos
│   ├── models/                  # Entidades ORM (Legajo, Cohorte, Documento, Auditoria, Usuario)
│   ├── schemas/                 # DTOs de validación con Pydantic v2
│   ├── routers/                 # Endpoints REST (/auth, /legajos, /documentos, /health)
│   └── services/                # Servicio de almacenamiento seguro de archivos PDF
└── docs/                        # Documentación técnica y especificaciones
```

---

## 📋 Endpoints de la API REST (`/api/v1`)

### 1. Autenticación y Salud
- `GET /api/v1/health` — Verificación de estado del servidor y la base de datos PostgreSQL (retorna `HTTP 503` si la BD no responde).
- `POST /api/v1/auth/login` — Autenticación con email y contraseña. Devuelve `accessToken` JWT y datos del usuario.

### 2. Gestión de Preinscripciones y Legajos
- `POST /api/v1/legajos` — Registro público de preinscripción de aspirantes. Asigna dinámicamente la cohorte activa y genera número de seguimiento.
- `GET /api/v1/legajos` — Consulta filtrable de legajos por DNI, estado, cohorte, carrera y solicitud de beca (requiere token JWT).
- `GET /api/v1/legajos/{id}` — Obtiene el detalle completo de un legajo por su ID.
- `PATCH /api/v1/legajos/{id}/estado` — Actualiza el estado del legajo según el workflow permitido, genera número de legajo único (`26-001-XXXXXXXX`) y registra la auditoría con fecha, usuario y observación.

### 3. Almacenamiento Seguro de PDFs
- `POST /api/v1/legajos/{id}/documentos` — Subida segura de archivos PDF multipart/form-data. Valida extensión, tamaño ($\le 5\text{ MB}$) y los magic bytes (`%PDF`). Almacena los archivos fuera del webroot en `/var/postgrado-storage` registrando su hash SHA-256.
- `GET /api/v1/documentos/{id}/download` — Streaming seguro de archivos PDF con verificación de autenticación JWT.

---

## 🧪 Matriz de Verificación y Calidad

- **Compilación de Backend Python (`python3 -m py_compile`):** 0 errores.
- **Compilación de Frontend TypeScript (`npm run build`):** 0 errores.
- **Linter de Código (`npx eslint`):** 0 errores / 0 advertencias.
- **Orquestación Docker (`docker compose config`):** 0 errores de sintaxis o montajes.
