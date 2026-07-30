import { Link } from "react-router";

export function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-12">
      <h1 className="text-4xl font-bold text-slate-900">
        Sistema de Posgrados UTN FRLP
      </h1>

      <p className="mt-4 text-lg text-slate-600">Frontend del módulo Core.</p>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          to="/inscripcion"
          className="rounded-md bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          Iniciar inscripción
        </Link>

        <Link
          to="/coordinador/legajos"
          className="rounded-md border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-100"
        >
          Gestión de legajos
        </Link>
      </div>
    </main>
  );
}
