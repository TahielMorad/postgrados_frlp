from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # Las variables de entorno tienen prioridad; fuera de Docker se lee el
    # .env de la raíz del repo (o uno local en backend/).
    model_config = SettingsConfigDict(env_file=("../.env", ".env"), extra="ignore")

    PROJECT_NAME: str = "Sistema de Posgrados UTN FRLP"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str = "postgresql://postgrado_user:postgrado_dev_password@localhost:5432/postgrado_dev"
    JWT_SECRET: str = "dev-secret-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 480
    STORAGE_PATH: str = "/var/postgrado-storage"
    # Orígenes permitidos por CORS, separados por comas.
    CORS_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173"

    @property
    def cors_origins_list(self) -> list[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]

settings = Settings()
