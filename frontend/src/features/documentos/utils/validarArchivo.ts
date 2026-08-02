export const TAMANO_MAXIMO_PDF = 5 * 1024 * 1024;

export function validarArchivoPdf(archivo: File): string | null {
  const tieneExtensionPdf = archivo.name.toLowerCase().endsWith(".pdf");

  const tieneTipoPdf =
    archivo.type === "application/pdf" || archivo.type === "";

  if (!tieneExtensionPdf || !tieneTipoPdf) {
    return "Solo se aceptan archivos en formato PDF";
  }

  if (archivo.size > TAMANO_MAXIMO_PDF) {
    return "El archivo es demasiado grande. Máximo permitido: 5MB";
  }

  return null;
}

export function formatearTamanoArchivo(bytes: number): string {
  const megabytes = bytes / (1024 * 1024);

  return `${megabytes.toFixed(2)} MB`;
}
