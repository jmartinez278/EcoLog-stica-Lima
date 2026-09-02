# Diagrama C4 — EcoLogística Lima

> Este documento usa únicamente sintaxis Mermaid básica compatible con el renderizado de GitHub.

---

## Nivel 1 — Contexto

```mermaid
flowchart LR

    Admin["Administrador"]
    Operador["Operador Logístico"]
    Supervisor["Supervisor"]
    Conductor["Conductor"]
    Gerencia["Gerencia"]
    Auditor["Auditor"]

    Sistema["EcoLogística Lima"]

    Mapas["OpenStreetMap"]
    Trafico["Servicio de Tráfico y Geocodificación"]

    Admin -->|"Administra usuarios y configuración"| Sistema
    Operador -->|"Gestiona pedidos, flota y rutas"| Sistema
    Supervisor -->|"Supervisa rutas e indicadores"| Sistema
    Conductor -->|"Consulta rutas y paradas asignadas"| Sistema
    Gerencia -->|"Consulta KPIs y reportes"| Sistema
    Auditor -->|"Consulta auditoría y trazabilidad"| Sistema

    Sistema -->|"Consulta cartografía"| Mapas
    Sistema -->|"Consulta tráfico y geocodificación"| Trafico
```

---

## Nivel 2 — Contenedores

```mermaid
flowchart TB

    Usuario["Usuarios del sistema"]

    subgraph EcoLogistica["EcoLogística Lima"]
        Frontend["Frontend - React y TypeScript"]
        Backend["Backend API - FastAPI"]
        Motor["Motor de Optimización - Python"]
        BaseDatos["PostgreSQL"]
    end

    Mapas["OpenStreetMap"]
    Trafico["API de Tráfico y Geocodificación"]

    Usuario -->|"HTTPS"| Frontend
    Frontend -->|"REST / JSON"| Backend

    Backend -->|"Solicita optimización"| Motor
    Motor -->|"Devuelve rutas y métricas"| Backend

    Backend -->|"Lee y escribe datos"| BaseDatos
    Motor -->|"Consulta datos operativos"| BaseDatos

    Frontend -->|"Carga mapas"| Mapas
    Backend -->|"Consulta información externa"| Trafico
```

---

## Nivel 3 — Componentes del Backend

```mermaid
flowchart TB

    Frontend["Frontend - React y TypeScript"]

    subgraph Backend["Backend - FastAPI"]

        Router["Controladores / Routers"]
        Seguridad["Middleware de Seguridad"]

        Auth["Servicio de Autenticación"]
        Usuarios["Servicio de Usuarios y Roles"]

        Flota["Servicio de Flota"]
        Conductores["Servicio de Conductores"]
        Clientes["Servicio de Clientes"]
        Pedidos["Servicio de Pedidos"]

        Rutas["Servicio de Rutas"]
        Incidencias["Servicio de Incidencias"]

        Indicadores["Servicio de Indicadores"]
        Emisiones["Servicio de Emisiones"]
        Reportes["Servicio de Reportes"]
        Auditoria["Servicio de Auditoría"]

        AdaptadorOpt["Adaptador de Optimización"]
        AdaptadorExt["Adaptador de Servicios Externos"]

        Repositorios["Repositorios"]
    end

    Motor["Motor de Optimización"]
    BaseDatos["PostgreSQL"]
    Externos["Mapas / Tráfico / Geocodificación"]

    Frontend -->|"REST / JSON"| Router
    Router --> Seguridad

    Seguridad --> Auth
    Seguridad --> Usuarios

    Router --> Flota
    Router --> Conductores
    Router --> Clientes
    Router --> Pedidos
    Router --> Rutas
    Router --> Incidencias
    Router --> Indicadores
    Router --> Reportes

    Rutas --> AdaptadorOpt
    Incidencias --> Rutas

    Indicadores --> Emisiones
    Reportes --> Indicadores
    Reportes --> Emisiones

    Flota --> Repositorios
    Conductores --> Repositorios
    Clientes --> Repositorios
    Pedidos --> Repositorios
    Rutas --> Repositorios
    Incidencias --> Repositorios
    Usuarios --> Repositorios
    Indicadores --> Repositorios
    Emisiones --> Repositorios
    Auditoria --> Repositorios

    Auth --> Auditoria
    Pedidos --> Auditoria
    Rutas --> Auditoria
    Incidencias --> Auditoria

    AdaptadorOpt --> Motor
    Rutas --> AdaptadorExt
    AdaptadorExt --> Externos

    Repositorios --> BaseDatos
    Motor --> BaseDatos
```

---

## Vista General Simplificada

```mermaid
flowchart LR

    Frontend["React + TypeScript"]
    Backend["FastAPI"]
    Servicios["Servicios de Dominio"]
    Motor["Motor de Optimización"]
    BaseDatos["PostgreSQL"]
    Externos["Servicios Externos"]

    Frontend -->|"REST / JSON"| Backend
    Backend --> Servicios
    Servicios --> Motor
    Servicios --> BaseDatos
    Motor --> BaseDatos
    Servicios --> Externos
```
