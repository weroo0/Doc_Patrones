# Descripción

**También llamado:** Iterador

El patrón Iterator es un patrón de diseño de comportamiento que nos permite recorrer los elementos de una colección de objetos sin exponer su representación interna. Es decir, nos proporciona una manera estándar de acceder secuencialmente a los elementos de una colección, independientemente de cómo esté implementada esa colección.

Imagina una biblioteca:

- **La biblioteca** es el **Aggregate** (colección). Contiene muchos libros (objetos).
- **Tú** eres el **Iterator**. Vas pasillo por pasillo buscando un libro en particular.
- **Cada pasillo** es una parte de la colección que estás recorriendo.
- **El libro que buscas** es el elemento al que quieres acceder.
¿Qué hace el Iterator?

- **Te permite avanzar**: Te dice si hay otro pasillo (hasNext) y te lleva al siguiente libro (next).
- **Te oculta la complejidad**: No necesitas saber cómo están organizados los libros en la biblioteca (si están por autor, género, etc.). Solo te interesa encontrar el libro que buscas.

¿Por qué es útil?

- **Flexibilidad**: Puedes tener varios usuarios (iteradores) buscando libros diferentes al mismo tiempo.
- **Eficiencia**: El Iterator te permite recorrer la biblioteca de manera eficiente, sin tener que buscar desde el principio cada vez.
- **Abstracción**: Separa la forma de acceder a los elementos de la forma en que se almacenan.

![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.](https://refactoring.guru/images/patterns/content/iterator/iterator-es.png)

## Problema

Las colecciones son de los tipos de datos más utilizados en programación. Sin embargo, una colección tan solo es un contenedor para un grupo de objetos.

![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.](https://refactoring.guru/images/patterns/diagrams/iterator/problem1.png)

La mayoría de las colecciones almacena sus elementos en simples listas, pero algunas de ellas se basan en pilas, árboles, grafos y otras estructuras complejas de datos.

Independientemente de cómo se estructure una colección, debe aportar una forma de acceder a sus elementos de modo que otro código pueda utilizar dichos elementos. Debe haber una forma de recorrer cada elemento de la colección sin acceder a los mismos elementos una y otra vez.

Esto puede parecer un trabajo sencillo si tienes una colección basada en una lista. En este caso sólo tienes que recorrer en bucle todos sus elementos. Pero, ¿cómo recorres secuencialmente elementos de una estructura compleja de datos, como un árbol? Por ejemplo, un día puede bastarte con un recorrido de profundidad de un árbol, pero, al día siguiente, quizá necesites un recorrido en anchura. Y, la semana siguiente, puedes necesitar otra cosa, como un acceso aleatorio a los elementos del árbol.

![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.](https://refactoring.guru/images/patterns/diagrams/iterator/problem2.png)

Añadir más y más algoritmos de recorrido a la colección nubla gradualmente su responsabilidad principal, que es el almacenamiento eficiente de la información. Además, puede que algunos algoritmos estén personalizados para una aplicación específica, por lo que incluirlos en una clase genérica de colección puede resultar extraño.

Por otro lado, el código cliente que debe funcionar con varias colecciones puede no saber cómo éstas almacenan sus elementos. No obstante, ya que todas las colecciones proporcionan formas diferentes de acceder a sus elementos, no tienes otra opción más que acoplar tu código a las clases de la colección específica.

## Solución

La idea central del patrón Iterator es extraer el comportamiento de recorrido de una colección y colocarlo en un objeto independiente llamado iterador.

![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.](https://refactoring.guru/images/patterns/diagrams/iterator/solution1.png)

Además de implementar el propio algoritmo, un objeto iterador encapsula todos los detalles del recorrido, como la posición actual y cuántos elementos quedan hasta el final. Debido a esto, varios iteradores pueden recorrer la misma colección al mismo tiempo, independientemente los unos de los otros.

Normalmente, los iteradores aportan un método principal para extraer elementos de la colección. El cliente puede continuar ejecutando este método hasta que no devuelva nada, lo que significa que el iterador ha recorrido todos los elementos.

Todos los iteradores deben implementar la misma interfaz. Esto hace que el código cliente sea compatible con cualquier tipo de colección o cualquier algoritmo de recorrido, siempre y cuando exista un iterador adecuado. Si necesitas una forma particular de recorrer una colección, creas una nueva clase iteradora sin tener que cambiar la colección o el cliente.

## ¿Por qué usar el patrón Template Method?

- Abstracción: Oculta la implementación interna de la colección, permitiendo que el código cliente se concentre en la lógica de procesamiento de los elementos, sin preocuparse por cómo están almacenados o ordenados.

- Flexibilidad: Permite recorrer colecciones de diferentes tipos de datos de manera uniforme, sin necesidad de escribir código específico para cada tipo de colección.

- Reutilización de código: El código de recorrido se centraliza en el iterador, lo que facilita su reutilización en diferentes partes de la aplicación.

- Soporte para múltiples iteraciones: Permite tener múltiples iteradores recorriendo la misma colección al mismo tiempo, cada uno en una posición diferente.

- Simplificación del código: Al encapsular la lógica de recorrido en el iterador, se simplifica el código del cliente y se hace más fácil de entender y mantener.
 
- Soporte para diferentes tipos de recorrido: Puedes crear iteradores que implementen diferentes algoritmos de recorrido, como recorrer en orden inverso, saltar elementos, etc.

## ¿Cómo implementarlo?

1. Declara la interfaz iteradora. Como mínimo, debe tener un método para extraer el siguiente elemento de una colección. Por conveniencia, puedes añadir un par de métodos distintos, como para extraer el elemento previo, localizar la posición actual o comprobar el final de la iteración.

2. Declara la interfaz de colección y describe un método para buscar iteradores. El tipo de retorno debe ser igual al de la interfaz iteradora. Puedes declarar métodos similares si planeas tener varios grupos distintos de iteradores.

3. Implementa clases iteradoras concretas para las colecciones que quieras que sean recorridas por iteradores. Un objeto iterador debe estar vinculado a una única instancia de la colección. Normalmente, este vínculo se establece a través del constructor del iterador.

4. Implementa la interfaz de colección en tus clases de colección. La idea principal es proporcionar al cliente un atajo para crear iteradores personalizados para una clase de colección particular. El objeto de colección debe pasarse a sí mismo al constructor del iterador para establecer un vínculo entre ellos.

5. Repasa el código cliente para sustituir todo el código de recorrido de la colección por el uso de iteradores. El cliente busca un nuevo objeto iterador cada vez que necesita recorrer los elementos de la colección.

## Ventajas y desventajas
- ✔️ Principio de responsabilidad única. Puedes limpiar el código cliente y las colecciones extrayendo algoritmos de recorrido voluminosos y colocándolos en clases independientes.

- ✔️ Principio de abierto/cerrado. Puedes implementar nuevos tipos de colecciones e iteradores y pasarlos al código existente sin descomponer nada.

- ✔️ Puedes recorrer la misma colección en paralelo porque cada objeto iterador contiene su propio estado de iteración.

- ❌ Aplicar el patrón puede resultar excesivo si tu aplicación funciona únicamente con colecciones sencillas.

- ❌ Utilizar un iterador puede ser menos eficiente que recorrer directamente los elementos de algunas colecciones especializadas.
