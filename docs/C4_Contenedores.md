# C4 — Diagrama de Contenedores

## EcoLogística Lima

```mermaid
flowchart TB

    Usuario["👤 Usuarios del Sistema<br/><br/>Administrador · Operador · Supervisor<br/>Conductor · Gerencia · Auditor"]

    subgraph EcoLogistica["EcoLogística Lima"]

        direction TB

        Frontend["Aplicación Web<br/><br/>[Container: React + TypeScript]<br/><br/>Gestiona pedidos, flota, rutas,<br/>indicadores y operaciones del sistema."]

        Backend["API Backend<br/><br/>[Container: Python + FastAPI]<br/><br/>Coordina autenticación, lógica de negocio,<br/>persistencia, optimización y servicios externos."]

        Motor["Motor de Optimización<br/><br/>[Container: Python]<br/><br/>Genera y re-optimiza rutas mediante<br/>VRPTW / Green VRP."]

        BaseDatos[("Base de Datos<br/><br/>[Container: PostgreSQL]<br/><br/>Almacena usuarios, vehículos, conductores,<br/>clientes, pedidos, rutas, incidencias,<br/>emisiones y auditoría.")]

        Frontend -->|"REST / JSON<br/>HTTPS"| Backend
        Backend -->|"Lee y escribe datos<br/>SQL"| BaseDatos

        Backend -->|"Pedidos, vehículos,<br/>conductores y restricciones"| Motor
        Motor -->|"Rutas, métricas<br/>y no asignados"| Backend
    end

    Mapas["OpenStreetMap<br/><br/>[External System]<br/><br/>Proporciona información cartográfica<br/>para visualizar mapas y rutas."]

    Trafico["Servicio de Tráfico / Geocodificación<br/><br/>[External System]<br/><br/>Proporciona información dinámica<br/>para apoyar la planificación."]

    Usuario -->|"HTTPS"| Frontend
    Frontend -->|"Capas cartográficas"| Mapas
    Backend -->|"HTTPS"| Trafico

    classDef person fill:#8B0000,color:#FFFFFF,stroke:#650000,stroke-width:2px;
    classDef container fill:#C62828,color:#FFFFFF,stroke:#9E1F1F,stroke-width:2px;
    classDef database fill:#C62828,color:#FFFFFF,stroke:#9E1F1F,stroke-width:2px;
    classDef external fill:#9E9E9E,color:#FFFFFF,stroke:#707070,stroke-width:2px;

    class Usuario person;
    class Frontend,Backend,Motor container;
    class BaseDatos database;
    class Mapas,Trafico external;

    style EcoLogistica fill:#FFFFFF,stroke:#D32F2F,stroke-width:2px,stroke-dasharray:8 6
```

---

## Flujo principal

```mermaid
flowchart LR
    DB[("PostgreSQL")]
    API["FastAPI / Servicios de Dominio"]
    OPT["Motor de Optimización"]

    DB -->|"Datos operativos"| API
    API -->|"Datos preparados"| OPT
    OPT -->|"Rutas y métricas"| API
    API -->|"Persistir resultado"| DB
```

> El motor de optimización no accede directamente a PostgreSQL. El backend controla la lectura, preparación y persistencia de los datos.
