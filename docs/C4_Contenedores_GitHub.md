# C4 — Diagrama de Contenedores

## EcoLogística Lima

```mermaid
flowchart TB

    %% =========================
    %% ACTORES
    %% =========================

    Usuario["👤 Usuarios del Sistema<br/><br/>Administrador · Operador · Supervisor<br/>Conductor · Gerencia · Auditor"]

    %% =========================
    %% SISTEMA PRINCIPAL
    %% =========================

    subgraph EcoLogistica["EcoLogística Lima"]

        direction TB

        Frontend["Aplicación Web<br/><br/>[Container: React + TypeScript]<br/><br/>Proporciona la interfaz para gestionar<br/>pedidos, flota, rutas, indicadores<br/>y operaciones del sistema."]

        Backend["API Backend<br/><br/>[Container: Python + FastAPI]<br/><br/>Expone la lógica de negocio mediante<br/>una API REST y coordina autenticación,<br/>rutas, pedidos, reportes y auditoría."]

        Motor["Motor de Optimización<br/><br/>[Container: Python]<br/><br/>Genera y re-optimiza rutas mediante<br/>VRPTW / Green VRP considerando<br/>tiempo, capacidad, costos y emisiones."]

        BaseDatos[("Base de Datos<br/><br/>[Container: PostgreSQL]<br/><br/>Almacena usuarios, roles, vehículos,<br/>conductores, clientes, pedidos, rutas,<br/>incidencias, emisiones y auditoría.")]

        Frontend -->|"Realiza llamadas API<br/>[JSON / HTTPS]"| Backend

        Backend -->|"Solicita generación<br/>y re-optimización"| Motor

        Motor -->|"Devuelve rutas,<br/>métricas y no asignados"| Backend

        Backend -->|"Lee y escribe datos<br/>[SQL]"| BaseDatos

        Motor -->|"Consulta información<br/>operativa"| BaseDatos
    end

    %% =========================
    %% SISTEMAS EXTERNOS
    %% =========================

    Mapas["OpenStreetMap<br/><br/>[External System]<br/><br/>Proporciona información cartográfica<br/>para visualizar mapas, rutas<br/>y puntos de entrega."]

    Trafico["Servicio de Tráfico / Geocodificación<br/><br/>[External System]<br/><br/>Proporciona información de tráfico,<br/>geocodificación y datos externos<br/>para apoyar la planificación."]

    %% =========================
    %% RELACIONES
    %% =========================

    Usuario -->|"Utiliza el sistema<br/>[HTTPS]"| Frontend

    Frontend -->|"Solicita capas<br/>cartográficas"| Mapas

    Backend -->|"Consulta tráfico y<br/>geocodificación [HTTPS]"| Trafico

    %% =========================
    %% ESTILOS
    %% =========================

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

## Vista de la arquitectura

- **Usuarios** acceden al sistema mediante HTTPS.
- **Aplicación Web** utiliza React + TypeScript.
- **API Backend** utiliza FastAPI y concentra la lógica de negocio.
- **Motor de Optimización** procesa VRPTW / Green VRP.
- **PostgreSQL** almacena los datos del sistema.
- **OpenStreetMap** proporciona cartografía.
- Un **servicio externo de tráfico/geocodificación** aporta información dinámica para la planificación.
