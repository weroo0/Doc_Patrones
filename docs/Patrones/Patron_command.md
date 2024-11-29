---
sidebar_position: 6
---

# Patron_command

El **Patrón de Diseño Command** Es uno de los patrones de comportamiento más importantes en el campo del desarrollo de software. Este patrón pertenece a la categoría de patrones de comportamiento, y su principal objetivo es **encapsular una solicitud como un objeto** , lo que permite parametrizar los objetos con las solicitudes, retrasar la ejecución de una solicitud o incluso deshacerla.

### Descripción del Comando Patrón

El patrón **Command** se utiliza cuando necesitamos convertir una solicitud en un objeto, permitiendo que el solicitante y el ejecutor estén desacoplados entre sí. Este patrón se puede aplicar cuando se desea realizar operaciones sin necesidad de conocer directamente qué objeto ejecutará esa operación.

### Comando Estructura del Patrón

El patrón Command generalmente consta de los siguientes componentes clave:

1.  **Comando (Interfaz)** : Esta es la interfaz común para todos los comandos. Defina un método como `execute()`, que se debe implementar en las clases concretas que representan los comandos.
    
2.  **ConcreteCommand (Comando Concreto)** : Cada comando que implementa la interfaz `Command`y asocia una acción específica a un receptor. Implementa el método `execute()`, que llama al receptor para realizar la acción.
    
3.  **Receiver (Receptor)** : Este es el objeto que sabe cómo llevar a cabo la operación asociada con la solicitud. En otras palabras, realiza la acción cuando se le llama desde el comando.
    
4.  **Invoker (Invocador)** : El invocador es responsable de pedir un comando que ejecute la acción. Se refiere al objeto que mantiene el comando y lo ejecuta en el momento adecuado.
    
5.  **Cliente (Cliente)** : El cliente es quien configura el objeto Command, especificando qué acción se debe realizar y asignándola a un invocador.