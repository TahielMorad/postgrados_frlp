import { useMemo, useState } from "react";
import { Link } from "react-router";
import { ExportarLegajosButton } from "../features/legajos/components/ExportarLegajosButton";
import { FiltrosLegajo } from "../features/legajos/components/FiltrosLegajo";
import { TablaLegajos } from "../features/legajos/components/TablaLegajos";
import { WorkflowEstadosLegajo } from "../features/legajos/components/WorkflowEstadosLegajo";
import {
  carrerasMock,
  cohortesMock,
  legajosMock,
} from "../features/legajos/data/legajosMock";
import { estadosLegajo } from "../features/legajos/data/workflowLegajo";
import type {
  EstadoLegajo,
  FiltrosLegajo as FiltrosLegajoValues,
} from "../features/legajos/types/legajo";
import { filtrarLegajos } from "../features/legajos/utils/filtrarLegajos";

const filtrosIniciales: FiltrosLegajoValues = {
  busqueda: "",
  estado: "",
  cohorte: "",
  carrera: "",
  beca: "",
};

const opcionesEstado = Object.entries(estadosLegajo).map(
  ([valor, configuracion]) => ({
    valor: valor as EstadoLegajo,
    nombre: configuracion.nombre,
  }),
);

export function LegajosPage() {
  const [filtros, setFiltros] = useState(filtrosIniciales);

  const resultados = useMemo(
    () => filtrarLegajos(legajosMock, filtros),
    [filtros],
  );

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <Link to="/" className="font-medium text-blue-700 hover:underline">
          ← Volver al inicio
        </Link>

        <header className="mt-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Búsqueda y listado de legajos
          </h1>


        </header>


        <div className="mt-8">
          <FiltrosLegajo
            filtrosIniciales={filtrosIniciales}
            estados={opcionesEstado}
            cohortes={cohortesMock}
            carreras={carrerasMock}
            onAplicar={setFiltros}
          />
        </div>

        <section aria-labelledby="resultados-title" className="mt-8">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="resultados-title"
                className="text-xl font-semibold text-slate-900"
              >
                Resultados
              </h2>
              <p aria-live="polite" className="mt-1 text-sm text-slate-600">
                {resultados.length} legajos encontrados
              </p>
            </div>

            <ExportarLegajosButton legajos={resultados} />
          </div>

          <TablaLegajos legajos={resultados} />
        </section>

        <details className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">
          <summary className="cursor-pointer px-6 py-5 text-lg font-semibold text-slate-900">
            Consultar workflow de estados
          </summary>
          <div className="border-t border-slate-200 p-6 lg:p-8">
            <WorkflowEstadosLegajo />
          </div>
        </details>
      </div>
    </main>
  );
}
