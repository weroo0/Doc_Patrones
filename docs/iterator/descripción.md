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

- Desacople: Permite que los emisores de una solicitud no tengan que conocer el receptor específico. Esto hace que el código sea más flexible y fácil de modificar.

- Flexibilidad: Se pueden agregar o quitar manejadores de la cadena sin afectar a otros componentes del sistema. Esto facilita la evolución del sistema y la adición de nuevas funcionalidades.

- Manejo dinámico de solicitudes: Permite que las solicitudes se enruten dinámicamente a diferentes manejadores en función de condiciones específicas. Esto proporciona una gran flexibilidad en el procesamiento de solicitudes.

- Reutilización de código: Los manejadores pueden ser reutilizados en diferentes contextos. Esto reduce la duplicación de código y mejora la mantenibilidad.

- Simplificación de la lógica: Al descomponer el procesamiento de una solicitud en una serie de pasos más pequeños, se simplifica la lógica y se hace más fácil de entender y depurar.

## ¿Cómo implementarlo?

1. Declara la interfaz manejadora y describe la firma de un método para manejar solicitudes.

    Decide cómo pasará el cliente la información de la solicitud dentro del método. La forma más flexible consiste en convertir la solicitud en un objeto y pasarlo al método de gestión como argumento.

2. Para eliminar código boilerplate duplicado en manejadores concretos, puede merecer la pena crear una clase manejadora abstracta base, derivada de la interfaz manejadora.

    Esta clase debe tener un campo para almacenar una referencia al siguiente manejador de la cadena. Considera hacer la clase inmutable. No obstante, si planeas modificar las cadenas durante el tiempo de ejecución, deberás definir un modificador (setter) para alterar el valor del campo de referencia.

    También puedes implementar el comportamiento por defecto conveniente para el método de control, que consiste en reenviar la solicitud al siguiente objeto, a no ser que no quede ninguno. Los manejadores concretos podrán utilizar este comportamiento invocando al método padre.

3. Una a una, crea subclases manejadoras concretas e implementa los métodos de control. Cada manejador debe tomar dos decisiones cuando recibe una solicitud:

    - Si procesa la solicitud.
    - Si pasa la solicitud al siguiente eslabón de la cadena.

4. El cliente puede ensamblar cadenas por su cuenta o recibir cadenas prefabricadas de otros objetos. En el último caso, debes implementar algunas clases fábrica para crear cadenas de acuerdo con los ajustes de configuración o de entorno.

5. El cliente puede activar cualquier manejador de la cadena, no solo el primero. La solicitud se pasará a lo largo de la cadena hasta que algún manejador se rehúse a pasarlo o hasta que llegue al final de la cadena.

6. Debido a la naturaleza dinámica de la cadena, el cliente debe estar listo para gestionar los siguientes escenarios:

    - La cadena puede consistir en un único vínculo.
    - Algunas solicitudes pueden no llegar al final de la cadena.
    - Otras pueden llegar hasta el final de la cadena sin ser gestionadas.

## Ventajas y desventajas
- ✔️ Puedes controlar el orden de control de solicitudes

- ✔️ Principio de responsabilidad única. Puedes desacoplar las clases que invoquen operaciones de las que   realicen operaciones.

- ✔️ Principio de abierto/cerrado. Puedes introducir nuevos manejadores en la aplicación sin descomponer el código cliente existente.

- ❌ Algunas solicitudes pueden acabar sin ser gestionadas.

