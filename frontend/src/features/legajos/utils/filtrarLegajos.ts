import type { FiltrosLegajo, LegajoListado } from "../types/legajo";

function normalizarTexto(texto: string): string {
  return texto
    .trim()
    .toLocaleLowerCase("es-AR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function coincideBusqueda(legajo: LegajoListado, busqueda: string): boolean {
  const termino = normalizarTexto(busqueda);

  if (!termino) {
    return true;
  }

  if (/^\d+$/.test(termino)) {
    return legajo.dni === termino;
  }

  return normalizarTexto(legajo.apellido).includes(termino);
}

export function filtrarLegajos(
  legajos: LegajoListado[],
  filtros: FiltrosLegajo,
): LegajoListado[] {
  return legajos.filter((legajo) => {
    const coincideEstado = !filtros.estado || legajo.estado === filtros.estado;
    const coincideCohorte =
      !filtros.cohorte || legajo.cohorte === filtros.cohorte;
    const coincideCarrera =
      !filtros.carrera || legajo.carrera === filtros.carrera;
    const coincideBeca =
      !filtros.beca ||
      (filtros.beca === "SI" ? legajo.tieneBeca : !legajo.tieneBeca);

    return (
      coincideBusqueda(legajo, filtros.busqueda) &&
      coincideEstado &&
      coincideCohorte &&
      coincideCarrera &&
      coincideBeca
    );
  });
}
