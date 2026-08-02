import type { EstadoLegajo, LegajoListado } from "../types/legajo";

const nombres = [
  "Ana",
  "Martín",
  "Sofía",
  "Roberto",
  "Lucía",
  "Diego",
  "Carolina",
  "Pablo",
  "Valeria",
  "Gonzalo",
];

const apellidos = [
  "González",
  "Fernández",
  "López",
  "García",
  "Martínez",
  "Sánchez",
  "Torres",
  "Romero",
  "Gómez",
  "Herrera",
];

export const carrerasMock = [
  "Doctorado en Ingeniería",
  "Maestría en Ingeniería de Sistemas",
  "Maestría en Administración de Negocios",
  "Especialización en Ingeniería Gerencial",
  "Especialización en Higiene y Seguridad en el Trabajo",
];

export const cohortesMock = ["2024", "2025", "2026"];

const estadosMock: EstadoLegajo[] = [
  "BORRADOR",
  "PENDIENTE",
  "EN_REVISION",
  "OBSERVADO",
  "COMPLETADO",
  "RECHAZADO",
  "ACTIVO",
  "VENCIDO",
  "GRADUADO",
  "EN_RIESGO",
  "BAJA",
];

const estadosConNumero = new Set<EstadoLegajo>([
  "COMPLETADO",
  "ACTIVO",
  "VENCIDO",
  "GRADUADO",
  "EN_RIESGO",
  "BAJA",
]);

function crearFechaInscripcion(indice: number, cohorte: string): string {
  const mes = String((indice % 4) + 3).padStart(2, "0");
  const dia = String((indice % 27) + 1).padStart(2, "0");

  return `${cohorte}-${mes}-${dia}`;
}

export const legajosMock: LegajoListado[] = Array.from(
  { length: 150 },
  (_, indice) => {
    const cohorte = cohortesMock[indice % cohortesMock.length];
    const estado = estadosMock[indice % estadosMock.length];
    const secuencial = String(indice + 1).padStart(3, "0");

    return {
      id: `legajo-mock-${secuencial}`,
      numeroLegajo: estadosConNumero.has(estado)
        ? `${cohorte.slice(-2)}-001-${secuencial}`
        : null,
      apellido: apellidos[indice % apellidos.length],
      nombre: nombres[(indice * 3) % nombres.length],
      dni: indice === 0 ? "30456789" : String(31_000_000 + indice),
      estado,
      cohorte,
      carrera: carrerasMock[indice % carrerasMock.length],
      tieneBeca: indice % 3 === 0,
      fechaInscripcion: crearFechaInscripcion(indice, cohorte),
    };
  },
);
