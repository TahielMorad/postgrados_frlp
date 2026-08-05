import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "./AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  rolesPermitidos?: Array<"COORDINADOR" | "DOCENTE" | "CPR" | "ADMIN">;
}

export function ProtectedRoute({
  children,
  rolesPermitidos,
}: ProtectedRouteProps) {
  const { usuario, cargando } = useAuth();
  const location = useLocation();

  if (cargando) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-8">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-utn-500 border-t-transparent"></div>
          <p className="mt-4 text-sm font-semibold text-neutral-600">
            Cargando sesión...
          </p>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (rolesPermitidos && !rolesPermitidos.includes(usuario.rol)) {
    return (
      <div className="mx-auto my-12 max-w-xl rounded-xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
        <h2 className="text-xl font-bold text-red-900">Acceso restringido</h2>
        <p className="mt-2 text-sm text-red-700">
          Tu rol ({usuario.rol}) no tiene permisos para acceder a esta sección.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
