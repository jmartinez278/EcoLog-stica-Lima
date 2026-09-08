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

Transformar la línea base de requisitos de **EcoLogística Lima** en elementos de trabajo ágiles que puedan incorporarse posteriormente al Product Backlog y gestionarse en Jira Software.

Los **Requisitos Funcionales (RF)** se mapean hacia **Épicas** y se descomponen en **Historias de Usuario (US)**. Los **Requisitos No Funcionales (RNF)** se transforman en **Historias Técnicas / Enablers** o se incorporan transversalmente como criterios de aceptación y Definition of Done (DoD).

La estructura utilizada es:

```text
RF → Épica → Historia de Usuario → Tarea / Subtarea
RNF → Enabler / Criterio transversal → Tarea / Subtarea
```

---

## 2. Metodología de transformación

### 2.1. Requisitos Funcionales

Cada RF se asigna a una Épica según el dominio de negocio al que pertenece. Cuando un RF agrupa varias operaciones, se descompone en Historias de Usuario más pequeñas para que puedan estimarse, priorizarse, probarse y planificarse de forma independiente.

### 2.2. Requisitos No Funcionales

Los RNF se agrupan en Enablers cuando representan trabajo técnico de arquitectura, infraestructura, seguridad, rendimiento, calidad o documentación. Algunos RNF también se aplican transversalmente a las Historias de Usuario mediante el DoD global.

### 2.3. Criterios de aceptación

Toda US y todo Enabler incluye al menos dos escenarios en sintaxis BDD/Gherkin:

```gherkin
Escenario: Título del escenario
Dado ...
Cuando ...
Entonces ...
```

Los escenarios se formulan de manera verificable, evitando expresiones ambiguas como “rápido”, “seguro” o “correctamente” sin una condición observable.

---

## 3. Épicas del producto

| ID | Épica | Objetivo | RF relacionados |
|---|---|---|---|
| **EP-01** | Gestión de Operación Logística | Centralizar la administración de los recursos y datos necesarios para ejecutar la operación de distribución. | RF-001, RF-002, RF-008, RF-009 |
| **EP-02** | Optimización y Re-optimización de Rutas | Permitir la planificación y el ajuste dinámico de rutas considerando pedidos, recursos y restricciones operativas. | RF-003, RF-007 |
| **EP-03** | Visualización y Seguimiento de Rutas | Facilitar la consulta visual de rutas, puntos de entrega y secuencia de paradas. | RF-004 |
| **EP-04** | Indicadores y Analítica Operativa | Proporcionar información consolidada para evaluar desempeño, costos y cumplimiento de la operación. | RF-005 |
| **EP-05** | Sostenibilidad y Gestión Ambiental | Medir el impacto ambiental de las rutas y generar información para el seguimiento de emisiones y sostenibilidad. | RF-006, RF-010 |


---

## 4. Matriz de trazabilidad RF → Épica


| RF | Requisito Funcional | Épica |
|---|---|---|
| **RF-001** | Gestión de Flota | **EP-01 – Gestión de Operación Logística** |
| **RF-002** | Gestión de Pedidos | **EP-01 – Gestión de Operación Logística** |
| **RF-008** | Gestión de Conductores | **EP-01 – Gestión de Operación Logística** |
| **RF-009** | Gestión de Clientes y Preferencias de Entrega | **EP-01 – Gestión de Operación Logística** |
| **RF-003** | Generación de Rutas Optimizadas | **EP-02 – Optimización y Re-optimización de Rutas** |
| **RF-007** | Re-optimización Dinámica de Rutas | **EP-02 – Optimización y Re-optimización de Rutas** |
| **RF-004** | Visualización de Rutas en Mapa | **EP-03 – Visualización y Seguimiento de Rutas** |
| **RF-005** | Dashboard de Indicadores | **EP-04 – Indicadores y Analítica Operativa** |
| **RF-006** | Generación de Reportes de Sostenibilidad | **EP-05 – Sostenibilidad y Gestión Ambiental** |
| **RF-010** | Cálculo y Seguimiento de Emisiones y Compensación de Carbono | **EP-05 – Sostenibilidad y Gestión Ambiental** |


---

# 5. Historias de Usuario

Las Historias de Usuario se redactan con la plantilla canónica **Como / Quiero / Para** y mantienen trazabilidad explícita con su RF y Épica de origen.


## 5.1. EP-01 – Gestión de Operación Logística


### US-001 – Registrar vehículo

**ID:** US-001  
**Título:** Registrar vehículo  
**Épica Relacionada:** EP-01 – Gestión de Operación Logística  
**RF de origen:** RF-001 – Gestión de Flota

**Redacción:**

**Como** operador logístico,  
**quiero** registrar un vehículo con sus datos operativos, capacidad, consumo y factor de emisión,  
**para** incorporarlo a la flota disponible para la planificación.

#### Criterios de aceptación BDD


**Escenario 1: Registro válido de vehículo**

```gherkin
Dado que el operador logístico está autenticado y dispone de los datos obligatorios de un vehículo
Cuando registra el vehículo con identificador único, capacidad y datos operativos válidos
Entonces el sistema almacena el vehículo y lo deja disponible según el estado registrado
```


**Escenario 2: Rechazo de vehículo inválido**

```gherkin
Dado que el operador logístico está autenticado
Cuando intenta registrar un vehículo sin un dato obligatorio o con un identificador ya existente
Entonces el sistema rechaza el registro e informa los campos que deben corregirse
```


---


### US-002 – Consultar vehículos de la flota

**ID:** US-002  
**Título:** Consultar vehículos de la flota  
**Épica Relacionada:** EP-01 – Gestión de Operación Logística  
**RF de origen:** RF-001 – Gestión de Flota

**Redacción:**

**Como** operador logístico,  
**quiero** consultar los vehículos registrados y su disponibilidad,  
**para** conocer los recursos disponibles antes de planificar las entregas.

#### Criterios de aceptación BDD


**Escenario 1: Consulta de flota registrada**

```gherkin
Dado que existen vehículos registrados en la flota
Cuando el operador consulta el listado de vehículos
Entonces el sistema muestra los vehículos con su estado y datos operativos permitidos
```


**Escenario 2: Consulta sin vehículos**

```gherkin
Dado que no existen vehículos registrados
Cuando el operador consulta la flota
Entonces el sistema muestra una lista vacía e informa que no existen vehículos registrados
```


---


### US-003 – Actualizar información de un vehículo

**ID:** US-003  
**Título:** Actualizar información de un vehículo  
**Épica Relacionada:** EP-01 – Gestión de Operación Logística  
**RF de origen:** RF-001 – Gestión de Flota

**Redacción:**

**Como** operador logístico,  
**quiero** actualizar los datos permitidos de un vehículo,  
**para** mantener vigente la información utilizada por la planificación.

#### Criterios de aceptación BDD


**Escenario 1: Actualización válida de vehículo**

```gherkin
Dado que existe un vehículo registrado
Cuando el operador modifica capacidad, consumo, factor de emisión o disponibilidad con valores válidos
Entonces el sistema guarda los cambios y presenta la información actualizada
```


**Escenario 2: Actualización con datos inválidos**

```gherkin
Dado que existe un vehículo registrado
Cuando el operador intenta guardar valores fuera de los rangos permitidos
Entonces el sistema rechaza la actualización y conserva los datos anteriores
```


---


### US-004 – Desactivar vehículo

**ID:** US-004  
**Título:** Desactivar vehículo  
**Épica Relacionada:** EP-01 – Gestión de Operación Logística  
**RF de origen:** RF-001 – Gestión de Flota

**Redacción:**

**Como** operador logístico,  
**quiero** desactivar un vehículo que no deba utilizarse temporal o permanentemente,  
**para** impedir que sea considerado en nuevas planificaciones.

#### Criterios de aceptación BDD


**Escenario 1: Desactivación de vehículo**

```gherkin
Dado que existe un vehículo activo registrado
Cuando el operador confirma su desactivación
Entonces el sistema cambia su estado a inactivo y lo excluye de nuevas planificaciones
```


**Escenario 2: Desactivación de vehículo inexistente**

```gherkin
Dado que el identificador indicado no corresponde a un vehículo registrado
Cuando el operador solicita desactivarlo
Entonces el sistema rechaza la operación e informa que el vehículo no existe
```


---


### US-005 – Registrar pedido

**ID:** US-005  
**Título:** Registrar pedido  
**Épica Relacionada:** EP-01 – Gestión de Operación Logística  
**RF de origen:** RF-002 – Gestión de Pedidos

**Redacción:**

**Como** operador logístico,  
**quiero** registrar un pedido con ubicación, carga, volumen, ventana de tiempo y prioridad,  
**para** incorporarlo a la planificación de rutas.

#### Criterios de aceptación BDD


**Escenario 1: Registro válido de pedido**

```gherkin
Dado que el operador dispone de los datos obligatorios del pedido
Cuando registra el pedido con ubicación, carga, volumen, ventana de tiempo y prioridad válidos
Entonces el sistema almacena el pedido y lo deja disponible para planificación
```


**Escenario 2: Registro con ventana inválida**

```gherkin
Dado que el operador está registrando un pedido
Cuando ingresa una ventana de tiempo cuyo fin es anterior o igual al inicio
Entonces el sistema rechaza el pedido e informa que la ventana de tiempo es inválida
```


---


### US-006 – Consultar pedidos registrados

**ID:** US-006  
**Título:** Consultar pedidos registrados  
**Épica Relacionada:** EP-01 – Gestión de Operación Logística  
**RF de origen:** RF-002 – Gestión de Pedidos

**Redacción:**

**Como** operador logístico,  
**quiero** consultar los pedidos registrados y su estado,  
**para** verificar cuáles están disponibles para planificación o seguimiento.

#### Criterios de aceptación BDD


**Escenario 1: Consulta de pedidos**

```gherkin
Dado que existen pedidos registrados
Cuando el operador consulta el listado de pedidos
Entonces el sistema muestra los pedidos con su estado e información operativa permitida
```


**Escenario 2: Consulta sin resultados**

```gherkin
Dado que no existen pedidos que cumplan los filtros seleccionados
Cuando el operador ejecuta la consulta
Entonces el sistema muestra un resultado vacío sin alterar los pedidos existentes
```


---


### US-007 – Actualizar pedido pendiente

**ID:** US-007  
**Título:** Actualizar pedido pendiente  
**Épica Relacionada:** EP-01 – Gestión de Operación Logística  
**RF de origen:** RF-002 – Gestión de Pedidos

**Redacción:**

**Como** operador logístico,  
**quiero** actualizar los datos permitidos de un pedido pendiente,  
**para** asegurar que la siguiente planificación utilice la información vigente.

#### Criterios de aceptación BDD


**Escenario 1: Actualización de pedido pendiente**

```gherkin
Dado que existe un pedido en estado editable
Cuando el operador modifica un dato permitido con un valor válido
Entonces el sistema guarda el cambio y utiliza la información actualizada en la siguiente planificación
```


**Escenario 2: Intento de modificar pedido no editable**

```gherkin
Dado que el pedido se encuentra en un estado que no permite edición
Cuando el operador intenta modificarlo
Entonces el sistema rechaza el cambio e informa el motivo
```


---


### US-008 – Cancelar pedido

**ID:** US-008  
**Título:** Cancelar pedido  
**Épica Relacionada:** EP-01 – Gestión de Operación Logística  
**RF de origen:** RF-002 – Gestión de Pedidos

**Redacción:**

**Como** operador logístico,  
**quiero** cancelar un pedido que ya no debe ser atendido,  
**para** evitar que sea asignado en futuras planificaciones.

#### Criterios de aceptación BDD


**Escenario 1: Cancelación válida de pedido**

```gherkin
Dado que existe un pedido cancelable
Cuando el operador confirma la cancelación
Entonces el sistema cambia el pedido a estado cancelado y lo excluye de nuevas planificaciones
```


**Escenario 2: Cancelación no permitida**

```gherkin
Dado que el pedido se encuentra en un estado no cancelable
Cuando el operador intenta cancelarlo
Entonces el sistema rechaza la operación e informa la restricción aplicable
```


---


### US-009 – Registrar conductor

**ID:** US-009  
**Título:** Registrar conductor  
**Épica Relacionada:** EP-01 – Gestión de Operación Logística  
**RF de origen:** RF-008 – Gestión de Conductores

**Redacción:**

**Como** operador logístico,  
**quiero** registrar un conductor con sus datos obligatorios,  
**para** disponer de personal elegible para futuras asignaciones de ruta.

#### Criterios de aceptación BDD


**Escenario 1: Registro válido de conductor**

```gherkin
Dado que el operador dispone de los datos obligatorios de un conductor
Cuando registra al conductor con información válida
Entonces el sistema almacena el conductor y lo deja disponible según su estado
```


**Escenario 2: Registro inválido de conductor**

```gherkin
Dado que el operador intenta registrar un conductor
Cuando omite un dato obligatorio o ingresa un identificador duplicado
Entonces el sistema rechaza el registro e informa la causa
```


---


### US-010 – Consultar conductores

**ID:** US-010  
**Título:** Consultar conductores  
**Épica Relacionada:** EP-01 – Gestión de Operación Logística  
**RF de origen:** RF-008 – Gestión de Conductores

**Redacción:**

**Como** operador logístico,  
**quiero** consultar los conductores y su disponibilidad,  
**para** conocer qué personal puede ser asignado a las rutas.

#### Criterios de aceptación BDD


**Escenario 1: Consulta de conductores**

```gherkin
Dado que existen conductores registrados
Cuando el operador consulta el listado
Entonces el sistema muestra los conductores y su disponibilidad
```


**Escenario 2: Consulta sin conductores disponibles**

```gherkin
Dado que existen conductores pero ninguno está disponible
Cuando el operador filtra por disponibilidad
Entonces el sistema muestra un resultado vacío e informa que no hay conductores disponibles
```


---


### US-011 – Actualizar información de conductor

**ID:** US-011  
**Título:** Actualizar información de conductor  
**Épica Relacionada:** EP-01 – Gestión de Operación Logística  
**RF de origen:** RF-008 – Gestión de Conductores

**Redacción:**

**Como** operador logístico,  
**quiero** actualizar la información y disponibilidad de un conductor,  
**para** mantener vigente su condición para futuras asignaciones.

#### Criterios de aceptación BDD


**Escenario 1: Actualización válida de conductor**

```gherkin
Dado que existe un conductor registrado
Cuando el operador modifica datos permitidos con valores válidos
Entonces el sistema guarda los cambios y refleja la nueva condición
```


**Escenario 2: Actualización inválida de conductor**

```gherkin
Dado que existe un conductor registrado
Cuando el operador intenta guardar información incompatible o incompleta
Entonces el sistema rechaza la actualización y conserva el estado anterior
```


---


### US-012 – Desactivar conductor

**ID:** US-012  
**Título:** Desactivar conductor  
**Épica Relacionada:** EP-01 – Gestión de Operación Logística  
**RF de origen:** RF-008 – Gestión de Conductores

**Redacción:**

**Como** operador logístico,  
**quiero** desactivar un conductor que no se encuentre habilitado para realizar entregas,  
**para** impedir que sea asignado a nuevas rutas.

#### Criterios de aceptación BDD


**Escenario 1: Desactivación de conductor**

```gherkin
Dado que existe un conductor activo
Cuando el operador confirma su desactivación
Entonces el sistema cambia su estado a inactivo y evita nuevas asignaciones
```


**Escenario 2: Desactivación de conductor inexistente**

```gherkin
Dado que el conductor solicitado no existe
Cuando el operador intenta desactivarlo
Entonces el sistema rechaza la operación e informa que el registro no fue encontrado
```


---


### US-013 – Registrar cliente y condiciones de entrega

**ID:** US-013  
**Título:** Registrar cliente y condiciones de entrega  
**Épica Relacionada:** EP-01 – Gestión de Operación Logística  
**RF de origen:** RF-009 – Gestión de Clientes y Preferencias de Entrega

**Redacción:**

**Como** operador logístico,  
**quiero** registrar la información de un cliente junto con sus preferencias y restricciones de entrega,  
**para** disponer de las condiciones necesarias al planificar sus pedidos.

#### Criterios de aceptación BDD


**Escenario 1: Registro válido de cliente**

```gherkin
Dado que el operador dispone de los datos requeridos del cliente
Cuando registra al cliente con preferencias y restricciones válidas
Entonces el sistema almacena la información y la deja disponible para pedidos asociados
```


**Escenario 2: Registro con datos incompatibles**

```gherkin
Dado que el operador está registrando condiciones de entrega
Cuando ingresa datos incompatibles con las reglas definidas
Entonces el sistema rechaza la información inconsistente y explica la causa
```


---


### US-014 – Consultar información de cliente

**ID:** US-014  
**Título:** Consultar información de cliente  
**Épica Relacionada:** EP-01 – Gestión de Operación Logística  
**RF de origen:** RF-009 – Gestión de Clientes y Preferencias de Entrega

**Redacción:**

**Como** operador logístico,  
**quiero** consultar los datos, preferencias y restricciones de entrega de un cliente,  
**para** verificar las condiciones que deben considerarse durante la distribución.

#### Criterios de aceptación BDD


**Escenario 1: Consulta de cliente registrado**

```gherkin
Dado que existe un cliente registrado
Cuando el operador consulta su ficha
Entonces el sistema muestra sus datos y condiciones de entrega vigentes
```


**Escenario 2: Consulta de cliente inexistente**

```gherkin
Dado que no existe un cliente con el identificador solicitado
Cuando el operador intenta consultarlo
Entonces el sistema informa que el cliente no fue encontrado
```


---


### US-015 – Actualizar condiciones de entrega del cliente

**ID:** US-015  
**Título:** Actualizar condiciones de entrega del cliente  
**Épica Relacionada:** EP-01 – Gestión de Operación Logística  
**RF de origen:** RF-009 – Gestión de Clientes y Preferencias de Entrega

**Redacción:**

**Como** operador logístico,  
**quiero** actualizar las preferencias o restricciones de entrega de un cliente,  
**para** utilizar las condiciones vigentes en las futuras planificaciones.

#### Criterios de aceptación BDD


**Escenario 1: Actualización válida de preferencias**

```gherkin
Dado que existe un cliente registrado
Cuando el operador actualiza una preferencia o restricción con un valor válido
Entonces el sistema guarda el cambio y lo utiliza en planificaciones futuras
```


**Escenario 2: Actualización incompatible**

```gherkin
Dado que existe un cliente registrado
Cuando el operador introduce una condición incompatible con las reglas de entrega
Entonces el sistema rechaza el cambio e informa la causa
```


---


## 5.2. EP-02 – Optimización y Re-optimización de Rutas


### US-016 – Generar rutas optimizadas

**ID:** US-016  
**Título:** Generar rutas optimizadas  
**Épica Relacionada:** EP-02 – Optimización y Re-optimización de Rutas  
**RF de origen:** RF-003 – Generación de Rutas Optimizadas

**Redacción:**

**Como** operador logístico,  
**quiero** generar una planificación optimizada utilizando pedidos, vehículos, conductores y restricciones operativas vigentes,  
**para** organizar las entregas de manera eficiente y factible.

#### Criterios de aceptación BDD


**Escenario 1: Generación de planificación válida**

```gherkin
Dado que existen pedidos válidos, vehículos habilitados, conductores disponibles y restricciones definidas
Cuando el operador solicita generar la planificación
Entonces el sistema devuelve rutas y asignaciones que respetan las restricciones obligatorias
```


**Escenario 2: Pedidos no asignables**

```gherkin
Dado que uno o más pedidos no pueden ser asignados bajo los recursos y restricciones vigentes
Cuando el operador solicita generar las rutas
Entonces el sistema conserva una planificación consistente e identifica los pedidos no asignados con su causa
```


---


### US-017 – Re-optimizar rutas ante cambios operativos

**ID:** US-017  
**Título:** Re-optimizar rutas ante cambios operativos  
**Épica Relacionada:** EP-02 – Optimización y Re-optimización de Rutas  
**RF de origen:** RF-007 – Re-optimización Dinámica de Rutas

**Redacción:**

**Como** operador logístico,  
**quiero** re-optimizar una planificación cuando se produzca un cambio operativo o incidencia,  
**para** mantener rutas válidas con las condiciones actualizadas.

#### Criterios de aceptación BDD


**Escenario 1: Re-optimización por incidencia**

```gherkin
Dado que existe una planificación activa y se registra una incidencia que afecta su ejecución
Cuando el operador solicita la re-optimización
Entonces el sistema genera una nueva propuesta considerando el estado operativo actualizado
```


**Escenario 2: Re-optimización con pedidos no reasignables**

```gherkin
Dado que una incidencia impide atender uno o más pedidos
Cuando se ejecuta la re-optimización
Entonces el sistema identifica los pedidos afectados y mantiene consistentes las asignaciones válidas
```


---


## 5.3. EP-03 – Visualización y Seguimiento de Rutas


### US-018 – Visualizar planificación en mapa

**ID:** US-018  
**Título:** Visualizar planificación en mapa  
**Épica Relacionada:** EP-03 – Visualización y Seguimiento de Rutas  
**RF de origen:** RF-004 – Visualización de Rutas en Mapa

**Redacción:**

**Como** supervisor de operaciones,  
**quiero** visualizar en un mapa las rutas, vehículos asignados, puntos de entrega y secuencia de paradas,  
**para** revisar y supervisar la planificación de manera gráfica.

#### Criterios de aceptación BDD


**Escenario 1: Visualización de ruta**

```gherkin
Dado que existe una planificación válida
Cuando el supervisor abre la vista cartográfica
Entonces el sistema muestra rutas, vehículos, puntos de entrega y orden de paradas
```


**Escenario 2: Servicio cartográfico no disponible**

```gherkin
Dado que existe una planificación pero el servicio cartográfico externo no responde
Cuando el supervisor intenta abrir el mapa
Entonces el sistema conserva la planificación e informa la indisponibilidad mostrando la información textual disponible
```


---


## 5.4. EP-04 – Indicadores y Analítica Operativa


### US-019 – Consultar indicadores operativos

**ID:** US-019  
**Título:** Consultar indicadores operativos  
**Épica Relacionada:** EP-04 – Indicadores y Analítica Operativa  
**RF de origen:** RF-005 – Dashboard de Indicadores

**Redacción:**

**Como** supervisor de operaciones,  
**quiero** consultar un dashboard con indicadores de distancia, tiempo, consumo, emisiones y cumplimiento,  
**para** evaluar el desempeño de la operación logística.

#### Criterios de aceptación BDD


**Escenario 1: Consulta de dashboard con datos**

```gherkin
Dado que existen rutas y entregas con datos suficientes
Cuando el supervisor accede al dashboard
Entonces el sistema presenta los indicadores disponibles calculados con los datos registrados
```


**Escenario 2: Indicadores sin datos suficientes**

```gherkin
Dado que uno o más indicadores no cuentan con datos suficientes
Cuando el supervisor consulta el dashboard
Entonces el sistema muestra los indicadores disponibles e identifica los que no pueden calcularse
```


---


### US-020 – Filtrar indicadores por periodo

**ID:** US-020  
**Título:** Filtrar indicadores por periodo  
**Épica Relacionada:** EP-04 – Indicadores y Analítica Operativa  
**RF de origen:** RF-005 – Dashboard de Indicadores

**Redacción:**

**Como** supervisor de operaciones,  
**quiero** filtrar los indicadores por un periodo determinado,  
**para** analizar el desempeño correspondiente al intervalo seleccionado.

#### Criterios de aceptación BDD


**Escenario 1: Filtro temporal válido**

```gherkin
Dado que existen datos en distintos periodos
Cuando el supervisor selecciona un rango de fechas válido
Entonces el sistema recalcula y presenta los indicadores del periodo elegido
```


**Escenario 2: Rango temporal inválido**

```gherkin
Dado que el supervisor está configurando el filtro
Cuando selecciona una fecha final anterior a la inicial
Entonces el sistema rechaza el filtro e informa que el rango es inválido
```


---


## 5.5. EP-05 – Sostenibilidad y Gestión Ambiental


### US-021 – Generar reporte de sostenibilidad

**ID:** US-021  
**Título:** Generar reporte de sostenibilidad  
**Épica Relacionada:** EP-05 – Sostenibilidad y Gestión Ambiental  
**RF de origen:** RF-006 – Generación de Reportes de Sostenibilidad

**Redacción:**

**Como** gerente,  
**quiero** generar un reporte de sostenibilidad para un periodo seleccionado,  
**para** evaluar emisiones, consumo, costos y variaciones respecto de la línea base.

#### Criterios de aceptación BDD


**Escenario 1: Generación de reporte con información suficiente**

```gherkin
Dado que existen datos válidos para el periodo seleccionado
Cuando el gerente solicita el reporte de sostenibilidad
Entonces el sistema genera el reporte utilizando exclusivamente la información del periodo
```


**Escenario 2: Reporte con información insuficiente**

```gherkin
Dado que el periodo seleccionado no contiene datos suficientes
Cuando el gerente solicita generar el reporte
Entonces el sistema evita presentar resultados engañosos e informa los datos faltantes
```


---


### US-022 – Calcular emisiones asociadas a una ruta

**ID:** US-022  
**Título:** Calcular emisiones asociadas a una ruta  
**Épica Relacionada:** EP-05 – Sostenibilidad y Gestión Ambiental  
**RF de origen:** RF-010 – Cálculo y Seguimiento de Emisiones y Compensación de Carbono

**Redacción:**

**Como** supervisor de operaciones,  
**quiero** que el sistema calcule las emisiones asociadas a cada ruta con datos suficientes de distancia, consumo o factor de emisión,  
**para** disponer de una estimación ambiental de la operación.

#### Criterios de aceptación BDD


**Escenario 1: Cálculo de emisiones**

```gherkin
Dado que una ruta dispone de distancia recorrida y datos de consumo o factor de emisión válidos
Cuando el sistema procesa los resultados de la ruta
Entonces calcula y registra la estimación de emisiones correspondiente
```


**Escenario 2: Cálculo sin datos suficientes**

```gherkin
Dado que una ruta no dispone de los datos mínimos requeridos
Cuando el sistema intenta calcular las emisiones
Entonces el sistema no genera un valor estimado y registra que la información es insuficiente
```


---


### US-023 – Consultar evolución de emisiones

**ID:** US-023  
**Título:** Consultar evolución de emisiones  
**Épica Relacionada:** EP-05 – Sostenibilidad y Gestión Ambiental  
**RF de origen:** RF-010 – Cálculo y Seguimiento de Emisiones y Compensación de Carbono

**Redacción:**

**Como** gerente,  
**quiero** consultar la evolución de las emisiones y los indicadores ambientales registrados,  
**para** dar seguimiento al impacto ambiental y a los objetivos de sostenibilidad.

#### Criterios de aceptación BDD


**Escenario 1: Consulta de evolución ambiental**

```gherkin
Dado que existen registros ambientales de uno o más periodos
Cuando el gerente consulta el seguimiento de emisiones
Entonces el sistema presenta los valores registrados y su evolución temporal
```


**Escenario 2: Consulta sin historial ambiental**

```gherkin
Dado que no existen registros ambientales para el periodo solicitado
Cuando el gerente realiza la consulta
Entonces el sistema informa que no existen datos suficientes para mostrar una evolución
```


---


# 6. Matriz de trazabilidad RF → Historias de Usuario


| RF | Requisito | Historias derivadas |
|---|---|---|
| **RF-001** | Gestión de Flota | US-001, US-002, US-003, US-004 |
| **RF-002** | Gestión de Pedidos | US-005, US-006, US-007, US-008 |
| **RF-003** | Generación de Rutas Optimizadas | US-016 |
| **RF-004** | Visualización de Rutas en Mapa | US-018 |
| **RF-005** | Dashboard de Indicadores | US-019, US-020 |
| **RF-006** | Generación de Reportes de Sostenibilidad | US-021 |
| **RF-007** | Re-optimización Dinámica de Rutas | US-017 |
| **RF-008** | Gestión de Conductores | US-009, US-010, US-011, US-012 |
| **RF-009** | Gestión de Clientes y Preferencias de Entrega | US-013, US-014, US-015 |
| **RF-010** | Cálculo y Seguimiento de Emisiones y Compensación de Carbono | US-022, US-023 |

---

# 7. Historias Técnicas / Enablers

Los RNF se transforman en Enablers para representar trabajo técnico necesario para alcanzar atributos de calidad medibles. Los Enablers no sustituyen a las US; habilitan que las funcionalidades cumplan las condiciones de rendimiento, seguridad, fiabilidad, usabilidad y mantenibilidad definidas en la línea base.


## EN-001 – Rendimiento del motor de planificación

**ID:** EN-001  
**Tipo:** Rendimiento  
**RNF relacionados:** RNF-001  
**Propósito:** validar que la generación de rutas cumpla el límite de tiempo definido para el volumen objetivo del MVP.

#### Criterios de aceptación BDD


**Escenario 1: Generación dentro del umbral**

```gherkin
Dado que el ambiente de prueba contiene hasta 150 pedidos válidos y 15 vehículos disponibles
Cuando se ejecuta una solicitud de generación de rutas
Entonces el sistema devuelve una solución válida en un tiempo total menor o igual a 45 segundos
```


**Escenario 2: Registro de incumplimiento de rendimiento**

```gherkin
Dado que se ejecuta la prueba con el volumen objetivo definido
Cuando el tiempo total supera 45 segundos
Entonces la prueba se marca como fallida y el resultado queda registrado para corrección antes de la liberación
```


---


## EN-002 – Rendimiento de re-optimización

**ID:** EN-002  
**Tipo:** Rendimiento  
**RNF relacionados:** RNF-002  
**Propósito:** asegurar que la re-optimización responda oportunamente ante cambios operativos.

#### Criterios de aceptación BDD


**Escenario 1: Re-optimización dentro del umbral**

```gherkin
Dado que existe una planificación activa y se registra un cambio operativo
Cuando se solicita la re-optimización
Entonces el sistema produce una nueva propuesta en menos de 30 segundos
```


**Escenario 2: Incumplimiento del umbral de re-optimización**

```gherkin
Dado que se ejecuta una prueba de re-optimización con una planificación válida
Cuando el resultado tarda 30 segundos o más
Entonces la prueba se considera no conforme y bloquea la aceptación del Enabler
```


---


## EN-003 – Disponibilidad y recuperación del servicio

**ID:** EN-003  
**Tipo:** Infraestructura / Fiabilidad  
**RNF relacionados:** RNF-003, RNF-012  
**Propósito:** garantizar continuidad operativa y recuperación controlada ante interrupciones.

#### Criterios de aceptación BDD


**Escenario 1: Disponibilidad mensual objetivo**

```gherkin
Dado que se monitorea el servicio entre las 05:00 y las 22:00 durante el periodo de medición
Cuando se calcula la disponibilidad mensual del sistema
Entonces el resultado es mayor o igual a 99.5% dentro del horario operativo
```


**Escenario 2: Recuperación ante interrupción**

```gherkin
Dado que ocurre una interrupción recuperable del servicio
Cuando se ejecuta el procedimiento de recuperación
Entonces el sistema vuelve a estar funcional en un máximo de 10 minutos y conserva la información previamente confirmada
```


---


## EN-004 – Escalabilidad y uso eficiente de recursos

**ID:** EN-004  
**Tipo:** Arquitectura / Rendimiento  
**RNF relacionados:** RNF-004, RNF-017  
**Propósito:** preparar la arquitectura para el crecimiento objetivo manteniendo un consumo controlado de recursos.

#### Criterios de aceptación BDD


**Escenario 1: Capacidad objetivo**

```gherkin
Dado que el entorno de prueba representa una operación de hasta 1,000 pedidos diarios y 50 vehículos
Cuando se ejecutan las funciones críticas definidas para la prueba de escalabilidad
Entonces el sistema conserva la integridad funcional sin pérdida de las capacidades críticas
```


**Escenario 2: Uso de CPU en carga objetivo**

```gherkin
Dado que se ejecuta la prueba de carga convencional correspondiente al objetivo del MVP
Cuando se mide el uso promedio de CPU del backend excluyendo ejecuciones intensivas controladas del optimizador
Entonces el uso promedio de CPU permanece por debajo del 80%
```


---


## EN-005 – Seguridad de aplicación, cifrado y autorización

**ID:** EN-005  
**Tipo:** Seguridad  
**RNF relacionados:** RNF-005, RNF-006, RNF-007  
**Propósito:** proteger la aplicación, los datos en tránsito y las operaciones restringidas.

#### Criterios de aceptación BDD


**Escenario 1: Validación de seguridad previa a liberación**

```gherkin
Dado que una versión candidata ha completado el análisis de seguridad definido
Cuando se revisan los hallazgos asociados al OWASP Top 10
Entonces la versión presenta cero vulnerabilidades críticas explotables dentro del alcance evaluado
```


**Escenario 2: Protección de operación restringida**

```gherkin
Dado que un usuario autenticado intenta ejecutar una operación protegida
Cuando la API recibe la solicitud mediante HTTPS/TLS
Entonces el sistema valida la autorización antes de ejecutarla y rechaza la operación si el usuario no posee permiso
```


---


## EN-006 – Accesibilidad, adaptabilidad y compatibilidad web

**ID:** EN-006  
**Tipo:** Usabilidad / Compatibilidad  
**RNF relacionados:** RNF-008, RNF-009, RNF-014  
**Propósito:** asegurar que la aplicación pueda ser utilizada de forma accesible y consistente en los dispositivos y navegadores soportados.

#### Criterios de aceptación BDD


**Escenario 1: Operación desde pantalla móvil**

```gherkin
Dado que un usuario accede a una función crítica desde una pantalla de 360 píxeles de ancho
Cuando interactúa con la interfaz
Entonces la función permanece operable sin pérdida funcional y cumple los criterios aplicables de accesibilidad definidos
```


**Escenario 2: Compatibilidad de navegadores**

```gherkin
Dado que se dispone de las dos versiones estables más recientes de Chrome, Edge y Firefox al momento de validar
Cuando se ejecuta el conjunto de pruebas funcionales críticas
Entonces las pruebas se completan satisfactoriamente en todos los navegadores soportados
```


---


## EN-007 – Integridad transaccional, trazabilidad y auditoría

**ID:** EN-007  
**Tipo:** Datos / Seguridad  
**RNF relacionados:** RNF-010, RNF-011  
**Propósito:** evitar estados parciales y mantener evidencia de las operaciones críticas.

#### Criterios de aceptación BDD


**Escenario 1: Rollback ante error de escritura**

```gherkin
Dado que una operación transaccional crítica se encuentra en ejecución
Cuando ocurre un error antes de completar la confirmación
Entonces el sistema revierte la transacción y no deja registros parcialmente confirmados
```


**Escenario 2: Registro de auditoría**

```gherkin
Dado que un usuario ejecuta una operación definida como crítica
Cuando la operación finaliza con éxito o error
Entonces el sistema registra fecha, usuario, acción y resultado en el mecanismo de auditoría
```


---


## EN-008 – Tiempo de respuesta de operaciones convencionales

**ID:** EN-008  
**Tipo:** Rendimiento  
**RNF relacionados:** RNF-013  
**Propósito:** mantener una latencia verificable en consultas, registros y actualizaciones convencionales.

#### Criterios de aceptación BDD


**Escenario 1: Latencia P95 aceptable**

```gherkin
Dado que se ejecuta la carga objetivo del MVP excluyendo optimización, reportes pesados y dependencias externas
Cuando se miden las operaciones convencionales de consulta, registro y actualización
Entonces el percentil 95 de la latencia es menor o igual a 2 segundos
```


**Escenario 2: Latencia P95 fuera de objetivo**

```gherkin
Dado que se ejecuta la prueba de rendimiento definida
Cuando el percentil 95 supera 2 segundos
Entonces el Enabler se considera no aceptado hasta corregir o justificar técnicamente el incumplimiento
```


---


## EN-009 – Mantenibilidad y pruebas automatizadas

**ID:** EN-009  
**Tipo:** Calidad / Arquitectura  
**RNF relacionados:** RNF-015  
**Propósito:** proteger las funcionalidades validadas frente a regresiones durante la evolución del sistema.

#### Criterios de aceptación BDD


**Escenario 1: Integración con pruebas críticas exitosas**

```gherkin
Dado que existe un cambio candidato a integrarse a la rama estable
Cuando se ejecuta el conjunto de pruebas automatizadas críticas
Entonces el 100% de dichas pruebas finaliza satisfactoriamente antes de integrar el cambio
```


**Escenario 2: Bloqueo por prueba crítica fallida**

```gherkin
Dado que una o más pruebas automatizadas críticas fallan
Cuando se intenta aprobar la integración
Entonces la integración se bloquea hasta corregir el fallo o actualizar formalmente la prueba afectada
```


---


## EN-010 – Documentación técnica y contrato de API

**ID:** EN-010  
**Tipo:** Mantenibilidad / Documentación  
**RNF relacionados:** RNF-016  
**Propósito:** mantener información técnica reproducible para instalación, configuración, integración y mantenimiento.

#### Criterios de aceptación BDD


**Escenario 1: Documentación de componentes principales**

```gherkin
Dado que un componente principal está listo para la entrega
Cuando se revisa su documentación técnica
Entonces existen instrucciones de instalación, configuración, dependencias y ejecución
```


**Escenario 2: Actualización de contrato de API**

```gherkin
Dado que una modificación cambia un endpoint, esquema, parámetro o respuesta de la API
Cuando se prepara el Pull Request correspondiente
Entonces la especificación OpenAPI/Swagger se actualiza antes de considerar el cambio terminado
```


---


# 8. Matriz de trazabilidad RNF → Enabler / DoD


| RNF | Requisito | Transformación principal | Aplicación transversal |
|---|---|---|---|
| **RNF-001** | Rendimiento de Generación de Rutas | EN-001 | Según la US afectada |
| **RNF-002** | Rendimiento de Re-optimización Dinámica | EN-002 | Según la US afectada |
| **RNF-003** | Disponibilidad Operativa | EN-003 | Según la US afectada |
| **RNF-004** | Escalabilidad de la Plataforma | EN-004 | Según la US afectada |
| **RNF-005** | Seguridad de Aplicación | EN-005 | DoD-02 |
| **RNF-006** | Protección de Datos en Tránsito | EN-005 | DoD-05 |
| **RNF-007** | Control de Acceso | EN-005 | DoD-05 |
| **RNF-008** | Accesibilidad de la Interfaz | EN-006 | DoD-08 |
| **RNF-009** | Adaptabilidad a Dispositivos | EN-006 | DoD-08 |
| **RNF-010** | Integridad de Datos ante Errores | EN-007 | DoD-01 / DoD-03 |
| **RNF-011** | Trazabilidad y Auditoría | EN-007 | DoD-09 |
| **RNF-012** | Recuperación ante Fallos | EN-003 | Según la US afectada |
| **RNF-013** | Tiempo de Respuesta de Operaciones Convencionales | EN-008 | Según la US afectada |
| **RNF-014** | Compatibilidad con Navegadores | EN-006 | DoD-08 |
| **RNF-015** | Mantenibilidad del Código | EN-009 | DoD-01 / DoD-03 |
| **RNF-016** | Documentación Técnica | EN-010 | DoD-06 |
| **RNF-017** | Consumo Eficiente de Recursos | EN-004 | Según la US afectada |

---

# 9. Definition of Done (DoD) Global

Una Historia de Usuario o Enabler solo podrá considerarse **Done** cuando cumpla todos los criterios aplicables del siguiente DoD. El hecho de que el código compile o que la funcionalidad sea visible no es suficiente para mover un elemento a `Done`.

| ID | Criterio DoD | Condición verificable |
|---|---|---|
| **DoD-01** | Pruebas unitarias | La cobertura de pruebas unitarias del código afectado es **≥ 80%** y las pruebas ejecutadas finalizan satisfactoriamente. |
| **DoD-02** | Análisis estático y seguridad | El análisis mediante **SonarQube, CodeQL o herramienta equivalente definida por el equipo** no presenta vulnerabilidades críticas pendientes. |
| **DoD-03** | Pruebas automatizadas críticas | El **100% de las pruebas automatizadas críticas** relacionadas con el cambio finaliza satisfactoriamente. |
| **DoD-04** | Peer Review | El Pull Request ha sido revisado y aprobado por **al menos un par técnico distinto del autor** antes de integrarse. |
| **DoD-05** | Seguridad de comunicación y acceso | Las operaciones protegidas validan autorización y las comunicaciones externas afectadas utilizan HTTPS/TLS. |
| **DoD-06** | Documentación | La documentación técnica, comentarios necesarios y **OpenAPI/Swagger** se encuentran actualizados cuando el cambio afecta API, configuración o comportamiento documentado. |
| **DoD-07** | Staging | El cambio puede desplegarse mediante el procedimiento automatizado definido y se encuentra ejecutable en el ambiente de **Staging / Pruebas**. |
| **DoD-08** | Interfaz y compatibilidad | Cuando la US afecta UI, se validan los criterios aplicables de accesibilidad, responsive desde **360 px** y compatibilidad en navegadores soportados. |
| **DoD-09** | Auditoría e integridad | Cuando la US modifica una operación crítica, se valida el registro de auditoría y la ausencia de estados parciales en los escenarios transaccionales aplicables. |
| **DoD-10** | Criterios de aceptación | Todos los escenarios BDD/Gherkin definidos para la US o Enabler se encuentran aprobados. |
| **DoD-11** | Sin defectos bloqueantes | No existen defectos críticos o bloqueantes abiertos asociados al elemento. |
| **DoD-12** | Integración | El código está integrado en la rama definida por el equipo sin conflictos pendientes y con el pipeline requerido en estado satisfactorio. |

---

# 10. Resumen del Product Backlog derivado

| Tipo | Cantidad | Identificadores |
|---|---:|---|
| Épicas | 5 | EP-01 a EP-05 |
| Historias de Usuario | 23 | US-001 a US-023 |
| Enablers | 10 | EN-001 a EN-010 |
| RF trazados | 10 | RF-001 a RF-010 |
| RNF trazados | 17 | RNF-001 a RNF-017 |

El backlog resultante mantiene la siguiente relación:

```text
EP-01 Gestión de Operación Logística
├── US-001 a US-015
│
EP-02 Optimización y Re-optimización de Rutas
├── US-016
└── US-017

EP-03 Visualización y Seguimiento de Rutas
└── US-018

EP-04 Indicadores y Analítica Operativa
├── US-019
└── US-020

EP-05 Sostenibilidad y Gestión Ambiental
├── US-021
├── US-022
└── US-023

Enablers transversales
├── EN-001 Rendimiento de planificación
├── EN-002 Rendimiento de re-optimización
├── EN-003 Disponibilidad y recuperación
├── EN-004 Escalabilidad y recursos
├── EN-005 Seguridad
├── EN-006 Accesibilidad y compatibilidad
├── EN-007 Integridad y auditoría
├── EN-008 Latencia convencional
├── EN-009 Mantenibilidad y pruebas
└── EN-010 Documentación técnica
```

---

# 11. Reglas para la carga posterior en Jira

Al trasladar este backlog a Jira Software se mantendrán los mismos identificadores lógicos y relaciones documentales:

- Las Épicas se crearán como elementos **Epic**.
- Las US se crearán como elementos **Story** y se asociarán a su Épica correspondiente.
- Los Enablers se crearán como **Task / Historia Técnica**, según la configuración disponible en el proyecto Jira.
- Las unidades técnicas menores se crearán como **Sub-task** y deberán representar trabajo de **máximo 8 horas**.
- Los defectos detectados durante la ejecución se registrarán como **Bug**.
- Los Story Points se asignarán posteriormente en Jira utilizando Fibonacci: **1, 2, 3, 5, 8, 13**.
- La prioridad del Product Backlog se establecerá por valor de negocio y riesgo técnico.
- La creación de Sprint 1, Sprint Goal, Roadmap y Release se realizará en la configuración operativa de Jira y se documentará en el Artefacto 2.

---

# 12. Validación de cumplimiento del Artefacto 1

| Criterio de la consigna | Evidencia en este documento | Estado |
|---|---|---|
| RF mapeados a Épicas | Secciones 3 y 4 | ✅ |
| RF descompuestos en Historias de Usuario | Sección 5 | ✅ |
| Formato Como / Quiero / Para | Todas las US | ✅ |
| RNF transformados en Enablers o DoD | Secciones 7, 8 y 9 | ✅ |
| Mínimo 2 escenarios Gherkin por US | Sección 5 | ✅ |
| Mínimo 2 escenarios Gherkin por Enabler | Sección 7 | ✅ |
| Cobertura unitaria ≥ 80% | DoD-01 | ✅ |
| Análisis estático sin vulnerabilidades críticas | DoD-02 | ✅ |
| Peer Review mediante Pull Request | DoD-04 | ✅ |
| Despliegue en Staging / Pruebas | DoD-07 | ✅ |
| OpenAPI / Swagger actualizado | DoD-06 | ✅ |
| Trazabilidad RF/RNF | Secciones 4, 6 y 8 | ✅ |

---

# 13. Historial de control de cambios

| Versión | Fecha | Descripción | Responsable |
|---|---|---|---|
| **1.0.0** | 08/09/2026 | Creación inicial del artefacto de transformación ágil a partir de la línea base RF/RNF. | Equipo EcoLogística Lima |

---

## 14. Conclusión

La línea base de requisitos de EcoLogística Lima queda transformada en un backlog ágil compuesto por **5 Épicas, 23 Historias de Usuario y 10 Enablers**, manteniendo trazabilidad con los **10 RF y 17 RNF** existentes.

Las Historias de Usuario y Enablers incluyen criterios de aceptación BDD/Gherkin verificables y se complementan con un Definition of Done global que establece las condiciones mínimas de calidad técnica para considerar terminado cualquier elemento de trabajo.

Este artefacto constituye la base formal para configurar el Product Backlog, Roadmap, Release y Sprint 1 en Atlassian Jira Software.

[← Volver al README Principal](../../README.md)
