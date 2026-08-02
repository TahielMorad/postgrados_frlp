export type DocumentoId =
  | "formularioPreinscripcion"
  | "documentoIdentidad"
  | "tituloGrado"
  | "partidaNacimiento"
  | "constanciaCuilCuit"
  | "tituloPosgrado"
  | "formularioBeca";

export interface DocumentoRequerido {
  id: DocumentoId;
  nombre: string;
  descripcion: string;
  obligatorio: boolean;
}
