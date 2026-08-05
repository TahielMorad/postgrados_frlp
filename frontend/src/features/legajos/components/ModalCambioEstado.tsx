import { useState, useEffect, type FormEvent } from "react";
import { Button } from "../../../shared/components/Button";
import { FeedbackMessage } from "../../../shared/components/FeedbackMessage";
import { estadosLegajo } from "../data/workflowLegajo";
import type { EstadoLegajo, LegajoListado } from "../types/legajo";
import { BadgeEstado } from "./BadgeEstado";

interface ModalCambioEstadoProps {
  legajo: LegajoListado;
  onClose: () => void;
  onGuardar: (
    legajoId: string,
    nuevoEstado: EstadoLegajo,
    comentario: string,
  ) => Promise<void>;
}

const transicionesPermitidas: Record<EstadoLegajo, EstadoLegajo[]> = {
  BORRADOR: ["PENDIENTE"],
  PENDIENTE: ["EN_REVISION", "OBSERVADO", "RECHAZADO"],
  EN_REVISION: ["COMPLETADO", "OBSERVADO", "RECHAZADO"],
  OBSERVADO: ["PENDIENTE", "EN_REVISION"],
  COMPLETADO: ["ACTIVO", "VENCIDO", "RECHAZADO"],
  ACTIVO: ["GRADUADO", "EN_RIESGO", "BAJA"],
  EN_RIESGO: ["ACTIVO", "BAJA"],
  VENCIDO: ["PENDIENTE"],
  RECHAZADO: ["PENDIENTE"],
  BAJA: ["PENDIENTE"],
  GRADUADO: [],
};

export function ModalCambioEstado({
  legajo,
  onClose,
  onGuardar,
}: ModalCambioEstadoProps) {
  const opcionesDisponibles =
    transicionesPermitidas[legajo.estado] || Object.keys(estadosLegajo);

  const [nuevoEstado, setNuevoEstado] = useState<EstadoLegajo>(
    opcionesDisponibles[0] || legajo.estado,
  );
  const [comentario, setComentario] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setCargando(true);

    try {
      await onGuardar(legajo.id, nuevoEstado, comentario);
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo actualizar el estado del legajo.",
      );
    } finally {
      setCargando(false);
    }
  }

  return (
    <div
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-neutral-950/60 p-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-lg rounded-xl border border-neutral-200 bg-white p-6 shadow-2xl transition-all sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="modal-title"
              className="font-display text-xl font-bold text-neutral-950"
            >
              Cambiar estado del legajo
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Estudiante:{" "}
              <span className="font-semibold text-neutral-900">
                {legajo.apellido}, {legajo.nombre}
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana modal"
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 rounded-lg bg-neutral-50 p-3 text-sm flex items-center gap-3 border border-neutral-200">
          <span className="text-neutral-600 font-medium">Estado actual:</span>
          <BadgeEstado estado={legajo.estado} />
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label htmlFor="nuevoEstado" className="ui-label">
              Nuevo estado *
            </label>
            <select
              id="nuevoEstado"
              value={nuevoEstado}
              onChange={(e) => setNuevoEstado(e.target.value as EstadoLegajo)}
              className="ui-control"
            >
              {opcionesDisponibles.map((est) => (
                <option key={est} value={est}>
                  {estadosLegajo[est as EstadoLegajo]?.nombre || est}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="comentario" className="ui-label">
              Comentario / Observación (opcional)
            </label>
            <textarea
              id="comentario"
              rows={3}
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Ingresá detalles o motivos del cambio de estado..."
              className="ui-control"
            />
          </div>

          {error && (
            <FeedbackMessage role="alert" tone="error">
              {error}
            </FeedbackMessage>
          )}

          <div className="flex justify-end gap-3 pt-3 border-t border-neutral-200">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" loading={cargando}>
              Guardar cambio
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
