import { useMemo, useState } from "react";
import {
  documentoFormularioBeca,
  documentosObligatorios,
  documentoTituloPosgrado,
} from "../data/documentosRequeridos";
import type { DocumentoId, DocumentoRequerido } from "../types/documento";
import { validarArchivoPdf } from "../utils/validarArchivo";
import { DocumentUploadField } from "./DocumentUploadField";

const BORRADOR_INSCRIPCION_KEY = "inscripcion-borrador";

interface BorradorInscripcion {
  solicitaBeca?: boolean;
  tituloPosgrado?: string;
}

function recuperarBorradorInscripcion(): BorradorInscripcion {
  const borrador = localStorage.getItem(BORRADOR_INSCRIPCION_KEY);

  if (!borrador) {
    return {};
  }

  try {
    return JSON.parse(borrador) as BorradorInscripcion;
  } catch {
    return {};
  }
}

function crearMensajeDocumentoFaltante(documento: DocumentoRequerido): string {
  return `Documento obligatorio faltante. ${documento.descripcion}`;
}

export function DocumentUploadForm() {
  const [archivos, setArchivos] = useState<Partial<Record<DocumentoId, File>>>(
    {},
  );

  const [errores, setErrores] = useState<Partial<Record<DocumentoId, string>>>(
    {},
  );

  const [documentacionValidada, setDocumentacionValidada] = useState(false);
  const [envioIntentado, setEnvioIntentado] = useState(false);

  const borradorInscripcion = useMemo(() => recuperarBorradorInscripcion(), []);

  const documentos = useMemo(() => {
    const documentosAplicables = [...documentosObligatorios];

    const tieneTituloPosgrado = Boolean(
      borradorInscripcion.tituloPosgrado?.trim(),
    );

    if (tieneTituloPosgrado) {
      documentosAplicables.push(documentoTituloPosgrado);
    }

    if (borradorInscripcion.solicitaBeca) {
      documentosAplicables.push(documentoFormularioBeca);
    }

    return documentosAplicables;
  }, [borradorInscripcion.solicitaBeca, borradorInscripcion.tituloPosgrado]);

  const documentosFaltantes = documentos.filter(
    (documento) => documento.obligatorio && !archivos[documento.id],
  );

  function seleccionarArchivo(documentoId: DocumentoId, archivo: File) {
    const error = validarArchivoPdf(archivo);

    setDocumentacionValidada(false);

    if (error) {
      setErrores((erroresActuales) => ({
        ...erroresActuales,
        [documentoId]: error,
      }));

      return;
    }

    setArchivos((archivosActuales) => ({
      ...archivosActuales,
      [documentoId]: archivo,
    }));

    setErrores((erroresActuales) => ({
      ...erroresActuales,
      [documentoId]: undefined,
    }));
  }

  function eliminarArchivo(documentoId: DocumentoId) {
    setArchivos((archivosActuales) => {
      const nuevosArchivos = { ...archivosActuales };

      delete nuevosArchivos[documentoId];

      return nuevosArchivos;
    });

    if (envioIntentado) {
      const documentoEliminado = documentos.find(
        (documento) => documento.id === documentoId,
      );

      if (documentoEliminado) {
        setErrores((erroresActuales) => ({
          ...erroresActuales,
          [documentoId]: crearMensajeDocumentoFaltante(documentoEliminado),
        }));
      }
    }

    setDocumentacionValidada(false);
  }

  function validarDocumentacion() {
    setEnvioIntentado(true);
    setDocumentacionValidada(false);

    if (documentosFaltantes.length > 0) {
      setErrores((erroresActuales) => {
        const nuevosErrores = { ...erroresActuales };

        documentosFaltantes.forEach((documento) => {
          nuevosErrores[documento.id] ??=
            crearMensajeDocumentoFaltante(documento);
        });

        return nuevosErrores;
      });

      return;
    }

    setErrores({});
    setDocumentacionValidada(true);
  }

  return (
    <section className="space-y-6">
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
        Los archivos se mantienen temporalmente mientras esta página permanezca
        abierta. La carga definitiva se realizará cuando el frontend se conecte
        con el backend.
      </div>

      <div className="space-y-4">
        {documentos.map((documento) => (
          <DocumentUploadField
            key={documento.id}
            documento={documento}
            archivo={archivos[documento.id]}
            error={errores[documento.id]}
            onSeleccionar={seleccionarArchivo}
            onEliminar={eliminarArchivo}
          />
        ))}
      </div>

      {documentosFaltantes.length > 0 && (
        <div
          role={envioIntentado ? "alert" : undefined}
          className={
            envioIntentado
              ? "rounded-md border border-red-300 bg-red-50 p-4"
              : "rounded-md border border-amber-200 bg-amber-50 p-4"
          }
        >
          <p
            className={
              envioIntentado
                ? "font-medium text-red-900"
                : "font-medium text-amber-900"
            }
          >
            Faltan {documentosFaltantes.length} documentos obligatorios.
          </p>

          <ul
            className={
              envioIntentado
                ? "mt-2 list-inside list-disc text-sm text-red-800"
                : "mt-2 list-inside list-disc text-sm text-amber-800"
            }
          >
            {documentosFaltantes.map((documento) => (
              <li key={documento.id}>{documento.nombre}</li>
            ))}
          </ul>
        </div>
      )}

      {documentacionValidada && (
        <p
          role="status"
          className="rounded-md border border-green-200 bg-green-50 p-4 text-green-800"
        >
          La documentación obligatoria está completa. El próximo paso será
          revisar y confirmar la inscripción.
        </p>
      )}

      <div className="flex justify-end border-t border-slate-200 pt-6">
        <button
          type="button"
          onClick={validarDocumentacion}
          className="rounded-md bg-blue-700 px-5 py-2.5 font-medium text-white hover:bg-blue-800"
        >
          Enviar a revisión
        </button>
      </div>
    </section>
  );
}
