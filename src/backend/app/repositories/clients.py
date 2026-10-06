from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Client


def get(db: Session, client_id: UUID) -> Client | None:
    return db.get(Client, client_id)


def list_all(db: Session, active: bool | None = None) -> list[Client]:
    query = select(Client).order_by(Client.nombre, Client.cliente_id)
    if active is True:
        query = query.where(Client.estado == "ACTIVO")
    elif active is False:
        query = query.where(Client.estado == "INACTIVO")
    return list(db.scalars(query))


def email_exists(db: Session, email: str, exclude_id: UUID | None = None) -> bool:
    query = select(Client.cliente_id).where(Client.email == email)
    if exclude_id:
        query = query.where(Client.cliente_id != exclude_id)
    return db.scalar(query) is not None
