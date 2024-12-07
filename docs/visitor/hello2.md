# Estructura y ejemplos 

El patrón Visitor permite separar algoritmos (visitantes) de las estructuras de datos sobre las que operan. Esto ofrece una gran flexibilidad y mantenibilidad al código.

![Esta es una imagen de ejemplo](https://refactoring.guru/images/patterns/diagrams/visitor/structure-es.png?id=617cb8f5476ab116b73bbbfa7dbf7ec2)



### Descripcion de la estructura:

Un visitante es una clase que define una operación para cada tipo de objeto. Por ejemplo, un visitante "calculador de área" tendría métodos para calcular el área de un círculo, de un rectángulo, etc. Cada objeto tiene un método accept que toma un visitante como parámetro. Cuando se invoca este método, el objeto delega la ejecución de la operación al visitante, permitiendo que el visitante realice la acción específica para ese tipo de objeto.

Las principales ventajas del patrón Visitor son:

- Flexibilidad: Se pueden agregar nuevas operaciones sin modificar las clases de los objetos.
- Reutilización: Los visitantes pueden ser reutilizados en diferentes contextos.
- Separación de preocupaciones: Separa el algoritmo de la estructura de datos.

En resumen, el patrón Visitor es una herramienta poderosa para agregar nuevas funcionalidades a una jerarquía de clases sin modificar las clases existentes. Es especialmente útil cuando se necesitan realizar múltiples operaciones sobre una estructura de objetos compleja.

## Ejemplo Practico

### Sistema de Figuras Geométricas
Imaginemos que tenemos un sistema simple que maneja figuras geométricas como círculos y rectángulos. Queremos poder calcular el área y el perímetro de cada figura.

```
interface FiguraGeometrica {
    accept(visitor: Visitor): void;
}

class Circulo implements FiguraGeometrica {
    constructor(public readonly radio: number) {}

    accept(visitor: Visitor): void {
        visitor.visitCirculo(this);
    }
}

class Rectangulo implements FiguraGeometrica {
    constructor(public readonly base: number, public readonly altura: number) {}

    accept(visitor: Visitor): void {
        visitor.visitRectangulo(this);
    }
}

interface Visitor {
    visitCirculo(circulo: Circulo): void;
    visitRectangulo(rectangulo: Rectangulo): void;
}

class CalculadorDeArea implements Visitor {
    visitCirculo(circulo: Circulo): void {
        const area = Math.PI * Math.pow(circulo.radio, 2);
        console.log(`El área del círculo es: ${area}`);
    }

    visitRectangulo(rectangulo: Rectangulo): void {
        const area = rectangulo.base * rectangulo.altura;
        console.log(`El área del rectángulo es: ${area}`);
    }
}

class CalculadorDePerimetro implements Visitor {
    visitCirculo(circulo: Circulo): void {
        const perimetro = 2 * Math.PI * circulo.radio;
        console.log(`El perímetro del círculo es: ${perimetro}`);
    }

    visitRectangulo(rectangulo: Rectangulo): void {
        const perimetro = 2 * (rectangulo.base + rectangulo.altura);
        console.log(`El perímetro del rectángulo es: ${perimetro}`);
    }
}

// Uso del patrón
const circulo = new Circulo(5);
const rectangulo = new Rectangulo(4, 3);

const calculadorArea = new CalculadorDeArea();
circulo.accept(calculadorArea);
rectangulo.accept(calculadorArea);

const calculadorPerimetro = new CalculadorDePerimetro();
circulo.accept(calculadorPerimetro);
rectangulo.accept(calculadorPerimetro);

```
### Explicación

- FiguraGeometrica: Esta es una interfaz que define un método accept. Este método es el punto de entrada para que un visitante pueda operar sobre una figura concreta.
- Circulo y Rectangulo: Estas son clases concretas que implementan la interfaz FiguraGeometrica. Cada una tiene sus propias propiedades (radio, base, altura) y el método accept que delega la operación al visitante.
- Visitor: Esta interfaz define los métodos que un visitante debe implementar para cada tipo de figura. En este caso, tenemos visitCirculo y visitRectangulo.
- CalculadorDeArea y CalculadorDePerimetro: Estas son clases concretas que implementan la interfaz Visitor. Cada una proporciona la lógica para calcular el área o el perímetro de una figura, respectivamente.

#### Funcionamiento paso a paso:

- Creación de objetos: Se crean instancias de Circulo y Rectangulo con valores específicos para sus propiedades.
- Creación de visitantes: Se crean instancias de CalculadorDeArea y CalculadorDePerimetro.
- Invocación del método accept: Para cada figura, se invoca el método accept y se pasa el visitante correspondiente como argumento.
- Delegación al visitante: Dentro del método accept de cada figura, se delega la ejecución al método correspondiente del visitante. Por ejemplo, si se llama a circulo.accept(calculadorArea), se ejecutará el método visitCirculo del CalculadorDeArea.
- Cálculo y salida: Dentro de los métodos del visitante, se realizan los cálculos necesarios (área o perímetro) y se muestra el resultado por consola.
