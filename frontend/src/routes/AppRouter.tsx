import { Route, Routes } from "react-router";
import { DocumentosPage } from "../pages/DocumentosPage";
import { HomePage } from "../pages/HomePage";
import { InscripcionPage } from "../pages/InscripcionPage";
import { LegajosPage } from "../pages/LegajosPage";
import { LoginPage } from "../pages/LoginPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ProtectedRoute } from "../shared/auth/ProtectedRoute";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/inscripcion" element={<InscripcionPage />} />
      <Route path="/inscripcion/documentos" element={<DocumentosPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/coordinador/legajos"
        element={
          <ProtectedRoute rolesPermitidos={["COORDINADOR", "ADMIN"]}>
            <LegajosPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
