import { useEffect, useState } from "react";
import { fetchCohortes } from "../features/cohortes/api/cohortesApi";
import { ListaCohortes } from "../features/cohortes/components/ListaCohortes";
import type { Cohorte } from "../features/cohortes/types/cohorte";
import { Button } from "../shared/components/Button";
import {
  EmptyState,
  FeedbackMessage,
} from "../shared/components/FeedbackMessage";
import { PageHeader, PageLayout } from "../shared/components/PageLayout";

type EstadoCarga =
  | { tipo: "cargando" }
  | { tipo: "error"; mensaje: string }
  | { tipo: "ok"; cohortes: Cohorte[] };

export function CohortesPage() {
  const [estado, setEstado] = useState<EstadoCarga>({ tipo: "cargando" });
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetchCohortes(controller.signal)
      .then((cohortes) => setEstado({ tipo: "ok", cohortes }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setEstado({
          tipo: "error",
          mensaje: err instanceof Error ? err.message : "Error desconocido",
        });
      });
    return () => controller.abort();
  }, [intento]);

  const reintentar = () => {
    setEstado({ tipo: "cargando" });
    setIntento((n) => n + 1);
  };

  return (
    <PageLayout width="wide">
      <PageHeader
        backTo="/"
        backLabel="Volver al inicio"
        eyebrow="Oferta académica"
        title="Cohortes"
        description="Cohortes de posgrado disponibles y estado de su inscripción."
      />

      <section aria-live="polite" aria-busy={estado.tipo === "cargando"}>
        {estado.tipo === "cargando" && (
          <div className="flex h-32 items-center justify-center gap-3 rounded-lg border border-neutral-200 bg-white">
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-utn-600 border-r-transparent motion-reduce:animate-none"
            />
            <p className="text-sm font-semibold text-neutral-600">
              Cargando cohortes...
            </p>
          </div>
        )}

        {estado.tipo === "error" && (
          <FeedbackMessage
            tone="error"
            role="alert"
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-semibold">
                No se pudieron cargar las cohortes.
              </p>
              <p>{estado.mensaje}</p>
            </div>
            <Button variant="secondary" size="sm" onClick={reintentar}>
              Reintentar
            </Button>
          </FeedbackMessage>
        )}

        {estado.tipo === "ok" &&
          (estado.cohortes.length === 0 ? (
            <EmptyState title="No hay cohortes registradas">
              Todavía no se cargaron cohortes en el sistema.
            </EmptyState>
          ) : (
            <ListaCohortes cohortes={estado.cohortes} />
          ))}
      </section>
    </PageLayout>
  );
}
