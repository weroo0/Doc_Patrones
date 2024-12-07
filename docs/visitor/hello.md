# Descripción

 El patrón Visitor es una herramienta muy poderosa en el arsenal de un desarrollador orientado a objetos. Permite una gran flexibilidad en la implementación de operaciones sobre una estructura de objetos sin tener que modificar las clases de esos objetos.

![alt text](https://refactoring.guru/images/patterns/content/visitor/visitor.png?id=f36d100188340db7a18854ef7916f972)

## Problema

Se necesitaba exportar un grafo complejo a XML sin modificar las clases existentes de los nodos. Agregar el método de exportación a cada clase generaría un acoplamiento fuerte y dificultaría futuras modificaciones. Además, el código de exportación no encajaba con la lógica principal de las clases de los nodos.

## Solución
Se aplicó el patrón Visitor. Este patrón permitió crear una clase visitante separada para encapsular la lógica de exportación. Cada clase de nodo define un método accept que toma un visitante como parámetro y delega la ejecución del método correspondiente en el visitante. De esta forma, se logra una separación clara entre la estructura de datos (grafo) y las operaciones que se realizan sobre ella (exportación). Esto hace el código más flexible, mantenible y extensible, ya que se pueden agregar nuevas operaciones (visitantes) sin modificar las clases existentes.

## ¿Por qué usar el patrón Visitor?
El patrón Visitor es una herramienta poderosa en el arsenal de un desarrollador orientado a objetos, y su uso ofrece múltiples ventajas:

- Separación de preocupaciones: Al separar el algoritmo (el visitante) de la estructura de datos (los elementos a visitar), se promueve un código más limpio y organizado. Esto facilita la comprensión, el mantenimiento y la modificación del código.
- Extensibilidad: Agregar nuevas operaciones a los objetos es tan sencillo como crear una nueva clase visitante. No es necesario modificar las clases existentes, lo que reduce el riesgo de introducir errores.
- Reutilización: Los visitantes pueden ser reutilizados en diferentes contextos, siempre y cuando operen sobre estructuras de datos similares.
- Polimorfismo doble: El patrón Visitor permite un nivel de polimorfismo adicional, permitiendo que los objetos mismos participen en la selección del método a ejecutar en el visitante. Esto ofrece una gran flexibilidad.

En resumen, el patrón Visitor es ideal cuando:

- Necesitas realizar operaciones complejas y diversas sobre una estructura de objetos.
- Deseas agregar nuevas operaciones sin modificar la estructura existente.
- Quieres evitar la proliferación de métodos en las clases de los objetos.
- Necesitas un alto grado de flexibilidad y extensibilidad.


## Componentes Clave
1. Estructura de Objetos:
- Elementos: Son las clases que representan los objetos sobre los cuales se realizarán las operaciones. Por ejemplo, en un sistema de geometría, los elementos podrían ser círculos, rectángulos y triángulos.
- Método accept: Cada elemento tiene un método accept que toma un objeto visitante como parámetro. Este método delega la ejecución de la operación al visitante.
2. Visitante:

- Interfaz: Define un conjunto de métodos, uno para cada tipo de elemento en la estructura de objetos. Cada método recibe como parámetro una instancia del elemento correspondiente.
- Clases Concretas: Implementan la interfaz Visitante y proporcionan la implementación concreta de las operaciones para cada tipo de elemento.

## Como implementarlo

- Declara la interfaz visitante con un grupo de métodos “visitantes”, uno por cada clase de elemento concreto existente en el programa.

- Declara la interfaz de elemento. Si estás trabajando con una jerarquía de clases de elemento existente, añade el método abstracto de “aceptación” a la clase base de la jerarquía. Este método debe aceptar un objeto visitante como argumento.

- Implementa los métodos de aceptación en todas las clases de elemento concreto. Estos métodos simplemente deben redirigir la llamada a un método visitante en el objeto visitante entrante que coincida con la clase del elemento actual.

- Las clases de elemento sólo deben funcionar con visitantes a través de la interfaz visitante. Los visitantes, sin embargo, deben conocer todas las clases de elemento concreto, referenciadas como tipos de parámetro de los métodos de visita.

- Por cada comportamiento que no pueda implementarse dentro de la jerarquía de elementos, crea una nueva clase concreta visitante e implementa todos los métodos visitantes.

- Puede que te encuentres una situación en la que el visitante necesite acceso a algunos miembros privados de la clase elemento. En este caso, puedes hacer estos campos o métodos públicos, violando la encapsulación del elemento, o anidar la clase visitante en la clase elemento. Esto último sólo es posible si tienes la suerte de trabajar con un lenguaje de programación que soporte clases anidadas.

- El cliente debe crear objetos visitantes y pasarlos dentro de elementos a través de métodos de “aceptación”.

## Ventajas y desventajas
- ✔️ Principio de abierto/cerrado. Puedes introducir un nuevo comportamiento que puede funcionar con objetos de clases diferentes sin cambiar esas clases.
- ✔️ Principio de responsabilidad única. Puedes tomar varias versiones del mismo comportamiento y ponerlas en la misma clase.
- ✔️ Un objeto visitante puede acumular cierta información útil mientras trabaja con varios objetos. Esto puede resultar útil cuando quieras atravesar una compleja estructura de objetos, como un árbol de objetos, y aplicar el visitante a cada objeto de esa estructura.
- ❌ Debes actualizar todos los visitantes cada vez que una clase se añada o elimine de la jerarquía de elementos.
- ❌ Los visitantes pueden carecer del acceso necesario a los campos y métodos privados de los elementos con los que se supone que deben trabajar.
