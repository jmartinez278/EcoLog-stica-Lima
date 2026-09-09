[← Volver al README Principal](../../README.md)

# Registro de riesgos

| Campo | Detalle |
|---|---|
| **Proyecto** | EcoLogística Lima – Optimizador de Rutas Sostenibles para DistriRápido S.A.C. |
| **Integrantes** | Luis Antony Gonzalo Guerrero, Jhon Robert Paitan Montes, Marco Jhair Martinez Llanos, Rodrigo Vladimir Arce Curi |
| **Fecha** | 08/09/2026 |
| **Versión** | 1.0.0 |
| **Fase** | 02 – Planificación del Proyecto |
| **Marco de referencia** | PMBOK / CMMI |

---

## 1. Objetivo del documento

Identificar, evaluar y priorizar los principales riesgos que pueden afectar el desarrollo y la operación del proyecto **EcoLogística Lima**, definiendo para cada uno medidas preventivas de mitigación, acciones reactivas de contingencia y un responsable de seguimiento.

La gestión de riesgos se alinea con el alcance funcional, la arquitectura, el stack tecnológico y la planificación ágil definidos para el PFA.

---

## 2. Metodología de evaluación

Cada riesgo se evalúa mediante dos variables:

- **Probabilidad (P):** posibilidad de ocurrencia del riesgo.
- **Impacto (I):** magnitud de las consecuencias en caso de materializarse.

La exposición o severidad se calcula mediante:

```text
Severidad = Probabilidad × Impacto
```

### Escala de probabilidad

| Valor | Nivel |
|---:|---|
| 1 | Muy baja |
| 2 | Baja |
| 3 | Media |
| 4 | Alta |
| 5 | Muy alta |

### Escala de impacto

| Valor | Nivel |
|---:|---|
| 1 | Insignificante |
| 2 | Menor |
| 3 | Moderado |
| 4 | Mayor |
| 5 | Catastrófico |

### Clasificación de severidad

| Resultado P × I | Clasificación |
|---:|---|
| 1 – 6 | **Low / Baja** |
| 8 – 12 | **Medium / Media** |
| 15 – 25 | **High / Alta** |

> Para mantener coherencia con la escala definida en la consigna, los riesgos se han valorado utilizando combinaciones cuyo resultado cae directamente en los rangos establecidos.

---

# 3. Matriz de evaluación de riesgos

| ID | Descripción del Riesgo | Categoría | Prob. | Imp. | Severidad | Plan de Mitigación (Preventivo) | Plan de Contingencia (Reactivo) | Responsable |
|---|---|---|---:|---:|---|---|---|---|
| **RSK-01** | El motor de optimización supera el límite de 45 segundos para 150 pedidos y 15 vehículos. | Técnica / Rendimiento | 4 | 4 | **16 (Alta)** | Implementar pruebas de rendimiento desde los primeros Sprints, perfilar el algoritmo y limitar procesamiento innecesario. | Aplicar una heurística simplificada, reducir temporalmente el espacio de búsqueda o usar la última planificación válida mientras se corrige el rendimiento. | Software Architect |
| **RSK-02** | La re-optimización dinámica no logra producir una nueva propuesta en menos de 30 segundos. | Técnica / Rendimiento | 3 | 4 | **12 (Media)** | Diseñar la re-optimización para recalcular únicamente las rutas afectadas y crear pruebas específicas con incidencias. | Mantener la planificación vigente, aplicar ajustes manuales controlados y registrar el incumplimiento para corrección prioritaria. | Backend / Optimization Developer |
| **RSK-03** | Indisponibilidad o límites de cuota del servicio externo de tráfico o geocodificación. | Técnica / Terceros | 3 | 4 | **12 (Media)** | Implementar abstracción del proveedor, controlar cuotas y reutilizar resultados válidos cuando sea posible. | Operar temporalmente con datos cartográficos disponibles, información histórica o un proveedor alternativo previamente evaluado. | Software Architect |
| **RSK-04** | Direcciones de clientes incompletas, ambiguas o no estandarizadas generan errores de geolocalización. | Datos / Operación | 4 | 4 | **16 (Alta)** | Validar direcciones durante el registro, permitir referencias adicionales y marcar ubicaciones que requieran revisión manual. | Solicitar corrección de la dirección, ajustar manualmente las coordenadas y excluir temporalmente el pedido de la optimización automática si no puede validarse. | Operador Logístico |
| **RSK-05** | Datos incorrectos de capacidad, disponibilidad o consumo de vehículos producen rutas inviables o cálculos ambientales erróneos. | Datos / Calidad | 3 | 4 | **12 (Media)** | Incorporar validaciones de rangos, restricciones de integridad y revisión periódica de los datos maestros de flota. | Invalidar la planificación afectada, corregir los datos y ejecutar nuevamente la generación de rutas. | Operador Logístico |
| **RSK-06** | Una falla durante una operación de escritura deja información parcial o inconsistente en PostgreSQL. | Técnica / Base de Datos | 2 | 5 | **10 (Media)** | Utilizar transacciones ACID, claves foráneas, restricciones y pruebas de rollback en operaciones críticas. | Restaurar el estado consistente mediante rollback o respaldo y revisar los registros de auditoría para identificar la operación afectada. | Database / Backend Developer |
| **RSK-07** | Vulnerabilidad crítica en la aplicación, API o dependencias utilizadas. | Seguridad | 3 | 5 | **15 (Alta)** | Ejecutar CodeQL/SonarQube, mantener dependencias actualizadas, aplicar validación de entradas y revisar riesgos OWASP Top 10. | Bloquear o retirar temporalmente la funcionalidad afectada, corregir la vulnerabilidad y desplegar un parche antes de continuar la liberación. | DevOps / Security Responsible |
| **RSK-08** | Acceso no autorizado a funciones críticas por configuración incorrecta de roles o permisos. | Seguridad / Acceso | 3 | 5 | **15 (Alta)** | Implementar RBAC, pruebas de autorización y revisión explícita de permisos para el 100% de operaciones protegidas. | Revocar accesos, bloquear temporalmente la cuenta o función afectada, revisar logs y corregir la matriz de permisos. | Backend Developer |
| **RSK-09** | Retrasos del equipo por curva de aprendizaje en FastAPI, React, PostgreSQL o Jira. | Recursos Humanos / Capacidades | 3 | 3 | **9 (Media)** | Realizar sesiones breves de transferencia de conocimiento, documentación interna y Pair Programming en tareas de mayor complejidad. | Reasignar tareas críticas, reducir alcance no esencial del Sprint y priorizar funcionalidades del MVP. | Scrum Master |
| **RSK-10** | Sobrecarga de trabajo o mala estimación provoca incumplimiento del Sprint Goal. | Gestión / Cronograma | 3 | 4 | **12 (Media)** | Estimar con Story Points, limitar trabajo en curso y priorizar el Sprint Backlog según valor y riesgo. | Retirar del Sprint los elementos de menor prioridad y replanificarlos para la siguiente iteración sin comprometer la meta principal. | Scrum Master |
| **RSK-11** | El despliegue de Staging falla por diferencias de configuración entre entornos. | DevOps / Infraestructura | 3 | 4 | **12 (Media)** | Utilizar Docker, variables de entorno documentadas y pipeline automatizado reproducible. | Corregir la configuración, restaurar la última versión estable y volver a ejecutar el pipeline de despliegue. | DevOps Engineer |
| **RSK-12** | Interrupción del servicio impide el acceso durante la jornada operativa. | Infraestructura / Disponibilidad | 2 | 5 | **10 (Media)** | Implementar monitoreo, health checks, backups y un procedimiento documentado de recuperación. | Reiniciar o redeplegar el servicio y restaurar desde el último respaldo válido si fuera necesario, buscando recuperar la operación en ≤ 10 minutos. | DevOps Engineer |
| **RSK-13** | La interfaz no es usable correctamente desde dispositivos móviles utilizados por conductores. | Usabilidad / Compatibilidad | 3 | 3 | **9 (Media)** | Diseñar responsive desde 360 px, validar flujos críticos en móvil y aplicar criterios WCAG 2.1 AA pertinentes. | Proporcionar temporalmente una vista simplificada de la ruta y corregir los componentes que bloqueen la operación móvil. | Frontend Developer |
| **RSK-14** | El cálculo de emisiones utiliza datos incompletos o factores de emisión incorrectos y genera indicadores engañosos. | Ambiental / Datos | 3 | 4 | **12 (Media)** | Validar la procedencia de factores de emisión, registrar la fórmula aplicada y no calcular métricas cuando falten datos mínimos. | Marcar el indicador como no disponible, corregir la fuente de datos y recalcular los periodos afectados. | Data / Backend Developer |
| **RSK-15** | Cambios de alcance tardíos afectan requisitos, arquitectura, presupuesto y cronograma. | Gestión / Alcance | 3 | 5 | **15 (Alta)** | Aplicar control formal de cambios, trazabilidad RF/RNF → US/Enablers y análisis de impacto antes de aprobar modificaciones. | Repriorizar el Product Backlog, actualizar documentos y versiones semánticas y renegociar alcance, costo o plazo cuando corresponda. | Project Manager |
| **RSK-16** | Pérdida accidental o corrupción de información del repositorio o de la base de datos de pruebas. | Continuidad / Datos | 2 | 5 | **10 (Media)** | Mantener repositorio Git remoto, políticas de Pull Request, backups periódicos y copias verificables de la base de datos. | Recuperar desde Git o desde el último respaldo válido y documentar la pérdida y las acciones de restauración ejecutadas. | DevOps Engineer |

---

# 4. Priorización de riesgos

## 4.1. Riesgos de severidad Alta

Los riesgos que requieren seguimiento prioritario son:

| ID | Riesgo | Severidad |
|---|---|---|
| **RSK-01** | Rendimiento insuficiente del motor de optimización | **16 (Alta)** |
| **RSK-04** | Direcciones ambiguas o incorrectas | **16 (Alta)** |
| **RSK-07** | Vulnerabilidad crítica en aplicación o dependencias | **15 (Alta)** |
| **RSK-08** | Acceso no autorizado a funciones críticas | **15 (Alta)** |
| **RSK-15** | Cambios tardíos de alcance | **15 (Alta)** |

Estos riesgos deben revisarse de manera continua durante la ejecución del proyecto y especialmente antes de cerrar un Sprint o liberar una versión.

---

## 4.2. Riesgos de severidad Media

Los riesgos de severidad media requieren seguimiento periódico y medidas preventivas activas.

Se incluyen, entre otros:

- rendimiento de re-optimización;
- disponibilidad de servicios externos;
- calidad de datos de flota;
- integridad de base de datos;
- curva de aprendizaje;
- incumplimiento del Sprint Goal;
- fallos de despliegue;
- indisponibilidad de infraestructura;
- compatibilidad móvil;
- calidad del cálculo de emisiones;
- pérdida de información.

---

# 5. Estrategia de seguimiento

La gestión de riesgos se integrará al ciclo Scrum mediante las siguientes prácticas:

1. Revisar los riesgos de severidad alta durante la planificación y revisión de cada Sprint.
2. Registrar nuevos riesgos cuando aparezcan cambios de arquitectura, alcance, infraestructura o proveedores externos.
3. Reevaluar Probabilidad e Impacto cuando cambien las condiciones del proyecto.
4. Convertir acciones de mitigación relevantes en Tasks o Enablers del Product Backlog.
5. Documentar incidentes materializados y las acciones de contingencia ejecutadas.
6. Revisar los riesgos técnicos antes de liberar `v1.0.0-MVP`.

---

# 6. Relación con artefactos del proyecto

| Riesgo / Área | Artefacto relacionado |
|---|---|
| Rendimiento de rutas | RNF-001 / EN-001 |
| Re-optimización | RNF-002 / EN-002 |
| Disponibilidad y recuperación | RNF-003, RNF-012 / EN-003 |
| Escalabilidad | RNF-004 / EN-004 |
| Seguridad | RNF-005, RNF-006, RNF-007 / EN-005 |
| Accesibilidad y compatibilidad | RNF-008, RNF-009, RNF-014 / EN-006 |
| Integridad y auditoría | RNF-010, RNF-011 / EN-007 |
| Rendimiento convencional | RNF-013 / EN-008 |
| Mantenibilidad | RNF-015 / EN-009 |
| Documentación técnica | RNF-016 / EN-010 |

---

# 7. Validación del artefacto

| Criterio de la consigna | Estado |
|---|---|
| Matriz de riesgos completa | ✅ |
| Probabilidad de 1 a 5 | ✅ |
| Impacto de 1 a 5 | ✅ |
| Cálculo `P × I` | ✅ |
| Severidad clasificada | ✅ |
| Mitigación preventiva por riesgo | ✅ |
| Contingencia reactiva por riesgo | ✅ |
| Responsable asignado | ✅ |
| Riesgos específicos del PFA | ✅ |
| Alineación con PMBOK / CMMI | ✅ |

---

# 8. Historial de control de cambios

| Versión | Fecha | Descripción |
|---|---|---|
| **1.0.0** | 08/09/2026 | Creación inicial del registro de riesgos del proyecto. |

---

## 9. Conclusión

El Registro de Riesgos permite priorizar las amenazas que pueden comprometer el alcance, plazo, calidad, seguridad y operación de EcoLogística Lima.

Los riesgos de mayor exposición se concentran en el rendimiento del motor de optimización, la calidad de los datos geográficos, la seguridad de la aplicación y el control de cambios. Las estrategias preventivas y reactivas definidas proporcionan una línea base para el seguimiento durante los Sprints y antes de la liberación del MVP.

[← Volver al README Principal](../../README.md)
