# Ventajas y Desventajas


### Ventajas del Patrón Command:

1.  **Desacoplamiento** : El patrón desacopla el objeto que invoca la acción del objeto que la ejecuta. Esto facilita cambios en el código sin afectar otras partes del sistema.
    
2.  **Facilidad de extensión** : Se pueden agregar nuevos comandos sin modificar el código existente, lo que mejora la mantenibilidad.
    
3.  **Operaciones de deshacer/rehacer** : Se pueden almacenar objetos de comando para implementar funcionalidades de deshacer y rehacer, lo que resulta útil en aplicaciones con interfaces de usuario.
    
4.  **Soporte cola de comandos** : Permite almacenar y ejecutar comandos en un orden específico o programar su ejecución en el futuro.
    
5.  **Flexibilidad en la ejecución** : Los comandos pueden ser invocados en diferentes momentos o contextos, lo que ofrece gran flexibilidad en su ejecución.
    

### Comando Desventajas del Patrón:

1.  **Mayor complejidad** : Introduce más clases (Comando, Receptor, Invocador), lo que puede aumentar la complejidad del sistema, especialmente en proyectos pequeños.
    
2.  **Sobrecarga de objetos** : Crear un objeto por cada comando puede generar una sobrecarga en la memoria y hacer que el código sea más difícil de gestionar si hay demasiados comandos.
    
3.  **Puede ser innecesario** : En sistemas simples, donde las operaciones son directas y no requieren deshacer o colas, este patrón puede ser innecesario y agregar complejidad innecesaria.
    
4.  **Dificultad de mantenimiento** : Si se tiene una gran cantidad de comandos, puede volverse difícil gestionar y mantener todos los objetos de comando, especialmente cuando tienen dependencias complejas.
Ventajas del Patrón Command:
Desacoplamiento : El patrón desacopla el objeto que invoca la acción del objeto que la ejecuta. Esto facilita cambios en el código sin afectar otras partes del sistema.

Facilidad de extensión : Se pueden agregar nuevos comandos sin modificar el código existente, lo que mejora la mantenibilidad.

Operaciones de deshacer/rehacer : Se pueden almacenar objetos de comando para implementar funcionalidades de deshacer y rehacer, lo que resulta útil en aplicaciones con interfaces de usuario.

Soporte cola de comandos : Permite almacenar y ejecutar comandos en un orden específico o programar su ejecución en el futuro.

Flexibilidad en la ejecución : Los comandos pueden ser invocados en diferentes momentos o contextos, lo que ofrece gran flexibilidad en su ejecución.

Comando Desventajas del Patrón:
Mayor complejidad : Introduce más clases (Comando, Receptor, Invocador), lo que puede aumentar la complejidad del sistema, especialmente en proyectos pequeños.

Sobrecarga de objetos : Crear un objeto por cada comando puede generar una sobrecarga en la memoria y hacer que el código sea más difícil de gestionar si hay demasiados comandos.

Puede ser innecesario : En sistemas simples, donde las operaciones son directas y no requieren deshacer o colas, este patrón puede ser innecesario y agregar complejidad innecesaria.

Dificultad de mantenimiento : Si se tiene una gran cantidad de comandos, puede volverse difícil gestionar y mantener todos los objetos de comando, especialmente cuando tienen dependencias complejas.