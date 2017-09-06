| [<-- Volver](20170125%20-%20Javascript.md) |
[Siguiente -->](#) |

## Tipos de datos y operadores
---

### Operadores aritméticos

Javascript soporta los principales operadores aritméticos, a saber:

  * suma ```+```
  * resta ```-```
  * multiplicación ```\*```
  * división ```\```
  * resto ```%```
  * exponente ```**```

Si realizamos una operación aritmética con cualquiera de estos operadores en una consola interactiva de Javascript el motor nos devolerá el resultado inmediatamente:

```bash
> 4 + 5
9
> 8 / 3
2.6666666666666665
> 6 - 4
2
> 3 * 3
9
> 9 % 2
1
> 3 ** 2
9
```

### Operadores de comparación

Javascript soporta los principales operadores de comparación, el resultado de una operación de comparación es siempre un booleano:

```bash
> 7 > 3
true
> 7 < 3
false
> 7 == 3
false
> 3 >= 3
true
> 3 <= 2
false
> 7 != 4
true
>
```

### Orden de precedencia de las operaciones.

El orden de precedencia de las operaciones es el clásico, cuyo acrónimo mnemotécnico en español es:

PAPOMUDAS
- Paréntesis
- Potencia
- Multiplicación
- División
- Adición
- Sustracción

```bash
> 3 + 4*5
23
> (3 + 4)*5
35
>
```

### Strings

Un string es una cadena de caracteres que se define mediante el uso de comillas dobles o simples de forma indistinta; por tal motivo las expresiones ```'nuevo texto'``` y ```"nuevo texto"``` son equivalentes. Esta cadena se indexa comenzando desde cero.
Los strings en Javascript son un tipo de dato primitivo, pero que el lenguaje convierte a un objeto de tipo ```String``` de forma dinámica y a demanda para poder invocar a algunos métodos particulares; por ejemplo:


```JavaScript
> 'nuevo texto'.length
11
> 'otro texto'.length
10
> "nuevo texto".charAt(0)
'n'
> "nuevo texto".charAt(5)
' '
> "nuevo texto".charAt(6)
't'
> 'nuevo texto'.toUpperCase()
'NUEVO TEXTO'
> "OtRo TeXto".toLowerCase()
'otro texto'
```

Los scripts pueden concatenarse utilizando el símbolo ```+```:

```javascript
> 'hola' + 'mundo'
'holamundo'
````
Hay que tener en cuenta que la concatenación no agrega espacios entre los strings, por lo que si dado el ejemplo anterior quiero obtener ```hola mundo``` entonces debo correr:

```javascript
> 'hola ' + 'mundo'
'hola mundo'
```

Es posible concatenar strings con otros tipos de datos, por ejémplo enteros o punto flotante; en este caso es importante tener en cuenta que las operaciones aritméticas se harán antes de la concatenación:

```javascript
> 'Cantidad de puntos: ' + 5
'Cantidad de puntos: 5'
> 'Cantidad de puntos: ' + 5/10
'Cantidad de puntos: 0.5'
> 'Cantidad de puntos: ' + "5/10"
'Cantidad de puntos: 5/10'
```

Cuando queremos incluír comillas dentro de un string tenemos dos posiblidades:

  - Utilizar un tipo de comillas distintas a las utilizadas para definir el string: ```"utilizando 'comillas' dentro de un string"```
  - Escaparlas con ```\```: ```"utilizando \"comillas\" dentro de un string"```

Cuando realmente queremos expresar una ```\``` en un string la podemos escapar de la siguiente forma:

```javascript
> console.log('c:\\\\Windows\\\\Users\\')
c:\\Windows\\Users\
```

Javascript también soporta una serie de secuencias de escape que permiten formatear el texto a imprimir. Algunas de las mas comunes son ```\t``` para un tabulador horizontal y ```\n``` para una nueva línea (enter). Por ejemplo:

```javascript
> console.log('Resultado:\n\tPuntos posibles: ' + 10 + '\n\tPuntos obtenidos: ' + 5)
Resultado:
	Puntos posibles: 10
	Puntos obtenidos: 5
```

A continuación compartimos una lista con el resto de las secuencias de escape:

| Secuencia | Significado |
| --------- | ----------- |
| \b | backspace (U+0008 BACKSPACE) |
| \f | form feed (U+000C FORM FEED) |
| \n | line feed (U+000A LINE FEED) |
| \r | carriage return (U+000D CARRIAGE RETURN) |
| \t | horizontal tab (U+0009 CHARACTER TABULATION) |
| \v | vertical tab (U+000B LINE TABULATION) |
| \0 | null character (U+0000 NULL) (only if the next character is not a decimal digit; else it’s an octal escape sequence) |
| \\' | single quote (U+0027 APOSTROPHE) |
| \\" | double quote (U+0022 QUOTATION MARK) |
| \\\\ | backslash (U+005C REVERSE SOLIDUS) |

A partir de la versión ECMAScript 6 se introdujeron en el lenguaje los "Template Literals", básicamente es la posibilidad de definir un string utilizando comillas invertidas. Esta forma de definición tiene muchas ventajas que exploraremos mas adelante, pero en particular permite la definición de strings multilínea sin necesidad de utilizar secuencias de escape:

```Javascript
> console.log(`Resultado:
    Puntos posibles: 10
    Puntos obtenidos: 5`)
Resultado:
    Puntos posibles: 10
    Puntos obtenidos: 5    
```

Los operadores de comparación tambien pueden utilizarse sobre strings, en este punto es importante tener en cuenta que los mismos son sensibles a mayúsculas y minúsculas:

```Javascript
> 'Texto' == 'texto'
false
> 'TEXTO' == 'TEXTO'
true
> 'TEXTO' != 'TEXTO'
false
> 'Texto' != 'TEXTO'
true
```

### Variables

Al igual que en otros lenguajes de programación, las variables en Javascript sirven para almacenar datos.
Debido a que Javascript utiliza "tipado dinámico", al definir una variable no es necesario especificar el tipo de dato que la misma va a contener, sino que dicho tipo de dato se infiere a partir del tipo de datos del valor que almacenamos que además puede cambiar en el tiempo:

```Javascript
> var miVariable = 'texto';
> console.log(miVariable);
texto
> miVariable = 5;
> console.log(miVariable);
5
```

El tipado de Javascript además de ser dinámico está clasificado como "blando", lo que quiere decir que se puede operar y comparar con variables de tipos distintos sin necesidad de hacer una conversión previa debido a que el intérprete hace esta conversión por nosotros. Esto en contraste con los lenguajes de tipado "fuerte" como Python donde no se puede operar con variables de tipos distintos sin realizar una conversión previa. Para simplificar, veamos este concepto directamente con valores, sin utilizar variables:

#### Python

```python
>>> 5 == "5"
False
>>> 5 + "5"
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: unsupported operand type(s) for +: 'int' and 'str'
```
#### Javascript

```Javascript
> 5 == "5"
true
> 5 + "5"
'55'
```

Esto, que en principio parece una funcionalidad muy interesante y amigable, puede traer muchos dolores de cabeza si no se tiene absolutamente claro cual es el funcionamiento esperado; por este motivo exploraremos esta particularidad del lenguaje en profundiad mas adelante. Por ahora, para tener una primer aproximación a este concepto, simplemente ejecute las siguientes operaciones intentando adivinar el resultado:

```
5 + 5 + "5" = ?
```

```
"5" + 5 + 5 = ?
```

```
"5" - 5 + 5 = ?
```

```
5 - 5 + "5" = ?
```

#### Como nombrar las variables

Tenga en cuenta los siguientes puntos para nombrar las variables:

  - No pueden haber espacios en los nombres (el motor da error)
  - Los nombres no pueden empezar con números (el motor da error)
  - Se puede usar ```_``` pero no está recomendado
  - Se puede usar ```$``` pero no está recomendado
  - La forma recomendada de nombrar una variable es utilizando camelCase, por ejemplo: ```var miNuevaVariable = 'Hola mundo';````
  - Está OK utilizar los numeros al final

Una vez que una variable está definida, para asignar un nuevo valor a la misma omito la palabra ```var```:

```javascript
var miVariable = 'hola';
miVariable = 'mundo';
```

#### Operadores de asignación

Modificar variables en base a su valor previo es una operación tan común que el lenguaje dispone de varios operadores de asignación para facilitar el trabajo. Veamos esto con un ejemplo:

```javascript
> var numero = 5;
> numero = numero + 1;
> console.log(numero);
6
> numero += 1;
> console.log(numero);
7
> numero -= 2;
> console.log(numero);
5
> numero /= 2;
> console.log(numero);
2.5
> numero *= 2;
> console.log(numero);
5
> numero %= 2;
> console.log(numero);
1
> numero++;
> console.log(numero);
2
> numero--;
> console.log(numero);
1
```

Una lista completa de los operadores de asignación y su significado puede encontrarse [aquí](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Assignment_Operators).


### Listas

Las listas, o arrays, en javascript son un conjunto ordenado de datos (de cualquier tipo de datos).

#### Como se define una lista

```javascript
var miLista = [1, 2, 3, 'Hola', 'Mundo', 5];
```

#### Cómo se accede a los elementos de una lista

Los elementos contenidos en las listas están indexados comenzando por cero, de esta forma, el primer elemento de la lista será el correspondiente al índice 0, el segundo el correspondiente al índice 1, y así sucesivamente:

```javascript
> var miLista = [1, 2, 3, 'Hola', 'Mundo', 5];
> console.log(miLista[0]);
1
> console.log(miLista[3]);
'Hola'
```

Los elementos de una lista pueden modificarse de forma dinámica:

```javascript
> var miLista = [1, 2, 3, 'Hola', 'Mundo', 5];
> console.log(miLista[0]);
1
> miLIsta[0] = 'uno';
> console.log(miLista[0]);
'uno'
> console.log(miLista);
['uno', 2, 3, 'Hola', 'Mundo', 5]
```

También se pueden agregar elementos a una lista de forma dinámica referenciando un índice que aún no exista:

```javascript
> var miLista = [1, 2, 3, 'Hola', 'Mundo', 5];
> miLista[6] = 'texto de prueba';
> console.log(miLista);
[1, 2, 3, 'Hola', 'Mundo', 5, 'texto de prueba']
```

Las listas tienen métodos y parámetros predefinidos que pueden resultar de utilidad.

**pop()**

Remueve el último elemento de la lista:

```javascript
> var miLista = [1, 2, 3];
> var numero = miLista.pop();
> console.log(numero);
3
> console.log(miLista);
[1, 2]
```

**push()**

Agrega un dato al final de la lista:

```javascript
> var miLista = [1, 2, 3];
> miLista.push('4');
> console.log(miLista);
[1, 2, 4, '4']
```

**length**

Indica el largo de la lista, notar que el largo de la lista comienza a contar a partir de uno, a diferencia del índice que cuenta a partir de cero.

```javascript
> var miLista = [1, 2, 3];
> miLIsta.length
3
```

> **Pregunta:**
>
> ¿Cómo podemos acceder al último elemento de una lista cuyo largo puede cambiar a lo largo de la ejecución del programa?

### objetos

Los objectos en JavaScript, al igual que en muchos otros lenguajes de programación, pueden ser comparados con objectos de la vida real. El concepto de Objetos en JavaScript se puede entender como en la vida real, objetos tangibles.

En JavaScript, un objecto es un entidad independiente con propiedades y tipos. Compárelo con una taza por ejemplo. Una taza es un objeto, con propiedades. Una copa tiene un color, un diseño, peso, un material del que fue hecho, etc. De la misma manera, los objetos de JavaScript pueden tener propiedades, que definen sus características.

Un objeto de JavaScript tiene propiedades asociadas. Una propiedad de un objeto puede ser explicada como una variable que se adjunta al objeto. Las propiedades de un objeto son basicamente lo mismo que las variables comunes de JavaScript, excepto por el nexo con el objeto. Las propiedades de un objeto definen las características de un objeto.

Veamos a continuación como se define un objeto:

```JavaScript
var auto = {
  marca: 'Toyota',
  puertas: 5,
  cilidrada: 1.2
}
```

Los elementos de los objetos pueden accederse mediente notación de puntos o mediante paréntesis rectos, (indicando la propiedad del objeto como un string). Las siguientes expresiones son equivalentes:

```JavaScript
> auto.marca
'Toyota'
> auto['marca']
'Toyota'
```

A grandes razgos la notación de puntos es más cómoda, pero la notación con paréntesis rectos, al recibir un string, nos permite mayor flexibilidad. Veámos esto con un ejemplo:

```JavaScript
> var calificaciones = {
  hugo: 89,
  paco: 100,
  luis: 23
}

> var nombre = 'hugo';
> calificaciones[nombre]
89
> calificaciones.nombre
undefined
```

Agregar atributos a un objeto es muy sencillo, simplemente se referencia al atributo como si ya existiera:

```JavaScript
> var calificaciones = {
  hugo: 89,
  paco: 100,
  luis: 23
}

> calificaciones.pedro = 75;
> calificaciones;
{ hugo: 89, paco: 100, luis: 23, pedro: 75 }
```

Para borrar un atributo:

```JavaScript
> var calificaciones = {
  hugo: 89,
  paco: 100,
  luis: 23
}
> delete calificaciones.hugo;
> calificaciones;
{ paco: 100, luis: 23 }
```


### if {} else {}
Falta completar

### for
Falta completar

### while
Falta completar

### ¿Es necesario utilizar ```;```?

Documento sobre como utilizar ```;``` en Javascript [aquí](https://www.codecademy.com/es/blog/78)
