from uuid import uuid4


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
