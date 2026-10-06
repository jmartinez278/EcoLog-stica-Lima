[← Volver al README principal](../../README.md)

# Revisión del Sprint — ECO Sprint 2

**Nombre del Proyecto:** EcoLogística Lima – Optimizador de Rutas Sostenibles para DistriRápido S.A.C.

**Líder del Proyecto:** Marco Jhair Martinez Llanos (según el acta de constitución)

**Fecha de corte:** 06/10/2026 · **Versión del documento:** 1.0.0

## Historias de Usuario completadas en este Sprint

**Formalmente terminadas según el DoD: ninguna acreditada.** Las cinco historias están implementadas en el commit `53642da` y aparecen en [ECO Sprint 2](../02%20Planificación/04%20Seguimiento%20Jira%20Sprint%202%20V_1_0_1.md), pero Jira aún las muestra en `To Do`. La tabla separa el trabajo demostrable de una decisión de aceptación.

| Historia | Jira | Trabajo disponible para demostrar | Evidencia técnica y límite |
|---|---|---|---|
| US-011 Actualizar conductor | [ECO-17](https://jhonpaitanrcm.atlassian.net/browse/ECO-17) | Editar teléfono, licencia y disponibilidad; rechazar información inválida. | `test_drivers.py` prueba actualización, duplicados y conservación del estado; pendiente aceptación BDD. |
| US-012 Desactivar conductor | [ECO-18](https://jhonpaitanrcm.atlassian.net/browse/ECO-18) | Desactivar uno disponible, conservar registro y rechazar ID inexistente o conductor asignado. | `test_drivers.py` prueba los rechazos; no existe aún motor de asignación de rutas. |
| US-013 Registrar cliente | [ECO-19](https://jhonpaitanrcm.atlassian.net/browse/ECO-19) | Crear cliente con contacto, preferencia y restricción de acceso. | `test_clients.py` prueba alta, correo inválido y duplicado; pendiente aceptación BDD. |
| US-014 Consultar cliente | [ECO-20](https://jhonpaitanrcm.atlassian.net/browse/ECO-20) | Ver lista, ficha y filtro de activos; comprobar 404 para ID inexistente. | `test_clients.py` prueba consulta y filtro; pendiente aceptación BDD. |
| US-015 Actualizar condiciones | [ECO-21](https://jhonpaitanrcm.atlassian.net/browse/ECO-21) | Modificar preferencia o restricción y observar el dato actualizado. | `test_clients.py` prueba actualización y datos inválidos; la utilización futura por el planificador aún no puede demostrarse porque US-016 está fuera de este sprint. |

Los escenarios oficiales se encuentran en la [planificación, US-011 a US-015](../02%20Planificación/01%20Transformando%20a%20ágil%20V_1_0_1.md). La suite backend ejecutada al corte pasó 14 pruebas con 92,41 % de cobertura sobre SQLite. La interfaz tiene pruebas de flujos añadidas, pero Vitest no se pudo ejecutar en este entorno durante esta revisión. La existencia de pruebas no acredita por sí sola los doce puntos del DoD.

## Demostración del trabajo completado

**Estado:** no se encontró evidencia de una demostración del Sprint 2 ante stakeholders. No se registran asistentes, comentarios ni aprobaciones inventados. El siguiente recorrido queda listo para la presentación:

1. Entrar al sistema y mostrar que siguen disponibles Inicio, Vehículos y Pedidos del Sprint 1 junto con Conductores y Clientes.
2. En Conductores, registrar o seleccionar uno activo, actualizar sus datos y disponibilidad, desactivarlo y mostrar que continúa en la lista como `INACTIVO`.
3. Mostrar un rechazo controlado: licencia duplicada, actualización inválida o intento de desactivar un conductor `ASIGNADO`.
4. En Clientes, registrar uno con preferencia y restricción, consultar su ficha, filtrarlo por estado y actualizar una condición de entrega.
5. En Pedidos, verificar que un cliente activo esté disponible para la selección y que uno inactivo no se acepte al registrar un nuevo pedido.
6. Mostrar las rutas de API en `/docs` y la relación de US-011 a US-015 con ECO-17 a ECO-21, sin presentar el optimizador como implementado.

Tras la demostración, registrar fecha y hora, asistentes, historias efectivamente mostradas, resultado de cada criterio BDD, preguntas, decisiones de aceptación o rechazo y compromisos con responsable y plazo. Ninguno de esos datos consta al corte.

## Pendientes

- Ejecutar Vitest, build, Docker Compose y pruebas con PostgreSQL aislado en un entorno habilitado; adjuntar resultados fechados.
- Completar aprobación por pares, análisis de seguridad, staging, compatibilidad y accesibilidad aplicables, auditoría y aceptación BDD antes de mover historias a `Done`.
- Revisar fechas y estado del Sprint 2 en Jira; el Sprint Goal ya quedó registrado. Asignar responsables solo después de confirmarlos.
- Realizar la demostración a interesados y registrar el resultado real de cada historia.
- Celebrar la retrospectiva del equipo y confirmar las acciones propuestas en el [análisis retrospectivo](04%20Retrospectiva%20del%20Sprint%20V_1_0_0.md).

## Historial de control de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 06/10/2026 | Revisión inicial del Sprint 2 con US-011 a US-015, evidencia técnica, recorrido de demo y aceptación pendiente. |
