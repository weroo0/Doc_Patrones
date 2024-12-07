# Descripción

El patrón de diseño Strategy es una herramienta fundamental en la programación orientada a objetos que te permite definir una familia de algoritmos, encapsular cada uno de ellos y hacerlos intercambiables. Esto significa que puedes tener múltiples formas de realizar una misma tarea.

![alt text](https://refactoring.guru/images/patterns/content/strategy/strategy.png?id=379bfba335380500375881a3da6507e0)

## Problema

Una aplicación de navegación, inicialmente diseñada para rutas en automóvil, se volvió cada vez más compleja al agregar opciones para diferentes modos de transporte (a pie, transporte público, bicicleta, etc.). Esta expansión provocó que el código se volviera extenso, difícil de mantener y propenso a errores. Cada nuevo algoritmo de enrutamiento aumentaba la complejidad de la clase principal, generando conflictos al trabajar en equipo y dificultando la implementación de nuevas funcionalidades.

## Solución
El patrón de diseño Strategy ofrece una solución elegante a este problema. Al encapsular cada algoritmo de enrutamiento en una clase separada, se simplifica el código, se facilita la adición de nuevas funcionalidades y se mejora la mantenibilidad. La clase principal delega la tarea de calcular la ruta a estas clases especializadas, lo que permite cambiar fácilmente entre diferentes algoritmos de enrutamiento en tiempo de ejecución. Esta separación de responsabilidades hace que el código sea más modular, flexible y escalable.

## ¿Por qué usar el patrón Stratergy?
El patrón Strategy es una herramienta fundamental en el arsenal de un desarrollador, especialmente cuando se busca crear software flexible, mantenible y extensible. A continuación, te detallo las principales razones por las que deberías considerar su uso:

- Flexibilidad y Adaptabilidad:
Intercambio en tiempo de ejecución: Permite cambiar el algoritmo o comportamiento de un objeto en tiempo de ejecución, sin modificar el código principal. Esto es ideal para aplicaciones que necesitan adaptarse a diferentes condiciones o preferencias del usuario.
Múltiples algoritmos: Facilita la gestión de múltiples algoritmos para una misma tarea, permitiendo seleccionar el más adecuado según el contexto.
- Mantenibilidad:
Código más limpio y organizado: Al encapsular cada algoritmo en una clase separada, el código se vuelve más legible y fácil de entender.
Menor acoplamiento: Las clases que utilizan las estrategias tienen una menor dependencia de los detalles de implementación de los algoritmos, lo que reduce la probabilidad de errores al realizar cambios.
- Extensibilidad:
Adición de nuevas funcionalidades: Agregar nuevas estrategias es sencillo, lo que permite ampliar las capacidades de la aplicación sin modificar el código existente.
- Reutilización:
Estrategias independientes: Las estrategias pueden ser reutilizadas en diferentes partes de la aplicación o incluso en otras aplicaciones.
- Facilidad de prueba:
Pruebas unitarias: Cada estrategia puede ser probada de forma independiente, lo que facilita la detección y corrección de errores.


## Componentes Clave
- Contexto (Context): Mantiene una referencia a una instancia de una estrategia,
Define la interfaz para que el cliente pueda configurar la estrategia,
Delega el trabajo a la estrategia actual.
- Estrategia (Strategy): Define una interfaz común para todos los algoritmos soportados,
Cada algoritmo concreto implementa esta interfaz.
- Estrategias Concretas (Concrete Strategies): Implementan el algoritmo específico,
Son intercambiables en tiempo de ejecución.

## Como implementarlo

- En la clase contexto, identifica un algoritmo que tienda a sufrir cambios frecuentes. También puede ser un enorme condicional que seleccione y ejecute una variante del mismo algoritmo durante el tiempo de ejecución.

- Declara la interfaz estrategia común a todas las variantes del algoritmo.

- Uno a uno, extrae todos los algoritmos y ponlos en sus propias clases. Todas deben implementar la misma interfaz estrategia.

- En la clase contexto, añade un campo para almacenar una referencia a un objeto de estrategia. Proporciona un modificador set para sustituir valores de ese campo. La clase contexto debe trabajar con el objeto de estrategia únicamente a través de la interfaz estrategia. La clase contexto puede definir una interfaz que permita a la estrategia acceder a sus datos.

- Los clientes de la clase contexto deben asociarla con una estrategia adecuada que coincida con la forma en la que esperan que la clase contexto realice su trabajo principal.

## Ventajas y desventajas
- ✔️ Puedes intercambiar algoritmos usados dentro de un objeto durante el tiempo de ejecución.
- ✔️ Puedes aislar los detalles de implementación de un algoritmo del código que lo utiliza.
- ✔️ Puedes sustituir la herencia por composición.
- ❌ Si sólo tienes un par de algoritmos que raramente cambian, no hay una razón real para complicar el programa en exceso con nuevas clases e interfaces que vengan con el patrón.
- ❌ Los clientes deben conocer las diferencias entre estrategias para poder seleccionar la adecuada.
- ❌  Muchos lenguajes de programación modernos tienen un soporte de tipo funcional que te permite implementar distintas versiones de un algoritmo dentro de un grupo de funciones anónimas. 