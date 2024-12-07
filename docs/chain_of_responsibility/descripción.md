# Descripción

**También llamado:** Cadena de responsabilidad, CoR, Chain of Command

Imagina una cadena de mandos en una empresa. Una solicitud se pasa de un eslabón a otro hasta que alguien es capaz de resolverla. Si un eslabón no puede manejar la solicitud, la pasa al siguiente.

En términos de programación, el patrón Chain of Responsibility establece una cadena de objetos que pueden manejar una solicitud. Cada objeto tiene la oportunidad de procesar la solicitud. Si un objeto puede procesarla, la procesa; de lo contrario, la pasa al siguiente objeto en la cadena.

![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.](https://refactoring.guru/images/patterns/content/chain-of-responsibility/chain-of-responsibility.png)

## Problema

Imagina que estás trabajando en un sistema de pedidos online. Quieres restringir el acceso al sistema de forma que únicamente los usuarios autenticados puedan generar pedidos. Además, los usuarios que tengan permisos administrativos deben tener pleno acceso a todos los pedidos.

Tras planificar un poco, te das cuenta de que estas comprobaciones deben realizarse secuencialmente. La aplicación puede intentar autenticar a un usuario en el sistema cuando reciba una solicitud que contenga las credenciales del usuario. Sin embargo, si esas credenciales no son correctas y la autenticación falla, no hay razón para proceder con otras comprobaciones.

![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.](https://refactoring.guru/images/patterns/diagrams/chain-of-responsibility/problem1-es.png)

Durante los meses siguientes, implementas varias de esas comprobaciones secuenciales.

- Uno de tus colegas sugiere que no es seguro pasar datos sin procesar directamente al sistema de pedidos. De modo que añades un paso adicional de validación para sanear los datos de una solicitud.

- Más tarde, alguien se da cuenta de que el sistema es vulnerable al desciframiento de contraseñas por la fuerza. Para evitarlo, añades rápidamente una comprobación que filtra las solicitudes fallidas repetidas que vengan de la misma dirección IP.

- Otra persona sugiere que podrías acelerar el sistema devolviendo los resultados en caché en solicitudes repetidas que contengan los mismos datos, de modo que añades otra comprobación que permite a la solicitud pasar por el sistema únicamente cuando no hay una respuesta adecuada en caché.

![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.](https://refactoring.guru/images/patterns/diagrams/chain-of-responsibility/problem2-es.png)

El código de las comprobaciones, que ya se veía desordenado, se vuelve más y más abotargado cada vez que añades una nueva función. En ocasiones, un cambio en una comprobación afecta a las demás. Y lo peor de todo es que, cuando intentas reutilizar las comprobaciones para proteger otros componentes del sistema, tienes que duplicar parte del código, ya que esos componentes necesitan parte de las comprobaciones, pero no todas ellas.

El sistema se vuelve muy difícil de comprender y costoso de mantener. Luchas con el código durante un tiempo hasta que un día decides refactorizarlo todo.

## Solución

Al igual que muchos otros patrones de diseño de comportamiento, el **Chain of Responsibility** se basa en transformar comportamientos particulares en objetos autónomos llamados _manejadores_. En nuestro caso, cada comprobación debe ponerse dentro de su propia clase con un único método que realice la comprobación. La solicitud, junto con su información, se pasa a este método como argumento.

El patrón sugiere que vincules esos manejadores en una cadena. Cada manejador vinculado tiene un campo para almacenar una referencia al siguiente manejador de la cadena. Además de procesar una solicitud, los manejadores la pasan a lo largo de la cadena. La solicitud viaja por la cadena hasta que todos los manejadores han tenido la oportunidad de procesarla.

Y ésta es la mejor parte: un manejador puede decidir no pasar la solicitud más allá por la cadena y detener con ello el procesamiento.

En nuestro ejemplo de los sistemas de pedidos, un manejador realiza el procesamiento y después decide si pasa la solicitud al siguiente eslabón de la cadena. Asumiendo que la solicitud contiene la información correcta, todos los manejadores pueden ejecutar su comportamiento principal, ya sean comprobaciones de autenticación o almacenamiento en la memoria caché.

![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.](https://refactoring.guru/images/patterns/diagrams/chain-of-responsibility/solution1-es.png)

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