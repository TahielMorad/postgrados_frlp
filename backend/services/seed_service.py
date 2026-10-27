from sqlalchemy.orm import Session
from models.cohorte import Cohorte
from models.usuario import Usuario
from models.legajo import Legajo
from security import get_password_hash

def run_seed_data(db: Session) -> None:
    cohortes_data = [
        {"id": "c1a2b3c4-0001-0000-0000-000000000001", "anio": 2024, "nombre": "Cohorte 2024", "inscripcion_abierta": False},
        {"id": "c1a2b3c4-0001-0000-0000-000000000002", "anio": 2025, "nombre": "Cohorte 2025", "inscripcion_abierta": False},
        {"id": "c1a2b3c4-0001-0000-0000-000000000003", "anio": 2026, "nombre": "Cohorte 2026", "inscripcion_abierta": True},
    ]

    for cdata in cohortes_data:
        if not db.query(Cohorte).filter(Cohorte.id == cdata["id"]).first():
            cohorte = Cohorte(**cdata)
            db.add(cohorte)

    usuarios_data = [
        {
            "email": "admin@prueba.com",
            "password_hash": get_password_hash("admin123"),
            "nombre": "Administrador Posgrados",
            "rol": "COORDINADOR",
        },
        {
            "email": "admin@fenix.test",
            "password_hash": get_password_hash("Admin1234!"),
            "nombre": "María González",
            "rol": "COORDINADOR",
        },
        {
            "email": "docente@fenix.test",
            "password_hash": get_password_hash("Docente1234!"),
            "nombre": "Carlos Pérez",
            "rol": "DOCENTE",
        },
        {
            "email": "cpr@fenix.test",
            "password_hash": get_password_hash("Cpr1234!"),
            "nombre": "Laura Martínez",
            "rol": "CPR",
        },
    ]

    for udata in usuarios_data:
        if not db.query(Usuario).filter(Usuario.email == udata["email"]).first():
            usuario = Usuario(**udata)
            db.add(usuario)

    if db.query(Legajo).count() == 0:
        legajos_iniciales = [
            {
                "numero_legajo": "26-001-001",
                "cohorte_id": "c1a2b3c4-0001-0000-0000-000000000003",
                "dni": "28456789",
                "apellido": "Rodríguez",
                "nombre": "Ana Laura",
                "email": "ana.rodriguez@gmail.com",
                "telefono_movil": "+54 221 4567890",
                "titulo_grado": "Ingeniería en Sistemas de Información",
                "carrera_elegida": "Especialización en Sistemas de Información",
                "solicita_beca": False,
                "estado": "ACTIVO",
            },
            {
                "numero_legajo": "26-001-002",
                "cohorte_id": "c1a2b3c4-0001-0000-0000-000000000003",
                "dni": "32567891",
                "apellido": "Fernández",
                "nombre": "Martín Alejandro",
                "email": "m.fernandez.dev@outlook.com",
                "telefono_movil": "+54 221 5678901",
                "titulo_grado": "Licenciatura en Sistemas",
                "carrera_elegida": "Maestría en Tecnología Informática",
                "solicita_beca": True,
                "tipo_beca": "30%",
                "estado": "EN_REVISION",
            },
            {
                "numero_legajo": None,
                "cohorte_id": "c1a2b3c4-0001-0000-0000-000000000003",
                "dni": "35123456",
                "apellido": "López",
                "nombre": "Sofía Valentina",
                "email": "sofia.lopez.ingenieria@gmail.com",
                "telefono_movil": "+54 11 5432-1098",
                "titulo_grado": "Ingeniería Industrial",
                "carrera_elegida": "Especialización en Sistemas de Información",
                "solicita_beca": False,
                "estado": "PENDIENTE",
            },
        ]
        for ldata in legajos_iniciales:
            legajo = Legajo(**ldata)
            db.add(legajo)

    db.commit()
