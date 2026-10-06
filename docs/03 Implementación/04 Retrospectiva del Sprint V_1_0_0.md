[← Volver al README principal](../../README.md)

# Retrospectiva del Sprint 2 — análisis para validación del equipo

**Nombre del Proyecto:** EcoLogística Lima – Optimizador de Rutas Sostenibles para DistriRápido S.A.C.

**Líder del Proyecto:** Marco Jhair Martinez Llanos (según el acta de constitución)

**Fecha de elaboración:** 06/10/2026 · **Versión interna del documento:** 1.0.1

El nombre `V_1_0_0` se mantiene por la consigna; el historial registra esta revisión.

**Estado de la reunión:** no hay evidencia de una retrospectiva del equipo realizada al corte. Este análisis se basa en la comparación de `sprint-1` y `sprint-2`, las pruebas backend ejecutadas, el [registro de impedimentos](02%20Registro%20de%20Impedimentos%20V_1_0_0.md) y la consulta de [Jira](../02%20Planificación/04%20Seguimiento%20Jira%20Sprint%202%20V_1_0_2.md). Las acciones son propuestas verificables; no se atribuyen opiniones ni acuerdos a integrantes sin confirmación.

## ¿Qué aprendimos?

- Reutilizar el modelo de datos y la secuencia router → servicio → repositorio permitió ampliar Conductores y Clientes sin rehacer Vehículos ni Pedidos. La validación de cliente activo del Sprint 1 se mantuvo y preserva la selección de clientes para pedidos.
- La integración del código y la aceptación del sprint son pasos distintos: el PR #1 está integrado, pero las cinco historias siguen `To Do` en Jira y el DoD global exige más evidencias que una suite aprobada.
- Es necesario actualizar documentos y tablero durante el sprint, no solo después del desarrollo. Al iniciar esta revisión, los cuatro entregables existentes aún describían el Sprint 1 y el Sprint 2 no tenía objetivo cargado en Jira; ambos puntos se corrigieron documentalmente y el objetivo ya quedó registrado.
- Una suite backend verde en SQLite es útil para validar reglas, pero no demuestra el comportamiento de PostgreSQL ni de la interfaz en el entorno de presentación.
- El profesor observó en el sprint anterior que la información técnica escasa o ambigua causaba retrasos. No se comunicó una duración medible; por ello el informe del Sprint 2 ahora identifica rutas, capas, pruebas y evidencia por punto del DoD. La ausencia de esa información sigue siendo un riesgo para revisión y presentación.
- Las fechas del trabajo y los compromisos deben distinguirse. Jira fijó dos semanas, desde el 22/09/2026 19:59:45 hasta el 06/10/2026 19:59:35 (Lima); el commit y el PR que acreditan el incremento tienen fecha 06/10/2026. No corresponde repartir retrospectivamente esas acciones en días anteriores ni fijar plazos para el 07/10 dentro del Sprint 2.

## ¿Qué estamos haciendo bien?

- El alcance técnico siguió US-011 a US-015 de la planificación; no introdujo optimización, mapa ni funciones posteriores.
- Se conservaron autenticación, permisos, auditoría y capas de la arquitectura del Sprint 1. Las escrituras de los nuevos módulos usan el servicio de transacción y auditoría existente.
- Las pruebas nuevas cubren altas, consultas, cambios, duplicados, permisos y transiciones inválidas. En la revisión de esta versión pasaron 14 pruebas backend con 92,41 % de cobertura total.
- El tablero ya contiene las cinco historias con estimaciones: 3, 2, 5, 2 y 3 puntos, respectivamente; no hizo falta duplicarlas.

## ¿Qué podemos hacer mejor?

### Personas

Las cinco tarjetas del Sprint 2 carecen de responsable en Jira. Esto dificulta coordinar la validación, documentación y presentación. En la reunión, asignar responsable y revisor diferentes por historia o bloque, y dejar constancia de quién reunirá evidencia del DoD, incluido DoD-10 para los escenarios BDD. No se presupone que las asignaciones propuestas en el Sprint 1 sigan vigentes.

### Relaciones

No constan comentarios ni decisiones de stakeholders sobre US-011 a US-015. La demostración debe recoger preguntas, cambios solicitados y evidencia de DoD-10 por historia, y comunicar a todos los integrantes cualquier diferencia entre lo implementado y lo verificado. La reunión retrospectiva deberá confirmar este análisis y cualquier desacuerdo. El equipo también debe acordar dónde registrar aclaraciones técnicas para evitar búsquedas repetidas y pérdida de tiempo.

### Procesos

El tablero no avanzó al ritmo del código: Sprint 2 figura `future` y sus cinco historias siguen `To Do`. El Sprint Goal ya se registró, pero aún falta acordar estado, responsables y evidencias. Establecer una revisión breve de Jira y documentos desde el comienzo del siguiente sprint, con decisiones técnicas y fechas planificadas **antes** de implementar. Usar el DoD como único criterio de terminado: los escenarios BDD pertenecen a DoD-10, no a un segundo criterio paralelo. Registrar fecha planificada en Jira, fecha real y causa de desviación en columnas diferentes; cualquier plazo posterior al fin actual requiere replanificación en Jira.

### Herramientas

En el WSL usado para la revisión, Node se resolvió desde Windows y Docker no estuvo disponible; esto impidió repetir Vitest, build, Compose y PostgreSQL. Acordar un único procedimiento reproducible de verificación en un entorno con Docker Desktop integrado a WSL, registrar comandos y resultados y mantener una base de prueba aislada. Conservar el seguimiento Jira como fuente de estado y los Markdown como evidencia fechada, con enlaces en ambos sentidos.

### Acciones a realizar

Las responsabilidades y plazos siguientes son **propuestas para confirmar** en la retrospectiva; el estado inicial es pendiente. Se expresan respecto al siguiente sprint porque Jira aún no contiene una fecha acordada para estas acciones. No se presentan como realizadas ni se ubican falsamente dentro del Sprint 2.

| Acción concreta | Responsable a confirmar | Plazo vinculado a Jira | Evidencia de cierre | Estado |
|---|---|---|---|---|
| Resolver la discrepancia entre fechas y estado de ECO Sprint 2; asignar ECO-17 a ECO-21 y registrar las decisiones. | Líder del proyecto y equipo | Antes de iniciar un sprint replanificado; fecha aún no fijada en Jira. | Jira muestra responsables, intervalo y estados sustentados. | Pendiente |
| Preparar para cada US una ficha con endpoint, regla, archivo, prueba y criterios DoD aplicables antes de desarrollarla. | Autor técnico y revisor a designar | Día 1 del próximo sprint, una vez que Jira tenga fechas. | Cinco fichas enlazadas desde las tarjetas; preguntas técnicas resueltas antes de implementar. | Pendiente |
| Repetir Vitest, build, Compose y suite backend con PostgreSQL aislado, y registrar los resultados. | Responsable técnico a designar | A más tardar dos días antes del fin del próximo sprint definido en Jira. | Resultados fechados y defectos registrados. | Pendiente |
| Revisar cada historia contra DoD-01 a DoD-12 con un segundo integrante; aprobar los escenarios BDD dentro de DoD-10. | Autor y revisor distintos por historia | Antes de mover cada tarjeta a `Done`. | Matriz de evidencia completa, review y pipeline verificables por US. | Pendiente |
| Demostrar US-011 a US-015 y validar este análisis retrospectivo con el equipo. | Presentador, relator y equipo a designar | Fecha a registrar en Jira; ninguna consta al corte. | Fecha, asistentes, comentarios, acuerdos y responsables reales incorporados al documento. | Pendiente |

## Historial de control de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 06/10/2026 | Análisis del Sprint 2 en los cuatro ejes y plan de acción propuesto; reunión y acuerdos pendientes de validación. |
| 1.0.1 | 06/10/2026 | Incorporación de la observación docente sobre información técnica y retrasos, fechas conforme a Jira y acciones con hitos relativos que requieren programación real. |
