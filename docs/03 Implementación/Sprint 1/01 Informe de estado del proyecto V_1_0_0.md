[← Volver al README principal](../../../README.md)

# Informe de estado del proyecto — Sprint 1

| Campo | Detalle |
|---|---|
| Proyecto | EcoLogística Lima – Optimizador de Rutas Sostenibles para DistriRápido S.A.C. |
| Líder del proyecto | Marco Jhair Martinez Llanos, Director del Proyecto según el acta de constitución |
| Sprint | ECO Sprint 1, gestión de vehículos, pedidos y conductores |
| Fecha de corte | 29/09/2026, 14:43 (hora de Lima), antes de la presentación prevista para hoy |
| Última revalidación técnica | 29/09/2026, 15:04 (hora de Lima) |
| Versión del documento | 1.0.2 |
| Estado general | Implementación técnica publicada en `sprint-1` y `main`; aceptación formal del Sprint pendiente |

## Resumen del avance

El [Sprint Goal](../../02%20Planificación/02%20Artefactos%20Jira%20V_1_0_2.md) busca establecer la base operativa para registrar y consultar vehículos, pedidos y conductores. Hay código y pruebas automatizadas para US-001 a US-010 en `src/backend/` y `src/frontend/`. La API incluye autenticación, roles, auditoría y contratos OpenAPI; la interfaz permite los flujos solicitados. La generación de rutas y los módulos posteriores no forman parte de este incremento.

**Estado de aceptación:** ninguna historia se declara formalmente `Done` en este informe. La [definición global de terminado](../../02%20Planificación/01%20Transformando%20a%20ágil%20V_1_0_1.md) requiere, entre otros, revisión por pares, análisis de seguridad, staging, compatibilidad y aprobación de escenarios BDD. No constan esas evidencias completas ni una demostración ante interesados. Esta distinción evita convertir la existencia de código en una aprobación del sprint.

## Historias de Usuario completadas en este Sprint

**Completadas conforme al Definition of Done global: ninguna acreditada a la fecha de corte.** El siguiente cuadro refleja implementación funcional y cobertura de escenarios automatizados, pendientes de la validación formal:

| Historia | Incremento implementado | Evidencia técnica disponible | Estado |
|---|---|---|---|
| US-001 | Registrar vehículo; validar datos y placa única | `src/backend/tests/test_vehicles.py`; flujo UI en `src/frontend/src/App.test.tsx` | Implementada; aceptación pendiente |
| US-002 | Consultar flota, detalle y lista vacía | `test_vehicles.py`; flujo UI de vehículos | Implementada; aceptación pendiente |
| US-003 | Actualizar datos válidos y rechazar inválidos conservando el estado | `test_vehicles.py`; flujo UI de edición | Implementada; aceptación pendiente |
| US-004 | Desactivación lógica y rechazo de ID inexistente | `test_vehicles.py`; flujo UI de desactivación | Implementada; aceptación pendiente |
| US-005 | Registrar pedido y rechazar ventana de tiempo inválida | `src/backend/tests/test_orders.py`; flujo UI de pedidos | Implementada; aceptación pendiente |
| US-006 | Consultar pedidos, filtrar por estado y obtener resultado vacío | `test_orders.py`; flujo UI de pedidos | Implementada; aceptación pendiente |
| US-007 | Actualizar solo pedido `PENDIENTE` | `test_orders.py`; flujo UI de edición | Implementada; aceptación pendiente |
| US-008 | Cancelar solo pedido `PENDIENTE` | `test_orders.py`; flujo UI de cancelación | Implementada; aceptación pendiente |
| US-009 | Registrar conductor; validar campos y licencia única | `src/backend/tests/test_drivers.py`; flujo UI de conductores | Implementada; aceptación pendiente |
| US-010 | Consultar conductores y filtrar disponibilidad, incluido resultado vacío | `test_drivers.py`; flujo UI de filtro | Implementada; aceptación pendiente |

Las rutas HTTP y sus restricciones están descritas en los [README del backend](../../../src/backend/README.md) y [frontend](../../../src/frontend/README.md). Las pruebas del backend usan SQLite temporal de forma predeterminada. El 29/09/2026 también se ejecutaron contra una base PostgreSQL de prueba aislada mediante `TEST_DATABASE_URL`.

## Verificación técnica

| Comprobación | Evidencia / resultado | Límite |
|---|---|---|
| Pytest y cobertura sobre PostgreSQL | `docker compose ... exec backend` con `TEST_DATABASE_URL` de la base `ecologistica_test`: 9 pruebas aprobadas, cobertura 91,35 % de `app`; umbral ≥ 80 % alcanzado | La base de prueba se creó en un proyecto Compose aislado; no se usaron los datos habituales del usuario |
| Vitest y build | Dentro del contenedor frontend: 4 pruebas aprobadas y `npm run build` correcto | Las pruebas de componentes usan dobles de prueba para la API; el recorrido HTTP integrado se comprobó aparte |
| Docker Compose, PostgreSQL y arranque | `docker compose config --quiet` correcto; tres servicios activos, PostgreSQL sano; `/health`, `/openapi.json` y frontend respondieron HTTP 200 | Entorno local de desarrollo; no acredita staging ni HTTPS/TLS externo |
| Recorrido HTTP integrado | Login del operador inicial y registro, consulta, edición y desactivación/cancelación o filtro de US-001 a US-010 sobre PostgreSQL: correcto | Prueba técnica interna; no equivale a aceptación BDD por interesados |
| Navegador a 360 px | Login y navegación Inicio, Vehículos, Pedidos y Conductores; ancho del documento de 360 px en las cuatro vistas, sin errores de página observados | Comprobación en un navegador; no acredita WCAG 2.1 AA ni compatibilidad entre navegadores |
| Auditoría de dependencias frontend de producción | `npm audit --omit=dev --audit-level=high`: 0 vulnerabilidades reportadas | No sustituye el análisis estático del código exigido por DoD-02 |
| Prueba personal y demostración | Pendientes; presentación prevista más tarde el 29/09/2026 | Registrar asistentes, resultados y observaciones después del evento |

Las pruebas repetidas el 29/09/2026 confirman la suite automatizada y la operación integrada con PostgreSQL. La [revisión del sprint](03%20Revisión%20del%20Sprint%20V_1_0_0.md) distingue esta verificación interna de la demostración pendiente ante interesados.

**Revalidación de las 15:04 (hora de Lima):** `docker compose config --quiet` pasó. En un nuevo proyecto Compose aislado, PostgreSQL estuvo sano y `/health`, `/openapi.json` y la interfaz respondieron HTTP 200. Se ejecutaron 9 pruebas backend contra una base PostgreSQL de prueba aislada, con 91,35 % de cobertura; pasaron 4 pruebas frontend y el build. Esta repetición no incluyó una nueva demostración ante interesados ni una nueva evaluación de accesibilidad.

## Impedimentos y decisiones inmediatas

El [registro de impedimentos](02%20Registro%20de%20Impedimentos%20V_1_0_0.md) recoge el error 500 de inicio de sesión ya tratado, el bloqueo de Docker Desktop/WSL resuelto tras iniciarlo el usuario y la incompatibilidad de herramientas Windows/Linux evitada al ejecutar pruebas en contenedores. Antes de presentar, conviene repetir el guion en el equipo y datos de demostración definitivos; esta acción todavía no consta como acuerdo formal del equipo.

## Pendientes

1. Ejecutar la comprobación personal y conservar resultados de los diez flujos y casos negativos.
2. Realizar la demostración ante los interesados y registrar fecha, asistentes, comentarios y decisiones reales.
3. Celebrar la retrospectiva del equipo y confirmar los responsables y acuerdos del [análisis retrospectivo](04%20Retrospectiva%20del%20Sprint%20V_1_0_0.md).
4. Conservar salidas fechadas de la ejecución sobre PostgreSQL y repetir la comprobación si cambia el código o el entorno de presentación.
5. Completar el DoD aplicable: análisis estático y seguridad, revisión por un par técnico, HTTPS/TLS para un despliegue externo, staging, accesibilidad y navegadores, aprobación BDD e integración/pipeline cuando el equipo lo autorice.

## Historial de control de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 29/09/2026 | Informe de corte del Sprint 1 con verificación integrada en Docker/PostgreSQL y pendientes de aceptación formal diferenciados. |
| 1.0.1 | 29/09/2026 | Referencia al análisis retrospectivo pendiente de validación; se conserva el nombre de archivo exigido por la consigna. |
| 1.0.2 | 29/09/2026 | Revalidación técnica a las 15:04, ramas publicadas y referencia al análisis retrospectivo. |
