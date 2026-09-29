from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Client, Order


def get(db: Session, order_id: UUID) -> Order | None:
    return db.get(Order, order_id)


def list_all(db: Session, state: str | None = None) -> list[Order]:
    query = select(Order).order_by(Order.creado_en, Order.pedido_id)
    if state:
        query = query.where(Order.estado == state)
    return list(db.scalars(query))


def code_exists(db: Session, code: str, exclude_id: UUID | None = None) -> bool:
    query = select(Order.pedido_id).where(Order.codigo_pedido == code)
    if exclude_id:
        query = query.where(Order.pedido_id != exclude_id)
    return db.scalar(query) is not None


def active_client(db: Session, client_id: UUID) -> Client | None:
    client = db.get(Client, client_id)
    return client if client and client.estado == "ACTIVO" else None


def list_clients(db: Session) -> list[Client]:
    return list(db.scalars(select(Client).where(Client.estado == "ACTIVO").order_by(Client.nombre)))
