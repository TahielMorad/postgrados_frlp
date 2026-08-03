import { useState, type FormEvent } from "react";
import { Button } from "../../../shared/components/Button";
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

const inputClassName = "ui-control";

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
      aria-label="Filtros de búsqueda de legajos"
      className="ui-surface border-t-4 border-t-utn-500 p-5 sm:p-6"
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <div className="md:col-span-2 xl:col-span-1">
          <label htmlFor="busqueda-legajo" className="ui-label">
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
          <label htmlFor="estado-legajo" className="ui-label">
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
          <label htmlFor="cohorte-legajo" className="ui-label">
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
          <label htmlFor="carrera-legajo" className="ui-label">
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
          <label htmlFor="beca-legajo" className="ui-label">
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

      <div className="mt-6 flex flex-col-reverse gap-3 border-t border-neutral-200 pt-5 sm:flex-row sm:justify-end">
        <Button type="button" onClick={limpiarFiltros} variant="secondary">
          Limpiar filtros
        </Button>
        <Button type="submit">Buscar</Button>
      </div>
    </form>
  );
}
