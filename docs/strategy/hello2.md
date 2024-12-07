# Estructura y ejemplos 

El patrón Strategy define una familia de algoritmos, encapsula cada uno y los hace intercambiables. Esto permite seleccionar un algoritmo en tiempo de ejecución.

![Esta es una imagen de ejemplo](https://refactoring.guru/images/patterns/diagrams/strategy/structure.png?id=c6aa910c94960f35d100bfca02810ea1)



### Descripcion de la estructura:

- La clase Contexto mantiene una referencia a una de las estrategias concretas y se comunica con este objeto únicamente a través de la interfaz estrategia.
- La interfaz Estrategia es común a todas las estrategias concretas. Declara un método que la clase contexto utiliza para ejecutar una estrategia.
- Las Estrategias Concretas implementan distintas variaciones de un algoritmo que la clase contexto utiliza.
- La clase contexto invoca el método de ejecución en el objeto de estrategia vinculado cada vez que necesita ejecutar el algoritmo. La clase contexto no sabe con qué tipo de estrategia funciona o cómo se ejecuta el algoritmo.
- El Cliente crea un objeto de estrategia específico y lo pasa a la clase contexto. La clase contexto expone un modificador set que permite a los clientes sustituir la estrategia asociada al contexto durante el tiempo de ejecución.

## Ejemplo Practico

### Sistema de facturas
Imaginemos un sistema que genera facturas de diferentes tipos, como facturas normales, facturas con descuento y facturas con impuestos especiales. Podemos utilizar el patrón Strategy para encapsular las diferentes reglas de cálculo en clases separadas y luego asignarlas a diferentes tipos de facturas

```// Interfaz común para todas las estrategias de cálculo
interface IBillingStrategy {
  calculateTotal(amount: number): number;
}

// Estrategias concretas
class NormalBilling implements IBillingStrategy {
  calculateTotal(amount: number): number {
    return amount;
  }
}

class DiscountBilling implements IBillingStrategy {
  calculateTotal(amount: number): number {
    return amount * 0.9; // Descuento del 10%
  }
}

class SpecialTaxBilling implements IBillingStrategy {
  calculateTotal(amount: number): number {
    return amount * 1.15; // Impuesto especial del 15%
  }
}

// Clase base para todas las facturas
abstract class Invoice {
  protected billingStrategy: IBillingStrategy;

  constructor(billingStrategy: IBillingStrategy) {
    this.billingStrategy = billingStrategy;
  }

  calculateTotal(amount: number): number {
    return this.billingStrategy.calculateTotal(amount);
  }
}

// Facturas concretas
class NormalInvoice extends Invoice {
  constructor() {
    super(new NormalBilling());
  }
}

class DiscountInvoice extends Invoice {
  constructor() {
    super(new DiscountBilling());
  }
}

class SpecialTaxInvoice extends Invoice {
  constructor() {
    super(new SpecialTaxBilling());
  }
}

// Uso del código
let normalInvoice = new NormalInvoice();
let total = normalInvoice.calculateTotal(100); // Total: 100

let discountInvoice = new DiscountInvoice();
total = discountInvoice.calculateTotal(100); // Total: 90

let specialTaxInvoice = new SpecialTaxInvoice();
total = specialTaxInvoice.calculateTotal(100); // Total: 115

```
### Explicación

1. Interfaz ```IBillingStrategy```: Define el contrato para todas las estrategias de cálculo.
2. Estrategias concretas: Cada estrategia implementa una lógica de cálculo diferente.
3. Clase base ```Invoice```:
Tiene una propiedad ```billingStrategy``` que referencia una instancia de ```IBillingStrategy```.
El método ```calculateTotal()``` delega la responsabilidad del cálculo a la estrategia actual.
3. Facturas concretas: Cada factura se inicializa con la estrategia de cálculo correspondiente.

### En este ejemplo, el patrón Strategy nos permite:

- Encapsular las reglas de cálculo: Cada estrategia encapsula una lógica de cálculo específica, lo que hace que el código sea más modular y fácil de entender.
- Cambiar la estrategia en tiempo de ejecución: Podemos cambiar la estrategia de cálculo de una factura en cualquier momento, simplemente creando una nueva instancia de la factura con una estrategia diferente.
- Extender el sistema: Podemos agregar nuevas estrategias de cálculo sin modificar el código existente, lo que hace que el sistema sea más flexible y adaptable a futuros cambios.