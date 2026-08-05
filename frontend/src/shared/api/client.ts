const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

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
      throw new Error(
        errorData.message || errorData.detail || `Error HTTP ${response.status}`,
      );
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
