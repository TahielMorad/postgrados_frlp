import sys
import logging
from alembic import command
from alembic.config import Config
from database import SessionLocal
from services.seed_service import run_seed_data

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("init_db")

def init_db():
    logger.info("Corriendo migraciones Alembic (alembic upgrade head)...")
    try:
        alembic_cfg = Config("alembic.ini")
        command.upgrade(alembic_cfg, "head")
        logger.info("Migraciones ejecutadas exitosamente.")
    except Exception as e:
        logger.warning(f"Excepción al ejecutar migraciones Alembic: {e}")

    logger.info("Cargando datos semilla (seed data)...")
    db = SessionLocal()
    try:
        run_seed_data(db)
        logger.info("Carga de datos semilla completada.")
    finally:
        db.close()

if __name__ == "__main__":
    init_db()
