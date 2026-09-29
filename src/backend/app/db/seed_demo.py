from uuid import UUID

from sqlalchemy import select

from app.core.config import settings
from app.core.security import hash_password
from app.db.session import SessionLocal
from app.models import Client, Role, User

ROLES = ["ADMINISTRADOR", "OPERADOR_LOGISTICO", "SUPERVISOR", "CONDUCTOR", "GERENCIA", "AUDITOR"]
DEMO_CLIENT_ID = UUID("00000000-0000-0000-0000-000000000001")


def seed() -> None:
    if not settings.bootstrap_operator_email or not settings.bootstrap_operator_password:
        raise RuntimeError("Configure BOOTSTRAP_OPERATOR_EMAIL y BOOTSTRAP_OPERATOR_PASSWORD")
    if "replace" in settings.bootstrap_operator_password.lower():
        raise RuntimeError("Cambie la contraseña de ejemplo antes de iniciar")
    with SessionLocal() as db:
        for name in ROLES:
            if not db.scalar(select(Role).where(Role.nombre == name)):
                db.add(Role(nombre=name))
        db.flush()
        operator = db.scalar(select(User).where(User.email == settings.bootstrap_operator_email))
        if operator is None:
            role = db.scalar(select(Role).where(Role.nombre == "OPERADOR_LOGISTICO"))
            db.add(User(
                nombre="Operador de prueba",
                email=settings.bootstrap_operator_email,
                password_hash=hash_password(settings.bootstrap_operator_password),
                roles=[role],
            ))
        if db.get(Client, DEMO_CLIENT_ID) is None:
            db.add(Client(cliente_id=DEMO_CLIENT_ID, nombre="Cliente de ejemplo", estado="ACTIVO"))
        db.commit()


if __name__ == "__main__":
    seed()
