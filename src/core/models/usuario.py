import uuid
from sqlalchemy import Boolean, Column, String
from database import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String(255), nullable=False, unique=True, index=True)
    password_hash = Column(String(255), nullable=False)
    nombre = Column(String(100), nullable=False)
    rol = Column(String(30), nullable=False)  # COORDINADOR, DOCENTE, CPR, ADMIN
    activo = Column(Boolean, default=True, nullable=False)
