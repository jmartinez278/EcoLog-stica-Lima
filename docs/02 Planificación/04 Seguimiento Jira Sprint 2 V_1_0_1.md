[← Volver al README principal](../../README.md)

# Seguimiento Jira — ECO Sprint 2

**Proyecto:** EcoLogística Lima · **Versión:** 1.0.1 · **Consulta inicial:** 06/10/2026, 17:02 (Lima) · **Actualización verificada:** 17:10 (Lima)

**Tablero:** [ECO board](https://jhonpaitanrcm.atlassian.net/jira/software/projects/ECO/boards/2), Scrum, ID 2 · **Sprint:** ECO Sprint 2, ID 37

| Historias en el sprint | Done | En progreso | Requieren atención |
|---:|---:|---:|---:|
| **5** | **0** | **0** | **5** |

**Alcance del corte:** Jira devuelve el Sprint 2 en estado `future`, con el objetivo registrado a las 17:10 y un intervalo configurado del 23/09/2026 00:59 UTC al 07/10/2026 00:59 UTC. Las cinco tarjetas están en `To Do`, con prioridad `Highest` y sin responsable. El código de US-011 a US-015 ya fue integrado; las tarjetas no se consideran `Done` sin evidencia del Definition of Done. `Requieren atención` cuenta las cinco tarjetas por prioridad alta y falta de asignación; no indica un bloqueo técnico confirmado.

## 1. Configuración y continuidad con Sprint 1

Se reutiliza el mismo proyecto `ECO`, la épica [EP-01 / ECO-1](https://jhonpaitanrcm.atlassian.net/browse/ECO-1) y el tablero Scrum del [artefacto histórico del Sprint 1](02%20Artefactos%20Jira%20V_1_0_2.md). No se creó un tablero duplicado. La configuración consultada muestra columnas `To Do → In Progress → In Review / QA → Done`, estimación con Story Points y ranking. El Sprint 1 (ID 3) permanece `active` en Jira y el Sprint 2 (ID 37) está `future`; esas etiquetas no deben confundirse con el estado de Git.

## 2. Backlog comprometido en Sprint 2

| Historia | Tarjeta | Épica | Puntos | Estado Jira | Responsable |
|---|---|---|---:|---|---|
| US-011 Actualizar información de conductor | [ECO-17](https://jhonpaitanrcm.atlassian.net/browse/ECO-17) | ECO-1 | 3 | To Do | Sin asignar |
| US-012 Desactivar conductor | [ECO-18](https://jhonpaitanrcm.atlassian.net/browse/ECO-18) | ECO-1 | 2 | To Do | Sin asignar |
| US-013 Registrar cliente y condiciones de entrega | [ECO-19](https://jhonpaitanrcm.atlassian.net/browse/ECO-19) | ECO-1 | 5 | To Do | Sin asignar |
| US-014 Consultar información de cliente | [ECO-20](https://jhonpaitanrcm.atlassian.net/browse/ECO-20) | ECO-1 | 2 | To Do | Sin asignar |
| US-015 Actualizar condiciones de entrega del cliente | [ECO-21](https://jhonpaitanrcm.atlassian.net/browse/ECO-21) | ECO-1 | 3 | To Do | Sin asignar |
| **Total** | **5 historias** |  | **15** | **0 Done** | **5 sin asignar** |

Los criterios BDD están en [Transformando a ágil](01%20Transformando%20a%20ágil%20V_1_0_1.md). La integración técnica se describe en el [informe de estado del Sprint 2](../03%20Implementación/01%20Informe%20de%20estado%20del%20proyecto%20V_1_0_0.md).

## 3. Sprint Planning y Sprint Goal

**Estado en Jira:** el sprint está creado y contiene las cinco historias. El usuario aprobó registrar el siguiente objetivo en Jira el 06/10/2026; una consulta posterior confirmó que quedó guardado:

> Ampliar la base operativa de EcoLogística Lima para actualizar y desactivar conductores y gestionar clientes con sus condiciones de entrega, preservando las funciones del Sprint 1.

Registrar el objetivo no acredita una reunión de planificación. Las fechas del sprint deben revisarse con el equipo antes de iniciarlo o cerrarlo; no se retrodata una ceremonia.

## 4. Tablero Scrum y atención

| Columna | Cantidad de US-011 a US-015 |
|---|---:|
| To Do | 5 |
| In Progress | 0 |
| In Review / QA | 0 |
| Done | 0 |

**Carga por responsable:** cinco historias sin asignar. **Riesgo de seguimiento:** las cinco son `Highest`, no tienen responsable y el sprint sigue `future` a pesar del código integrado. La siguiente decisión del equipo es confirmar dueños, fechas y criterio de avance; moverlas a `Done` requiere evidencias completas de BDD y DoD. No se observaron etiquetas de bloqueo en estas cinco tarjetas; no se evaluaron todas las dependencias fuera del sprint.

## 5. Roadmap y release

US-011 a US-015 continúan la épica EP-01 del Sprint 1; las épicas EP-02 a EP-05 permanecen fuera de este incremento. La [captura histórica del roadmap y de la release `v1.0.0-MVP`](02%20Artefactos%20Jira%20V_1_0_2.md) corresponde a la planificación inicial, no a un nuevo corte visual del Sprint 2. En esta revisión se consultaron datos de Jira, sin producir capturas nuevas ni declarar publicada una release.

## 6. Fuentes y límites de la evidencia

- Atlassian Jira, `getJiraBoardSprintData(boardId=2, sprintName="ECO Sprint 2")`: sprint ID 37, cinco tarjetas, estados y asignación; consulta 06/10/2026 a las 17:02 (Lima).
- Atlassian Jira, `manageJiraSprint(action="update", sprintId=37)` y verificación posterior con `getJiraBoardSprintData(boardId=2, sprintId=37)`: objetivo registrado, nombre y fechas conservados; 06/10/2026 a las 17:10 (Lima).
- Atlassian Jira, `listJiraBoardSprints(boardId=2, state="all")`: Sprint 1 activo y Sprint 2 futuro; fechas y objetivo del Sprint 1.
- Atlassian Jira, `getJiraBoardConfig(boardId=2)`: columnas, filtro, campo de Story Points y ranking.
- JQL ejecutado: `project = ECO ORDER BY created DESC`, vista `evidence`; proporcionó épica, prioridad y puntos de ECO-17 a ECO-21. El total de 15 puntos se suma de esos cinco valores.
- La consulta es una fotografía del momento. No demuestra reuniones, aceptación de stakeholders, revisión por pares ni estado posterior de las tarjetas.

## Historial de control de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 06/10/2026 | Primer seguimiento del Sprint 2 en el tablero existente; cinco historias, 15 puntos, estados y discrepancias documentadas. |
| 1.0.1 | 06/10/2026 | Sprint Goal aprobado por el usuario, registrado en Jira y verificado; se mantienen los estados y responsables observados. |
