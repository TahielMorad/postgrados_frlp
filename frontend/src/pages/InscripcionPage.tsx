import { Link } from "react-router";
import { InscripcionForm } from "../features/inscripcion/components/InscripcionForm";

export function InscripcionPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="font-medium text-blue-600 hover:underline">
          ← Volver al inicio
        </Link>

        <header className="mb-8 mt-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Inscripción a posgrado
          </h1>

          <p className="mt-2 text-slate-600">
            Completá tus datos personales para iniciar la inscripción.
          </p>
        </header>

        <InscripcionForm />
      </div>
    </main>
  );
}
