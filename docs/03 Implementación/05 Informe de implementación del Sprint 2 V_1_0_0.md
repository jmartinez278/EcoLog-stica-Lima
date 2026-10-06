[← Volver al README principal](../../README.md)

# Informe de implementación — ECO Sprint 2

| Campo | Detalle |
|---|---|
| Proyecto | EcoLogística Lima – Optimizador de Rutas Sostenibles para DistriRápido S.A.C. |
| Sprint | ECO Sprint 2 – Gestión ampliada de conductores y clientes |
| Periodo registrado en Jira | 22/09/2026 al 06/10/2026 |
| Fecha de corte técnico | 06/10/2026 (hora de Lima) |
| Rama | `sprint-2` |
| Commit publicado | `53642da` – `Implement Sprint 2 driver and client management` |
| Versión del documento | 1.0.0 |
| Estado | Implementación técnica publicada; revisión por pares y aceptación formal pendientes |

## Objetivo del Sprint

Completar la gestión operativa de conductores y clientes, permitiendo actualizar y desactivar conductores, así como registrar, consultar y actualizar clientes y sus condiciones de entrega para futuras planificaciones logísticas.

## Alcance planificado en Jira

El Sprint Backlog contiene cinco historias de la épica **EP-01 – Gestión de Operación Logística**, con un total de **15 Story Points**.

| Jira | Historia | SP | Resultado técnico |
|---|---|---:|---|
| ECO-17 | US-011 – Actualizar información de conductor | 3 | Implementada y probada |
| ECO-18 | US-012 – Desactivar conductor | 2 | Implementada y probada |
| ECO-19 | US-013 – Registrar cliente y condiciones de entrega | 5 | Implementada y probada |
| ECO-20 | US-014 – Consultar información de cliente | 2 | Implementada y probada |
| ECO-21 | US-015 – Actualizar condiciones de entrega del cliente | 3 | Implementada y probada |

## Incremento implementado

### Conductores

- Actualización de nombres, apellidos, licencia, categoría, teléfono, experiencia y disponibilidad.
- Validación de licencia duplicada sin bloquear la conservación de la licencia del propio registro.
- Desactivación lógica mediante una acción específica; el conductor permanece almacenado con estado `INACTIVO`.
- Rechazo de desactivación cuando el conductor está `ASIGNADO`.
- Rechazo de edición de conductores inactivos y de inactivación directa mediante la actualización general.
- Auditoría transaccional de registros, actualizaciones, desactivaciones y operaciones fallidas.

Endpoints incorporados:

```text
PUT   /api/v1/conductores/{conductor_id}
PATCH /api/v1/conductores/{conductor_id}/desactivar
```

### Clientes y condiciones de entrega

- Registro de cliente con nombre, teléfono, correo, preferencia de entrega, restricción de acceso y estado.
- Consulta de lista, ficha individual y filtro por clientes activos o inactivos.
- Actualización de datos, preferencias, restricciones y estado.
- Normalización de campos opcionales y correo electrónico.
- Validación de formato de correo y prevención de correos duplicados.
- Selección exclusiva de clientes activos al registrar o actualizar pedidos.
- Auditoría transaccional de registros, actualizaciones y operaciones fallidas.

Endpoints incorporados o ampliados:

```text
POST /api/v1/clientes
GET  /api/v1/clientes?activo=true|false
GET  /api/v1/clientes/{cliente_id}
PUT  /api/v1/clientes/{cliente_id}
```

### Interfaz de usuario

- Nuevo módulo **Clientes** en el inicio y la navegación principal.
- Formularios para registrar y editar clientes y sus condiciones de entrega.
- Listado con estado, datos de contacto, preferencias y restricciones.
- Filtro para mostrar únicamente clientes activos.
- Edición y desactivación de conductores desde sus tarjetas.
- Actualización de las referencias visuales a Sprint 2.
- Conservación del token de sesión únicamente en memoria.

## Arquitectura y archivos relevantes

La implementación mantiene el flujo `router HTTP → servicio → repositorio → PostgreSQL` y reutiliza el mecanismo transaccional de auditoría del Sprint 1.

| Área | Evidencia principal |
|---|---|
| API de conductores | `src/backend/app/api/drivers.py` |
| Lógica de conductores | `src/backend/app/services/drivers.py` |
| API de clientes | `src/backend/app/api/clients.py` |
| Lógica de clientes | `src/backend/app/services/clients.py` |
| Persistencia de clientes | `src/backend/app/repositories/clients.py` |
| Validaciones y contratos | `src/backend/app/schemas/operations.py` |
| Auditoría de errores | `src/backend/app/main.py` |
| Interfaz | `src/frontend/src/App.tsx` y `src/frontend/src/api.ts` |

El modelo de datos del Sprint 1 ya contenía todos los campos requeridos en `conductores` y `clientes`; por ello este incremento no necesitó una nueva migración de esquema.

## Verificación técnica ejecutada

| Comprobación | Resultado |
|---|---|
| Pruebas backend | 14 pruebas aprobadas |
| Cobertura backend | 92,41 %, superior al umbral de 80 % |
| Pruebas frontend | 5 pruebas aprobadas |
| Build frontend | TypeScript y Vite completados correctamente |
| Docker Compose | PostgreSQL, backend y frontend construidos y activos |
| Salud de API | `GET /health` respondió `{"status":"ok"}` |
| Interfaz local | `http://localhost:5173` respondió HTTP 200 |
| Contrato API | OpenAPI disponible con versión `0.2.0` |
| Recorrido integrado | Registro y actualización de cliente, y registro y desactivación de conductor verificados sobre PostgreSQL local |

Comandos principales utilizados:

```bash
python -m pytest -q --cov=app --cov-report=term-missing --cov-fail-under=80
npm test
npm run build
docker compose up --build -d
```

## Trazabilidad de pruebas

| Historia | Evidencia automatizada |
|---|---|
| US-011 | Actualización válida, datos inválidos, licencia duplicada, ID inexistente y conservación del estado |
| US-012 | Desactivación válida, conductor inexistente, ya inactivo y conductor asignado |
| US-013 | Registro válido, nombre requerido, correo inválido y correo duplicado |
| US-014 | Lista, ficha, filtro por estado y cliente inexistente |
| US-015 | Actualización válida, rechazo de datos inválidos y conservación de la información anterior |

Las pruebas backend están en `src/backend/tests/test_drivers.py` y `src/backend/tests/test_clients.py`. Los recorridos de interfaz se encuentran en `src/frontend/src/App.test.tsx`.

## Estado frente al Definition of Done

La implementación, las pruebas automatizadas, la cobertura, la documentación técnica, el contrato OpenAPI, el arranque con Docker y la auditoría aplicable cuentan con evidencia técnica. No obstante, este informe no declara las historias formalmente `Done` porque aún deben registrarse, según corresponda:

1. Revisión y aprobación por otro integrante del equipo mediante Pull Request.
2. Análisis estático o de seguridad acordado por el equipo.
3. Validación formal de accesibilidad, responsive desde 360 px y navegadores soportados.
4. Despliegue y comprobación en el ambiente de staging definido.
5. Demostración, aprobación BDD y aceptación de los interesados.
6. Actualización de las incidencias `ECO-17` a `ECO-21` en Jira conforme avance su validación.

## Publicación

El incremento está disponible en la rama remota `sprint-2` del repositorio GitHub. La integración en `main` debe realizarse mediante Pull Request después de completar la revisión técnica y las comprobaciones pendientes del Definition of Done.

## Historial de control de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 06/10/2026 | Informe inicial de implementación de US-011 a US-015, evidencia técnica, trazabilidad y pendientes de aceptación. |
