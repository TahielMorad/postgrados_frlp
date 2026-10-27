import uuid
from datetime import datetime
from sqlalchemy import Boolean, Column, DateTime, ForeignKey, String, Text
from sqlalchemy.orm import relationship
from database import Base

class Legajo(Base):
    __tablename__ = "legajos"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    numero_legajo = Column(String(20), unique=True, nullable=True, index=True)
    cohorte_id = Column(String(36), ForeignKey("cohortes.id"), nullable=True)
    dni = Column(String(20), nullable=False, index=True)
    apellido = Column(String(100), nullable=False)
    nombre = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    telefono_movil = Column(String(50), nullable=True)
    telefono_fijo = Column(String(50), nullable=True)
    domicilio = Column(String(255), nullable=True)
    ciudad = Column(String(100), nullable=True)
    provincia = Column(String(100), nullable=True)
    pais = Column(String(100), nullable=True)
    titulo_grado = Column(String(255), nullable=True)
    titulo_posgrado = Column(String(255), nullable=True)
    carrera_elegida = Column(String(255), nullable=True)
    medio_conocimiento = Column(String(100), nullable=True)
    motivacion = Column(Text, nullable=True)
    solicita_beca = Column(Boolean, default=False)
    tipo_beca = Column(String(20), nullable=True)
    estado = Column(String(30), nullable=False, default="PENDIENTE")
    tipo_carrera = Column(String(30), nullable=True)
    fecha_inscripcion = Column(DateTime, default=datetime.utcnow)

    cohorte = relationship("Cohorte", back_populates="legajos")
    documentos = relationship("Documento", back_populates="legajo", cascade="all, delete-orphan")
    auditorias = relationship("AuditoriaLegajo", back_populates="legajo", cascade="all, delete-orphan")
