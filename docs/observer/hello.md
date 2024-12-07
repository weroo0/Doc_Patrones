# Descripción

El patrón Observer es un patrón de diseño de software que define una relación de uno a muchos entre objetos, de modo que cuando un objeto cambia de estado, todos sus dependientes son notificados y actualizados automáticamente. Es como suscribirse a un boletín: cuando hay una nueva publicación, todos los suscriptores son notificados.   

![Esta es una imagen de ejemplo](https://refactoring.guru/images/patterns/content/observer/observer.png?id=6088e31e1b0d4a417506a66614dcf065)


## Problema

Imagina un sistema donde un objeto (el sujeto) necesita notificar a otros objetos (los observadores) cuando su estado cambia. Por ejemplo, en una hoja de cálculo, si cambias el valor de una celda, todas las fórmulas que dependen de esa celda deben recalcularse y mostrar el nuevo resultado. ¿Cómo podemos lograr que estos objetos dependientes se actualicen automáticamente sin tener que programar cada dependencia individualmente?

## Solución

El patrón de diseño Observer es la respuesta ideal para este tipo de problema. Este patrón define una dependencia de uno a muchos entre objetos, de manera que cuando un objeto cambia de estado, todos sus dependientes son notificados y actualizados automáticamente. 

## ¿Por qué usar el patrón Observer?
- Desacople: Separa las preocupaciones, permitiendo que los objetos cambien de estado sin conocer los detalles de los objetos que dependen de ellos.
- Flexibilidad: Facilita agregar o eliminar observadores sin afectar el objeto observado.
- Reutilización: Promueve la reutilización de código al encapsular la lógica de notificación.
- Eventos: Permite implementar mecanismos de eventos de manera eficiente.
## Componentes Clave
- Sujeto (Subject): El objeto que es observado. Mantiene una lista de observadores y notifica a todos cuando su estado cambia.
- Observador (Observer): El objeto que depende del sujeto. Se registra con el sujeto y es notificado cuando ocurre un cambio.

## Como implementarlo

- Repasa tu lógica de negocio e intenta dividirla en dos partes: la funcionalidad central, independiente del resto de código, actuará como notificador; el resto se convertirá en un grupo de clases suscriptoras.

- Declara la interfaz suscriptora. Como mínimo, deberá declarar un único método actualizar.

- Declara la interfaz notificadora y describe un par de métodos para añadir y eliminar de la lista un objeto suscriptor. Recuerda que los notificadores deben trabajar con suscriptores únicamente a través de la interfaz suscriptora.

- Decide dónde colocar la lista de suscripción y la implementación de métodos de suscripción. Normalmente, este código tiene el mismo aspecto para todos los tipos de notificadores, por lo que el lugar obvio para colocarlo es en una clase abstracta derivada directamente de la interfaz notificadora. Los notificadores concretos extienden esa clase, heredando el comportamiento de suscripción.

- Sin embargo, si estás aplicando el patrón a una jerarquía de clases existentes, considera una solución basada en la composición: coloca la lógica de la suscripción en un objeto separado y haz que todos los notificadores reales la utilicen.

- Crea clases notificadoras concretas. Cada vez que suceda algo importante dentro de una notificadora, deberá notificar a todos sus suscriptores.

- Implementa los métodos de notificación de actualizaciones en clases suscriptoras concretas. La mayoría de las suscriptoras necesitarán cierta información de contexto sobre el evento, que puede pasarse como argumento del método de notificación.

- Pero hay otra opción. Al recibir una notificación, el suscriptor puede extraer la información directamente de ella. En este caso, el notificador debe pasarse a sí mismo a través del método de actualización. La opción menos flexible es vincular un notificador con el suscriptor de forma permanente a través del constructor.

- El cliente debe crear todos los suscriptores necesarios y registrarlos con los notificadores adecuados.

## Ventajas y desventajas
- ✔️ Principio de abierto/cerrado. 
- ✔️ Puedes introducir nuevas clases suscriptoras sin tener que cambiar el código de la notificadora (y viceversa si hay una interfaz notificadora).
- ✔️ Puedes establecer relaciones entre objetos durante el tiempo de ejecución.
- ❌ Los suscriptores son notificados en un orden aleatorio.
- ❌ Complejidad: Aumenta el acoplamiento y dificulta el seguimiento de dependencias.
- ❌ Rendimiento: Puede ser costoso notificar a muchos observadores, especialmente en sistemas de tiempo real.