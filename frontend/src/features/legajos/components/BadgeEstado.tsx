import { estadosLegajo } from "../data/workflowLegajo";
import type { EstadoLegajo } from "../types/legajo";

interface BadgeEstadoProps {
  estado: EstadoLegajo;
  estadoActual?: boolean;
}

export function BadgeEstado({
  estado,
  estadoActual = false,
}: BadgeEstadoProps) {
  const configuracion = estadosLegajo[estado];

  return (
    <span
      aria-current={estadoActual ? "step" : undefined}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${configuracion.className} ${estadoActual ? "ring-2 ring-utn-600 ring-offset-2" : ""}`}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-current opacity-70"
      />
      {configuracion.nombre}
    </span>
  );
}
