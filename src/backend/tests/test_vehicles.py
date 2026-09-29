from uuid import UUID, uuid4

from sqlalchemy import select

from app.models import Audit, Vehicle
from app.repositories import vehicles as vehicle_repo


def test_vehicle_flow(context, vehicle_data):
    client, headers = context["client"], context["operator"]
    assert client.get("/api/v1/vehiculos", headers=headers).json() == []
    response = client.post("/api/v1/vehiculos", json=vehicle_data, headers=headers)
    assert response.status_code == 201, response.text
    vehicle_id = response.json()["vehiculo_id"]
    assert response.json()["estado"] == "DISPONIBLE"
    assert len(client.get("/api/v1/vehiculos", headers=headers).json()) == 1
    assert client.get(f"/api/v1/vehiculos/{vehicle_id}", headers=headers).json()["placa"] == "ABC-123"

    updated = {**vehicle_data, "capacidad_kg": "1500.00", "estado": "MANTENIMIENTO"}
    response = client.put(f"/api/v1/vehiculos/{vehicle_id}", json=updated, headers=headers)
    assert response.status_code == 200
    assert response.json()["capacidad_kg"] == "1500.00"
    response = client.patch(f"/api/v1/vehiculos/{vehicle_id}/desactivar", headers=headers)
    assert response.status_code == 200
    assert response.json()["estado"] == "INACTIVO"
    with context["factory"]() as db:
        assert db.get(Vehicle, UUID(vehicle_id)) is not None
        assert len(list(db.scalars(select(Audit).where(Audit.entidad == "VEHICULO", Audit.resultado == "EXITOSO")))) == 3


def test_vehicle_rejections_preserve_state(context, vehicle_data):
    client, headers = context["client"], context["operator"]
    assert client.post("/api/v1/vehiculos", json={**vehicle_data, "capacidad_kg": "0"}, headers=headers).status_code == 422
    assert client.post("/api/v1/vehiculos", json={"placa": "XYZ"}, headers=headers).status_code == 422
    vehicle = client.post("/api/v1/vehiculos", json=vehicle_data, headers=headers).json()
    vehicle_id = vehicle["vehiculo_id"]
    assert client.post("/api/v1/vehiculos", json=vehicle_data, headers=headers).status_code == 409
    assert client.put(f"/api/v1/vehiculos/{vehicle_id}", json={**vehicle_data, "capacidad_m3": "-1"}, headers=headers).status_code == 422
    assert client.get(f"/api/v1/vehiculos/{vehicle_id}", headers=headers).json()["capacidad_m3"] == "8.00"
    assert client.patch(f"/api/v1/vehiculos/{uuid4()}/desactivar", headers=headers).status_code == 404
    assert client.get(f"/api/v1/vehiculos/{uuid4()}", headers=headers).status_code == 404
    assert client.patch(f"/api/v1/vehiculos/{vehicle_id}/desactivar", headers=headers).status_code == 200
    assert client.patch(f"/api/v1/vehiculos/{vehicle_id}/desactivar", headers=headers).status_code == 409


def test_unique_conflict_rolls_back_vehicle_and_success_audit(context, vehicle_data, monkeypatch):
    client, headers = context["client"], context["operator"]
    assert client.post("/api/v1/vehiculos", json=vehicle_data, headers=headers).status_code == 201
    monkeypatch.setattr(vehicle_repo, "plate_exists", lambda *args, **kwargs: False)

    response = client.post("/api/v1/vehiculos", json=vehicle_data, headers=headers)
    assert response.status_code == 409

    with context["factory"]() as db:
        assert len(list(db.scalars(select(Vehicle)))) == 1
        audits = list(db.scalars(select(Audit).where(Audit.entidad == "VEHICULO")))
        assert sorted(audit.resultado for audit in audits) == ["EXITOSO", "FALLIDO"]
