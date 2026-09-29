[← Volver al README principal](../../README.md)

# Retrospectiva del Sprint 1

| Campo | Detalle |
|---|---|
| Proyecto | EcoLogística Lima – Optimizador de Rutas Sostenibles para DistriRápido S.A.C. |
| Sprint | ECO Sprint 1 |
| Líder del proyecto | Marco Jhair Martinez Llanos, según el acta de constitución |
| Fecha de elaboración | 29/09/2026 |
| Reunión del equipo | Pendiente a la fecha de elaboración |
| Versión del documento | 1.0.2 |
| Estado | Borrador de análisis y plan de acción, pendiente de validación del equipo |

## Equipo del proyecto

Los cinco integrantes indicados por el usuario son:

1. Rodrigo Vladimir Arce Curi.
2. Piero Pool Chauris Leguia.
3. Luis Antony Gonzalo Guerrero.
4. Marco Jhair Martinez Llanos.
5. Jhon Robert Paitan Montes.

La documentación inicial enumera cuatro integrantes y omite a Piero; no se conoce desde cuándo se incorporó. Este borrador no atribuye declaraciones a ninguno de ellos.

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

La presentación concentra tareas de operación, explicación, registro de comentarios y respuesta a preguntas. Si una persona asume todo, puede omitir pasos o evidencias. Propuesta: repartir antes de la demo los papeles de presentador, apoyo técnico y relator; practicar el guion y pedir a alguien distinto del autor que revise cada cambio técnico pendiente de aceptación. La participación y disponibilidad reales de cada integrante deben confirmarse.

### Relaciones

La evidencia técnica no equivale a la opinión de docentes o interesados. La revisión debe pedirles observaciones sobre registros, filtros, estados y mensajes de error, y anotar qué aceptan, rechazan o dejan pendiente. Propuesta: usar una hoja de notas con historia, comentario, decisión, responsable y fecha; comunicar sin ambigüedad el alcance que todavía no se ha demostrado.

### Procesos

La dependencia de datos iniciales y variables de entorno puede interrumpir una demo improvisada. Propuesta: verificar rama, Docker, `.env`, salud de la API, login y datos de ejemplo antes de presentar; ejecutar US-001 a US-010 y un caso inválido con el mismo guion. Guardar fecha, comandos y resultados de las pruebas. Revisar el DoD por historia antes de marcarla `Done`, especialmente análisis estático, revisión por pares, staging, accesibilidad y aceptación BDD.

### Herramientas

La combinación de Node de Windows con `node_modules` de Linux produjo un fallo de dependencia nativa y Docker estuvo inicialmente inaccesible. Propuesta: usar Compose como procedimiento compartido para esta entrega y verificar `docker info` al comenzar. Mantener secretos únicamente en `.env`, validar la longitud de `JWT_SECRET`, conservar `.env.example` sin credenciales y usar una base PostgreSQL aislada para pruebas.

## Plan de acción

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
| 1.0.0 | 29/09/2026 | Borrador inicial para preparar la retrospectiva del Sprint 1. |
| 1.0.1 | 29/09/2026 | Análisis estructurado en cuatro ejes, equipo de cinco integrantes y plan de acción con responsables sugeridos. |
| 1.0.2 | 29/09/2026 | Redacción simplificada como borrador de retrospectiva pendiente de validación. Se conserva el nombre del archivo exigido por la consigna. |
