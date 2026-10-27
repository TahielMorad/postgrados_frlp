from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import get_db

router = APIRouter(tags=["Health"])

@router.get("/health")
def health_check(db: Session = Depends(get_db)):
    """Verifica el estado de salud del servidor API y la conexión a la base de datos."""
    try:
        db.execute(text("SELECT 1"))
        db_status = "conectada"
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"No se pudo conectar a la base de datos: {str(e)}",
        )

    return {
        "status": "ok",
        "service": "Sistema de Posgrados UTN FRLP API",
        "database": db_status,
        "version": "1.0.0",
    }
