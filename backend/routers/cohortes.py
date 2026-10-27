from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.cohorte import Cohorte
from schemas.cohorte import CohorteResponse

router = APIRouter(prefix="/cohortes", tags=["Cohortes"])

@router.get("", response_model=List[CohorteResponse])
def listar_cohortes(db: Session = Depends(get_db)):
    """Lista públicamente las cohortes, de la más reciente a la más antigua."""
    return db.query(Cohorte).order_by(Cohorte.anio.desc()).all()
