import { useState } from "react";
import type { LegajoListado } from "../types/legajo";
import { exportarLegajosExcel } from "../utils/exportarLegajosExcel";

interface ExportarLegajosButtonProps {
  legajos: LegajoListado[];
}

export function ExportarLegajosButton({ legajos }: ExportarLegajosButtonProps) {
  const [exportando, setExportando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function exportar() {
    setExportando(true);
    setError(null);

    try {
      await exportarLegajosExcel(legajos);
    } catch {
      setError(
        "No se pudo generar el archivo Excel. Intentá nuevamente en unos segundos.",
      );
    } finally {
      setExportando(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={exportar}
        disabled={exportando || legajos.length === 0}
        className="rounded-md bg-emerald-700 px-5 py-2.5 font-medium text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {exportando ? "Generando Excel…" : "Exportar Excel"}
      </button>

      {error && (
        <p role="alert" className="max-w-sm text-right text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
