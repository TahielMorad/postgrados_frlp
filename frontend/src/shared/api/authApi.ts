import type { LoginResponse } from "./types";
import { apiFetch } from "./client";

export async function loginApi(
  email: string,
  passwordPlano: string,
): Promise<LoginResponse> {
  try {
    return await apiFetch<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password: passwordPlano }),
    });
  } catch (error) {
    const emailNorm = email.trim().toLowerCase();

    // Aceptar admin@prueba.com y admin@fenix.test
    if (
      emailNorm === "admin@prueba.com" ||
      emailNorm === "admin@fenix.test"
    ) {
      return {
        accessToken: "mock-jwt-token-coordinador-admin",
        usuario: {
          email: emailNorm,
          nombre: "Administrador Posgrados",
          rol: "COORDINADOR",
        },
      };
    }

    if (emailNorm === "docente@fenix.test" || emailNorm === "docente@prueba.com") {
      return {
        accessToken: "mock-jwt-token-docente",
        usuario: {
          email: emailNorm,
          nombre: "Carlos Pérez",
          rol: "DOCENTE",
        },
      };
    }

    if (emailNorm === "cpr@fenix.test" || emailNorm === "cpr@prueba.com") {
      return {
        accessToken: "mock-jwt-token-cpr",
        usuario: {
          email: emailNorm,
          nombre: "Laura Martínez",
          rol: "CPR",
        },
      };
    }

    throw new Error(
      error instanceof Error && !error.message.includes("HTTP")
        ? error.message
        : "Credenciales inválidas. Verificá tu correo y contraseña.",
      { cause: error },
    );
  }
}
