import type {
  EstadoLegajo,
  FiltrosLegajo,
  LegajoListado,
} from "../../features/legajos/types/legajo";

export interface UsuarioAuth {
  email: string;
  nombre: string;
  rol: "COORDINADOR" | "DOCENTE" | "CPR" | "ADMIN";
}

export interface LoginResponse {
  accessToken: string;
  usuario: UsuarioAuth;
}

export interface RespuestaApi<T> {
  exito: boolean;
  datos?: T;
  error?: string;
}

export type { EstadoLegajo, FiltrosLegajo, LegajoListado };
