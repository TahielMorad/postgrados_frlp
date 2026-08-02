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
          ? "rounded-lg border border-red-400 bg-red-50/40 p-5"
          : "rounded-lg border border-slate-200 p-5"
      }
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-slate-900">{documento.nombre}</h3>

            <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
              Obligatorio
            </span>
          </div>

          <p className="mt-1 text-sm text-slate-600">{documento.descripcion}</p>
        </div>

        <span
          className={
            archivo
              ? "rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700"
              : error
                ? "rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700"
                : "rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700"
          }
        >
          {archivo ? "Cargado" : "Pendiente"}
        </span>
      </div>

      {archivo ? (
        <div className="mt-4 rounded-md bg-slate-50 p-4">
          <p className="break-all text-sm font-medium text-slate-800">
            {archivo.name}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {formatearTamanoArchivo(archivo.size)}
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={abrirVistaPrevia}
              className="rounded-md border border-blue-300 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
            >
              Ver PDF
            </button>

            <label className="cursor-pointer rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
              Reemplazar
              <input
                id={inputId}
                type="file"
                accept="application/pdf,.pdf"
                className="sr-only"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
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

            <button
              type="button"
              onClick={() => onEliminar(documento.id)}
              className="rounded-md border border-red-300 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
            >
              Eliminar
            </button>
          </div>
        </div>
      ) : (
        <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 px-6 py-8 text-center hover:border-blue-400 hover:bg-blue-50">
          <span className="font-medium text-blue-700">
            Seleccionar archivo PDF
          </span>

          <span className="mt-1 text-sm text-slate-500">
            Tamaño máximo: 5 MB
          </span>

          <input
            id={inputId}
            type="file"
            accept="application/pdf,.pdf"
            className="sr-only"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
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
        <p id={errorId} role="alert" className="mt-3 text-sm text-red-700">
          {error}
        </p>
      )}
    </article>
  );
}
