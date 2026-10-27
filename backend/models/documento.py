import uuid
from datetime import datetime
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class Documento(Base):
    __tablename__ = "documentos"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    legajo_id = Column(String(36), ForeignKey("legajos.id", ondelete="CASCADE"), nullable=False)
    tipo = Column(String(50), nullable=False)
    path_storage = Column(String(500), nullable=False)
    nombre_original = Column(String(255), nullable=True)
    checksum_sha256 = Column(String(64), nullable=True)
    tamanio_bytes = Column(Integer, nullable=True)
    fecha_subida = Column(DateTime, default=datetime.utcnow)

    legajo = relationship("Legajo", back_populates="documentos")
