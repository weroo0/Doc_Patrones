# Descripción

**También llamado:** Cadena de responsabilidad, CoR, Chain of Command

Imagina una cadena de mandos en una empresa. Una solicitud se pasa de un eslabón a otro hasta que alguien es capaz de resolverla. Si un eslabón no puede manejar la solicitud, la pasa al siguiente.

En términos de programación, el patrón Chain of Responsibility establece una cadena de objetos que pueden manejar una solicitud. Cada objeto tiene la oportunidad de procesar la solicitud. Si un objeto puede procesarla, la procesa; de lo contrario, la pasa al siguiente objeto en la cadena.

![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.](https://refactoring.guru/images/patterns/content/chain-of-responsibility/chain-of-responsibility.png)

## Problema

Imagina que estás creando una aplicación de minería de datos que analiza documentos corporativos. Los usuarios suben a la aplicación documentos en varios formatos (PDF, DOC, CSV) y ésta intenta extraer la información relevante de estos documentos en un formato uniforme.

La primera versión de la aplicación sólo funcionaba con archivos DOC. La siguiente versión podía soportar archivos CSV. Un mes después, le “enseñaste” a extraer datos de archivos PDF.

![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.](https://refactoring.guru/images/patterns/diagrams/template-method/problem.png)

En cierto momento te das cuenta de que las tres clases tienen mucho código similar. Aunque el código para gestionar distintos formatos de datos es totalmente diferente en todas las clases, el código para procesar y analizar los datos es casi idéntico. ¿No sería genial deshacerse de la duplicación de código, dejando intacta la estructura del algoritmo?

Hay otro problema relacionado con el código cliente que utiliza esas clases. Tiene muchos condicionales que eligen un curso de acción adecuado dependiendo de la clase del objeto de procesamiento. Si las tres clases de procesamiento tienen una interfaz común o una clase base, puedes eliminar los condicionales en el código cliente y utilizar el polimorfismo al invocar métodos en un objeto de procesamiento.

## Solución

El patrón Template Method sugiere que dividas un algoritmo en una serie de pasos, conviertas estos pasos en métodos y coloques una serie de llamadas a esos métodos dentro de un único método plantilla. Los pasos pueden ser _abstractos_, o contar con una implementación por defecto. Para utilizar el algoritmo, el cliente debe aportar su propia subclase, implementar todos los pasos abstractos y sobrescribir algunos de los opcionales si es necesario (pero no el propio método plantilla).

## ¿Por qué usar el patrón Template Method?

- Reutilización de código:

    - Evita la duplicación de código: Al definir el esqueleto del algoritmo en una clase base, puedes reutilizar esa estructura en múltiples subclases, evitando tener que escribir el mismo código una y otra vez.
    - Promueve la coherencia: Garantiza que todas las subclases sigan la misma estructura, lo que facilita la comprensión y el mantenimiento del código.

- Flexibilidad:

    - Personalización: Las subclases pueden personalizar los pasos del algoritmo que sean relevantes para su contexto específico, sin afectar a la estructura general.
    - Extensibilidad: Es fácil agregar nuevas subclases para implementar diferentes variantes del algoritmo.

- Inversión de control:

    - Mayor control: La clase base mantiene el control sobre el flujo general del algoritmo, mientras que las subclases proporcionan la implementación de los pasos concretos.
    - Desacople: Reduce el acoplamiento entre las clases, haciendo que el código sea más fácil de modificar y probar.

- Facilita la comprensión:

    - Estructura clara: La estructura del algoritmo queda definida en la clase base, lo que facilita la comprensión del código por parte de otros desarrolladores.
    - Mayor mantenibilidad: Al separar las responsabilidades entre la clase base y las subclases, el código se vuelve más fácil de mantener y modificar.

## ¿Cómo implementarlo?

1. Analiza el algoritmo objetivo para ver si puedes dividirlo en pasos. Considera qué pasos son comunes a todas las subclases y cuáles siempre serán únicos.

2. Crea la clase base abstracta y declara el método plantilla y un grupo de métodos abstractos que representen los pasos del algoritmo. Perfila la estructura del algoritmo en el método plantilla ejecutando los pasos correspondientes. Considera declarar el método plantilla como _final_ para evitar que las subclases lo sobrescriban.

3. No hay problema en que todos los pasos acaben siendo abstractos. Sin embargo, a algunos pasos les vendría bien tener una implementación por defecto. Las subclases no tienen que implementar esos métodos.

4. Piensa en añadir ganchos entre los pasos cruciales del algoritmo.

5. Para cada variación del algoritmo, crea una nueva subclase concreta. Ésta debe implementar todos los pasos abstractos, pero también puede sobrescribir algunos de los opcionales.

## Ventajas y desventajas
- ✔️ Puedes permitir a los clientes que sobrescriban tan solo ciertas partes de un algoritmo grande, para que les afecten menos los cambios que tienen lugar en otras partes del algoritmo.

- ✔️ Puedes colocar el código duplicado dentro de una superclase.

- ❌ Algunos clientes pueden verse limitados por el esqueleto proporcionado de un algoritmo.

- ❌ Puede que violes el _principio de sustitución de Liskov_ suprimiendo una implementación por defecto de un paso a través de una subclase.

- ❌ Los métodos plantilla tienden a ser más difíciles de mantener cuantos más pasos tengan.