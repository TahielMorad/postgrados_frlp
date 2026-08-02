import type { LegajoListado } from "../types/legajo";
import { BadgeEstado } from "./BadgeEstado";

interface TablaLegajosProps {
  legajos: LegajoListado[];
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

export function TablaLegajos({ legajos }: TablaLegajosProps) {
  if (legajos.length === 0) {
    return (
      <div
        role="status"
        className="rounded-lg border border-slate-200 bg-white px-6 py-12 text-center text-slate-600"
      >
        <p className="font-semibold text-slate-900">
          No se encontraron resultados
        </p>
        <p className="mt-2 text-sm">
          Revisá el DNI ingresado o probá con otros filtros.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-100 text-slate-700">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">
              Nº Legajo
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Apellido y nombre
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              DNI
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Estado
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Cohorte
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Carrera
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Beca
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Fecha inscripción
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {legajos.map((legajo) => (
            <tr key={legajo.id} className="hover:bg-slate-50">
              <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-900">
                {legajo.numeroLegajo ?? "Sin asignar"}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-800">
                {legajo.apellido}, {legajo.nombre}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                {legajo.dni}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <BadgeEstado estado={legajo.estado} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                {legajo.cohorte}
              </td>
              <td className="min-w-72 px-4 py-3 text-slate-700">
                {legajo.carrera}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                {legajo.tieneBeca ? "Sí" : "No"}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                {formatearFecha(legajo.fechaInscripcion)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
