from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Driver


def get(db: Session, driver_id: UUID) -> Driver | None:
    return db.get(Driver, driver_id)


def list_all(db: Session, available: bool | None = None) -> list[Driver]:
    query = select(Driver).order_by(Driver.creado_en, Driver.conductor_id)
    if available is True:
        query = query.where(Driver.estado == "DISPONIBLE")
    elif available is False:
        query = query.where(Driver.estado != "DISPONIBLE")
    return list(db.scalars(query))


def license_exists(db: Session, license_number: str) -> bool:
    return db.scalar(select(Driver.conductor_id).where(Driver.numero_licencia == license_number)) is not None
