[← Volver al README principal](../../README.md)

# Retrospectiva del Sprint 1

| Campo | Detalle |
|---|---|
| Proyecto | EcoLogística Lima – Optimizador de Rutas Sostenibles para DistriRápido S.A.C. |
| Sprint | ECO Sprint 1 |
| Líder del proyecto | Marco Jhair Martinez Llanos, según el acta de constitución |
| Fecha de elaboración | 29/09/2026 |
| Reunión del equipo | Pendiente a la fecha de elaboración |
| Versión del documento | 1.0.3 |
| Estado | Análisis retrospectivo documentado; acuerdos del equipo pendientes de confirmación |
| Base del análisis | [Informe de estado](01%20Informe%20de%20estado%20del%20proyecto%20V_1_0_0.md), [registro de impedimentos](02%20Registro%20de%20Impedimentos%20V_1_0_0.md) y pruebas del Sprint 1 |

## Equipo del proyecto

Los cinco integrantes indicados por el usuario son:

1. Rodrigo Vladimir Arce Curi.
2. Piero Pool Chauris Leguia.
3. Luis Antony Gonzalo Guerrero.
4. Marco Jhair Martinez Llanos.
5. Jhon Robert Paitan Montes.

La documentación inicial enumera cuatro integrantes y omite a Piero; no se conoce desde cuándo se incorporó. Este análisis no atribuye declaraciones a ninguno de ellos.

## ¿Qué aprendimos?

- El Sprint 1 puede demostrar US-001 a US-010 sin adelantar la gestión de clientes: la carga inicial idempotente y `GET /api/v1/clientes` permiten seleccionar un cliente para los pedidos. Esta solución limita la demo al cliente de ejemplo.
- Las transiciones de estado requieren pruebas de rechazo: un pedido que ya no está `PENDIENTE` no debe editarse ni cancelarse; la desactivación de vehículos debe conservar el registro. Las pruebas automatizadas cubren estos casos.
- Una configuración inválida puede impedir el acceso aunque la API esté implementada. El error HTTP 500 de login se relacionó con `JWT_SECRET` demasiado corto; la validación previa del entorno debe entrar en el guion de presentación.
- El entorno de ejecución forma parte del resultado. Docker Desktop y la mezcla de dependencias Windows/WSL bloquearon temporalmente las verificaciones; al usar Compose y PostgreSQL aislado, el 29/09/2026 pasaron 9 pruebas backend con 91,35 % de cobertura, 4 pruebas frontend, el build y la navegación a 360 px.
- Las pruebas y la navegación local acreditan funcionamiento técnico, pero no reemplazan la presentación a interesados, la revisión por pares, staging ni la aceptación formal del Definition of Done.

## ¿Qué estamos haciendo bien?

- La división `router → servicio → repositorio → PostgreSQL` y las carpetas separadas de frontend y backend permiten localizar reglas, errores y pruebas.
- El alcance implementado se mantuvo en US-001 a US-010. No se agregó el optimizador ni funcionalidades de sprints posteriores.
- Las pruebas incluyen registros, consultas vacías, duplicados, permisos, auditoría y transiciones prohibidas. Una ejecución integrada en contenedores confirmó que API, base de datos e interfaz arrancan juntas.
- Los impedimentos de login y herramientas se registraron y se repitió la comprobación tras corregir el entorno.

## ¿Qué podemos hacer mejor?

### Personas

La presentación concentra tareas de operación, explicación, registro de comentarios y respuesta a preguntas. Si una persona asume todo, puede omitir pasos o evidencias. Distribuir los papeles de presentador, apoyo técnico y relator, y practicar el guion. Un integrante distinto del autor debe revisar cada cambio técnico pendiente de aceptación. El cierre se comprobará con una asignación confirmada de los tres papeles y una revisión por pares registrada; ninguna de las dos consta todavía.

### Relaciones

La evidencia técnica no recoge la opinión de docentes o interesados: faltan observaciones y decisiones sobre los diez flujos. Durante la revisión del Sprint, registrar por historia lo mostrado, la pregunta o comentario recibido, la decisión de aceptación o rechazo y cualquier compromiso con responsable y plazo. El cierre se comprobará con diez resultados trazables, incluso cuando alguno quede pendiente o sea rechazado.

### Procesos

La dependencia de datos iniciales y variables de entorno puede interrumpir una demostración improvisada; el fallo de login y el bloqueo de Docker ya causaron retrasos de verificación. Antes de presentar, comprobar rama, Docker, `.env`, salud de la API, login y datos de ejemplo; después, ejecutar US-001 a US-010 y al menos un caso inválido con un guion común. Conservar comandos, fecha y resultados. Revisar los doce criterios del DoD por historia antes de marcarla `Done`, con especial atención a análisis estático, revisión por pares, staging, accesibilidad y aceptación BDD.

### Herramientas

La combinación de Node de Windows con `node_modules` de Linux produjo un fallo de dependencia nativa y Docker estuvo inicialmente inaccesible. Usar Compose como procedimiento compartido y verificar `docker info` al comenzar; el 29/09/2026 esta vía permitió repetir 9 pruebas backend, 4 frontend y el build. Mantener secretos únicamente en `.env`, validar la longitud de `JWT_SECRET`, conservar `.env.example` sin credenciales y usar una base PostgreSQL aislada para pruebas. La comprobación de cierre es un arranque reproducible y una suite sin fallos en el equipo de presentación.

## Plan de acción derivado del análisis

La siguiente distribución de responsabilidades y plazos requiere validación del equipo.

| Acción concreta | Responsable propuesto | Plazo propuesto | Criterio verificable de cierre |
|---|---|---|---|
| Coordinar el ensayo y presentar el alcance real de US-001 a US-010; recopilar decisiones de los interesados. | Marco Jhair Martinez Llanos | Antes y durante la presentación del Sprint 1 | Guion practicado y revisión del Sprint actualizada con fecha, asistentes, comentarios y decisiones reales. |
| Comprobar Docker Desktop, Compose, PostgreSQL, `/health`, variables y login en el equipo de la demo. | Rodrigo Vladimir Arce Curi | Antes de iniciar la presentación | `docker info` y `docker compose config --quiet` correctos; API y login accesibles sin mostrar secretos. |
| Ejecutar y guardar las pruebas backend contra base aislada y revisar los casos negativos de vehículos, pedidos y conductores. | Luis Antony Gonzalo Guerrero | Antes de solicitar aceptación técnica | Resultado fechado de Pytest, cobertura ≥ 80 % y evidencia de rechazos esperados. |
| Ejecutar Vitest, build y un recorrido de la interfaz a 360 px; anotar fallos de navegación y formularios. | Jhon Robert Paitan Montes | Antes de solicitar aceptación técnica | Resultado fechado de pruebas y build, más lista de flujos observados o defectos. |
| Revisar el DoD y los documentos con un segundo integrante; registrar faltantes y notas de la presentación. | Piero Pool Chauris Leguia | Después de la presentación y antes de declarar historias `Done` | Registro de revisión por pares, criterios aún pendientes y notas incorporadas a los entregables. |

**Estado de las acciones:** pendientes de validación. El equipo podrá confirmar o ajustar responsables y plazos en su reunión.

## Historial de control de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 29/09/2026 | Análisis inicial de la retrospectiva del Sprint 1. |
| 1.0.1 | 29/09/2026 | Análisis estructurado en cuatro ejes, equipo de cinco integrantes y plan de acción con responsables sugeridos. |
| 1.0.2 | 29/09/2026 | Redacción simplificada del análisis retrospectivo pendiente de validación. Se conserva el nombre del archivo exigido por la consigna. |
| 1.0.3 | 29/09/2026 | Análisis de causas, efectos y comprobaciones de cierre en los cuatro ejes; acuerdos del equipo aún por confirmar. |
