import { Link } from "react-router";
import { WorkflowEstadosLegajo } from "../features/legajos/components/WorkflowEstadosLegajo";

export function LegajosPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <Link to="/" className="font-medium text-blue-700 hover:underline">
          ← Volver al inicio
        </Link>

        <header className="mt-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Workflow de estados del legajo
          </h1>

          <p className="mt-3 max-w-3xl text-slate-600">
            Estados y transiciones habilitadas para el ciclo de admisión y vida
            académica del legajo.
          </p>
        </header>


        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
          <WorkflowEstadosLegajo />
        </div>
      </div>
    </main>
  );
}
