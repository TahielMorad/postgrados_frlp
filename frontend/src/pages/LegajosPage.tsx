import { useMemo, useState } from "react";
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
import { PageHeader, PageLayout } from "../shared/components/PageLayout";

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
    <PageLayout width="wide">
      <PageHeader
        backTo="/"
        backLabel="Volver al inicio"
        title="Búsqueda y listado de legajos"
      />

      <FiltrosLegajo
        filtrosIniciales={filtrosIniciales}
        estados={opcionesEstado}
        cohortes={cohortesMock}
        carreras={carrerasMock}
        onAplicar={setFiltros}
      />

      <section aria-labelledby="resultados-title" className="mt-9">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="resultados-title" className="ui-section-title">
              Resultados
            </h2>
            <p aria-live="polite" className="mt-1 text-sm text-neutral-600">
              {resultados.length} legajos encontrados
            </p>
          </div>

          <ExportarLegajosButton legajos={resultados} />
        </div>

        <TablaLegajos legajos={resultados} />
      </section>

      <details className="ui-surface group mt-9 overflow-hidden">
        <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-lg font-bold text-neutral-950 transition-colors marker:hidden hover:bg-utn-50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-utn-300 sm:px-6 sm:text-xl [&::-webkit-details-marker]:hidden">
          Consultar workflow de estados
          <span
            aria-hidden="true"
            className="text-2xl font-normal text-utn-700 transition-transform group-open:rotate-45"
          >
            +
          </span>
        </summary>
        <div className="border-t border-neutral-200 p-5 sm:p-6 lg:p-8">
          <WorkflowEstadosLegajo />
        </div>
      </details>
    </PageLayout>
  );
}
