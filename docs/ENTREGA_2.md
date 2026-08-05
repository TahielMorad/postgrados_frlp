# Documentación de Entrega 2 — Frontend y Diseño Institucional

**Proyecto:** Sistema de Gestión Académica de Posgrados · UTN FRLP · 2026  
**Entrega:** TP Entrega 2 — Maquetado Frontend, Diseño Institucional UTN y Capa de Presentación.

---

## 🎨 Resumen de la Entrega 2

En la **Entrega 2** se implementó la capa de presentación **Frontend** completa con **React 19**, **TypeScript**, **Vite 6** y **TailwindCSS**, integrando la identidad visual institucional de la **Universidad Tecnológica Nacional - Facultad Regional La Plata (UTN FRLP)**.

---

## 🧩 Componentes y Pantallas Implementadas

1. **Diseño Institucional UTN (`AppShell`, `Header`, `Footer`):**
   - Integración de los colores institucionales (`#004B87`, `#0284C7`), tipografía Inter/Roboto y el logo vectorial de la UTN FRLP.
   - Navegación responsive con barra de estado y usuario autenticado.

2. **Formulario de Preinscripción de Aspirantes (`/inscripcion`):**
   - Formulario de alta de preinscripción ([`InscripcionForm.tsx`](file:///var/www/postgrados_frlp/frontend/src/features/inscripcion/components/InscripcionForm.tsx)) validado dinámicamente con **Zod** y **`react-hook-form`**.
   - Validación de DNI/Pasaporte, campos condicionales de becas (porcentaje solicitado) y recuperación automática de borradores locales.

3. **Carga de Documentación Obligatoria (`/inscripcion/documentos`):**
   - Interfaz de carga de documentos PDF ([`DocumentUploadForm.tsx`](file:///var/www/postgrados_frlp/frontend/src/features/documentos/components/DocumentUploadForm.tsx)) con soporte drag & drop, validación de extensión `.pdf` y límite de tamaño.

4. **Panel de Gestión de Legajos para Coordinadores (`/coordinador/legajos`):**
   - Tabla interactiva de legajos ([`TablaLegajos.tsx`](file:///var/www/postgrados_frlp/frontend/src/features/legajos/components/TablaLegajos.tsx)) con badges de colores para el workflow de estados.
   - Diálogo modal ([`ModalCambioEstado.tsx`](file:///var/www/postgrados_frlp/frontend/src/features/legajos/components/ModalCambioEstado.tsx)) para transiciones de estados con campos para ingresar observaciones de auditoría y soporte de teclado (`Escape`).

5. **Autenticación y Control de Acceso (`/login`):**
   - Pantalla de acceso ([`LoginPage.tsx`](file:///var/www/postgrados_frlp/frontend/src/pages/LoginPage.tsx)) con credenciales de prueba preconfiguradas (`admin@prueba.com` / `admin123`).
   - Contexto de autenticación ([`AuthContext.tsx`](file:///var/www/postgrados_frlp/frontend/src/shared/auth/AuthContext.tsx)) y guard de rutas ([`ProtectedRoute.tsx`](file:///var/www/postgrados_frlp/frontend/src/shared/auth/ProtectedRoute.tsx)).

---

## 🛠️ Tecnologías y Estructura Frontend

```
frontend/
├── src/
│   ├── features/
│   │   ├── documentos/        # Componentes y lógica de carga de PDFs
│   │   ├── inscripcion/       # Formulario y validaciones Zod de preinscripción
│   │   └── legajos/           # Tabla, modales, badges y data del workflow
│   ├── pages/                 # Páginas (LoginPage, LegajosPage, InscripcionPage, NotFoundPage)
│   ├── routes/                # Configuración del AppRouter con React Router v7
│   └── shared/
│       ├── api/               # Cliente HTTP (client.ts, legajosApi.ts, authApi.ts)
│       ├── auth/              # AuthContext y ProtectedRoute
│       └── components/        # UI kit reutilizable (Button, Input, Badge, AppShell)
├── Dockerfile.dev
├── package.json
└── vite.config.ts
```

---

## 🧪 Verificación de Calidad

- **Build de Producción (`npm run build`):** Compilación limpia sin errores TypeScript.
- **Linter de Código (`npx eslint`):** 0 errores y 0 advertencias.
