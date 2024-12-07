---
sidebar_position: 2
---

# Ventajas y Desventajas


### Ventajas :

Consumo de Memoria:
Si el estado del objeto es muy grande o se crean muchos recuerdos, puede haber un alto uso de memoria.

Gestión Compleja:
Administrar múltiples recuerdos puede volverse complicado si no se estructura adecuadamente, especialmente en sistemas grandes.

Dependencia del Origen:
Puede ser necesario un conocimiento preciso del objeto originador para implementar el patrón correctamente.

Sin Control de Versión Integrado:
Aunque guarda estados, no incluye mecanismos para comparar o gestionar versiones, lo que podría ser necesario en algunos contextos.
    

### Desventajas del Patrón:

Consumo Excesivo de Recursos:
Guardar múltiples estados puede requerir una cantidad significativa de memoria y almacenamiento, especialmente si los estados son complejos o grandes.

Incremento en la Complejidad:
La implementación y gestión de Múltiples recuerdos pueden dificultar el mantenimiento del sistema, particularmente en aplicaciones grandes.

Responsabilidad de Gestión:
Es necesario implementar lógica adicional para gestionar los recuerdos, como cuándo crearlos o eliminarlos, lo que puede introducir errores.

Problemas de rendimiento:
En aplicaciones que generan recuerdos con frecuencia, el rendimiento puede verse afectado debido al tiempo requerido para crear y almacenar los estados.