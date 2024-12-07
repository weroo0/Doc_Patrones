# Estructura y ejemplos

El patrón Observer es un mecanismo que permite a un objeto (el notificador) notificar a otros objetos (los suscriptores) cuando ocurre un evento de interés. Esta relación se establece a través de una suscripción, donde los suscriptores se registran para recibir actualizaciones del notificador.

![Esta es una imagen de ejemplo](https://refactoring.guru/images/patterns/diagrams/observer/structure.png?id=365b7e2b8fbecc8948f34b9f8f16f33c)



### Descripcion de la estructura:

- Notificador:
Mantiene una lista de suscriptores.
Cuando ocurre un evento, itera sobre la lista y llama al método actualizar de cada suscriptor.
Puede pasar información adicional al método actualizar para proporcionar contexto sobre el evento.
- Suscriptor:
Implementa la interfaz Suscriptor, que define el método actualizar.
Este método se invoca cuando el notificador envía una actualización.
El suscriptor utiliza la información proporcionada para realizar las acciones necesarias.

En resumen, el patrón Observer proporciona una forma flexible y eficiente de comunicar cambios entre objetos en un sistema. Es ideal para situaciones donde un objeto necesita notificar a múltiples objetos sobre eventos importantes.

## Ejemplo Practico

### Sistema de notificaciones de un blog

```// Interfaz para los suscriptores
interface IObserver {
  update(post: Post): void;
}

// Clase que representa una publicación de blog
class Post {
  private _title: string;
  private _content: string;
  private _observers: IObserver[] = [];

  constructor(title: string, content: string) {
    this._title = title;
    this._content = content;
  }

  get title() {
    return this._title;
  }

  set title(title: string) {
    this._title = title;
    this.notifyObservers();
  }

  get content() {
    return this._content;
  }

  set content(content: string) {
    this._content = content;
    this.notifyObservers();
  }

  subscribe(observer: IObserver) {
    this._observers.push(observer);
  }

  unsubscribe(observer: IObserver) {
    const index = this._observers.indexOf(observer);
    if (index !== -1) {
      this._observers.splice(index, 1);
    }
  }

  notifyObservers() {
    this._observers.forEach(observer => observer.update(this));
  }
}

// Clase que representa un suscriptor (por ejemplo, un usuario)
class User implements IObserver {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  update(post: Post) {
    console.log(`${this._name} recibió una notificación: ${post.title}`);
  }
}

// Uso del patrón
const post = new Post('Nuevo post', 'Contenido del post');

const user1 = new User('Juan');
const user2 = new User('Ana');

post.subscribe(user1);
post.subscribe(user2);

post.title = 'Título actualizado'; // Esto notificará a los suscriptores

```
### Explicación

1. Interfaz ```IObserver```: Define el método ```update``` que será llamado cuando ocurra un cambio en el ```Post```.
2. Clase Post: Representa una publicación de blog.
- Tiene una lista de suscriptores.
- Cuando se modifica el título o el contenido, se llama al método ```notifyObservers```.
- Este método itera sobre la lista de suscriptores y llama al método update de cada uno.
3. Clase ```User```: Implementa la interfaz ```IObserver``` y representa a un usuario que se suscribe a las actualizaciones de un ```post```.
3. Uso: Se crean un ```Post``` y dos ```User```. Los usuarios se suscriben al ```post``` y cuando se cambia el título del ```post```, ambos usuarios reciben una notificación.

En este ejemplo:

- El ```Post``` es el notificador.
- Los ```User``` son los suscriptores.
- Cuando el título del ```Post``` cambia, se notifica a todos los suscriptores.

Este es un ejemplo básico, pero puedes extenderlo de muchas maneras:

- Tipos de notificaciones: Puedes crear diferentes tipos de eventos (por ejemplo, 'nuevo comentario', 'eliminación de post') y enviar información más específica a los suscriptores.
- Múltiples notificadores: Un suscriptor puede suscribirse a múltiples notificadores.
- Jerarquías de suscriptores: Puedes crear una jerarquía de suscriptores para manejar casos más complejos.
