[← Volver al README Principal](../../README.md)

# Transformando a ágil

| Campo | Detalle |
|---|---|
| **Proyecto** | EcoLogística Lima – Optimizador de Rutas Sostenibles para DistriRápido S.A.C. |
| **Integrantes** | Luis Antony Gonzalo Guerrero, Jhon Robert Paitan Montes, Marco Jhair Martinez Llanos, Rodrigo Vladimir Arce Curi |
| **Fecha** | 08/09/2026 |
| **Versión** | 1.0.0 |
| **Fase** | 02 – Planificación del Proyecto |

---

## 1. Objetivo del documento

Transformar la línea base de requisitos funcionales y no funcionales de **EcoLogística Lima** en elementos de trabajo ágiles que posteriormente serán gestionados en Jira Software.

La transformación seguirá la jerarquía:

```text
Requisito Funcional (RF)
        ↓
Épica
        ↓
Historia de Usuario (US)
        ↓
Tarea / Subtarea
```

Los Requisitos No Funcionales (RNF) serán tratados posteriormente como **Historias Técnicas (Enablers)** o como criterios transversales de aceptación y Definition of Done (DoD), según corresponda.

---

## 2. Criterio de agrupación de Épicas

Las Épicas representan grandes capacidades del producto y agrupan requisitos funcionales relacionados por dominio de negocio.

Para evitar que las Épicas se conviertan en tareas técnicas, su definición se mantiene orientada a **valor funcional y resultado de negocio**.

Se establecen cinco Épicas principales:

| ID | Épica | Objetivo |
|---|---|---|
| **EP-01** | Gestión de Operación Logística | Centralizar la administración de los recursos y datos necesarios para ejecutar la operación de distribución. |
| **EP-02** | Optimización y Re-optimización de Rutas | Permitir la planificación y ajuste dinámico de rutas considerando pedidos, recursos y restricciones operativas. |
| **EP-03** | Visualización y Seguimiento de Rutas | Facilitar la consulta visual de rutas, puntos de entrega y secuencia de paradas. |
| **EP-04** | Indicadores y Analítica Operativa | Proporcionar información consolidada para evaluar desempeño, costos y cumplimiento de la operación. |
| **EP-05** | Sostenibilidad y Gestión Ambiental | Medir el impacto ambiental de las rutas y generar información para el seguimiento de emisiones y sostenibilidad. |

---

# 3. Definición de Épicas

## EP-01: Gestión de Operación Logística

**Descripción:**  
Agrupa las capacidades necesarias para registrar y mantener la información base utilizada por la planificación logística: vehículos, pedidos, conductores y clientes.

**Valor de negocio:**  
Disponer de información operativa actualizada y confiable para reducir errores de planificación y asegurar que el motor de optimización utilice datos vigentes.

**Requisitos Funcionales relacionados:**

- RF-001 – Gestión de Flota.
- RF-002 – Gestión de Pedidos.
- RF-008 – Gestión de Conductores.
- RF-009 – Gestión de Clientes y Preferencias de Entrega.

---

## EP-02: Optimización y Re-optimización de Rutas

**Descripción:**  
Agrupa las capacidades destinadas a generar una planificación de rutas y modificarla cuando cambien las condiciones de la operación.

**Valor de negocio:**  
Reducir ineficiencias en la distribución y mantener una planificación válida ante nuevos pedidos, cancelaciones, averías, accidentes u otras incidencias.

**Requisitos Funcionales relacionados:**

- RF-003 – Generación de Rutas Optimizadas.
- RF-007 – Re-optimización Dinámica de Rutas.

---

## EP-03: Visualización y Seguimiento de Rutas

**Descripción:**  
Agrupa las capacidades de representación visual de las planificaciones generadas.

**Valor de negocio:**  
Permitir que operadores, supervisores y conductores comprendan rápidamente las rutas, puntos de entrega y secuencia de paradas asignadas.

**Requisitos Funcionales relacionados:**

- RF-004 – Visualización de Rutas en Mapa.

---

## EP-04: Indicadores y Analítica Operativa

**Descripción:**  
Agrupa las capacidades de consulta y análisis de indicadores derivados de las rutas y entregas registradas.

**Valor de negocio:**  
Facilitar la toma de decisiones mediante indicadores de distancia, tiempo, consumo, cumplimiento, ahorro y desempeño operativo.

**Requisitos Funcionales relacionados:**

- RF-005 – Dashboard de Indicadores.

---

## EP-05: Sostenibilidad y Gestión Ambiental

**Descripción:**  
Agrupa las capacidades destinadas a calcular, monitorear y reportar el impacto ambiental de la operación logística.

**Valor de negocio:**  
Permitir el seguimiento de emisiones, consumo y sostenibilidad para apoyar decisiones orientadas a reducir el impacto ambiental de la distribución.

**Requisitos Funcionales relacionados:**

- RF-006 – Generación de Reportes de Sostenibilidad.
- RF-010 – Cálculo y Seguimiento de Emisiones y Compensación de Carbono.

---

# 4. Matriz de trazabilidad RF → Épica

| RF | Requisito Funcional | Épica asignada | Justificación |
|---|---|---|---|
| **RF-001** | Gestión de Flota | **EP-01** | La flota constituye un recurso maestro de la operación logística. |
| **RF-002** | Gestión de Pedidos | **EP-01** | Los pedidos son la entrada principal que debe administrarse antes de planificar rutas. |
| **RF-003** | Generación de Rutas Optimizadas | **EP-02** | Es la capacidad central de planificación y optimización del sistema. |
| **RF-004** | Visualización de Rutas en Mapa | **EP-03** | Corresponde a la consulta visual y seguimiento de la planificación. |
| **RF-005** | Dashboard de Indicadores | **EP-04** | Consolida métricas operativas, económicas y ambientales para análisis. |
| **RF-006** | Generación de Reportes de Sostenibilidad | **EP-05** | Convierte los datos ambientales y operativos en información de sostenibilidad. |
| **RF-007** | Re-optimización Dinámica de Rutas | **EP-02** | Modifica la planificación cuando cambian las condiciones operativas. |
| **RF-008** | Gestión de Conductores | **EP-01** | Los conductores son recursos necesarios para ejecutar las rutas. |
| **RF-009** | Gestión de Clientes y Preferencias de Entrega | **EP-01** | Los clientes y sus restricciones forman parte de los datos operativos de planificación. |
| **RF-010** | Cálculo y Seguimiento de Emisiones y Compensación de Carbono | **EP-05** | Permite medir y hacer seguimiento al impacto ambiental de las rutas. |

---

## 5. Resultado de la transformación inicial

```text
EP-01 Gestión de Operación Logística
├── RF-001 Gestión de Flota
├── RF-002 Gestión de Pedidos
├── RF-008 Gestión de Conductores
└── RF-009 Gestión de Clientes y Preferencias de Entrega

EP-02 Optimización y Re-optimización de Rutas
├── RF-003 Generación de Rutas Optimizadas
└── RF-007 Re-optimización Dinámica de Rutas

EP-03 Visualización y Seguimiento de Rutas
└── RF-004 Visualización de Rutas en Mapa

EP-04 Indicadores y Analítica Operativa
└── RF-005 Dashboard de Indicadores

EP-05 Sostenibilidad y Gestión Ambiental
├── RF-006 Generación de Reportes de Sostenibilidad
└── RF-010 Cálculo y Seguimiento de Emisiones y Compensación de Carbono
```

Esta estructura será utilizada como base para el siguiente paso: **descomponer cada RF en Historias de Usuario (US) atómicas con formato Como / Quiero / Para**.
