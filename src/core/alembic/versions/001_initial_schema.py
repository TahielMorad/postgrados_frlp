"""initial_schema

Revision ID: 001_initial_schema
Revises: 
Create Date: 2026-08-05 10:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

revision: str = '001_initial_schema'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    # 1. Cohortes
    op.create_table(
        'cohortes',
        sa.Column('id', sa.String(length=36), nullable=False),
        sa.Column('anio', sa.Integer(), nullable=False),
        sa.Column('nombre', sa.String(length=50), nullable=False),
        sa.Column('inscripcion_abierta', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('fecha_inicio', sa.Date(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('nombre')
    )

    # 2. Usuarios
    op.create_table(
        'usuarios',
        sa.Column('id', sa.String(length=36), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('password_hash', sa.String(length=255), nullable=False),
        sa.Column('nombre', sa.String(length=100), nullable=False),
        sa.Column('rol', sa.String(length=30), nullable=False),
        sa.Column('activo', sa.Boolean(), nullable=False, server_default='true'),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email')
    )

    # 3. Legajos
    op.create_table(
        'legajos',
        sa.Column('id', sa.String(length=36), nullable=False),
        sa.Column('numero_legajo', sa.String(length=20), nullable=True),
        sa.Column('cohorte_id', sa.String(length=36), nullable=True),
        sa.Column('dni', sa.String(length=20), nullable=False),
        sa.Column('apellido', sa.String(length=100), nullable=False),
        sa.Column('nombre', sa.String(length=100), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('telefono_movil', sa.String(length=50), nullable=True),
        sa.Column('telefono_fijo', sa.String(length=50), nullable=True),
        sa.Column('domicilio', sa.String(length=255), nullable=True),
        sa.Column('ciudad', sa.String(length=100), nullable=True),
        sa.Column('provincia', sa.String(length=100), nullable=True),
        sa.Column('pais', sa.String(length=100), nullable=True),
        sa.Column('titulo_grado', sa.String(length=255), nullable=True),
        sa.Column('titulo_posgrado', sa.String(length=255), nullable=True),
        sa.Column('carrera_elegida', sa.String(length=255), nullable=True),
        sa.Column('medio_conocimiento', sa.String(length=100), nullable=True),
        sa.Column('motivacion', sa.Text(), nullable=True),
        sa.Column('solicita_beca', sa.Boolean(), nullable=True, server_default='false'),
        sa.Column('tipo_beca', sa.String(length=20), nullable=True),
        sa.Column('estado', sa.String(length=30), nullable=False, server_default='PENDIENTE'),
        sa.Column('tipo_carrera', sa.String(length=30), nullable=True),
        sa.Column('fecha_inscripcion', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['cohorte_id'], ['cohortes.id'], ),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('numero_legajo')
    )

    # 4. Documentos
    op.create_table(
        'documentos',
        sa.Column('id', sa.String(length=36), nullable=False),
        sa.Column('legajo_id', sa.String(length=36), nullable=False),
        sa.Column('tipo', sa.String(length=50), nullable=False),
        sa.Column('path_storage', sa.String(length=500), nullable=False),
        sa.Column('nombre_original', sa.String(length=255), nullable=True),
        sa.Column('checksum_sha256', sa.String(length=64), nullable=True),
        sa.Column('tamanio_bytes', sa.Integer(), nullable=True),
        sa.Column('fecha_subida', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['legajo_id'], ['legajos.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )

    # 5. Auditoria Legajos
    op.create_table(
        'auditoria_legajos',
        sa.Column('id', sa.String(length=36), nullable=False),
        sa.Column('legajo_id', sa.String(length=36), nullable=False),
        sa.Column('estado_anterior', sa.String(length=30), nullable=True),
        sa.Column('estado_nuevo', sa.String(length=30), nullable=False),
        sa.Column('comentario', sa.Text(), nullable=True),
        sa.Column('usuario_email', sa.String(length=255), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['legajo_id'], ['legajos.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

def downgrade() -> None:
    op.drop_table('auditoria_legajos')
    op.drop_table('documentos')
    op.drop_table('legajos')
    op.drop_table('usuarios')
    op.drop_table('cohortes')
