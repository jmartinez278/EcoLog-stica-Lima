from uuid import UUID, uuid4

from sqlalchemy import select

from app.models import Audit, Driver


def test_driver_registration_and_filter(context):
    client, headers = context["client"], context["operator"]
    available = {"nombres": "Ana", "apellidos": "Pérez", "numero_licencia": "LIC-001", "categoria_licencia": "A-IIb", "estado": "DISPONIBLE"}
    unavailable = {**available, "numero_licencia": "LIC-002", "estado": "DESCANSO"}
    assert client.get("/api/v1/conductores", headers=headers).json() == []
    first = client.post("/api/v1/conductores", json=available, headers=headers)
    assert first.status_code == 201, first.text
    assert client.post("/api/v1/conductores", json=unavailable, headers=headers).status_code == 201
    assert len(client.get("/api/v1/conductores", headers=headers).json()) == 2
    assert len(client.get("/api/v1/conductores?disponible=true", headers=headers).json()) == 1
    assert len(client.get("/api/v1/conductores?disponible=false", headers=headers).json()) == 1
    assert client.get(f"/api/v1/conductores/{first.json()['conductor_id']}", headers=headers).json()["estado"] == "DISPONIBLE"
    assert client.get(f"/api/v1/conductores/{uuid4()}", headers=headers).status_code == 404


def test_driver_invalid_duplicate_and_no_available(context):
    client, headers = context["client"], context["operator"]
    driver = {"nombres": "Luis", "apellidos": "Soto", "numero_licencia": "LIC-003", "categoria_licencia": "A-IIb", "estado": "DESCANSO"}
    assert client.post("/api/v1/conductores", json={"nombres": "Luis"}, headers=headers).status_code == 422
    assert client.post("/api/v1/conductores", json={**driver, "experiencia_anios": -1}, headers=headers).status_code == 422
    assert client.post("/api/v1/conductores", json=driver, headers=headers).status_code == 201
    assert client.post("/api/v1/conductores", json=driver, headers=headers).status_code == 409
    assert client.get("/api/v1/conductores?disponible=true", headers=headers).json() == []


def test_driver_update_and_deactivation(context):
    client, headers = context["client"], context["operator"]
    data = {
        "nombres": "Ana", "apellidos": "Pérez", "numero_licencia": "LIC-010",
        "categoria_licencia": "A-IIb", "telefono": "999111222",
        "experiencia_anios": 4, "estado": "DISPONIBLE",
    }
    created = client.post("/api/v1/conductores", json=data, headers=headers)
    driver_id = created.json()["conductor_id"]

    updated = client.put(
        f"/api/v1/conductores/{driver_id}",
        json={**data, "telefono": "999333444", "estado": "DESCANSO"},
        headers=headers,
    )
    assert updated.status_code == 200, updated.text
    assert updated.json()["telefono"] == "999333444"
    assert updated.json()["estado"] == "DESCANSO"

    deactivated = client.patch(f"/api/v1/conductores/{driver_id}/desactivar", headers=headers)
    assert deactivated.status_code == 200
    assert deactivated.json()["estado"] == "INACTIVO"
    assert client.put(f"/api/v1/conductores/{driver_id}", json=data, headers=headers).status_code == 409
    assert client.patch(f"/api/v1/conductores/{driver_id}/desactivar", headers=headers).status_code == 409

    with context["factory"]() as db:
        assert db.get(Driver, UUID(driver_id)).estado == "INACTIVO"
        audits = list(db.scalars(select(Audit).where(Audit.entidad == "CONDUCTOR", Audit.resultado == "EXITOSO")))
        assert [audit.accion for audit in audits] == ["REGISTRAR", "ACTUALIZAR", "DESACTIVAR"]


def test_driver_update_rejections_preserve_state(context):
    client, headers = context["client"], context["operator"]
    first = {"nombres": "Luis", "apellidos": "Soto", "numero_licencia": "LIC-020", "categoria_licencia": "A-IIb"}
    second = {**first, "nombres": "Rosa", "numero_licencia": "LIC-021"}
    first_id = client.post("/api/v1/conductores", json=first, headers=headers).json()["conductor_id"]
    second_id = client.post("/api/v1/conductores", json=second, headers=headers).json()["conductor_id"]
    assert client.put(f"/api/v1/conductores/{first_id}", json={**first, "numero_licencia": "LIC-021"}, headers=headers).status_code == 409
    assert client.put(f"/api/v1/conductores/{first_id}", json={**first, "experiencia_anios": -1}, headers=headers).status_code == 422
    assert client.get(f"/api/v1/conductores/{first_id}", headers=headers).json()["numero_licencia"] == "LIC-020"
    assert client.put(f"/api/v1/conductores/{uuid4()}", json=first, headers=headers).status_code == 404
    assert client.patch(f"/api/v1/conductores/{uuid4()}/desactivar", headers=headers).status_code == 404

    assigned = {**second, "estado": "ASIGNADO"}
    assert client.put(f"/api/v1/conductores/{second_id}", json=assigned, headers=headers).status_code == 200
    assert client.put(f"/api/v1/conductores/{second_id}", json={**second, "estado": "INACTIVO"}, headers=headers).status_code == 409
    assert client.patch(f"/api/v1/conductores/{second_id}/desactivar", headers=headers).status_code == 409
