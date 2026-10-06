[← Volver al README principal](../../../README.md)

# Registro de impedimentos — Sprint 1

| Campo | Detalle |
|---|---|
| Proyecto | EcoLogística Lima – Optimizador de Rutas Sostenibles para DistriRápido S.A.C. |
| Líder del proyecto | Marco Jhair Martinez Llanos, Director del Proyecto según el acta de constitución |
| Fecha de corte | 29/09/2026 |
| Versión del documento | 1.0.0 |

Este registro distingue la fecha en que se **documenta** un impedimento de la fecha en que sucedió, cuando esta última no consta. Las fechas tope son objetivos propuestos para la presentación y no compromisos ya acordados por el equipo. Los tres impedimentos se comprobaron de nuevo el 29/09/2026 en un proyecto Docker Compose aislado.

| Impedimento # | Fecha de registro | Descripción e impacto en el proyecto | Prioridad | Reportado por | Fecha tope de resolución | Estado | Fecha de resolución | Resolución / comentarios |
|---|---|---|---|---|---|---|---|---|
| IMP-01 | 29/09/2026 (registro retrospectivo) | Durante una prueba manual, el inicio de sesión con las credenciales de bootstrap devolvió HTTP 500. Impidió acceder a la interfaz protegida y ejecutar la comprobación personal. | Alta: bloqueaba el acceso | Usuario en prueba manual | No se había acordado fecha tope; tratado antes de este registro | Resuelto técnicamente y reconfirmado | Antes del 29/09/2026; reconfirmado el 29/09/2026 | Se identificó la longitud insuficiente de `JWT_SECRET` y se corrigió la configuración local con una clave de al menos 32 caracteres. El 29/09 el login del operador inicial respondió HTTP 200 en el entorno aislado. La fecha exacta de la corrección inicial no consta. Cambiar `BOOTSTRAP_OPERATOR_PASSWORD` después de crear el usuario no actualiza su contraseña almacenada. |
| IMP-02 | 29/09/2026 | Docker Desktop no respondía y el comando Linux `docker` no estaba integrado en WSL. Bloqueaba el arranque de PostgreSQL/API/frontend y la prueba de persistencia. | Alta: bloqueaba la verificación integrada | Verificación técnica del repositorio | 29/09/2026, antes de la presentación (objetivo propuesto) | Resuelto técnicamente | 29/09/2026 | El usuario inició Docker Desktop. `docker info` y Compose respondieron; se construyeron tres servicios en un proyecto aislado, PostgreSQL estuvo sano y `/health`, `/openapi.json` y frontend respondieron HTTP 200. Pytest contra PostgreSQL: 9 aprobadas y 91,35 % de cobertura; recorrido HTTP real correcto. |
| IMP-03 | 29/09/2026 | Las herramientas temporales de Python y Node ya no estaban disponibles. Al mezclar Node de Windows con `node_modules` Linux faltaba una dependencia nativa de Rollup; el Python inicial tampoco tenía `pytest`. Esto bloqueó temporalmente las pruebas. | Media: redujo evidencia técnica hasta recuperar el entorno | Verificación técnica del repositorio | 29/09/2026, antes de la presentación (objetivo propuesto) | Resuelto mediante contenedores | 29/09/2026 | Las imágenes de backend y frontend instalan sus dependencias de forma reproducible. En ellas pasaron Pytest (9; 91,35 %), Vitest (4) y build. No mezclar `node_modules` Linux con Node de Windows en ejecuciones futuras. |

## Seguimiento propuesto

1. Mantener Docker Desktop y la integración WSL disponibles para la presentación; confirmar `docker info`, `docker compose config --quiet` y `/health` antes de mostrar la aplicación.
2. Repetir el inicio de sesión y los flujos de US-001 a US-010 con los datos definitivos de demostración. El cierre técnico en el entorno aislado no equivale a aceptación de interesados.
3. Conservar la salida fechada de Pytest/PostgreSQL, cobertura, Vitest, build y el recorrido HTTP. Mantener siempre separada la base de prueba de los datos de trabajo.
4. Después de la presentación, registrar nuevos impedimentos o reaperturas con quien los reportó y las fechas efectivas. Los datos históricos que no constan se identifican sin inventarlos.

## Historial de control de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 29/09/2026 | Registro de impedimentos del Sprint 1, resultado de la nueva comprobación en Docker y acciones de seguimiento propuestas. |
