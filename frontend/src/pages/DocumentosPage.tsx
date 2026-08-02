import { Link } from "react-router";
import { DocumentUploadForm } from "../features/documentos/components/DocumentUploadForm";

export function DocumentosPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/inscripcion"
          className="font-medium text-blue-600 hover:underline"
        >
          ← Volver a la inscripción
        </Link>

        <header className="mb-8 mt-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Documentación de la inscripción
          </h1>

          <p className="mt-2 text-slate-600">
            Adjuntá los documentos requeridos en formato PDF. Cada archivo puede
            tener un máximo de 5 MB.
          </p>
        </header>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <DocumentUploadForm />
        </div>
      </div>
    </main>
  );
}
