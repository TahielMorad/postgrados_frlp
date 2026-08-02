import type {
  EstadoLegajo,
  EstadoLegajoConfig,
  RolWorkflow,
  TransicionLegajo,
} from "../types/legajo";

export const estadosLegajo: Record<EstadoLegajo, EstadoLegajoConfig> = {
  BORRADOR: {
    nombre: "Borrador",
    descripcion:
      "La inscripción todavía puede ser completada por el aspirante.",
    className: "border-slate-300 bg-slate-100 text-slate-800",
  },
  PENDIENTE: {
    nombre: "Pendiente",
    descripcion: "La inscripción fue enviada y espera la revisión inicial.",
    className: "border-amber-300 bg-amber-100 text-amber-900",
  },
  EN_REVISION: {
    nombre: "En Revisión",
    descripcion: "El coordinador está evaluando el legajo y sus documentos.",
    className: "border-blue-300 bg-blue-100 text-blue-900",
  },
  OBSERVADO: {
    nombre: "Observado",
    descripcion: "El aspirante debe corregir la observación informada.",
    className: "border-orange-300 bg-orange-100 text-orange-900",
  },
  COMPLETADO: {
    nombre: "Completado",
    descripcion: "La revisión fue aprobada y la vacante está reservada.",
    className: "border-emerald-300 bg-emerald-100 text-emerald-900",
  },
  RECHAZADO: {
    nombre: "Rechazado",
    descripcion: "El coordinador rechazó el legajo durante la revisión.",
    className: "border-red-300 bg-red-100 text-red-900",
  },
  ACTIVO: {
    nombre: "Activo",
    descripcion: "El aspirante fue matriculado como estudiante activo.",
    className: "border-green-300 bg-green-100 text-green-900",
  },
  VENCIDO: {
    nombre: "Vencido",
    descripcion: "La reserva de vacante superó los 30 días sin matrícula.",
    className: "border-rose-300 bg-rose-100 text-rose-900",
  },
  GRADUADO: {
    nombre: "Graduado",
    descripcion: "El estudiante completó las condiciones de graduación.",
    className: "border-violet-300 bg-violet-100 text-violet-900",
  },
  EN_RIESGO: {
    nombre: "En Riesgo",
    descripcion: "El estudiante activo requiere seguimiento académico.",
    className: "border-orange-400 bg-orange-100 text-orange-950",
  },
  BAJA: {
    nombre: "Baja",
    descripcion: "El coordinador dio de baja al estudiante.",
    className: "border-slate-400 bg-slate-200 text-slate-900",
  },
};

export const recorridoPrincipal: EstadoLegajo[] = [
  "BORRADOR",
  "PENDIENTE",
  "EN_REVISION",
  "COMPLETADO",
  "ACTIVO",
  "GRADUADO",
];

export const estadosAlternativos: EstadoLegajo[] = [
  "OBSERVADO",
  "RECHAZADO",
  "VENCIDO",
  "EN_RIESGO",
  "BAJA",
];

export const transicionesLegajo: TransicionLegajo[] = [
  {
    accion: "Enviar",
    desde: "BORRADOR",
    hacia: "PENDIENTE",
    rol: "ASPIRANTE",
  },
  {
    accion: "Revisar",
    desde: "PENDIENTE",
    hacia: "EN_REVISION",
    rol: "COORDINADOR",
  },
  {
    accion: "Observar",
    desde: "EN_REVISION",
    hacia: "OBSERVADO",
    rol: "COORDINADOR",
    aclaracion:
      "Requiere un comentario. El backend debe enviarlo por email al aspirante.",
  },
  {
    accion: "Corregir",
    desde: "OBSERVADO",
    hacia: "PENDIENTE",
    rol: "ASPIRANTE",
  },
  {
    accion: "Aprobar",
    desde: "EN_REVISION",
    hacia: "COMPLETADO",
    rol: "COORDINADOR",
    aclaracion: "El backend debe generar el número único de legajo.",
  },
  {
    accion: "Rechazar",
    desde: "EN_REVISION",
    hacia: "RECHAZADO",
    rol: "COORDINADOR",
  },
  {
    accion: "Matricular",
    desde: "COMPLETADO",
    hacia: "ACTIVO",
    rol: "COORDINADOR",
  },
  {
    accion: "Vencer",
    desde: "COMPLETADO",
    hacia: "VENCIDO",
    rol: "SISTEMA",
    automatica: true,
    aclaracion:
      "El backend debe ejecutarla a los 30 días y notificar al coordinador.",
  },
  {
    accion: "Graduar",
    desde: "ACTIVO",
    hacia: "GRADUADO",
    rol: "SISTEMA",
    automatica: true,
  },
  {
    accion: "Dar de baja",
    desde: "ACTIVO",
    hacia: "BAJA",
    rol: "COORDINADOR",
  },
  {
    accion: "Dar de baja",
    desde: "EN_RIESGO",
    hacia: "BAJA",
    rol: "COORDINADOR",
  },
];

export const nombresRol: Record<RolWorkflow, string> = {
  ASPIRANTE: "Aspirante",
  COORDINADOR: "Coordinador",
  SISTEMA: "Sistema",
};
