// Por defecto se usa una ruta relativa para que las requests pasen por el
// proxy de Vite (`/api` -> backend). Se puede sobrescribir con VITE_API_URL.
export const BASE_URL = import.meta.env.VITE_API_URL || "/api/v1";

// FastAPI devuelve `detail` como string o, en errores de validación (422),
// como lista de { loc, msg }. Los 502/503/504 los genera el proxy cuando el
// backend no responde.
function mensajeDeError(status: number, data: unknown): string {
  const { message, detail } = (data ?? {}) as {
    message?: unknown;
    detail?: unknown;
  };
  if (typeof message === "string" && message) return message;
  if (typeof detail === "string" && detail) return detail;
  if (Array.isArray(detail) && detail.length > 0) {
    return detail
      .map((d) => (typeof d?.msg === "string" ? d.msg : JSON.stringify(d)))
      .join(" · ");
  }
  if (status >= 502 && status <= 504) {
    return "No se pudo conectar con el servidor. Intentá de nuevo en unos segundos.";
  }
  return `Error HTTP ${status}`;
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem("auth_token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = `${BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(mensajeDeError(response.status, errorData));
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      console.warn(
        `[API Client] No se pudo conectar a ${url}. Ejecutando en modo local/mock.`,
      );
    }
    throw error;
  }
}
