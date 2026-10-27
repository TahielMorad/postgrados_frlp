# Frontend — Sistema de Posgrado

React 19 + TypeScript + Vite + Tailwind CSS, gestionado con **pnpm**.

## Comandos

```bash
pnpm install     # dependencias (lockfile: pnpm-lock.yaml)
pnpm dev         # dev server en http://localhost:5173
pnpm lint        # ESLint
pnpm format      # Prettier (pnpm format:check para verificar)
pnpm build       # type-check + build de producción en dist/
```

## API

El cliente (`src/shared/api/client.ts`) usa la ruta relativa `/api/v1`. En
desarrollo, el proxy de Vite (`vite.config.ts`) reenvía `/api/*` al backend:
`http://localhost:8000` por defecto, o `VITE_PROXY_TARGET` (en docker compose,
`http://backend:8000`). `VITE_API_URL` permite apuntar a otra URL absoluta.

## Estructura

```
src/
├── features/   # Módulos por dominio: cohortes, inscripcion, legajos, documentos
├── pages/      # Páginas enrutadas
├── routes/     # AppRouter (react-router)
└── shared/     # api, auth, componentes comunes
```

Para levantar todo el sistema (base de datos + backend + frontend) ver el
README de la raíz: `docker compose up`.
