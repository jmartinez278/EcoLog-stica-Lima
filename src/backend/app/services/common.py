from uuid import UUID

from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models import Audit, User


def commit_change(db: Session, user: User, entity: object, domain: str, action: str, entity_id: UUID, detail: dict | None = None) -> None:
    try:
        db.add(entity)
        db.flush()
        db.add(Audit(
            usuario_id=user.usuario_id,
            entidad=domain,
            entidad_id=entity_id,
            accion=action,
            resultado="EXITOSO",
            detalle=detail or {},
        ))
        db.commit()
        db.refresh(entity)
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=409, detail="Identificador duplicado o referencia inválida") from exc
    except Exception:
        db.rollback()
        raise
