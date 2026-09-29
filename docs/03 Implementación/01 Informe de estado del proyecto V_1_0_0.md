[← Volver al README principal](../../README.md)

# Informe de estado del proyecto — Sprint 1

| Campo | Detalle |
|---|---|
| Proyecto | EcoLogística Lima – Optimizador de Rutas Sostenibles para DistriRápido S.A.C. |
| Líder del proyecto | Marco Jhair Martinez Llanos, Director del Proyecto según el acta de constitución |
| Sprint | ECO Sprint 1, gestión de vehículos, pedidos y conductores |
| Fecha de corte | 29/09/2026, antes de la presentación prevista para hoy |
| Versión del documento | 1.0.0 |
| Estado general | Implementación técnica disponible en `sprint-1`; aceptación formal del Sprint pendiente |

## Resumen del avance

El [Sprint Goal](../02%20Planificación/02%20Artefactos%20Jira%20V_1_0_0.md) busca establecer la base operativa para registrar y consultar vehículos, pedidos y conductores. Hay código y pruebas automatizadas para US-001 a US-010 en `src/backend/` y `src/frontend/`. La API incluye autenticación, roles, auditoría y contratos OpenAPI; la interfaz permite los flujos solicitados. La generación de rutas y los módulos posteriores no forman parte de este incremento.

**Estado de aceptación:** ninguna historia se declara formalmente `Done` en este informe. La [definición global de terminado](../02%20Planificación/01%20Transformando%20a%20ágil%20V_1_0_0.md) requiere, entre otros, revisión por pares, análisis de seguridad, staging, compatibilidad y aprobación de escenarios BDD. No constan esas evidencias completas ni una demostración ante interesados. Esta distinción evita convertir la existencia de código en una aprobación del sprint.

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

Las rutas HTTP y sus restricciones están descritas en los [README del backend](../../src/backend/README.md) y [frontend](../../src/frontend/README.md). Las pruebas del backend usan SQLite temporal de forma predeterminada; no constituyen por sí solas prueba de persistencia en PostgreSQL.

## Verificación técnica

| Comprobación | Evidencia / resultado | Límite |
|---|---|---|
| Pytest y cobertura | Repetido el 29/09/2026 con entorno Python temporal en WSL: 9 pruebas aprobadas y 91,35 % de cobertura de `app`; umbral ≥ 80 % alcanzado | Las pruebas usan SQLite temporal; persistencia PostgreSQL aún no comprobada en esta ejecución |
| Vitest | Repetido el 29/09/2026 con Node nativo de Linux: 4 pruebas aprobadas | Cubre flujos principales con API simulada; no sustituye una prueba integrada |
| Build de Vite | Repetido el 29/09/2026: `npm run build` correcto | Compilación de frontend, sin validación visual en navegadores soportados |
| Sintaxis de Compose | `docker.exe compose ... config --quiet` con `.env.example`: correcto el 29/09/2026 | Valida configuración, no arranca contenedores ni comprueba PostgreSQL |
| PostgreSQL y arranque de API | Sin nueva verificación el 29/09/2026 | Docker Desktop no responde y Docker no está integrado en esta distribución WSL |
| Prueba personal y demostración | Pendientes; presentación prevista más tarde el 29/09/2026 | Registrar asistentes, resultados y observaciones después del evento |

Las pruebas repetidas el 29/09/2026 confirman la suite automatizada en WSL, pero no la ejecución integrada con PostgreSQL ni la aceptación de interesados. La [revisión del sprint](03%20Revisión%20del%20Sprint%20V_1_0_0.md) detalla el guion y la evidencia pendiente de la demostración.

## Impedimentos y decisiones inmediatas

El [registro de impedimentos](02%20Registro%20de%20Impedimentos%20V_1_0_0.md) recoge el error 500 de inicio de sesión ya tratado, el bloqueo de Docker Desktop/WSL aún abierto y la incompatibilidad inicial de herramientas Windows/Linux mitigada con un entorno temporal Linux. Antes de presentar, conviene iniciar Docker Desktop con integración WSL, reconstruir los contenedores y repetir login y los flujos integrados de US-001 a US-010. Esta acción se propone al equipo; aún no consta como acuerdo formal.

## Pendientes

1. Ejecutar la comprobación personal y conservar resultados de los diez flujos y casos negativos.
2. Realizar la demostración ante los interesados y registrar fecha, asistentes, comentarios y decisiones reales.
3. Celebrar la retrospectiva del equipo y sustituir el [borrador simulado](04%20Retrospectiva%20del%20Sprint%20V_1_0_0.md) por acuerdos efectivos.
4. Incorporar una base PostgreSQL **aislada de prueba** y validar arranque/API con Compose. La sintaxis de Compose, Pytest, cobertura, Vitest y build ya pasaron la comprobación local.
5. Completar el DoD aplicable: análisis estático y seguridad, revisión por un par técnico, HTTPS/TLS para un despliegue externo, staging, accesibilidad y navegadores, aprobación BDD e integración/pipeline cuando el equipo lo autorice.

## Historial de control de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 29/09/2026 | Primer informe de corte del Sprint 1; estado técnico y pendientes diferenciados de la aceptación formal. |
