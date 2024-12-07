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

