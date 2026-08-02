export type EstadoLegajo =
  | "BORRADOR"
  | "PENDIENTE"
  | "EN_REVISION"
  | "OBSERVADO"
  | "COMPLETADO"
  | "RECHAZADO"
  | "ACTIVO"
  | "VENCIDO"
  | "GRADUADO"
  | "EN_RIESGO"
  | "BAJA";

export type RolWorkflow = "ASPIRANTE" | "COORDINADOR" | "SISTEMA";

export interface EstadoLegajoConfig {
  nombre: string;
  descripcion: string;
  className: string;
}

export interface TransicionLegajo {
  accion: string;
  desde: EstadoLegajo;
  hacia: EstadoLegajo;
  rol: RolWorkflow;
  automatica?: boolean;
  aclaracion?: string;
}
