[← Volver al README principal](../../README.md)

# Registro de impedimentos — Sprint 2

**Nombre del Proyecto:** EcoLogística Lima – Optimizador de Rutas Sostenibles para DistriRápido S.A.C.

**Líder del Proyecto:** Marco Jhair Martinez Llanos (según el acta de constitución)

**Fecha de corte:** 06/10/2026 · **Versión del documento:** 1.0.0

Se registran los obstáculos **detectados en la revisión del Sprint 2**. La fecha de registro no se presenta como fecha de inicio de un problema cuando esta última se desconoce. Las fechas tope son objetivos propuestos y requieren confirmación del equipo. `Sin evidencia` significa que no se halló una comprobación o acuerdo; no afirma que el trabajo sea imposible.

| Impedimento # | Fecha de Registro | Descripción del impedimento e impacto en el proyecto | Prioridad | Reportado por | Fecha tope de resolución | Estado | Fecha de Resolución | Resolución / Comentarios |
|---|---|---|---|---|---|---|---|---|
| S2-IMP-01 | 06/10/2026 | Jira conserva `ECO Sprint 2` como `future`; ECO-17 a ECO-21 están en `To Do` y sin asignación, aunque el código se integró a `main`. Inicialmente tampoco tenía Sprint Goal. El tablero aún no refleja el avance validado. | Alta | Revisión técnica del repositorio y Jira | 07/10/2026, objetivo propuesto | Parcialmente resuelto | — | El usuario aprobó el Sprint Goal y quedó registrado y verificado el 06/10/2026 a las 17:10. Quedan por confirmar fechas, responsables y evidencias para mover estados, sin pasar directamente a `Done` por existir código. [Estado consultado](../02%20Planificación/04%20Seguimiento%20Jira%20Sprint%202%20V_1_0_1.md). |
| S2-IMP-02 | 06/10/2026 | Los cuatro documentos obligatorios de `docs/03 Implementación/` seguían describiendo el Sprint 1. Esto impedía presentar un informe, revisión y retrospectiva atribuibles al Sprint 2 y rompía la trazabilidad desde README. | Alta | Revisión técnica del repositorio | 06/10/2026, objetivo propuesto | Resuelto en la documentación de esta revisión | 06/10/2026 | Se archivaron las versiones históricas de Sprint 1 en `docs/03 Implementación/Sprint 1/`, se prepararon las cuatro versiones de Sprint 2 con los nombres exactos y se actualizaron los enlaces de README. Aún requiere revisión del equipo de su contenido. |
| S2-IMP-03 | 06/10/2026 | En el WSL de la revisión, `npm` ejecutó Windows desde una ruta UNC y no encontró Vitest; `docker` no estuvo disponible. Se pudo ejecutar Pytest local, pero no validar frontend, Compose ni persistencia PostgreSQL en esta pasada. | Media | Revisión técnica del entorno | Antes de solicitar aceptación técnica, objetivo propuesto | Abierto en este entorno | — | Pasaron 14 pruebas backend con 92,41 % de cobertura sobre SQLite. Repetir Vitest, build y Compose donde Node y Docker Desktop estén integrados con WSL; usar PostgreSQL de prueba separado. No se atribuye el fallo al código sin verificarlo. |
| S2-IMP-04 | 06/10/2026 | No consta demostración ante interesados, retrospectiva de equipo ni aprobación completa del DoD. Impide acreditar historias `Done` y cerrar formalmente la revisión del Sprint. | Alta | Revisión de evidencia documental y Jira | Antes del cierre formal del Sprint, objetivo propuesto | Abierto | — | Preparar recorrido y registro de resultados; celebrar ambas reuniones y registrar asistentes, comentarios, decisiones, responsables y plazos efectivos. Completar revisión por pares, seguridad, staging y aceptación BDD cuando corresponda. |

## Seguimiento

Revisar este registro en la siguiente reunión del equipo. Para cerrar cada impedimento abierto, añadir la fecha efectiva, la persona responsable y la evidencia de resolución. El [informe de estado](01%20Informe%20de%20estado%20del%20proyecto%20V_1_0_0.md) distingue avance funcional de aceptación formal.

## Historial de control de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 06/10/2026 | Registro inicial de los impedimentos observados al revisar código, documentación, Jira y entorno de Sprint 2. |
