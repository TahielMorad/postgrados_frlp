import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-bold text-slate-900">4004</h1>

      <p className="mt-3 text-slate-600">La página solicitada no existe.</p>

      <Link to="/" className="mt-6 font-medium text-blue-600 hover:underline">
        Volver al inicio
      </Link>
    </main>
  );
}
