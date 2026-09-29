from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import create_token, verify_password
from app.db.session import get_db
from app.models import User
from app.schemas.operations import LoginInput, TokenOut

router = APIRouter(prefix="/api/v1/auth", tags=["Autenticación"])


@router.post("/login", response_model=TokenOut)
def login(data: LoginInput, db: Session = Depends(get_db)) -> TokenOut:
    user = db.scalar(select(User).where(User.email == data.email))
    if user is None or user.estado != "ACTIVO" or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    role = next((role.nombre for role in user.roles if role.nombre in {"ADMINISTRADOR", "OPERADOR_LOGISTICO"}), user.roles[0].nombre if user.roles else "")
    return TokenOut(access_token=create_token(user.usuario_id), role=role)
