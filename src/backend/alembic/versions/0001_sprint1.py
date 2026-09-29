"""Initial Sprint 1 schema from the documented PostgreSQL model."""

from alembic import op
from app.db.base import Base
from app import models  # noqa: F401

revision = "0001_sprint1"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    bind = op.get_bind()
    if bind.dialect.name == "postgresql":
        op.execute("CREATE EXTENSION IF NOT EXISTS pgcrypto")
    Base.metadata.create_all(bind=bind)


def downgrade() -> None:
    Base.metadata.drop_all(bind=op.get_bind())
