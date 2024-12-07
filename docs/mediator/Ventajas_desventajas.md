---
sidebar_position: 2
---

# Ventajas y Desventajas


### Ventajas :

Desacoplamiento entre objetos:

Reduce las dependencias directas entre objetos, ya que se comunican a través del Mediador.
Esto facilita cambios y mantenimiento, porque modificar un componente no afecta a otros directamente.
Mejora la organización del código:

Centraliza la lógica de comunicación en un único punto (el Mediador), lo que hace que el sistema sea más legible y fácil de entender.
Facilita la escalabilidad:

Es más sencillo agregar nuevos componentes, ya que solo necesitan interactuar con el Mediador y no con otros componentes.
Simplificación de interacciones:

Elimina la lógica compleja de comunicación entre múltiples objetos, lo que reduce errores.
Reutilización:

Los componentes individuales pueden ser reutilizados en otros contextos sin necesidad de cambiar su lógica interna.

    

### Desventajas :

Riesgo de sobrecarga en el Mediador:

Si el Mediador concentra demasiada lógica, puede convertirse en un punto único de fallo y dificultar el mantenimiento, generando un objeto Dios.
Complejidad inicial:

Diseñar y configurar un Mediador adecuado puede ser complicado en sistemas pequeños o simples.
Menor flexibilidad entre componentes:

Al centralizar la comunicación, los componentes no pueden interactuar directamente, lo que puede ser limitante en algunos casos específicos.
Aumento del costo computacional:

En sistemas con muchos objetos, pasar todas las comunicaciones a través del Mediador puede ralentizar el sistema.
Difícil de depurar:

Como todas las interacciones pasan por el Mediador, rastrear problemas o errores puede ser más complicado que en sistemas donde los componentes se comunican directamente.
