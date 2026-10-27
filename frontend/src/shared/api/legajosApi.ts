import { legajosMock as defaultMockLegajos } from "../../features/legajos/data/legajosMock";
import type {
  EstadoLegajo,
  FiltrosLegajo,
  LegajoListado,
} from "../../features/legajos/types/legajo";
import { filtrarLegajos } from "../../features/legajos/utils/filtrarLegajos";
import { apiFetch, BASE_URL } from "./client";

const LOCAL_STORAGE_LEGAJOS_KEY = "posgrados_legajos_store";

function obtenerLegajosLocales(): LegajoListado[] {
  const guardados = localStorage.getItem(LOCAL_STORAGE_LEGAJOS_KEY);
  if (!guardados) {
    localStorage.setItem(
      LOCAL_STORAGE_LEGAJOS_KEY,
      JSON.stringify(defaultMockLegajos),
    );
    return defaultMockLegajos;
  }
  try {
    return JSON.parse(guardados) as LegajoListado[];
  } catch {
    return defaultMockLegajos;
  }
}

function guardarLegajosLocales(legajos: LegajoListado[]): void {
  localStorage.setItem(LOCAL_STORAGE_LEGAJOS_KEY, JSON.stringify(legajos));
}

export async function fetchLegajos(
  filtros: FiltrosLegajo,
): Promise<LegajoListado[]> {
  try {
    const params = new URLSearchParams();
    if (filtros.busqueda) params.append("busqueda", filtros.busqueda);
    if (filtros.estado) params.append("estado", filtros.estado);
    if (filtros.cohorte) params.append("cohorte", filtros.cohorte);
    if (filtros.carrera) params.append("carrera", filtros.carrera);
    if (filtros.beca) params.append("beca", filtros.beca);

    const query = params.toString();
    const data = await apiFetch<LegajoListado[]>(
      `/legajos${query ? `?${query}` : ""}`,
    );
    return data;
  } catch {
    const legajosLocales = obtenerLegajosLocales();
    return filtrarLegajos(legajosLocales, filtros);
  }
}

export async function actualizarEstadoLegajoApi(
  legajoId: string,
  nuevoEstado: EstadoLegajo,
  comentario?: string,
): Promise<LegajoListado> {
  try {
    const updated = await apiFetch<LegajoListado>(
      `/legajos/${legajoId}/estado`,
      {
        method: "PATCH",
        body: JSON.stringify({ estado: nuevoEstado, comentario }),
      },
    );
    return updated;
  } catch {
    const legajos = obtenerLegajosLocales();
    const index = legajos.findIndex((l) => l.id === legajoId);
    if (index === -1) {
      throw new Error(`Legajo con ID ${legajoId} no encontrado`);
    }

    const legajoActualizado: LegajoListado = {
      ...legajos[index],
      estado: nuevoEstado,
    };

    legajos[index] = legajoActualizado;
    guardarLegajosLocales(legajos);
    return legajoActualizado;
  }
}

export async function crearPreinscripcionApi(
  datosFormulario: Record<string, unknown>,
): Promise<{ id: string; numeroSeguimiento: string }> {
  try {
    return await apiFetch<{ id: string; numeroSeguimiento: string }>(
      "/legajos",
      {
        method: "POST",
        body: JSON.stringify(datosFormulario),
      },
    );
  } catch {
    const newId = `leg-2026-${Date.now().toString().slice(-4)}`;
    return {
      id: newId,
      numeroSeguimiento: `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    };
  }
}

export async function subirDocumentoApi(
  legajoId: string,
  tipoDocumento: string,
  archivo: File,
): Promise<{ id: string; path: string }> {
  try {
    const formData = new FormData();
    formData.append("tipo", tipoDocumento);
    formData.append("file", archivo);

    const token = localStorage.getItem("auth_token");
    const res = await fetch(`${BASE_URL}/legajos/${legajoId}/documentos`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Error al subir documento");
    }

    return (await res.json()) as { id: string; path: string };
  } catch {
    return {
      id: `doc-${Date.now()}`,
      path: `/uploads/mock/${archivo.name}`,
    };
  }
}
