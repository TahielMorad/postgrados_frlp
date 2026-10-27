import { ButtonLink } from "../shared/components/Button";
import { PageLayout } from "../shared/components/PageLayout";

export function HomePage() {
  return (
    <PageLayout width="wide" className="flex items-center">
      <section className="ui-surface relative w-full overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1.5 bg-utn-500 sm:w-2"
        />

        <div className="grid min-h-[28rem] lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
          <div className="flex flex-col justify-center px-7 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <p className="ui-eyebrow">UTN Facultad Regional La Plata</p>
            <h1 className="font-display max-w-4xl text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl lg:leading-[1.05]">
              Sistema de Posgrados UTN FRLP
            </h1>

            <p className="mt-5 text-lg leading-8 text-neutral-600">
              Frontend del módulo Core.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink to="/inscripcion" variant="primary" size="lg">
                Iniciar inscripción
                <span aria-hidden="true">→</span>
              </ButtonLink>

              <ButtonLink to="/cohortes" variant="secondary" size="lg">
                Ver cohortes
              </ButtonLink>

              <ButtonLink
                to="/coordinador/legajos"
                variant="secondary"
                size="lg"
              >
                Gestión de legajos
              </ButtonLink>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="relative hidden overflow-hidden bg-neutral-950 lg:block"
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,transparent_48%,rgba(10,140,204,0.28)_48%,rgba(10,140,204,0.28)_52%,transparent_52%,transparent_100%)] bg-[length:42px_42px]" />
            <div className="absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 border border-utn-400/70" />
            <div className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 bg-utn-500/90" />
            <div className="absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 bg-white" />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
