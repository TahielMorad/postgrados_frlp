import { Button } from "../../../shared/components/Button";
import type { DocumentoId, DocumentoRequerido } from "../types/documento";
import { formatearTamanoArchivo } from "../utils/validarArchivo";

interface DocumentUploadFieldProps {
  documento: DocumentoRequerido;
  archivo?: File;
  error?: string;
  onSeleccionar: (documentoId: DocumentoId, archivo: File) => void;
  onEliminar: (documentoId: DocumentoId) => void;
}

export function DocumentUploadField({
  documento,
  archivo,
  error,
  onSeleccionar,
  onEliminar,
}: DocumentUploadFieldProps) {
  const inputId = `archivo-${documento.id}`;
  const errorId = `error-${documento.id}`;
  const descriptionId = `descripcion-${documento.id}`;

  function abrirVistaPrevia() {
    if (!archivo) {
      return;
    }

    const urlTemporal = URL.createObjectURL(archivo);

    window.open(urlTemporal, "_blank", "noopener,noreferrer");

    window.setTimeout(() => {
      URL.revokeObjectURL(urlTemporal);
    }, 60_000);
  }

  return (
    <article
      className={
        error
          ? "rounded-lg border border-red-400 bg-red-50/40 p-4 shadow-xs sm:p-5"
          : "rounded-lg border border-neutral-200 bg-white p-4 shadow-xs sm:p-5"
      }
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-bold text-neutral-950">
              {documento.nombre}
            </h3>

            <span className="rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-800">
              Obligatorio
            </span>
          </div>

          <p id={descriptionId} className="mt-1 text-sm text-neutral-600">
            {documento.descripcion}
          </p>
        </div>

        <span
          aria-live="polite"
          className={
            archivo
              ? "rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-800"
              : error
                ? "rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-semibold text-red-800"
                : "rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-900"
          }
        >
          {archivo ? "Cargado" : "Pendiente"}
        </span>
      </div>

      {archivo ? (
        <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
          <p className="break-all text-sm font-semibold text-neutral-900">
            {archivo.name}
          </p>

          <p className="mt-1 text-sm text-neutral-600">
            {formatearTamanoArchivo(archivo.size)}
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              type="button"
              onClick={abrirVistaPrevia}
              variant="secondary"
              size="sm"
            >
              Ver PDF
            </Button>

            <label className="ui-button ui-button-secondary ui-button-sm cursor-pointer focus-within:outline-none focus-within:ring-3 focus-within:ring-utn-300 focus-within:ring-offset-2">
              Reemplazar
              <input
                id={inputId}
                type="file"
                accept="application/pdf,.pdf"
                className="sr-only"
                aria-invalid={Boolean(error)}
                aria-describedby={
                  error ? `${descriptionId} ${errorId}` : descriptionId
                }
                onClick={(event) => {
                  event.currentTarget.value = "";
                }}
                onChange={(event) => {
                  const nuevoArchivo = event.target.files?.[0];

                  if (nuevoArchivo) {
                    onSeleccionar(documento.id, nuevoArchivo);
                  }
                }}
              />
            </label>

            <Button
              type="button"
              onClick={() => onEliminar(documento.id)}
              variant="danger"
              size="sm"
            >
              Eliminar
            </Button>
          </div>
        </div>
      ) : (
        <label className="mt-4 flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50/60 px-5 py-8 text-center transition-colors hover:border-utn-500 hover:bg-utn-50 focus-within:border-utn-600 focus-within:bg-utn-50 focus-within:outline-none focus-within:ring-3 focus-within:ring-utn-200 sm:px-6">
          <span className="font-semibold text-utn-800">
            Seleccionar archivo PDF
          </span>

          <span className="mt-1 text-sm text-neutral-600">
            Tamaño máximo: 5 MB
          </span>

          <input
            id={inputId}
            type="file"
            accept="application/pdf,.pdf"
            className="sr-only"
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? `${descriptionId} ${errorId}` : descriptionId
            }
            onClick={(event) => {
              event.currentTarget.value = "";
            }}
            onChange={(event) => {
              const nuevoArchivo = event.target.files?.[0];

              if (nuevoArchivo) {
                onSeleccionar(documento.id, nuevoArchivo);
              }
            }}
          />
        </label>
      )}

      {error && (
        <p id={errorId} role="alert" className="ui-error mt-3">
          {error}
        </p>
      )}
    </article>
  );
}
