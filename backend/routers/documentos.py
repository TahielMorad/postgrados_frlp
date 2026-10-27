import os
from fastapi import APIRouter, Depends, Form, HTTPException, UploadFile, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from database import get_db
from models.documento import Documento
from models.legajo import Legajo
from services.file_storage_service import guardar_archivo_pdf
from routers.auth import get_current_user
from models.usuario import Usuario

router = APIRouter(tags=["Documentos"])

@router.post("/legajos/{legajo_id}/documentos", status_code=status.HTTP_201_CREATED)
def subir_documento(
    legajo_id: str,
    file: UploadFile,
    tipo: str = Form("DNI"),
    db: Session = Depends(get_db),
):
    """Guarda un documento PDF adjunto al legajo especificado."""
    legajo = db.query(Legajo).filter(Legajo.id == legajo_id).first()
    if not legajo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No pudimos adjuntar el documento: el legajo {legajo_id} no existe.",
        )

    resultado = guardar_archivo_pdf(legajo_id, tipo, file)

    documento = Documento(
        id=resultado["id"],
        legajo_id=legajo.id,
        tipo=tipo,
        path_storage=resultado["path_storage"],
        nombre_original=resultado["nombre_original"],
        checksum_sha256=resultado["checksum_sha256"],
        tamanio_bytes=resultado["tamanio_bytes"],
    )

    db.add(documento)
    db.commit()
    db.refresh(documento)

    return {
        "id": documento.id,
        "tipo": documento.tipo,
        "nombreOriginal": documento.nombre_original,
        "tamanioBytes": documento.tamanio_bytes,
        "mensaje": "El documento se guardó correctamente.",
    }

@router.get("/documentos/{documento_id}/download")
def descargar_documento(
    documento_id: str,
    db: Session = Depends(get_db),
    usuario_actual: Usuario = Depends(get_current_user),
):
    """Retorna el streaming del archivo PDF si el usuario está autenticado."""
    documento = db.query(Documento).filter(Documento.id == documento_id).first()
    if not documento or not os.path.exists(documento.path_storage):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No encontramos el documento o el archivo no está accesible.",
        )

    return FileResponse(
        path=documento.path_storage,
        filename=documento.nombre_original or "documento.pdf",
        media_type="application/pdf",
    )
