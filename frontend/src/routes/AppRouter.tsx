import { Route, Routes } from "react-router";
import { HomePage } from "../pages/HomePage";
import { InscripcionPage } from "../pages/InscripcionPage";
import { LegajosPage } from "../pages/LegajosPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/inscripcion" element={<InscripcionPage />} />
      <Route path="/coordinador/legajos" element={<LegajosPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
