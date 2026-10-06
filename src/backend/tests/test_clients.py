from uuid import UUID, uuid4

from sqlalchemy import select

from app.models import Audit, Client


def test_client_registration_query_and_update(context):
    client, headers = context["client"], context["operator"]
    data = {
        "nombre": "Bodega Central",
        "telefono": "999888777",
        "email": "ENTREGAS@BODEGA.TEST",
        "preferencia_entrega": "Llamar 15 minutos antes",
        "restriccion_acceso": "Vehículos de máximo 3 metros",
        "estado": "ACTIVO",
    }
    created = client.post("/api/v1/clientes", json=data, headers=headers)
    assert created.status_code == 201, created.text
    client_id = created.json()["cliente_id"]
    assert created.json()["email"] == "entregas@bodega.test"
    assert len(client.get("/api/v1/clientes?activo=true", headers=headers).json()) == 2
    assert client.get(f"/api/v1/clientes/{client_id}", headers=headers).json()["nombre"] == "Bodega Central"

    updated = client.put(
        f"/api/v1/clientes/{client_id}",
        json={**data, "email": "operaciones@bodega.test", "preferencia_entrega": "Entregar por puerta lateral"},
        headers=headers,
    )
    assert updated.status_code == 200, updated.text
    assert updated.json()["preferencia_entrega"] == "Entregar por puerta lateral"
    with context["factory"]() as db:
        assert db.get(Client, UUID(client_id)).email == "operaciones@bodega.test"
        audits = list(db.scalars(select(Audit).where(Audit.entidad == "CLIENTE", Audit.resultado == "EXITOSO")))
        assert [audit.accion for audit in audits] == ["REGISTRAR", "ACTUALIZAR"]


def test_client_rejections_and_filters(context):
    client, headers = context["client"], context["operator"]
    data = {"nombre": "Cliente Norte", "email": "norte@example.test", "estado": "ACTIVO"}
    created = client.post("/api/v1/clientes", json=data, headers=headers)
    client_id = created.json()["cliente_id"]
    assert client.post("/api/v1/clientes", json={"nombre": ""}, headers=headers).status_code == 422
    assert client.post("/api/v1/clientes", json={"nombre": "Inválido", "email": "correo-invalido"}, headers=headers).status_code == 422
    assert client.post("/api/v1/clientes", json={"nombre": "Duplicado", "email": "norte@example.test"}, headers=headers).status_code == 409
    assert client.put(f"/api/v1/clientes/{client_id}", json={**data, "email": "sin-dominio"}, headers=headers).status_code == 422
    assert client.get(f"/api/v1/clientes/{client_id}", headers=headers).json()["email"] == "norte@example.test"
    assert client.get(f"/api/v1/clientes/{uuid4()}", headers=headers).status_code == 404
    assert client.put(f"/api/v1/clientes/{uuid4()}", json=data, headers=headers).status_code == 404

    inactive = client.put(f"/api/v1/clientes/{client_id}", json={**data, "estado": "INACTIVO"}, headers=headers)
    assert inactive.status_code == 200
    assert len(client.get("/api/v1/clientes?activo=false", headers=headers).json()) == 1
    assert all(item["estado"] == "ACTIVO" for item in client.get("/api/v1/clientes?activo=true", headers=headers).json())


def test_client_write_permissions(context):
    data = {"nombre": "Cliente restringido", "estado": "ACTIVO"}
    assert context["client"].post("/api/v1/clientes", json=data, headers=context["auditor"]).status_code == 403
