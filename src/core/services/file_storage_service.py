import hashlib
import os
import uuid
from fastapi import HTTPException, UploadFile, status
from config import settings

MAX_SIZE_BYTES = 5 * 1024 * 1024  # 5 MB

def guardar_archivo_pdf(legajo_id: str, tipo_doc: str, file: UploadFile) -> dict:
    """Valida y almacena un archivo PDF en el almacenamiento del sistema."""
    filename = file.filename or "documento.pdf"
    if not filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Solo aceptamos archivos PDF. '{filename}' no es válido.",
        )

    file.file.seek(0)
    content = file.file.read()

    if len(content) > MAX_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"El archivo '{filename}' pesa más del máximo permitido (5 MB).",
        )

    if not content.startswith(b"%PDF"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El archivo subido no es un PDF válido.",
        )

    checksum = hashlib.sha256(content).hexdigest()
    file_id = str(uuid.uuid4())
    filename_on_disk = f"{file_id}.pdf"

    upload_dir = os.path.join(settings.STORAGE_PATH, "uploads", legajo_id)
    os.makedirs(upload_dir, exist_ok=True)

    file_path = os.path.join(upload_dir, filename_on_disk)
    with open(file_path, "wb") as f:
        f.write(content)

    return {
        "id": file_id,
        "path_storage": file_path,
        "nombre_original": filename,
        "checksum_sha256": checksum,
        "tamanio_bytes": len(content),
    }
