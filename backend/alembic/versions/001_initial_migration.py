"""Initial migration

Revision ID: 001
Revises: 
Create Date: 2025-01-01 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = '001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table('locations',
    sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('city', sa.String(length=100), nullable=False),
    sa.Column('country', sa.String(length=100), nullable=False),
    sa.Column('address', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    
    op.create_table('containers',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('type', sa.String(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('tenant', sa.String(), nullable=False),
    sa.Column('purpose', sa.String(), nullable=False),
    sa.Column('location_id', postgresql.UUID(as_uuid=True), nullable=True),
    sa.Column('status', sa.String(), nullable=False),
    sa.Column('seed_types', sa.JSON(), nullable=True),
    sa.Column('created', sa.DateTime(), nullable=True),
    sa.Column('modified', sa.DateTime(), nullable=True),
    sa.Column('has_alert', sa.Boolean(), nullable=True),
    sa.Column('notes', sa.String(), nullable=True),
    sa.Column('shadow_service_enabled', sa.Boolean(), nullable=True),
    sa.Column('ecosystem_connected', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['location_id'], ['locations.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )


def downgrade() -> None:
    op.drop_table('containers')
    op.drop_table('locations')
