import { useState, type FormEvent } from "react";
import type {
  EstadoLegajo,
  FiltroBeca,
  FiltrosLegajo as FiltrosLegajoValues,
} from "../types/legajo";

interface OpcionEstado {
  valor: EstadoLegajo;
  nombre: string;
}

interface FiltrosLegajoProps {
  filtrosIniciales: FiltrosLegajoValues;
  estados: OpcionEstado[];
  cohortes: string[];
  carreras: string[];
  onAplicar: (filtros: FiltrosLegajoValues) => void;
}

const inputClassName =
  "mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

export function FiltrosLegajo({
  filtrosIniciales,
  estados,
  cohortes,
  carreras,
  onAplicar,
}: FiltrosLegajoProps) {
  const [filtros, setFiltros] = useState(filtrosIniciales);

  function aplicarFiltros(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onAplicar(filtros);
  }

  function limpiarFiltros() {
    setFiltros(filtrosIniciales);
    onAplicar(filtrosIniciales);
  }

  return (
    <form
      onSubmit={aplicarFiltros}
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <div className="md:col-span-2 xl:col-span-1">
          <label
            htmlFor="busqueda-legajo"
            className="block text-sm font-medium text-slate-700"
          >
            DNI o apellido
          </label>
          <input
            id="busqueda-legajo"
            type="search"
            autoComplete="off"
            value={filtros.busqueda}
            onChange={(event) =>
              setFiltros((actuales) => ({
                ...actuales,
                busqueda: event.target.value,
              }))
            }
            className={inputClassName}
            placeholder="Ej.: 30456789 o González"
          />
        </div>

        <div>
          <label
            htmlFor="estado-legajo"
            className="block text-sm font-medium text-slate-700"
          >
            Estado
          </label>
          <select
            id="estado-legajo"
            value={filtros.estado}
            onChange={(event) =>
              setFiltros((actuales) => ({
                ...actuales,
                estado: event.target.value as EstadoLegajo | "",
              }))
            }
            className={inputClassName}
          >
            <option value="">Todos</option>
            {estados.map((estado) => (
              <option key={estado.valor} value={estado.valor}>
                {estado.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="cohorte-legajo"
            className="block text-sm font-medium text-slate-700"
          >
            Cohorte
          </label>
          <select
            id="cohorte-legajo"
            value={filtros.cohorte}
            onChange={(event) =>
              setFiltros((actuales) => ({
                ...actuales,
                cohorte: event.target.value,
              }))
            }
            className={inputClassName}
          >
            <option value="">Todas</option>
            {cohortes.map((cohorte) => (
              <option key={cohorte} value={cohorte}>
                Cohorte {cohorte}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="carrera-legajo"
            className="block text-sm font-medium text-slate-700"
          >
            Carrera
          </label>
          <select
            id="carrera-legajo"
            value={filtros.carrera}
            onChange={(event) =>
              setFiltros((actuales) => ({
                ...actuales,
                carrera: event.target.value,
              }))
            }
            className={inputClassName}
          >
            <option value="">Todas</option>
            {carreras.map((carrera) => (
              <option key={carrera} value={carrera}>
                {carrera}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="beca-legajo"
            className="block text-sm font-medium text-slate-700"
          >
            Tiene beca
          </label>
          <select
            id="beca-legajo"
            value={filtros.beca}
            onChange={(event) =>
              setFiltros((actuales) => ({
                ...actuales,
                beca: event.target.value as FiltroBeca,
              }))
            }
            className={inputClassName}
          >
            <option value="">Todos</option>
            <option value="SI">Sí</option>
            <option value="NO">No</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={limpiarFiltros}
          className="rounded-md border border-slate-300 px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
        >
          Limpiar filtros
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-700 px-5 py-2.5 font-medium text-white hover:bg-blue-800"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
