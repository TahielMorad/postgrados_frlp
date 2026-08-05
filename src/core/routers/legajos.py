from typing import Optional, List
import uuid
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session, joinedload
from database import get_db
from models.legajo import Legajo
from models.cohorte import Cohorte
from models.auditoria import AuditoriaLegajo
from schemas.legajo import LegajoCreate, LegajoResponse, LegajoUpdateEstado
from routers.auth import get_current_user
from models.usuario import Usuario

router = APIRouter(prefix="/legajos", tags=["Legajos"])

def _mapear_legajo_response(l: Legajo) -> LegajoResponse:
    """Convierte una entidad ORM Legajo a su DTO de respuesta Pydantic."""
    nombre_cohorte = l.cohorte.nombre if l.cohorte else "Cohorte 2026"
    fecha_str = l.fecha_inscripcion.strftime("%Y-%m-%d") if l.fecha_inscripcion else "2026-04-01"
    
    return LegajoResponse(
        id=l.id,
        numeroLegajo=l.numero_legajo,
        dni=l.dni,
        apellido=l.apellido,
        nombre=l.nombre,
        email=l.email,
        estado=l.estado,
        cohorte=nombre_cohorte,
        carrera=l.carrera_elegida or "Especialización en Sistemas de Información",
        tieneBeca=l.solicita_beca or False,
        fechaInscripcion=fecha_str,
    )

@router.post("", response_model=dict, status_code=status.HTTP_201_CREATED)
def crear_preinscripcion(data: LegajoCreate, db: Session = Depends(get_db)):
    """Registra una nueva preinscripción de aspirante."""
    nuevo_id = str(uuid.uuid4())
    carrera = data.carreras[0] if data.carreras else "Especialización en Sistemas de Información"

    cohorte_abierta = db.query(Cohorte).filter(Cohorte.inscripcion_abierta == True).first()
    cohorte_target_id = cohorte_abierta.id if cohorte_abierta else "c1a2b3c4-0001-0000-0000-000000000003"

    legajo = Legajo(
        id=nuevo_id,
        dni=data.numeroDocumento,
        apellido=data.apellido,
        nombre=data.nombre,
        email=data.emailPrincipal,
        telefono_movil=data.telefonoMovil,
        telefono_fijo=data.telefonoFijo,
        domicilio=data.direccion,
        ciudad=data.ciudad,
        provincia=data.provincia,
        pais=data.pais or "Argentina",
        titulo_grado=data.tituloGrado,
        titulo_posgrado=data.tituloPosgrado,
        carrera_elegida=carrera,
        medio_conocimiento=data.medioConocimiento,
        motivacion=data.motivacion,
        solicita_beca=data.solicitaBeca or False,
        tipo_beca=f"{data.porcentajeBeca}%" if data.porcentajeBeca else None,
        estado="PENDIENTE",
        cohorte_id=cohorte_target_id,
    )

    db.add(legajo)
    db.commit()
    db.refresh(legajo)

    return {
        "id": legajo.id,
        "numeroSeguimiento": f"REQ-2026-{legajo.id[:4]}",
        "mensaje": "Preinscripción registrada correctamente.",
    }

@router.get("", response_model=List[LegajoResponse])
def listar_legajos(
    busqueda: Optional[str] = Query(None),
    estado: Optional[str] = Query(None),
    cohorte: Optional[str] = Query(None),
    carrera: Optional[str] = Query(None),
    beca: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    usuario_actual: Usuario = Depends(get_current_user),
):
    """Retorna el listado de legajos filtrado según los criterios indicados."""
    query = db.query(Legajo).options(joinedload(Legajo.cohorte))

    if busqueda:
        term = f"%{busqueda.strip()}%"
        query = query.filter(
            (Legajo.dni.ilike(term)) |
            (Legajo.apellido.ilike(term)) |
            (Legajo.nombre.ilike(term)) |
            (Legajo.email.ilike(term))
        )

    if estado:
        query = query.filter(Legajo.estado == estado.upper())

    if cohorte:
        query = query.join(Legajo.cohorte).filter(Cohorte.nombre.ilike(f"%{cohorte}%"))

    if carrera:
        query = query.filter(Legajo.carrera_elegida.ilike(f"%{carrera}%"))

    if beca:
        if beca.lower() in ["si", "sí", "true"]:
            query = query.filter(Legajo.solicita_beca == True)
        elif beca.lower() in ["no", "false"]:
            query = query.filter(Legajo.solicita_beca == False)

    legajos = query.order_by(Legajo.fecha_inscripcion.desc()).all()
    return [_mapear_legajo_response(l) for l in legajos]

@router.get("/{legajo_id}", response_model=LegajoResponse)
def obtener_legajo(
    legajo_id: str,
    db: Session = Depends(get_db),
    usuario_actual: Usuario = Depends(get_current_user),
):
    """Obtiene el detalle completo de un legajo por su ID."""
    legajo = db.query(Legajo).options(joinedload(Legajo.cohorte)).filter(Legajo.id == legajo_id).first()
    if not legajo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Legajo con ID {legajo_id} no encontrado.",
        )

    return _mapear_legajo_response(legajo)

@router.patch("/{legajo_id}/estado", response_model=LegajoResponse)
def cambiar_estado_legajo(
    legajo_id: str,
    body: LegajoUpdateEstado,
    db: Session = Depends(get_db),
    usuario_actual: Usuario = Depends(get_current_user),
):
    """Actualiza el estado de un legajo y registra la observación en auditoría."""
    legajo = db.query(Legajo).options(joinedload(Legajo.cohorte)).filter(Legajo.id == legajo_id).first()
    if not legajo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Legajo con ID {legajo_id} no encontrado.",
        )

    estado_anterior = legajo.estado
    nuevo_estado = body.estado.upper()
    legajo.estado = nuevo_estado

    # Generar número de legajo único al completar o matricular
    if nuevo_estado in ["COMPLETADO", "ACTIVO"] and not legajo.numero_legajo:
        legajo.numero_legajo = f"26-001-{legajo.id[:8].upper()}"

    auditoria = AuditoriaLegajo(
        legajo_id=legajo.id,
        estado_anterior=estado_anterior,
        estado_nuevo=nuevo_estado,
        comentario=body.comentario,
        usuario_email=usuario_actual.email,
    )

    db.add(auditoria)
    db.commit()
    db.refresh(legajo)

    return _mapear_legajo_response(legajo)
