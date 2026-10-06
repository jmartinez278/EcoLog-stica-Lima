[← Volver al README principal](../../README.md)

# Retrospectiva del Sprint 2 — análisis para validación del equipo

**Nombre del Proyecto:** EcoLogística Lima – Optimizador de Rutas Sostenibles para DistriRápido S.A.C.

**Líder del Proyecto:** Marco Jhair Martinez Llanos (según el acta de constitución)

**Fecha de elaboración:** 06/10/2026 · **Versión del documento:** 1.0.0

**Estado de la reunión:** no hay evidencia de una retrospectiva del equipo realizada al corte. Este análisis se basa en la comparación de `sprint-1` y `sprint-2`, las pruebas backend ejecutadas, el [registro de impedimentos](02%20Registro%20de%20Impedimentos%20V_1_0_0.md) y la consulta de [Jira](../02%20Planificación/04%20Seguimiento%20Jira%20Sprint%202%20V_1_0_1.md). Las acciones son propuestas verificables; no se atribuyen opiniones ni acuerdos a integrantes sin confirmación.

## ¿Qué aprendimos?

- Reutilizar el modelo de datos y la secuencia router → servicio → repositorio permitió ampliar Conductores y Clientes sin rehacer Vehículos ni Pedidos. La validación de cliente activo del Sprint 1 se mantuvo y preserva la selección de clientes para pedidos.
- La integración del código y la aceptación del sprint son pasos distintos: el PR #1 está integrado, pero las cinco historias siguen `To Do` en Jira y el DoD global exige más evidencias que una suite aprobada.
- Es necesario actualizar documentos y tablero durante el sprint, no solo después del desarrollo. Al iniciar esta revisión, los cuatro entregables existentes aún describían el Sprint 1 y el Sprint 2 no tenía objetivo cargado en Jira; ambos puntos se corrigieron documentalmente y el objetivo ya quedó registrado.
- Una suite backend verde en SQLite es útil para validar reglas, pero no demuestra el comportamiento de PostgreSQL ni de la interfaz en el entorno de presentación.

## ¿Qué estamos haciendo bien?

- El alcance técnico siguió US-011 a US-015 de la planificación; no introdujo optimización, mapa ni funciones posteriores.
- Se conservaron autenticación, permisos, auditoría y capas de la arquitectura del Sprint 1. Las escrituras de los nuevos módulos usan el servicio de transacción y auditoría existente.
- Las pruebas nuevas cubren altas, consultas, cambios, duplicados, permisos y transiciones inválidas. En la revisión de esta versión pasaron 14 pruebas backend con 92,41 % de cobertura total.
- El tablero ya contiene las cinco historias con estimaciones: 3, 2, 5, 2 y 3 puntos, respectivamente; no hizo falta duplicarlas.

## ¿Qué podemos hacer mejor?

### Personas

Las cinco tarjetas del Sprint 2 carecen de responsable en Jira. Esto dificulta coordinar la validación, documentación y presentación. En la reunión, asignar responsable y revisor diferentes por historia o bloque, y dejar constancia de quién comprobará pruebas y criterios BDD. No se presupone que las asignaciones propuestas en el Sprint 1 sigan vigentes.

### Relaciones

No constan comentarios ni decisiones de stakeholders sobre US-011 a US-015. La demostración debe recoger preguntas, cambios solicitados y aceptación por historia, y comunicar a todos los integrantes cualquier diferencia entre lo implementado y lo aprobado. La reunión retrospectiva deberá confirmar este análisis y cualquier desacuerdo.

### Procesos

El tablero no avanzó al ritmo del código: Sprint 2 figura `future` y sus cinco historias siguen `To Do`. El Sprint Goal ya se registró, pero aún falta acordar fechas, responsables y evidencias. Establecer una revisión breve de Jira y documentos antes de cada entrega, con evidencia para cada transición de estado. Antes de `Done`, contrastar los doce criterios del DoD, especialmente peer review, seguridad, staging, interfaz y aceptación BDD. Reservar el cierre del sprint para después de la demostración y los acuerdos reales.

### Herramientas

En el WSL usado para la revisión, Node se resolvió desde Windows y Docker no estuvo disponible; esto impidió repetir Vitest, build, Compose y PostgreSQL. Acordar un único procedimiento reproducible de verificación en un entorno con Docker Desktop integrado a WSL, registrar comandos y resultados y mantener una base de prueba aislada. Conservar el seguimiento Jira como fuente de estado y los Markdown como evidencia fechada, con enlaces en ambos sentidos.

### Acciones a realizar

Las responsabilidades y fechas siguientes son **propuestas para confirmar** en la retrospectiva; el estado inicial es pendiente.

| Acción concreta | Responsable a confirmar | Plazo propuesto | Evidencia de cierre | Estado |
|---|---|---|---|---|
| Revisar fechas y asignar ECO-17 a ECO-21 en Jira; registrar evidencia para mover estados. El Sprint Goal ya está registrado. | Líder del proyecto y equipo | 07/10/2026 | Jira muestra responsables y estados sustentados; fechas confirmadas. | Pendiente |
| Repetir pruebas frontend, build, Compose y suite backend con PostgreSQL aislado. | Responsable técnico a designar | Antes de la presentación | Resultados fechados y fallos registrados en impedimentos. | Pendiente |
| Revisar cada historia contra BDD y DoD con un segundo integrante, dejando comentarios de revisión. | Autor y revisor distintos por historia | Antes de marcar `Done` | Registro de aprobación o puntos abiertos por US. | Pendiente |
| Demostrar US-011 a US-015 a interesados y documentar decisiones, comentarios y compromisos. | Presentador y relator a designar | Fecha de revisión del Sprint a confirmar | Acta con asistentes, historias mostradas y resultado por escenario. | Pendiente |
| Celebrar la retrospectiva del equipo y validar o corregir este análisis y las acciones. | Equipo completo | Antes del cierre formal del Sprint 2 | Fecha, participantes, acuerdos, responsables y plazos efectivos añadidos a una nueva versión. | Pendiente |

## Historial de control de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 06/10/2026 | Análisis del Sprint 2 en los cuatro ejes y plan de acción propuesto; reunión y acuerdos pendientes de validación. |
