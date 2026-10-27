from datetime import date
from typing import Optional
from pydantic import BaseModel, ConfigDict

class CohorteResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    anio: int
    nombre: str
    inscripcion_abierta: bool
    fecha_inicio: Optional[date] = None
