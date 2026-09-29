from datetime import datetime
from decimal import Decimal
from typing import Annotated, Literal
from uuid import UUID

from pydantic import AwareDatetime, BaseModel, ConfigDict, Field, StringConstraints, model_validator

RequiredText = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1)]
VehicleState = Literal["DISPONIBLE", "EN_RUTA", "MANTENIMIENTO", "INACTIVO"]
DriverState = Literal["DISPONIBLE", "ASIGNADO", "DESCANSO", "INACTIVO"]
OrderState = Literal["PENDIENTE", "PLANIFICADO", "EN_RUTA", "ENTREGADO", "CANCELADO", "NO_ASIGNADO"]


class VehicleInput(BaseModel):
    placa: RequiredText = Field(max_length=15)
    marca: RequiredText = Field(max_length=80)
    modelo: RequiredText = Field(max_length=80)
    capacidad_kg: Decimal = Field(gt=0, max_digits=10, decimal_places=2)
    capacidad_m3: Decimal = Field(gt=0, max_digits=10, decimal_places=2)
    consumo_km_l: Decimal | None = Field(default=None, gt=0, max_digits=10, decimal_places=4)
    factor_emision_kg_co2_km: Decimal | None = Field(default=None, ge=0, max_digits=10, decimal_places=6)
    estado: VehicleState = "DISPONIBLE"


class VehicleOut(VehicleInput):
    model_config = ConfigDict(from_attributes=True)
    vehiculo_id: UUID
    creado_en: datetime
    actualizado_en: datetime


class DriverInput(BaseModel):
    nombres: RequiredText = Field(max_length=120)
    apellidos: RequiredText = Field(max_length=120)
    numero_licencia: RequiredText = Field(max_length=30)
    categoria_licencia: RequiredText = Field(max_length=20)
    telefono: str | None = Field(default=None, max_length=30)
    experiencia_anios: int | None = Field(default=None, ge=0, le=32767)
    estado: DriverState = "DISPONIBLE"


class DriverOut(DriverInput):
    model_config = ConfigDict(from_attributes=True)
    conductor_id: UUID
    creado_en: datetime
    actualizado_en: datetime


class OrderInput(BaseModel):
    cliente_id: UUID
    codigo_pedido: RequiredText = Field(max_length=40)
    direccion_entrega: RequiredText = Field(max_length=255)
    referencia_entrega: str | None = Field(default=None, max_length=255)
    latitud: Decimal = Field(ge=-90, le=90, max_digits=9, decimal_places=6)
    longitud: Decimal = Field(ge=-180, le=180, max_digits=9, decimal_places=6)
    peso_kg: Decimal = Field(gt=0, max_digits=10, decimal_places=2)
    volumen_m3: Decimal = Field(gt=0, max_digits=10, decimal_places=3)
    ventana_inicio: AwareDatetime
    ventana_fin: AwareDatetime
    prioridad: Literal["ALTA", "MEDIA", "BAJA"] = "MEDIA"
    tipo_producto: str | None = Field(default=None, max_length=80)

    @model_validator(mode="after")
    def valid_window(self) -> "OrderInput":
        if self.ventana_inicio >= self.ventana_fin:
            raise ValueError("La ventana de tiempo es inválida: el fin debe ser posterior al inicio")
        return self


class OrderOut(OrderInput):
    model_config = ConfigDict(from_attributes=True)
    pedido_id: UUID
    estado: OrderState
    creado_en: datetime
    actualizado_en: datetime


class ClientOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    cliente_id: UUID
    nombre: str


class LoginInput(BaseModel):
    email: str
    password: str


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
