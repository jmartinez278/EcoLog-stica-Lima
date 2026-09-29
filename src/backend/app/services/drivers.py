from uuid import UUID, uuid4

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models import Driver, User
from app.repositories import drivers as repo
from app.schemas.operations import DriverInput
from app.services.common import commit_change


def get_driver(db: Session, driver_id: UUID) -> Driver:
    driver = repo.get(db, driver_id)
    if driver is None:
        raise HTTPException(status_code=404, detail="Conductor no encontrado")
    return driver


def create(db: Session, user: User, data: DriverInput) -> Driver:
    if repo.license_exists(db, data.numero_licencia):
        raise HTTPException(status_code=409, detail="El número de licencia ya está registrado")
    driver = Driver(conductor_id=uuid4(), **data.model_dump())
    commit_change(db, user, driver, "CONDUCTOR", "REGISTRAR", driver.conductor_id)
    return driver
