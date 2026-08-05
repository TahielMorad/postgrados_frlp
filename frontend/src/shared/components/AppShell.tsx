import type { ReactNode } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";

interface AppShellProps {
  children: ReactNode;
}

const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
  `relative flex min-h-12 items-center justify-center px-3 py-2 text-center text-xs font-semibold tracking-wide text-white uppercase transition-colors focus-visible:z-10 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-utn-300 sm:px-5 sm:text-sm ${
    isActive
      ? "bg-utn-700 after:absolute after:inset-x-3 after:bottom-0 after:h-1 after:bg-white"
      : "hover:bg-neutral-800"
  }`;

export function AppShell({ children }: AppShellProps) {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col bg-neutral-100 text-neutral-950">
      <a
        href="#main-content"
        className="fixed top-3 left-3 z-50 -translate-y-24 rounded-md bg-white px-4 py-2 font-semibold text-neutral-950 shadow-lg transition-transform focus:translate-y-0 focus:outline-none focus:ring-3 focus:ring-utn-500"
      >
        Ir al contenido principal
      </a>

      <header className="sticky top-0 z-40 border-t-4 border-utn-500 bg-white shadow-sm">
        <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
          <Link
            to="/"
            aria-label="Sistema de Posgrados UTN FRLP, inicio"
            className="group flex min-w-0 items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-utn-300 focus-visible:ring-offset-4"
          >
            <img
              src="/utn-logo.png"
              alt=""
              aria-hidden="true"
              width="305"
              height="356"
              className="h-11 w-11 shrink-0 bg-transparent object-contain sm:h-12 sm:w-12"
            />
            <span className="min-w-0">
              <span className="block truncate text-base font-black tracking-tight text-neutral-950 sm:text-xl">
                UTN <span className="font-normal text-utn-600">La Plata</span>
              </span>
              <span className="block truncate text-xs font-semibold tracking-[0.16em] text-neutral-500 uppercase sm:text-sm">
                Sistema de Posgrados
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {usuario ? (
              <div className="flex items-center gap-3 text-right">
                <div className="hidden sm:block">
                  <span className="block text-xs font-bold text-neutral-900">
                    {usuario.nombre}
                  </span>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-utn-700">
                    {usuario.rol}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded bg-neutral-100 px-3 py-1.5 text-xs font-bold text-neutral-700 hover:bg-neutral-200 transition-colors"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="rounded bg-utn-600 px-3.5 py-2 text-xs font-bold text-white uppercase tracking-wider hover:bg-utn-700 transition-colors"
              >
                Ingresar
              </Link>
            )}

            <span className="hidden border-l border-neutral-200 pl-4 text-right text-xs font-semibold tracking-[0.14em] text-neutral-500 uppercase md:block">
              Facultad Regional
              <br />
              La Plata
            </span>
          </div>
        </div>

        <nav aria-label="Navegación principal" className="bg-neutral-950">
          <div className="mx-auto flex w-full max-w-[90rem] px-1 sm:px-4 lg:px-6">
            <NavLink to="/" end className={navLinkClassName}>
              Inicio
            </NavLink>
            <NavLink to="/inscripcion" className={navLinkClassName}>
              Inscripción
            </NavLink>
            <NavLink to="/coordinador/legajos" className={navLinkClassName}>
              Gestión de legajos
            </NavLink>
          </div>
        </nav>
      </header>

      <div id="main-content" className="flex flex-1 flex-col">
        {children}
      </div>

      <footer className="mt-auto border-t-4 border-utn-500 bg-neutral-950 text-neutral-300">
        <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-2 px-4 py-7 text-sm sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="font-semibold text-white">
            Sistema de Posgrados · UTN Facultad Regional La Plata
          </p>
          <p className="text-neutral-400">Módulo Core</p>
        </div>
      </footer>
    </div>
  );
}
