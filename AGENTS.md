# Contexto de trabajo — EcoLogística Lima

Este archivo orienta a quienes continúen el trabajo en el repositorio. La documentación de requisitos y planificación sigue siendo la fuente de verdad para el comportamiento del producto.

## Estado y límites acordados

- Trabajar en la rama correspondiente al Sprint activo. El Sprint 2 se desarrolla en `sprint-2`; confirmar `git branch --show-current` y `git status` antes de editar. No modificar `main` directamente.
- El Sprint 1 comprende US-001 a US-010. El Sprint 2 añade US-011 a US-015: actualización y desactivación de conductores, y registro, consulta y actualización de clientes y sus condiciones de entrega.
- El usuario autorizó integrar y publicar `sprint-1` en `main`, y después corregir la entrega y actualizar ambas ramas. Antes de cada integración, verificar las dos ramas y las pruebas; no hacer push de cambios ajenos a esta corrección.
- El usuario autorizó preparar los cuatro entregables del Sprint 1 en `docs/03 Implementación/`. Distinguir evidencia técnica de la demostración y reunión de retrospectiva del equipo, todavía sin evidencia de realización al 29/09/2026. El análisis retrospectivo está documentado; sus acuerdos requieren confirmación del equipo.
- El usuario compartió una imagen con los cinco integrantes actuales; el quinto, Piero Pool Chauris Leguia, está incluido en el README y en el análisis retrospectivo. Los documentos iniciales enumeran cuatro; no se conoce la fecha de incorporación, así que no reescribir actas históricas como si Piero hubiera estado presente entonces.
- No añadir aún optimizador de rutas, mapa, dashboard avanzado, emisiones, reportes ni reoptimización. Estas capacidades comienzan en US-016. No cambiar sin motivo los requisitos, las reglas de negocio, el stack ni la arquitectura documentada.
- Nunca mostrar ni agregar secretos. `.env` es local e ignorado por Git; `.env.example` contiene solo marcadores de posición.

## Fuentes de verdad

Leer antes de cambiar comportamiento o estructura:

1. `README.md`.
2. `docs/01 Inicio/06. Requisitos funcionales V_1_0_0.md`.
3. `docs/01 Inicio/07. Requisitos no funcionales V_1_0_0.md`.
4. `docs/01 Inicio/09. Reglas de negocio V_1_0_0.md`.
5. `docs/01 Inicio/10. Stack tecnológico V_1_0_0.md`.
6. `docs/01 Inicio/11. Base de datos V_1_0_0.md`.
7. `docs/01 Inicio/12. Modelo C4 V_1_0_0.md`.
8. `docs/02 Planificación/01 Transformando a ágil V_1_0_1.md`, especialmente los criterios BDD de US-001 a US-010, EN-006 y el Definition of Done.

Para cambios visuales, consultar también `DESIGN.md`. El `README.md` principal enlaza los entregables de implementación. El 29/09/2026 se verificaron servicios integrados, PostgreSQL y navegador local; la demostración ante interesados y la retrospectiva del equipo siguen pendientes de evidencia real.

## Arquitectura actual

- `src/frontend/`: React + TypeScript + Vite. La interfaz y los flujos están en `src/frontend/src/App.tsx`; los estilos en `src/frontend/src/style.css`; el cliente HTTP en `src/frontend/src/api.ts`. El token de sesión se guarda solo en memoria.
- `src/backend/`: Python + FastAPI + Pydantic + SQLAlchemy + Alembic. Flujo: router HTTP → servicio → repositorio → PostgreSQL. La API expone OpenAPI en `/docs`.
- `docker-compose.yml`: servicios `db` (PostgreSQL), `backend` y `frontend`. El navegador llama a la API mediante el proxy de Vite; nunca accede directamente a PostgreSQL.
- Autenticación: `POST /api/v1/auth/login`, token Bearer, usuario operador inicial configurado por variables de entorno y permisos RBAC en los endpoints. `JWT_SECRET` debe tener al menos 32 caracteres.
- Vehículos: `/api/v1/vehiculos` y acción `/desactivar`. La desactivación es lógica.
- Pedidos: `/api/v1/pedidos` y acción `/cancelar`. Solo `PENDIENTE` admite edición o cancelación; hay filtro por estado.
- Conductores: `/api/v1/conductores`, con filtro `disponible`.
- Clientes: `/api/v1/clientes` permite registrar, consultar y actualizar datos, preferencias, restricciones y estado. Los pedidos solo admiten clientes activos.
- Las mutaciones exitosas y su auditoría se confirman juntas; los fallos de escritura se auditan aparte. Conservar este comportamiento al modificar servicios.

## Verificación antes de entregar cambios

Desde `src/backend`:

```bash
python -m pytest -q --cov=app --cov-report=term-missing --cov-fail-under=80
```

Las pruebas pueden usar SQLite temporal por defecto. Para comprobar PostgreSQL, usar **una base aislada de prueba** mediante `TEST_DATABASE_URL`; la suite crea y elimina sus tablas. No apuntarla a la base de trabajo.

Desde `src/frontend`:

```bash
npm test
npm run build
```

Desde la raíz:

```bash
docker compose config --quiet
git status --short --branch
```

Cuando se cambie la interfaz, comprobar también acceso, navegación, formularios, listas, errores y ausencia de desbordamiento a **360 px**. Las pruebas automáticas y una revisión visual no equivalen por sí solas a aprobación de accesibilidad WCAG, revisión por pares o staging. No declarar completo el Definition of Done sin esas evidencias.

## Continuidad del diseño

La interfaz del Sprint 1 usa una estética oscura propia, inspirada de forma general en una landing tecnológica. Sus colores, tipografía, componentes y puntos de corte están descritos en `DESIGN.md`. Mantener la identidad de EcoLogística Lima y los flujos existentes al ampliarla; no introducir recursos de marca de terceros ni funcionalidades de Sprints posteriores por motivos puramente visuales.
