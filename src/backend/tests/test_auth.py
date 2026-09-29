from sqlalchemy import select

from app.models import Audit, User


def test_login_and_permissions(context, vehicle_data):
    client = context["client"]
    response = client.post("/api/v1/auth/login", json={"email": "op@example.test", "password": "secure-password"})
    assert response.status_code == 200
    assert response.json()["token_type"] == "bearer"
    assert client.post("/api/v1/auth/login", json={"email": "op@example.test", "password": "wrong"}).status_code == 401
    assert client.get("/api/v1/vehiculos").status_code == 401
    assert client.get("/api/v1/vehiculos", headers=context["auditor"]).status_code == 200
    assert client.post("/api/v1/vehiculos", json=vehicle_data, headers=context["auditor"]).status_code == 403
    with context["factory"]() as db:
        assert db.scalar(select(Audit).where(Audit.resultado == "FALLIDO")) is not None


def test_inactive_user_rejected(context):
    with context["factory"]() as db:
        user = db.scalar(select(User).where(User.email == "op@example.test"))
        user.estado = "INACTIVO"
        db.commit()
    assert context["client"].get("/api/v1/conductores", headers=context["operator"]).status_code == 401
    assert context["client"].post("/api/v1/auth/login", json={"email": "op@example.test", "password": "secure-password"}).status_code == 401
