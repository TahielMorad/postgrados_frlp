import { InscripcionForm } from "../features/inscripcion/components/InscripcionForm";
import { PageHeader, PageLayout } from "../shared/components/PageLayout";

export function InscripcionPage() {
  return (
    <PageLayout width="content">
      <PageHeader
        backTo="/"
        backLabel="Volver al inicio"
        title="Inscripción a posgrado"
        description="Completá tus datos personales para iniciar la inscripción."
      />

      <InscripcionForm />
    </PageLayout>
  );
}
