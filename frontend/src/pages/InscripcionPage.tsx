import { Link } from "react-router";

export function InscripcionPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900">
        Inscripción a posgrado
      </h1>

      <p className="mt-3 text-slate-600">
        Acá vamos a construir el formulario del aspirante.
      </p>

      <Link
        to="/"
        className="mt-8 inline-block font-medium text-blue-600 hover:underline"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
