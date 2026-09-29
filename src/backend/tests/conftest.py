import importlib
import os
from uuid import UUID

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings
from app.core.security import create_token, hash_password
from app.db.base import Base
from app.db.session import get_db
from app.main import app
from app.models import Client, Role, User


@pytest.fixture
def context(tmp_path, monkeypatch):
    database_url = os.getenv("TEST_DATABASE_URL", f"sqlite:///{tmp_path / 'sprint1.db'}")
    engine = create_engine(database_url)
    Base.metadata.create_all(engine)
    factory = sessionmaker(bind=engine, expire_on_commit=False)
    monkeypatch.setattr(settings, "jwt_secret", "test-key-that-is-longer-than-thirty-two-characters")

    with factory() as db:
        operator_role = Role(nombre="OPERADOR_LOGISTICO")
        auditor_role = Role(nombre="AUDITOR")
        db.add_all([operator_role, auditor_role])
        db.flush()
        operator = User(nombre="Operador", email="op@example.test", password_hash=hash_password("secure-password"), roles=[operator_role])
        auditor = User(nombre="Auditor", email="audit@example.test", password_hash=hash_password("secure-password"), roles=[auditor_role])
        db.add_all([operator, auditor, Client(cliente_id=UUID("00000000-0000-0000-0000-000000000001"), nombre="Cliente", estado="ACTIVO")])
        db.commit()
        operator_id = operator.usuario_id
        auditor_id = auditor.usuario_id

    def override_db():
        with factory() as db:
            yield db

    app.dependency_overrides[get_db] = override_db
    main_module = importlib.import_module("app.main")
    monkeypatch.setattr(main_module, "SessionLocal", factory)
    with TestClient(app) as client:
        yield {
            "client": client,
            "factory": factory,
            "operator": {"Authorization": f"Bearer {create_token(operator_id)}"},
            "auditor": {"Authorization": f"Bearer {create_token(auditor_id)}"},
        }
    app.dependency_overrides.clear()
    Base.metadata.drop_all(engine)
    engine.dispose()


@pytest.fixture
def vehicle_data():
    return {
        "placa": "ABC-123", "marca": "Toyota", "modelo": "Hiace",
        "capacidad_kg": "1200.00", "capacidad_m3": "8.00",
        "consumo_km_l": "10.0000", "factor_emision_kg_co2_km": "0.250000",
        "estado": "DISPONIBLE",
    }


@pytest.fixture
def order_data():
    return {
        "cliente_id": "00000000-0000-0000-0000-000000000001",
        "codigo_pedido": "PED-001", "direccion_entrega": "Av. Lima 100",
        "latitud": "-12.043180", "longitud": "-77.028240",
        "peso_kg": "25.00", "volumen_m3": "0.125",
        "ventana_inicio": "2026-10-01T09:00:00-05:00",
        "ventana_fin": "2026-10-01T12:00:00-05:00",
        "prioridad": "MEDIA",
    }
