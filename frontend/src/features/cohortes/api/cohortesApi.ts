import { apiFetch } from "../../../shared/api/client";
import type { Cohorte } from "../types/cohorte";

export function fetchCohortes(signal?: AbortSignal): Promise<Cohorte[]> {
  return apiFetch<Cohorte[]>("/cohortes", { signal });
}
