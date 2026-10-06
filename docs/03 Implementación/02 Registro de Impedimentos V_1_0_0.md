[← Volver al README principal](../../README.md)

# Registro de impedimentos — Sprint 2

**Nombre del Proyecto:** EcoLogística Lima – Optimizador de Rutas Sostenibles para DistriRápido S.A.C.

**Líder del Proyecto:** Marco Jhair Martinez Llanos (según el acta de constitución)

**Fecha de corte:** 06/10/2026 · **Versión interna del documento:** 1.0.1

Se conserva `V_1_0_0` en el nombre del archivo por exigencia de la consigna; el historial identifica la revisión.

Se registran los obstáculos **detectados en la revisión del Sprint 2** y una observación docente trasladada desde el sprint anterior. La fecha de registro no se presenta como inicio del problema cuando se desconoce. Jira programa este sprint del **22/09/2026 19:59:45** al **06/10/2026 19:59:35**, hora de Lima, pero no asigna fechas individuales de resolución a estos impedimentos. La columna de plazo lo indica expresamente: no se inventan fechas de vencimiento ni duraciones de retraso.

| Impedimento # | Fecha de Registro | Descripción del impedimento e impacto en el proyecto | Prioridad | Reportado por | Fecha tope de resolución | Estado | Fecha de Resolución | Resolución / Comentarios |
|---|---|---|---|---|---|---|---|---|
| S2-IMP-01 | 06/10/2026 | Jira conserva `ECO Sprint 2` como `future`; ECO-17 a ECO-21 están en `To Do` y sin asignación, aunque el código se integró a `main`. Inicialmente tampoco tenía Sprint Goal. El tablero aún no refleja el avance validado. | Alta | Revisión técnica del repositorio y Jira | Sin fecha propia en Jira; referencia: fin programado 06/10/2026 19:59:35 | Parcialmente resuelto | Pendiente de cierre | El usuario aprobó el Sprint Goal y quedó registrado y verificado el 06/10/2026 a las 17:10. Quedan por confirmar estado, responsables y evidencia del DoD. [Estado consultado](../02%20Planificación/04%20Seguimiento%20Jira%20Sprint%202%20V_1_0_2.md). |
| S2-IMP-02 | 06/10/2026 | Los cuatro documentos obligatorios de `docs/03 Implementación/` seguían describiendo el Sprint 1. Esto impedía presentar un informe, revisión y retrospectiva atribuibles al Sprint 2 y rompía la trazabilidad desde README. | Alta | Revisión técnica del repositorio | Sin fecha propia en Jira; resuelto antes del fin programado del sprint | Resuelto en la documentación de esta revisión | 06/10/2026 | Se archivaron las versiones históricas de Sprint 1 en `docs/03 Implementación/Sprint 1/`, se prepararon las cuatro versiones de Sprint 2 con los nombres exactos y se actualizaron los enlaces de README. Aún requiere revisión del equipo de su contenido. |
| S2-IMP-03 | 06/10/2026 | En el WSL de la revisión, `npm` ejecutó Windows desde una ruta UNC y no encontró Vitest; `docker` no estuvo disponible. Se pudo ejecutar Pytest local, pero no validar frontend, Compose ni persistencia PostgreSQL en esta pasada. | Media | Revisión técnica del entorno | Sin fecha propia en Jira; requiere replanificación si supera el 06/10/2026 19:59:35 | Abierto en este entorno | Pendiente de cierre | Pasaron 14 pruebas backend con 92,41 % de cobertura sobre SQLite. Repetir Vitest, build y Compose donde Node y Docker Desktop estén integrados con WSL; usar PostgreSQL de prueba separado. No se atribuye el fallo al código sin verificarlo. |
| S2-IMP-04 | 06/10/2026 | No consta demostración ante interesados, retrospectiva de equipo ni aprobación completa del DoD. Impide acreditar historias `Done` y cerrar formalmente la revisión del Sprint. | Alta | Revisión de evidencia documental y Jira | Sin fecha propia en Jira; requiere replanificación si supera el 06/10/2026 19:59:35 | Abierto | Pendiente de cierre | Preparar recorrido y registro de resultados; celebrar ambas reuniones y registrar asistentes, comentarios, decisiones y responsables. Completar revisión por pares, seguridad, staging y DoD-10 cuando corresponda. |
| S2-IMP-05 | 06/10/2026 (observación recibida) | El profesor señaló que la escasez de información técnica y la ambigüedad del Sprint anterior generaban retrasos. Para Sprint 2, un informe sin rutas, capas, pruebas y estado del DoD obliga a reconstruir decisiones y puede retrasar validación y presentación. No se comunicó cantidad de horas o días perdidos. | Media | Profesor, comunicado por el usuario | Sin fecha propia en Jira; mitigación documentada dentro del intervalo del Sprint 2 | Mitigación documental en curso | Pendiente de cierre | Se añadió al [informe](01%20Informe%20de%20estado%20del%20proyecto%20V_1_0_0.md) una matriz DoD-01 a DoD-12 y trazabilidad US → endpoint → capa → prueba. Verificar con el equipo si queda información técnica faltante y registrar duración real de cualquier retraso futuro. |

## Seguimiento

Revisar este registro en la siguiente reunión del equipo. Para cerrar cada impedimento abierto, añadir la fecha efectiva, la persona responsable y la evidencia de resolución. Si una acción supera el fin programado del Sprint 2, acordar su nuevo plazo en Jira antes de consignarlo aquí. El [informe de estado](01%20Informe%20de%20estado%20del%20proyecto%20V_1_0_0.md) usa el DoD como único criterio de terminado.

## Historial de control de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 06/10/2026 | Registro inicial de los impedimentos observados al revisar código, documentación, Jira y entorno de Sprint 2. |
| 1.0.1 | 06/10/2026 | Plazos alineados con el intervalo Jira, eliminación de fechas propuestas sin respaldo y observación docente sobre información técnica y retrasos no cuantificados. |
