import type { LegajoListado } from "../types/legajo";
import { EmptyState } from "../../../shared/components/FeedbackMessage";
import { BadgeEstado } from "./BadgeEstado";

interface TablaLegajosProps {
  legajos: LegajoListado[];
  onCambiarEstado?: (legajo: LegajoListado) => void;
}

const formateadorFecha = new Intl.DateTimeFormat("es-AR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

function formatearFecha(fecha: string): string {
  return formateadorFecha.format(new Date(`${fecha}T00:00:00Z`));
}

export function TablaLegajos({ legajos, onCambiarEstado }: TablaLegajosProps) {
  if (legajos.length === 0) {
    return (
      <EmptyState role="status" title="No se encontraron resultados">
        <p>Revisá el DNI ingresado o probá con otros filtros.</p>
      </EmptyState>
    );
  }

  return (
    <div
      className="ui-table-shell"
      role="region"
      aria-label="Tabla de resultados de legajos"
      tabIndex={0}
    >
      <table className="ui-table">
        <thead>
          <tr>
            <th scope="col">Nº Legajo</th>
            <th scope="col">Apellido y nombre</th>
            <th scope="col">DNI</th>
            <th scope="col">Estado</th>
            <th scope="col">Cohorte</th>
            <th scope="col">Carrera</th>
            <th scope="col">Beca</th>
            <th scope="col">Fecha inscripción</th>
            {onCambiarEstado && <th scope="col">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {legajos.map((legajo) => (
            <tr key={legajo.id}>
              <td className="whitespace-nowrap px-4 py-3.5 font-semibold text-neutral-950">
                {legajo.numeroLegajo ?? "Sin asignar"}
              </td>
              <td className="whitespace-nowrap px-4 py-3.5 text-neutral-900">
                {legajo.apellido}, {legajo.nombre}
              </td>
              <td className="whitespace-nowrap px-4 py-3.5 text-neutral-700">
                {legajo.dni}
              </td>
              <td className="whitespace-nowrap px-4 py-3.5">
                <BadgeEstado estado={legajo.estado} />
              </td>
              <td className="whitespace-nowrap px-4 py-3.5 text-neutral-700">
                {legajo.cohorte}
              </td>
              <td className="min-w-72 px-4 py-3.5 text-neutral-700">
                {legajo.carrera}
              </td>
              <td className="whitespace-nowrap px-4 py-3.5 text-neutral-700">
                {legajo.tieneBeca ? "Sí" : "No"}
              </td>
              <td className="whitespace-nowrap px-4 py-3.5 text-neutral-700">
                {formatearFecha(legajo.fechaInscripcion)}
              </td>
              {onCambiarEstado && (
                <td className="whitespace-nowrap px-4 py-3.5">
                  <button
                    type="button"
                    onClick={() => onCambiarEstado(legajo)}
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-utn-700 hover:text-utn-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-utn-500"
                  >
                    Gestionar estado
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
