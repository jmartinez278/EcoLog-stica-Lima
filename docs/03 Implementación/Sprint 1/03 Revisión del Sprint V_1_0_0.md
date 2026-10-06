[← Volver al README principal](../../../README.md)

# Revisión del sprint — ECO Sprint 1

| Campo | Detalle |
|---|---|
| Proyecto | EcoLogística Lima – Optimizador de Rutas Sostenibles para DistriRápido S.A.C. |
| Líder del proyecto | Marco Jhair Martinez Llanos, Director del Proyecto según el acta de constitución |
| Fecha de corte | 29/09/2026, 14:43 (hora de Lima), antes de la presentación prevista para hoy |
| Última revalidación técnica | 29/09/2026, 15:04 (hora de Lima) |
| Versión del documento | 1.0.1 |
| Objetivo del sprint | Implementar la base operativa para registrar y consultar vehículos, pedidos y conductores |

## Historias de Usuario completadas en este Sprint

**No hay historias acreditadas como `Done` conforme al Definition of Done global** a la fecha de corte. Las siguientes historias están implementadas y publicadas en `sprint-1` y `main`, con pruebas automatizadas de sus flujos principales; su aceptación formal sigue pendiente.

| Historia | Comportamiento que se puede mostrar | Escenario crítico automatizado | Estado de aceptación |
|---|---|---|---|
| US-001 Registrar vehículo | Alta con capacidad, consumo y factor de emisión | Registro válido, campos inválidos y placa duplicada | Pendiente de aprobación BDD/DoD |
| US-002 Consultar vehículos | Lista, detalle, estado y vacío | Lista poblada y `[]` inicial | Pendiente de aprobación BDD/DoD |
| US-003 Actualizar vehículo | Edición de datos operativos | Cambio válido y rechazo sin alterar el registro | Pendiente de aprobación BDD/DoD |
| US-004 Desactivar vehículo | Cambio lógico a `INACTIVO` | Desactivación y respuesta 404 para ID inexistente | Pendiente de aprobación BDD/DoD |
| US-005 Registrar pedido | Alta con cliente inicial, ubicación, carga, prioridad y ventana | Registro válido y ventana con fin igual al inicio rechazada | Pendiente de aprobación BDD/DoD |
| US-006 Consultar pedidos | Lista, detalle y filtro por estado | Lista poblada y filtro sin resultados | Pendiente de aprobación BDD/DoD |
| US-007 Actualizar pedido pendiente | Edición mientras el estado sea `PENDIENTE` | Cambio válido y rechazo de `PLANIFICADO` | Pendiente de aprobación BDD/DoD |
| US-008 Cancelar pedido | Cambio a `CANCELADO` | Cancelación válida y rechazo de estado no cancelable | Pendiente de aprobación BDD/DoD |
| US-009 Registrar conductor | Alta con licencia y disponibilidad | Registro válido, inválido y licencia duplicada | Pendiente de aprobación BDD/DoD |
| US-010 Consultar conductores | Lista, detalle y filtro `disponible=true` | Disponibles y resultado vacío si ninguno lo está | Pendiente de aprobación BDD/DoD |

La referencia oficial para aprobar cada escenario es [Transformando a ágil, US-001 a US-010 y DoD](../../02%20Planificación/01%20Transformando%20a%20ágil%20V_1_0_1.md). Las pruebas se encuentran en `src/backend/tests/test_vehicles.py`, `test_orders.py`, `test_drivers.py`, `test_auth.py` y `src/frontend/src/App.test.tsx`. Los resultados ejecutados el 29/09/2026 y sus límites constan en el [informe de estado](01%20Informe%20de%20estado%20del%20proyecto%20V_1_0_0.md).

## Demostración del trabajo completado

**Estado de la demo ante stakeholders:** aún no realizada a la fecha de corte. El usuario indicó que la presentación está prevista para más tarde el 29/09/2026. Por tanto, no hay asistentes, observaciones, aceptación ni decisiones que puedan atribuirse a los interesados. Las pruebas automatizadas son evidencia técnica interna, no evidencia de una demostración ante interesados.

### Verificación técnica interna realizada el 29/09/2026

En un proyecto Docker Compose aislado se construyeron y arrancaron PostgreSQL, backend y frontend. `/health`, `/openapi.json` y la interfaz respondieron HTTP 200. Las 9 pruebas backend pasaron contra una base PostgreSQL de prueba separada con 91,35 % de cobertura; Vitest aprobó 4 pruebas y el build de Vite terminó correctamente. Un recorrido HTTP real verificó login y las operaciones de vehículos, conductores y pedidos de US-001 a US-010. En navegador se comprobó la carga, el inicio de sesión y la navegación por los cuatro módulos a 360 px, sin desbordamiento horizontal ni errores de página observados.

Esta verificación fue técnica e interna. **No constituye la demostración ni la aprobación de los stakeholders** exigidas para cerrar la revisión del Sprint.

El 29/09/2026 a las 15:04 (hora de Lima) se repitieron `docker compose config --quiet`, el arranque de PostgreSQL/API/frontend y las respuestas HTTP 200 de `/health`, `/openapi.json` y la interfaz. En una nueva base PostgreSQL aislada volvieron a pasar 9 pruebas backend con 91,35 % de cobertura; pasaron 4 pruebas frontend y el build. En esta repetición no se ejecutó el recorrido HTTP completo ni se recogieron comentarios de interesados.

### Guion de demostración propuesto

1. Abrir la aplicación local; ingresar con el operador inicial; mostrar la navegación Inicio, Vehículos, Pedidos y Conductores. No mostrar credenciales en la presentación.
2. Vehículos: mostrar lista vacía o existente, registrar uno, consultar sus datos, editar capacidad y desactivarlo; enseñar que conserva el registro con estado `INACTIVO`.
3. Conductores: registrar uno disponible y otro no disponible; activar el filtro y verificar que solo aparezca el primero.
4. Pedidos: seleccionar el cliente de ejemplo, registrar un pedido, filtrar `PENDIENTE`, editarlo y cancelarlo; mostrar que ya no aparece bajo ese filtro.
5. Mostrar al menos un rechazo controlado: placa o licencia duplicada, ventana temporal inválida o intento de modificar un pedido que no sea `PENDIENTE`.
6. Enseñar `/docs` de FastAPI y la estructura modular en `src/backend/` y `src/frontend/`, si el tiempo de presentación lo permite.

### Acta de evidencia posterior a la presentación

Después del evento, registrar en una revisión versionada de este documento: fecha y hora efectivas; nombres o roles de asistentes; funcionalidades efectivamente mostradas; resultado de cada flujo; comentarios y preguntas; decisiones de aceptación o rechazo; defectos observados y compromisos con responsable y plazo. Se deja esta instrucción explícita porque aún no existe evidencia real que completarla.

## Pendientes

- Repetir el guion en el entorno y con los datos que se usarán en la presentación. Los impedimentos técnicos de Docker y dependencias quedaron resueltos en el [registro](02%20Registro%20de%20Impedimentos%20V_1_0_0.md), pero deben revalidarse antes del evento.
- Realizar pruebas personales con datos válidos e inválidos y, si corresponde, corregir defectos encontrados antes de solicitar aceptación.
- Completar demostración y registrar la reacción de los interesados, incluida cualquier variación del guion anterior.
- Ejecutar y evidenciar los criterios del DoD aún no acreditados: análisis de seguridad, revisión por pares, HTTPS/TLS fuera del entorno local, staging, compatibilidad y accesibilidad, aprobación BDD e integración/pipeline autorizados.

## Historial de control de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 29/09/2026 | Revisión previa a la presentación: verificación técnica interna, guion de demo y aceptación formal pendiente. |
| 1.0.1 | 29/09/2026 | Revalidación técnica independiente a las 15:04, manteniendo pendiente la evidencia de demostración ante interesados. |
