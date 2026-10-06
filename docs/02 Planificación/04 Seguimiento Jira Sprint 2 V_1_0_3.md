[← Volver al README principal](../../README.md)

# Seguimiento Jira — ECO Sprint 2

**Proyecto:** EcoLogística Lima · **Versión:** 1.0.3 · **Consulta inicial:** 06/10/2026, 17:02 (Lima) · **Última comprobación:** 06/10/2026

**Tablero:** [ECO board](https://jhonpaitanrcm.atlassian.net/jira/software/projects/ECO/boards/2), Scrum, ID 2 · **Sprint:** ECO Sprint 2, ID 37

| Historias en el sprint | Done | En progreso | Requieren atención |
|---:|---:|---:|---:|
| **5** | **0** | **5 en revisión** | **5** |

**Alcance del corte:** Jira devuelve el Sprint 2 en estado `future`, aunque su intervalo configurado ya había comenzado. El objetivo se registró a las 17:10 del 06/10/2026. Tras las pruebas locales, ECO-17 a ECO-21 pasaron de `To Do` a `In Review / QA`; siguen con prioridad `Highest` y sin responsable. El código de US-011 a US-015 ya fue integrado; una historia se declara `Done` únicamente cuando cumple todos los puntos aplicables del [Definition of Done](01%20Transformando%20a%20ágil%20V_1_0_1.md). `Requieren atención` cuenta las cinco tarjetas por prioridad alta, falta de asignación y DoD abierto; no indica un bloqueo técnico confirmado.

## Fechas planificadas en Jira y hechos comprobados

| Hito | Fecha y hora en Lima (UTC−05:00) | Fuente / alcance |
|---|---|---|
| Inicio programado de ECO Sprint 2 | 22/09/2026, 19:59:45 | Jira: `2026-09-23T00:59:45.282Z`. Es fecha planificada, no prueba de inicio efectivo; Jira aún indica `future`. |
| Commit de implementación `53642da` | 06/10/2026, 13:53:08 | Git: fecha del commit. No permite deducir en qué días se desarrolló cada historia. |
| Apertura del PR #1 | 06/10/2026, 14:08:38 | [PR #1](https://github.com/jmartinez278/EcoLog-stica-Lima/pull/1). |
| Integración del PR #1 en `main` | 06/10/2026, 16:23:33 | GitHub: fecha de merge. La integración no equivale a `Done`. |
| Registro del Sprint Goal | 06/10/2026, 17:10 | Cambio solicitado por el usuario y verificado en Jira. |
| Verificación local y transición a `In Review / QA` | 06/10/2026, durante la tarde | 14 pruebas backend sobre SQLite y PostgreSQL aislado, 5 frontend, build, Compose y comprobaciones HTTP; Jira confirmó las cinco transiciones. No se atribuye una hora exacta no registrada en este documento. |
| Fin programado de ECO Sprint 2 | 06/10/2026, 19:59:35 | Jira: `2026-10-07T00:59:35.000Z`. No se modificó ni se fingió el cierre efectivo. |

El plazo del 07/10/2026 que aparecía en acciones internas de versiones anteriores quedaba **fuera de este sprint**. Las tareas sin fecha propia en Jira se documentan como pendientes de replanificación; no se les atribuye un vencimiento ficticio. No hay evidencia para distribuir retrospectivamente el trabajo técnico entre el inicio y el fin programados.

## 1. Configuración y continuidad con Sprint 1

Se reutiliza el mismo proyecto `ECO`, la épica [EP-01 / ECO-1](https://jhonpaitanrcm.atlassian.net/browse/ECO-1) y el tablero Scrum del [artefacto histórico del Sprint 1](02%20Artefactos%20Jira%20V_1_0_2.md). No se creó un tablero duplicado. La configuración consultada muestra columnas `To Do → In Progress → In Review / QA → Done`, estimación con Story Points y ranking. El Sprint 1 (ID 3) permanece `active` en Jira y el Sprint 2 (ID 37) está `future`; esas etiquetas no deben confundirse con el estado de Git.

## 2. Backlog comprometido en Sprint 2

| Historia | Tarjeta | Épica | Puntos | Estado Jira | Responsable |
|---|---|---|---:|---|---|
| US-011 Actualizar información de conductor | [ECO-17](https://jhonpaitanrcm.atlassian.net/browse/ECO-17) | ECO-1 | 3 | In Review / QA | Sin asignar |
| US-012 Desactivar conductor | [ECO-18](https://jhonpaitanrcm.atlassian.net/browse/ECO-18) | ECO-1 | 2 | In Review / QA | Sin asignar |
| US-013 Registrar cliente y condiciones de entrega | [ECO-19](https://jhonpaitanrcm.atlassian.net/browse/ECO-19) | ECO-1 | 5 | In Review / QA | Sin asignar |
| US-014 Consultar información de cliente | [ECO-20](https://jhonpaitanrcm.atlassian.net/browse/ECO-20) | ECO-1 | 2 | In Review / QA | Sin asignar |
| US-015 Actualizar condiciones de entrega del cliente | [ECO-21](https://jhonpaitanrcm.atlassian.net/browse/ECO-21) | ECO-1 | 3 | In Review / QA | Sin asignar |
| **Total** | **5 historias** |  | **15** | **0 Done** | **5 sin asignar** |

Los criterios BDD están en [Transformando a ágil](01%20Transformando%20a%20ágil%20V_1_0_1.md). La integración técnica se describe en el [informe de estado del Sprint 2](../03%20Implementación/01%20Informe%20de%20estado%20del%20proyecto%20V_1_0_0.md).

## 3. Sprint Planning y Sprint Goal

**Estado en Jira:** el sprint está creado y contiene las cinco historias. El usuario aprobó registrar el siguiente objetivo en Jira el 06/10/2026; una consulta posterior confirmó que quedó guardado:

> Ampliar la base operativa de EcoLogística Lima para actualizar y desactivar conductores y gestionar clientes con sus condiciones de entrega, preservando las funciones del Sprint 1.

Registrar el objetivo no acredita una reunión de planificación. Las fechas del sprint deben revisarse con el equipo antes de iniciarlo o cerrarlo; no se retrodata una ceremonia.

## 4. Tablero Scrum y atención

| Columna | Cantidad de US-011 a US-015 |
|---|---:|
| To Do | 0 |
| In Progress | 0 |
| In Review / QA | 5 |
| Done | 0 |

**Carga por responsable:** cinco historias sin asignar. **Riesgo de seguimiento:** las cinco son `Highest`, no tienen responsable y el sprint sigue `future` a pesar del código integrado y de su avance a revisión. La siguiente decisión del equipo es confirmar dueños y resolver la diferencia entre estado y calendario antes de replanificar. El único criterio de cierre de cada historia es el DoD; sus escenarios BDD forman parte de DoD-10. No se observaron etiquetas de bloqueo en estas cinco tarjetas; no se evaluaron todas las dependencias fuera del sprint.

## 5. Roadmap y release

US-011 a US-015 continúan la épica EP-01 del Sprint 1; las épicas EP-02 a EP-05 permanecen fuera de este incremento. La [captura histórica del roadmap y de la release `v1.0.0-MVP`](02%20Artefactos%20Jira%20V_1_0_2.md) corresponde a la planificación inicial, no a un nuevo corte visual del Sprint 2. En esta revisión se consultaron datos de Jira, sin producir capturas nuevas ni declarar publicada una release.

## 6. Fuentes y límites de la evidencia

- Atlassian Jira, `getJiraBoardSprintData(boardId=2, sprintName="ECO Sprint 2")`: sprint ID 37, cinco tarjetas, estados y asignación; consulta 06/10/2026 a las 17:02 (Lima).
- Atlassian Jira, nueva consulta de `getJiraBoardSprintData(boardId=2, sprintId=37)` el 06/10/2026: estado `future`, objetivo y cinco tarjetas sin asignación conservados.
- Atlassian Jira, `manageJiraSprint(action="update", sprintId=37)` y verificación posterior con `getJiraBoardSprintData(boardId=2, sprintId=37)`: objetivo registrado, nombre y fechas conservados; 06/10/2026 a las 17:10 (Lima).
- Atlassian Jira, `listJiraBoardSprints(boardId=2, state="all")`: Sprint 1 activo y Sprint 2 futuro; fechas y objetivo del Sprint 1.
- Atlassian Jira, `getJiraBoardConfig(boardId=2)`: columnas, filtro, campo de Story Points y ranking.
- JQL ejecutado: `project = ECO ORDER BY created DESC`, vista `evidence`; proporcionó épica, prioridad y puntos de ECO-17 a ECO-21. El total de 15 puntos se suma de esos cinco valores.
- GitHub, [PR #1](https://github.com/jmartinez278/EcoLog-stica-Lima/pull/1): creado el 06/10/2026 a las 19:08:38 UTC y fusionado a las 21:23:33 UTC. La consulta de reviews devolvió `[]`; la de ejecuciones de workflow asociadas al commit `53642da` también devolvió `[]`.
- El 06/10/2026 Jira confirmó las transiciones de ECO-17 a ECO-21 a `In Review / QA`. Las comprobaciones locales están detalladas en el [informe de estado](../03%20Implementación/01%20Informe%20de%20estado%20del%20proyecto%20V_1_0_0.md). El estado de revisión no equivale a aceptación.
- La consulta es una fotografía del momento. No demuestra reuniones, aceptación de stakeholders, revisión por pares ni estado posterior de las tarjetas.

## Historial de control de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 06/10/2026 | Primer seguimiento del Sprint 2 en el tablero existente; cinco historias, 15 puntos, estados y discrepancias documentadas. |
| 1.0.1 | 06/10/2026 | Sprint Goal aprobado por el usuario, registrado en Jira y verificado; se mantienen los estados y responsables observados. |
| 1.0.2 | 06/10/2026 | Conversión explícita del calendario de Jira a hora de Lima, separación entre fechas planificadas y hechos comprobados, y DoD como único criterio de cierre. |
| 1.0.3 | 06/10/2026 | Resultado de pruebas locales y transición de ECO-17 a ECO-21 a `In Review / QA`; se conserva la falta de responsables y el estado `future` del sprint. |
