from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.security import require_read
from app.db.session import get_db
from app.models import User
from app.repositories import orders as repo
from app.schemas.operations import ClientOut

router = APIRouter(prefix="/api/v1/clientes", tags=["Clientes"])


@router.get("", response_model=list[ClientOut])
def list_all(db: Session = Depends(get_db), user: User = Depends(require_read)):
    return repo.list_clients(db)
