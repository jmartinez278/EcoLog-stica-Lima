[← Volver al README principal](../../README.md)

# Registro de impedimentos — Sprint 1

| Campo | Detalle |
|---|---|
| Proyecto | EcoLogística Lima – Optimizador de Rutas Sostenibles para DistriRápido S.A.C. |
| Líder del proyecto | Marco Jhair Martinez Llanos, Director del Proyecto según el acta de constitución |
| Fecha de corte | 29/09/2026 |
| Versión del documento | 1.0.0 |

Este registro distingue la fecha en que se **documenta** un impedimento de la fecha en que sucedió, cuando esta última no consta. Las fechas tope de las incidencias abiertas son objetivos **propuestos para la preparación de la presentación**, no compromisos ya acordados por el equipo.

| Impedimento # | Fecha de registro | Descripción e impacto en el proyecto | Prioridad | Reportado por | Fecha tope de resolución | Estado | Fecha de resolución | Resolución / comentarios |
|---|---|---|---|---|---|---|---|---|
| IMP-01 | 29/09/2026 (registro retrospectivo) | Durante una prueba manual, el inicio de sesión con las credenciales de bootstrap devolvió HTTP 500. Impidió acceder a la interfaz protegida y ejecutar la comprobación personal. | Alta: bloquea el acceso | Usuario en prueba manual | No se había acordado una fecha tope; resuelto antes de este registro | Resuelto técnicamente; reconfirmación pendiente | Antes del 29/09/2026; fecha exacta no registrada | Se identificó la longitud insuficiente de `JWT_SECRET` y se corrigió la configuración local con una clave de al menos 32 caracteres. Repetir login en el entorno de la presentación. Si el operador ya existía, cambiar `BOOTSTRAP_OPERATOR_PASSWORD` no actualiza la contraseña guardada. |
| IMP-02 | 29/09/2026 | Docker Desktop no responde al consultar su daemon desde WSL y el comando Linux `docker` no está integrado. Impide arrancar PostgreSQL/API/frontend y repetir pruebas de persistencia PostgreSQL en este entorno. La sintaxis de Compose sí se validó con `docker.exe compose ... config --quiet` y `.env.example`. | Alta: bloquea verificación integrada | Verificación técnica del repositorio | 29/09/2026, antes de la presentación (objetivo propuesto) | Abierto | No aplica: sigue abierto | Iniciar Docker Desktop, habilitar integración de la distribución WSL y verificar `docker compose version` y `docker info`; después ejecutar Compose y prueba de salud de API. No se ha verificado aún la resolución. |
| IMP-03 | 29/09/2026 | Las herramientas temporales de Python y Node usadas en pruebas anteriores ya no estaban disponibles. Al intentar Vitest con Node de Windows sobre `node_modules` instalado para Linux, faltaba `@rollup/rollup-win32-x64-msvc`; el Python inicial tampoco tenía `pytest`. Esto bloqueó temporalmente la repetición de las pruebas. | Media: redujo evidencia técnica hasta recuperar el entorno | Verificación técnica del repositorio | 29/09/2026, antes de la presentación (objetivo propuesto) | Mitigado para esta sesión; estandarización pendiente | 29/09/2026 | Se creó un entorno Python temporal en WSL y se usó Node nativo de Linux. Pytest: 9 aprobadas, cobertura 91,35 %; Vitest: 4 aprobadas; build correcto. Para nuevas sesiones, fijar una instalación reproducible en WSL o Compose y no mezclar `node_modules` Linux con Node de Windows. |

## Seguimiento propuesto

1. Priorizar IMP-02 para recuperar el entorno de integración; verificar su cierre con `docker info`, `docker compose config --quiet` y la respuesta de `/health`.
2. Hacer permanente la mitigación de IMP-03 y conservar las salidas de las pruebas repetidas el 29/09/2026. Mantener una futura base PostgreSQL de prueba separada de los datos de demostración.
3. Reprobar el acceso de IMP-01 con las credenciales locales y documentar el resultado antes de la demostración. Nunca incluir contraseñas ni claves en este registro.
4. Después de la presentación, registrar si surgieron impedimentos nuevos, quién los reportó y las fechas efectivas de resolución. Los datos históricos que no constan se indican explícitamente como tales, sin fechas inventadas.

## Historial de control de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 29/09/2026 | Registro inicial de impedimentos observados en el Sprint 1 y acciones de seguimiento propuestas. |
