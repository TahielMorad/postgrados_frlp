import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Sistema de Posgrados UTN FRLP"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql://postgrado_user:postgrado_dev_password@db:5432/postgrado_dev",
    )
    JWT_SECRET: str = os.getenv("JWT_SECRET", "dev-secret-change-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 480
    STORAGE_PATH: str = os.getenv("STORAGE_PATH", "/var/postgrado-storage")

settings = Settings()
