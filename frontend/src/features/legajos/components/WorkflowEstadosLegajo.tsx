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
        <h2 id="recorrido-principal-title" className="ui-section-title">
          Recorrido principal
        </h2>
        <p className="mt-2 text-sm leading-6 text-neutral-600">
          Secuencia normal desde el inicio de la inscripción hasta la
          graduación.
        </p>

        <ol className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-stretch">
          {recorridoPrincipal.map((estado, index) => (
            <li key={estado} className="flex min-w-0 flex-1 items-center gap-3">
              <div
                className={
                  estadoActual === estado
                    ? "h-full min-w-0 flex-1 rounded-lg border-2 border-utn-600 bg-utn-50 p-4 shadow-xs"
                    : "h-full min-w-0 flex-1 rounded-lg border border-neutral-200 bg-neutral-50/60 p-4"
                }
              >
                <BadgeEstado
                  estado={estado}
                  estadoActual={estadoActual === estado}
                />
                <p className="mt-3 text-sm leading-5 text-neutral-600">
                  {estadosLegajo[estado].descripcion}
                </p>
              </div>

              {index < recorridoPrincipal.length - 1 && (
                <span
                  aria-hidden="true"
                  className="self-center text-xl font-bold text-utn-500 lg:rotate-0"
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
        <h2 id="estados-alternativos-title" className="ui-section-title">
          Estados alternativos
        </h2>
        <p className="mt-2 text-sm leading-6 text-neutral-600">
          Desvíos, estados de seguimiento y cierres previstos por el SRS.
        </p>

        <ul className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {estadosAlternativos.map((estado) => (
            <li
              key={estado}
              className={
                estadoActual === estado
                  ? "rounded-lg border-2 border-utn-600 bg-utn-50 p-4 shadow-xs"
                  : "rounded-lg border border-neutral-200 bg-neutral-50/60 p-4"
              }
            >
              <BadgeEstado
                estado={estado}
                estadoActual={estadoActual === estado}
              />
              <p className="mt-3 text-sm leading-5 text-neutral-600">
                {estadosLegajo[estado].descripcion}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="transiciones-title">
        <h2 id="transiciones-title" className="ui-section-title">
          Transiciones permitidas
        </h2>
        <p className="mt-2 text-sm leading-6 text-neutral-600">
          Referencia de acciones y roles. La autorización y cada cambio real de
          estado deben ser validados por el backend.
        </p>

        <div
          className="ui-table-shell mt-5"
          role="region"
          aria-label="Tabla de transiciones permitidas"
          tabIndex={0}
        >
          <table className="ui-table">
            <thead>
              <tr>
                <th scope="col">Acción</th>
                <th scope="col">Desde</th>
                <th scope="col">Hacia</th>
                <th scope="col">Rol</th>
                <th scope="col">Condición</th>
              </tr>
            </thead>
            <tbody>
              {transicionesLegajo.map((transicion) => (
                <tr
                  key={`${transicion.accion}-${transicion.desde}-${transicion.hacia}`}
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap px-4 py-3.5 font-semibold text-neutral-950"
                  >
                    {transicion.accion}
                  </th>
                  <td className="px-4 py-3.5">
                    <BadgeEstado estado={transicion.desde} />
                  </td>
                  <td className="px-4 py-3.5">
                    <BadgeEstado estado={transicion.hacia} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-neutral-700">
                    {nombresRol[transicion.rol]}
                  </td>
                  <td className="min-w-64 px-4 py-3.5 leading-5 text-neutral-600">
                    {transicion.automatica && (
                      <span className="mr-2 inline-flex rounded-full border border-violet-200 bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-900">
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
