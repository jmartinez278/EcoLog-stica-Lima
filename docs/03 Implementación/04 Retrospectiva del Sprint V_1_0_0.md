[← Volver al README principal](../../README.md)

# Retrospectiva del sprint — borrador simulado para discusión

| Campo | Detalle |
|---|---|
| Proyecto | EcoLogística Lima – Optimizador de Rutas Sostenibles para DistriRápido S.A.C. |
| Líder del proyecto | Marco Jhair Martinez Llanos, Director del Proyecto según el acta de constitución |
| Sprint | ECO Sprint 1 |
| Fecha de elaboración | 29/09/2026 |
| Versión del documento | 1.0.0 |
| Estado | Simulación preparada antes de la retrospectiva del equipo; no es un acta de acuerdos |

**Alcance del borrador.** El equipo todavía no ha realizado la retrospectiva. Las reflexiones y acciones de este documento son **hipótesis y propuestas** basadas en el código, las pruebas y los impedimentos observados. No representan opiniones atribuidas a integrantes concretos ni compromisos aprobados. Tras la reunión real, se deben contrastar, sustituir o descartar y registrar asistentes, fecha, acuerdos y responsables confirmados.

## ¿Qué aprendimos? — hipótesis para validar

- El flujo de pedidos depende de un cliente activo: la carga inicial idempotente y `GET /api/v1/clientes` permitieron probar el primer sprint sin adelantar el módulo de gestión de clientes.
- Las transiciones de estado necesitan pruebas negativas además del flujo feliz. Las pruebas de pedidos comprueban que un pedido `PLANIFICADO` no puede editarse ni cancelarse, y las de vehículos comprueban desactivación inexistente y repetida.
- La configuración puede bloquear funciones que el código implementa: una clave JWT demasiado corta se manifestó como HTTP 500 durante el intento de login. Verificar variables locales antes de la demo debe formar parte de la preparación.
- La cobertura y el build obtenidos en una ejecución anterior no prueban que un entorno nuevo esté listo. La ausencia de Docker y la incompatibilidad de dependencias nativas entre Windows y WSL bloquearon inicialmente la repetición; se mitigó esta última con herramientas temporales nativas de WSL y se repitieron las pruebas automatizadas el 29/09/2026.
- El Definition of Done exige evidencia social y de despliegue además de pruebas: revisión por pares, staging, aprobación BDD y validación de interfaz no se sustituyen con código o cobertura.

## ¿Qué estamos haciendo bien? — observaciones técnicas, no consenso del equipo

- La separación `router → servicio → repositorio → base de datos` y la estructura independiente frontend/backend hacen localizables las reglas y pruebas.
- Los tests cubren registros, consultas vacías, duplicados, rechazos de transición, autenticación, permisos y auditoría; el 29/09/2026 se repitieron con 9 pruebas backend aprobadas y 91,35 % de cobertura, más 4 pruebas frontend aprobadas y build correcto.
- El alcance se mantuvo en US-001 a US-010; no se introdujo aún el optimizador de rutas ni otras capacidades de sprints posteriores.
- Los errores de operación, como el login 500, se pudieron relacionar con configuración concreta y documentar para su reproducción.

## ¿Qué podemos hacer mejor? — propuestas para la reunión

### Personas

Definir una persona responsable de preparar la demo y otra de registrar resultados, de modo que la misma persona no deba operar el sistema, contestar preguntas y tomar notas al mismo tiempo. Acordar un par técnico distinto del autor para revisar cambios y comprobar el DoD-04. Los nombres se asignarán únicamente en la reunión real.

### Relaciones

Invitar a los interesados previstos y pedir confirmación explícita de qué escenarios consideran aceptados, rechazados o pendientes. Registrar preguntas y decisiones en la revisión del sprint el mismo día. Si una historia se demuestra solo parcialmente, comunicarlo con ese alcance para evitar estados ambiguos entre equipo y evaluadores.

### Procesos

Preparar un checklist de entrada a demo: rama `sprint-1`, variables de entorno válidas, contenedores sanos, login, prueba de cada CRUD, casos negativos y respaldo de datos de ejemplo. Ejecutar las pruebas desde un entorno reproducible antes de mover historias a `Done`; guardar salida, fecha y base usada. Revisar el DoD por historia y registrar faltantes, en particular staging, accesibilidad y análisis de seguridad.

### Herramientas

Estandarizar una sola vía de ejecución por equipo: Compose con Docker Desktop integrado a WSL, o herramientas Linux instaladas completamente en WSL. Evitar correr Node de Windows sobre `node_modules` Linux. Incorporar comandos reproducibles y una comprobación temprana de `JWT_SECRET` y del acceso a Docker. Mantener `.env` fuera de Git y usar `.env.example` como guía.

### Acciones a realizar — propuestas sujetas a acuerdo del equipo

| Acción concreta | Responsable propuesto por rol | Plazo propuesto | Evidencia de cierre |
|---|---|---|---|
| Recuperar Docker Desktop/WSL o un entorno Linux equivalente y ejecutar backend, frontend y PostgreSQL juntos | Responsable de entorno a designar por el equipo | Antes de la demostración prevista el 29/09/2026 | `docker info`, `docker compose config --quiet`, `/health` y login correctos |
| Conservar la verificación de Pytest, Vitest y build ya repetida en WSL; agregar prueba PostgreSQL aislada | Responsable de pruebas a designar | Antes de solicitar aceptación del Sprint 1 | Salidas fechadas, cobertura ≥ 80 %, resultados de PostgreSQL y fallos registrados |
| Ejecutar el guion de US-001 a US-010 con interesados y completar el acta de revisión | Presentador y relator a designar | Durante y después de la presentación del 29/09/2026 | Fecha, asistentes, funcionalidades mostradas, comentarios y decisiones en `03 Revisión del Sprint` |
| Revisar cada historia frente al DoD y solicitar revisión por un par técnico | Autor y revisor a designar | Antes de declarar cualquier historia `Done` | Lista de criterios aprobados, hallazgos resueltos y aprobación de revisión |
| Celebrar la retrospectiva real y decidir cuáles de estas propuestas se adoptan | Director del proyecto y equipo | Después de la presentación; fecha por acordar | Acta versionada con asistentes, acuerdos, responsables nominales y plazos efectivos |

El equipo debe confirmar o cambiar responsables y fechas en la sesión real. Hasta entonces, este texto no acredita que la retrospectiva haya ocurrido ni que exista un plan aprobado.

## Historial de control de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 29/09/2026 | Borrador simulado y explícitamente no aprobado para preparar la retrospectiva real del Sprint 1. |
