import {
  estadosAlternativos,
  estadosLegajo,
  nombresRol,
  recorridoPrincipal,
  transicionesLegajo,
} from "../data/workflowLegajo";
import type { EstadoLegajo } from "../types/legajo";
import { BadgeEstado } from "./BadgeEstado";

interface WorkflowEstadosLegajoProps {
  estadoActual?: EstadoLegajo;
}

export function WorkflowEstadosLegajo({
  estadoActual,
}: WorkflowEstadosLegajoProps) {
  return (
    <div className="space-y-8">
      <section aria-labelledby="recorrido-principal-title">
        <h2
          id="recorrido-principal-title"
          className="text-xl font-semibold text-slate-900"
        >
          Recorrido principal
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Secuencia normal desde el inicio de la inscripción hasta la
          graduación.
        </p>

        <ol className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-stretch">
          {recorridoPrincipal.map((estado, index) => (
            <li key={estado} className="flex flex-1 items-center gap-3">
              <div
                className={
                  estadoActual === estado
                    ? "h-full flex-1 rounded-lg border-2 border-blue-600 bg-blue-50 p-4"
                    : "h-full flex-1 rounded-lg border border-slate-200 bg-white p-4"
                }
              >
                <BadgeEstado
                  estado={estado}
                  estadoActual={estadoActual === estado}
                />
                <p className="mt-3 text-sm text-slate-600">
                  {estadosLegajo[estado].descripcion}
                </p>
              </div>

              {index < recorridoPrincipal.length - 1 && (
                <span
                  aria-hidden="true"
                  className="self-center text-xl font-bold text-slate-400 lg:rotate-0"
                >
                  <span className="lg:hidden">↓</span>
                  <span className="hidden lg:inline">→</span>
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="estados-alternativos-title">
        <h2
          id="estados-alternativos-title"
          className="text-xl font-semibold text-slate-900"
        >
          Estados alternativos
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Desvíos, estados de seguimiento y cierres previstos por el SRS.
        </p>

        <ul className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {estadosAlternativos.map((estado) => (
            <li
              key={estado}
              className={
                estadoActual === estado
                  ? "rounded-lg border-2 border-blue-600 bg-blue-50 p-4"
                  : "rounded-lg border border-slate-200 bg-white p-4"
              }
            >
              <BadgeEstado
                estado={estado}
                estadoActual={estadoActual === estado}
              />
              <p className="mt-3 text-sm text-slate-600">
                {estadosLegajo[estado].descripcion}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="transiciones-title">
        <h2
          id="transiciones-title"
          className="text-xl font-semibold text-slate-900"
        >
          Transiciones permitidas
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Referencia de acciones y roles. La autorización y cada cambio real de
          estado deben ser validados por el backend.
        </p>

        <div className="mt-5 overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Acción
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Desde
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Hacia
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Rol
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Condición
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {transicionesLegajo.map((transicion) => (
                <tr
                  key={`${transicion.accion}-${transicion.desde}-${transicion.hacia}`}
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap px-4 py-3 font-semibold text-slate-900"
                  >
                    {transicion.accion}
                  </th>
                  <td className="px-4 py-3">
                    <BadgeEstado estado={transicion.desde} />
                  </td>
                  <td className="px-4 py-3">
                    <BadgeEstado estado={transicion.hacia} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                    {nombresRol[transicion.rol]}
                  </td>
                  <td className="min-w-64 px-4 py-3 text-slate-600">
                    {transicion.automatica && (
                      <span className="mr-2 inline-flex rounded-full bg-violet-100 px-2 py-1 text-xs font-semibold text-violet-900">
                        Automática
                      </span>
                    )}
                    {transicion.aclaracion ??
                      "Sin condición adicional en el SRS."}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
