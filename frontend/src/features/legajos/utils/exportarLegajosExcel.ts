import type { CellObject, SheetData } from "write-excel-file/browser";
import { estadosLegajo } from "../data/workflowLegajo";
import type { LegajoListado } from "../types/legajo";

const MAXIMO_REGISTROS_EXPORTACION = 500;

const estiloEncabezado: Omit<CellObject, "value"> = {
  fontWeight: "bold",
  backgroundColor: "#DBEAFE",
  textColor: "#172554",
  alignVertical: "center",
};

function celdaEncabezado(value: string): CellObject {
  return { value, ...estiloEncabezado };
}

export async function exportarLegajosExcel(
  legajos: LegajoListado[],
): Promise<number> {
  const registros = legajos.slice(0, MAXIMO_REGISTROS_EXPORTACION);
  const { default: writeExcelFile } = await import("write-excel-file/browser");

  const datos: SheetData = [
    [
      celdaEncabezado("Nº Legajo"),
      celdaEncabezado("Apellido y nombre"),
      celdaEncabezado("DNI"),
      celdaEncabezado("Estado"),
      celdaEncabezado("Carrera"),
      celdaEncabezado("Fecha inscripción"),
    ],
    ...registros.map((legajo) => [
      legajo.numeroLegajo ?? "Sin asignar",
      `${legajo.apellido}, ${legajo.nombre}`,
      legajo.dni,
      estadosLegajo[legajo.estado].nombre,
      legajo.carrera,
      legajo.fechaInscripcion,
    ]),
  ];

  const fecha = new Date().toISOString().slice(0, 10);

  await writeExcelFile(datos, {
    sheet: "Legajos",
    stickyRowsCount: 1,
    columns: [
      { width: 18 },
      { width: 28 },
      { width: 14 },
      { width: 16 },
      { width: 48 },
      { width: 20 },
    ],
  }).toFile(`legajos-${fecha}.xlsx`);

  return registros.length;
}
