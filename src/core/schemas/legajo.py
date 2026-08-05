from typing import Optional, List
from pydantic import BaseModel, EmailStr

class LegajoCreate(BaseModel):
    nombre: str
    apellido: str
    nacionalidad: Optional[str] = None
    tipoDocumento: Optional[str] = "DNI"
    numeroDocumento: str
    telefonoMovil: Optional[str] = None
    telefonoFijo: Optional[str] = None
    emailPrincipal: EmailStr
    emailAlternativo: Optional[str] = None
    direccion: Optional[str] = None
    ciudad: Optional[str] = None
    provincia: Optional[str] = None
    pais: Optional[str] = "Argentina"
    tituloGrado: Optional[str] = None
    tituloPosgrado: Optional[str] = None
    carreras: Optional[List[str]] = []
    medioConocimiento: Optional[str] = None
    motivacion: Optional[str] = None
    solicitaBeca: Optional[bool] = False
    porcentajeBeca: Optional[str] = None

class LegajoUpdateEstado(BaseModel):
    estado: str
    comentario: Optional[str] = None

class LegajoResponse(BaseModel):
    id: str
    numeroLegajo: Optional[str] = None
    dni: str
    apellido: str
    nombre: str
    email: str
    estado: str
    cohorte: Optional[str] = None
    carrera: Optional[str] = None
    tieneBeca: bool = False
    fechaInscripcion: str

    class Config:
        from_attributes = True
