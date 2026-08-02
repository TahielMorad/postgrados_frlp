import type { DocumentoRequerido } from "../types/documento";

export const documentosObligatorios: DocumentoRequerido[] = [
  {
    id: "formularioPreinscripcion",
    nombre: "Formulario de preinscripción firmado (escaneado)",
    descripcion: "Formulario completo, firmado y escaneado.",
    obligatorio: true,
  },
  {
    id: "documentoIdentidad",
    nombre: "Copia de DNI o Pasaporte",
    descripcion: "Copia del documento de identidad declarado.",
    obligatorio: true,
  },
  {
    id: "tituloGrado",
    nombre: "Copia del título de grado",
    descripcion: "Copia del título universitario de grado.",
    obligatorio: true,
  },
  {
    id: "partidaNacimiento",
    nombre: "Partida de nacimiento",
    descripcion: "Copia de la partida de nacimiento.",
    obligatorio: true,
  },
  {
    id: "constanciaCuilCuit",
    nombre: "Constancia CUIT/CUIL",
    descripcion: "Constancia oficial correspondiente.",
    obligatorio: true,
  },
];

export const documentoTituloPosgrado: DocumentoRequerido = {
  id: "tituloPosgrado",
  nombre: "Título de posgrado",
  descripcion: "Copia del título de posgrado declarado.",
  obligatorio: true,
};

export const documentoFormularioBeca: DocumentoRequerido = {
  id: "formularioBeca",
  nombre: "Formulario de beca firmado",
  descripcion: "Formulario firmado correspondiente a la beca solicitada.",
  obligatorio: true,
};
