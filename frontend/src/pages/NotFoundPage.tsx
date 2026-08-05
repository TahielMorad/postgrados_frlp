import { ButtonLink } from "../shared/components/Button";
import { PageLayout } from "../shared/components/PageLayout";

export function NotFoundPage() {
  return (
    <PageLayout
      width="narrow"
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="ui-surface w-full border-t-4 border-t-utn-500 px-6 py-14 sm:px-12 sm:py-16">
        <p className="font-display text-7xl font-black tracking-tight text-utn-700 sm:text-8xl">
          404
        </p>

        <p className="mt-4 text-lg text-neutral-600">
          La página solicitada no existe.
        </p>

        <ButtonLink to="/" variant="primary" className="mt-8">
          Volver al inicio
        </ButtonLink>
      </div>
    </PageLayout>
  );
}
