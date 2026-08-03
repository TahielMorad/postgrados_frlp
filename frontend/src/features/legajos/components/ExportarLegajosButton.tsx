import { useState } from "react";
import { Button } from "../../../shared/components/Button";
import { FeedbackMessage } from "../../../shared/components/FeedbackMessage";
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
      <Button
        type="button"
        onClick={exportar}
        disabled={exportando || legajos.length === 0}
        loading={exportando}
        variant="secondary"
      >
        {exportando ? "Generando Excel…" : "Exportar Excel"}
      </Button>

      {error && (
        <FeedbackMessage
          role="alert"
          tone="error"
          className="max-w-sm text-left"
        >
          {error}
        </FeedbackMessage>
      )}
    </div>
  );
}
