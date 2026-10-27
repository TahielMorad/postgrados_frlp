import uuid
from datetime import datetime
from sqlalchemy import Column, DateTime, ForeignKey, String, Text
from sqlalchemy.orm import relationship
from database import Base

class AuditoriaLegajo(Base):
    __tablename__ = "auditoria_legajos"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    legajo_id = Column(String(36), ForeignKey("legajos.id"), nullable=False)
    estado_anterior = Column(String(30), nullable=True)
    estado_nuevo = Column(String(30), nullable=False)
    comentario = Column(Text, nullable=True)
    usuario_email = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    legajo = relationship("Legajo", back_populates="auditorias")
