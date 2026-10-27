import type { Cohorte } from "../types/cohorte";

interface ListaCohortesProps {
  cohortes: Cohorte[];
}

const formatoFecha = new Intl.DateTimeFormat("es-AR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function formatearFechaInicio(fecha: string | null): string {
  if (!fecha) return "A definir";
  const valor = new Date(fecha);
  return Number.isNaN(valor.getTime()) ? fecha : formatoFecha.format(valor);
}

function BadgeInscripcion({ abierta }: { abierta: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${
        abierta
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-neutral-300 bg-neutral-100 text-neutral-700"
      }`}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-current opacity-70"
      />
      {abierta ? "Inscripción abierta" : "Inscripción cerrada"}
    </span>
  );
}

export function ListaCohortes({ cohortes }: ListaCohortesProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cohortes.map((cohorte) => (
        <li
          key={cohorte.id}
          className="ui-surface relative flex flex-col gap-4 overflow-hidden p-5 sm:p-6"
        >
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-1 bg-utn-500"
          />
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="ui-eyebrow mb-1">Cohorte {cohorte.anio}</p>
              <h2 className="font-display text-xl font-bold text-neutral-950">
                {cohorte.nombre}
              </h2>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="font-semibold text-neutral-500">Año</dt>
              <dd className="text-neutral-900">{cohorte.anio}</dd>
            </div>
            <div>
              <dt className="font-semibold text-neutral-500">Inicio</dt>
              <dd className="text-neutral-900">
                {formatearFechaInicio(cohorte.fecha_inicio)}
              </dd>
            </div>
          </dl>
          <div>
            <BadgeInscripcion abierta={cohorte.inscripcion_abierta} />
          </div>
        </li>
      ))}
    </ul>
  );
}
