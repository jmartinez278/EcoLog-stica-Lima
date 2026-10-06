[← Volver al README principal](../../README.md)

# Informe de estado del proyecto — Sprint 2

**Nombre del Proyecto:** EcoLogística Lima – Optimizador de Rutas Sostenibles para DistriRápido S.A.C.

**Líder del Proyecto:** Marco Jhair Martinez Llanos (según el acta de constitución)

**Sprint:** ECO Sprint 2 · **Fecha de corte:** 06/10/2026, 17:10 (Lima) · **Versión del documento:** 1.0.0

## Estado general

El incremento técnico de US-011 a US-015 está publicado en la rama `sprint-2` (commit `53642da`) y fue integrado a `main` mediante el PR #1 (`51b8c59`). Amplía la gestión de conductores y clientes sin retirar las operaciones del Sprint 1. La entrega formal continúa **en proceso**: en Jira las cinco historias permanecen en `To Do`, el Sprint 2 figura como `future` y no consta aceptación de sus criterios BDD ni cumplimiento íntegro del [Definition of Done](../02%20Planificación/01%20Transformando%20a%20ágil%20V_1_0_1.md). La integración de código no equivale al cierre de historias.

## Historias de Usuario completadas en este Sprint

**Acreditadas como `Done`: ninguna al corte.** Hay implementación funcional para las cinco historias; se detallan aquí por separado de su aceptación.

| Historia / Jira | Alcance verificable en el código | Estado de aceptación |
|---|---|---|
| US-011 / [ECO-17](https://jhonpaitanrcm.atlassian.net/browse/ECO-17) | Actualizar conductor y disponibilidad; rechazar datos inválidos, licencia duplicada e inactivos. | Implementada; `To Do` en Jira y DoD pendiente. |
| US-012 / [ECO-18](https://jhonpaitanrcm.atlassian.net/browse/ECO-18) | Desactivación lógica; respuesta 404 para ID inexistente y rechazo de conductor asignado. | Implementada; `To Do` en Jira y DoD pendiente. |
| US-013 / [ECO-19](https://jhonpaitanrcm.atlassian.net/browse/ECO-19) | Alta de cliente con preferencias y restricciones; validación de nombre y correo. | Implementada; `To Do` en Jira y DoD pendiente. |
| US-014 / [ECO-20](https://jhonpaitanrcm.atlassian.net/browse/ECO-20) | Lista, filtro de activos y ficha de cliente; 404 si no existe. | Implementada; `To Do` en Jira y DoD pendiente. |
| US-015 / [ECO-21](https://jhonpaitanrcm.atlassian.net/browse/ECO-21) | Actualización de datos y condiciones de entrega; rechazo de correo inválido o duplicado. | Implementada; `To Do` en Jira y DoD pendiente. |

La [planificación](../02%20Planificación/01%20Transformando%20a%20ágil%20V_1_0_1.md) define los escenarios oficiales de estas historias. El código incorpora rutas, servicios, repositorios, esquemas y formularios; los pedidos mantienen la regla del Sprint 1 de exigir un cliente activo. El Sprint 2 no incorpora optimización, mapas, emisiones ni reportes.

## Evidencia técnica y límites

| Comprobación al corte | Resultado | Alcance |
|---|---|---|
| `git diff 02e8f05...origin/sprint-2` | Cambios de US-011 a US-015 en backend, frontend y pruebas; sin cambios en `docs/03 Implementación/` antes de esta actualización documental. | Comparación de commits. |
| `python -m pytest -q --cov=app --cov-report=term --cov-fail-under=80` | 14 pruebas aprobadas; cobertura total de backend **92,41 %**. | Ejecutado sobre copia temporal del commit, con SQLite. No acredita PostgreSQL ni la interfaz completa. |
| Pruebas frontend y Compose | No ejecutadas en esta revisión: `npm` invocó Windows desde WSL y `docker` no estaba disponible en la distribución. | Los flujos nuevos sí tienen pruebas en `App.test.tsx`, pero su éxito no se afirma aquí. |
| Jira `ECO board`, sprint ID 37 | 5 historias, 0 `Done`, 0 `In Progress`, 5 `To Do`, 5 sin responsable; sprint `future`. Sprint Goal registrado con aprobación del usuario. | Consulta inicial a las 17:02 y verificación del objetivo a las 17:10 (Lima). [Detalle y fuentes](../02%20Planificación/04%20Seguimiento%20Jira%20Sprint%202%20V_1_0_1.md). |

El PR #1 acredita la integración en `main`; no se verificó una aprobación de revisión por pares ni un pipeline satisfactorio. Tampoco constan en esta revisión análisis estático, staging, aceptación BDD por interesados, compatibilidad entre navegadores o evaluación WCAG.

## Demostración del trabajo completado

La [revisión del Sprint 2](03%20Revisión%20del%20Sprint%20V_1_0_0.md) contiene un recorrido propuesto de conductores y clientes. **No hay evidencia de una demostración ya realizada ante stakeholders** al corte de este informe, por lo que no se atribuyen asistentes, comentarios ni decisiones.

## Impedimentos

El [registro de impedimentos](02%20Registro%20de%20Impedimentos%20V_1_0_0.md) documenta la desalineación de Jira frente al código integrado, la ausencia inicial de entregables del Sprint 2, la verificación incompleta del entorno WSL y la falta de evidencia para cerrar el DoD. Incluye impacto, prioridad, estado y acciones propuestas sin declarar resueltos los puntos aún abiertos.

## Pendientes

1. Revisar fechas y estado reales del Sprint 2 en Jira; actualizar las tarjetas con responsables y evidencias de acuerdo con el trabajo efectivamente validado. El Sprint Goal ya quedó registrado.
2. Repetir Vitest, build, Compose y pruebas integradas con PostgreSQL aislado en un entorno operativo; conservar resultados fechados.
3. Ejecutar la demostración con interesados y registrar asistentes, casos mostrados, observaciones, decisiones y compromisos reales.
4. Celebrar la retrospectiva del equipo y confirmar o corregir el [análisis y plan de acción](04%20Retrospectiva%20del%20Sprint%20V_1_0_0.md).
5. Completar las evidencias aplicables del DoD antes de declarar US-011 a US-015 como `Done`.

## Historial de control de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 06/10/2026 | Informe inicial del Sprint 2 con avance técnico, estado real de Jira, comprobaciones y pendientes de aceptación. |
