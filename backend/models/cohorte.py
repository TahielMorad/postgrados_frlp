import uuid
from sqlalchemy import Boolean, Column, Date, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class Cohorte(Base):
    __tablename__ = "cohortes"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    anio = Column(Integer, nullable=False)
    nombre = Column(String(50), nullable=False, unique=True)
    inscripcion_abierta = Column(Boolean, default=False, nullable=False)
    fecha_inicio = Column(Date, nullable=True)

    legajos = relationship("Legajo", back_populates="cohorte")
