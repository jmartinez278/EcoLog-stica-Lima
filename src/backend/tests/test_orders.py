from uuid import UUID, uuid4

from sqlalchemy import select

from app.models import Audit, Order


def test_order_flow(context, order_data):
    client, headers = context["client"], context["operator"]
    assert client.get("/api/v1/pedidos", headers=headers).json() == []
    assert len(client.get("/api/v1/clientes", headers=headers).json()) == 1
    response = client.post("/api/v1/pedidos", json=order_data, headers=headers)
    assert response.status_code == 201, response.text
    order_id = response.json()["pedido_id"]
    assert response.json()["estado"] == "PENDIENTE"
    assert len(client.get("/api/v1/pedidos?estado=PENDIENTE", headers=headers).json()) == 1
    assert client.get("/api/v1/pedidos?estado=CANCELADO", headers=headers).json() == []
    assert client.get(f"/api/v1/pedidos/{order_id}", headers=headers).json()["codigo_pedido"] == "PED-001"
    changed = {**order_data, "direccion_entrega": "Jr. Nuevo 200"}
    response = client.put(f"/api/v1/pedidos/{order_id}", json=changed, headers=headers)
    assert response.status_code == 200
    assert response.json()["direccion_entrega"] == "Jr. Nuevo 200"
    response = client.patch(f"/api/v1/pedidos/{order_id}/cancelar", headers=headers)
    assert response.status_code == 200
    assert response.json()["estado"] == "CANCELADO"
    assert client.get("/api/v1/pedidos?estado=PENDIENTE", headers=headers).json() == []
    with context["factory"]() as db:
        assert len(list(db.scalars(select(Audit).where(Audit.entidad == "PEDIDO", Audit.resultado == "EXITOSO")))) == 3


def test_order_rejections(context, order_data):
    client, headers = context["client"], context["operator"]
    invalid_window = {**order_data, "ventana_fin": order_data["ventana_inicio"]}
    assert client.post("/api/v1/pedidos", json=invalid_window, headers=headers).status_code == 422
    assert client.post("/api/v1/pedidos", json={**order_data, "cliente_id": str(uuid4())}, headers=headers).status_code == 422
    response = client.post("/api/v1/pedidos", json=order_data, headers=headers)
    order_id = response.json()["pedido_id"]
    assert client.post("/api/v1/pedidos", json=order_data, headers=headers).status_code == 409
    with context["factory"]() as db:
        order = db.get(Order, UUID(order_id))
        order.estado = "PLANIFICADO"
        db.commit()
    assert client.put(f"/api/v1/pedidos/{order_id}", json={**order_data, "direccion_entrega": "Otra"}, headers=headers).status_code == 409
    assert client.patch(f"/api/v1/pedidos/{order_id}/cancelar", headers=headers).status_code == 409
    assert client.get(f"/api/v1/pedidos/{order_id}", headers=headers).json()["direccion_entrega"] == "Av. Lima 100"
    assert client.get(f"/api/v1/pedidos/{uuid4()}", headers=headers).status_code == 404
    assert client.patch(f"/api/v1/pedidos/{uuid4()}/cancelar", headers=headers).status_code == 404
