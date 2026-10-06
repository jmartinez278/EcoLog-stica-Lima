[← Volver al README principal](../../README.md)

# Revisión del Sprint — ECO Sprint 2

**Nombre del Proyecto:** EcoLogística Lima – Optimizador de Rutas Sostenibles para DistriRápido S.A.C.

**Líder del Proyecto:** Marco Jhair Martinez Llanos (según el acta de constitución)

**Fecha de corte:** 06/10/2026 · **Versión interna del documento:** 1.0.1

Se conserva `V_1_0_0` en el nombre del archivo por exigencia de la consigna; el historial registra esta revisión.

## Historias de Usuario completadas en este Sprint

**Terminadas según el Definition of Done: ninguna acreditada.** Las cinco historias están implementadas en el commit `53642da` y aparecen en [ECO Sprint 2](../02%20Planificación/04%20Seguimiento%20Jira%20Sprint%202%20V_1_0_2.md), pero Jira aún las muestra en `To Do`. El DoD es el único criterio de cierre; BDD se verifica dentro de DoD-10. La tabla separa funcionalidad disponible de una historia terminada.

| Historia | Jira | Trabajo disponible para demostrar | Evidencia técnica y límite |
|---|---|---|---|
| US-011 Actualizar conductor | [ECO-17](https://jhonpaitanrcm.atlassian.net/browse/ECO-17) | Editar teléfono, licencia y disponibilidad; rechazar información inválida. | `test_drivers.py` prueba actualización, duplicados y conservación del estado; pendiente aceptación BDD. |
| US-012 Desactivar conductor | [ECO-18](https://jhonpaitanrcm.atlassian.net/browse/ECO-18) | Desactivar uno disponible, conservar registro y rechazar ID inexistente o conductor asignado. | `test_drivers.py` prueba los rechazos; no existe aún motor de asignación de rutas. |
| US-013 Registrar cliente | [ECO-19](https://jhonpaitanrcm.atlassian.net/browse/ECO-19) | Crear cliente con contacto, preferencia y restricción de acceso. | `test_clients.py` prueba alta, correo inválido y duplicado; pendiente aceptación BDD. |
| US-014 Consultar cliente | [ECO-20](https://jhonpaitanrcm.atlassian.net/browse/ECO-20) | Ver lista, ficha y filtro de activos; comprobar 404 para ID inexistente. | `test_clients.py` prueba consulta y filtro; pendiente aceptación BDD. |
| US-015 Actualizar condiciones | [ECO-21](https://jhonpaitanrcm.atlassian.net/browse/ECO-21) | Modificar preferencia o restricción y observar el dato actualizado. | `test_clients.py` prueba actualización y datos inválidos; la utilización futura por el planificador aún no puede demostrarse porque US-016 está fuera de este sprint. |

Los escenarios oficiales se encuentran en la [planificación, US-011 a US-015](../02%20Planificación/01%20Transformando%20a%20ágil%20V_1_0_1.md). La suite backend ejecutada al corte pasó 14 pruebas con 92,41 % de cobertura sobre SQLite. La interfaz tiene pruebas de flujos añadidas, pero Vitest no se pudo ejecutar en este entorno durante esta revisión. La existencia de pruebas no acredita por sí sola los doce puntos del DoD.

Para localizar el trabajo sin ambigüedad, el [informe de estado](01%20Informe%20de%20estado%20del%20proyecto%20V_1_0_0.md) relaciona cada historia con su endpoint, archivo de router, servicio, repositorio y prueba, y presenta la evidencia disponible de DoD-01 a DoD-12. El PR #1 está integrado, pero GitHub devolvió cero reviews y cero ejecuciones de workflow asociadas al commit de implementación; no se acredita DoD-04 ni la parte de pipeline de DoD-12.

## Demostración del trabajo completado

**Estado:** no se encontró evidencia de una demostración del Sprint 2 ante stakeholders. No se registran asistentes, comentarios ni aprobaciones inventados. El siguiente recorrido queda listo para la presentación:

1. Entrar al sistema y mostrar que siguen disponibles Inicio, Vehículos y Pedidos del Sprint 1 junto con Conductores y Clientes.
2. En Conductores, registrar o seleccionar uno activo, actualizarlo mediante `PUT /api/v1/conductores/{id}`, desactivarlo mediante `PATCH /api/v1/conductores/{id}/desactivar` y mostrar que permanece en la lista como `INACTIVO`.
3. Mostrar un rechazo controlado: licencia duplicada, actualización inválida o intento de desactivar un conductor `ASIGNADO`.
4. En Clientes, registrar uno con `POST /api/v1/clientes`, consultar su ficha con `GET /api/v1/clientes/{id}`, filtrarlo con `GET /api/v1/clientes?activo=true` y actualizar una condición mediante `PUT /api/v1/clientes/{id}`.
5. En Pedidos, verificar que un cliente activo esté disponible para la selección y que uno inactivo no se acepte al registrar un nuevo pedido.
6. Mostrar las rutas de API en `/docs` y la relación de US-011 a US-015 con ECO-17 a ECO-21, sin presentar el optimizador como implementado.

Tras la demostración, registrar fecha y hora, asistentes, historias efectivamente mostradas, resultado de los escenarios BDD como evidencia de DoD-10, preguntas, decisiones y compromisos. La demostración no sustituye los demás puntos del DoD. Ninguno de esos datos consta al corte.

## Pendientes

- Ejecutar Vitest, build, Docker Compose y pruebas con PostgreSQL aislado en un entorno habilitado; adjuntar resultados fechados.
- Completar aprobación por pares, análisis de seguridad, staging, compatibilidad y accesibilidad aplicables, auditoría y aceptación BDD antes de mover historias a `Done`.
- Revisar fechas y estado del Sprint 2 en Jira; el Sprint Goal ya quedó registrado. Asignar responsables solo después de confirmarlos.
- Tomar el intervalo de Jira como referencia: inicio **22/09/2026 19:59:45** y fin **06/10/2026 19:59:35** en Lima. Cualquier acción posterior debe replanificarse en Jira; no debe presentarse como trabajo completado dentro del plazo original.
- Realizar la demostración a interesados y registrar el resultado real de cada historia.
- Celebrar la retrospectiva del equipo y confirmar las acciones propuestas en el [análisis retrospectivo](04%20Retrospectiva%20del%20Sprint%20V_1_0_0.md).

## Historial de control de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 06/10/2026 | Revisión inicial del Sprint 2 con US-011 a US-015, evidencia técnica, recorrido de demo y aceptación pendiente. |
| 1.0.1 | 06/10/2026 | DoD como criterio único de terminado, rutas técnicas en el recorrido y fechas convertidas del calendario Jira. |
