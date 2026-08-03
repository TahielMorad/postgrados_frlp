import { DocumentUploadForm } from "../features/documentos/components/DocumentUploadForm";
import { PageHeader, PageLayout } from "../shared/components/PageLayout";

export function DocumentosPage() {
  return (
    <PageLayout width="content">
      <PageHeader
        backTo="/inscripcion"
        backLabel="Volver a la inscripción"
        title="Documentación de la inscripción"
        description="Adjuntá los documentos requeridos en formato PDF. Cada archivo puede tener un máximo de 5 MB."
      />

      <div className="ui-form-card">
        <DocumentUploadForm />
      </div>
    </PageLayout>
  );
}
