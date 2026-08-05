import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../shared/auth/AuthContext";
import { Button } from "../shared/components/Button";
import { FeedbackMessage } from "../shared/components/FeedbackMessage";
import { PageHeader, PageLayout } from "../shared/components/PageLayout";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, usuario } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ||
    "/coordinador/legajos";

  if (usuario) {
    navigate(from, { replace: true });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setCargando(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error inesperado al iniciar sesión.",
      );
    } finally {
      setCargando(false);
    }
  }

  function usarCredencialDemo(demoEmail: string, demoPass: string) {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError(null);
  }

  return (
    <PageLayout width="content">
      <PageHeader
        backTo="/"
        backLabel="Volver al inicio"
        title="Acceso al sistema"
        description="Ingresá con tus credenciales institucionales para acceder a la gestión de posgrados."
      />

      <div className="ui-form-card">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label htmlFor="email" className="ui-label">
              Correo electrónico *
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@fenix.test"
              className="ui-control"
            />
          </div>

          <div>
            <label htmlFor="password" className="ui-label">
              Contraseña *
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="ui-control"
            />
          </div>

          {error && (
            <FeedbackMessage role="alert" tone="error">
              {error}
            </FeedbackMessage>
          )}

          <div className="pt-2">
            <Button type="submit" loading={cargando} className="w-full">
              Iniciar sesión
            </Button>
          </div>
        </form>

        <div className="mt-8 border-t border-neutral-200 pt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Credenciales de prueba (Entorno Desarrollo):
          </h3>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() =>
                usarCredencialDemo("admin@prueba.com", "admin123")
              }
              className="flex flex-col items-start rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-left transition-colors hover:border-utn-400 hover:bg-utn-50"
            >
              <span className="font-bold text-neutral-900 text-sm">
                Rol Coordinador / Admin
              </span>
              <span className="text-xs text-neutral-600">
                admin@prueba.com
              </span>
              <span className="text-xs text-utn-700 font-semibold mt-1">
                Usar credencial →
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                usarCredencialDemo("docente@fenix.test", "Docente1234!")
              }
              className="flex flex-col items-start rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-left transition-colors hover:border-utn-400 hover:bg-utn-50"
            >
              <span className="font-bold text-neutral-900 text-sm">
                Rol Docente
              </span>
              <span className="text-xs text-neutral-600">
                docente@fenix.test
              </span>
              <span className="text-xs text-utn-700 font-semibold mt-1">
                Usar credencial →
              </span>
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
