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

var variable = 5;

- No pueden haber espacios en los nombres (da error)
- Los nombres no pueden empezar con numeros (da error)
- Se puede usar _ pero no está recomendado
- Se puede usar $ pero no está recomendado
- se debe de usar camelCase
- Está OK utilizar los numeros al funcionalidad

Cuando cambio una variable ya definida no utilizo var.

variable = variable + 3
variable += 3
variable \*= 3
variable \= 3
variable %= 3
variable++
variable--

Se puede guardar cualquier tipo de dato en una variable, por ejemplo un string.

var texto = "Hola mundo"
p. ej. puedo hacer texto.length

### Como imprimir a la consola
  - console.log()
  - console.error()

### Como utilizar ;

### Listas

### objetos

### if {} else {}

### for

### while



[Como utilizar ;](https://www.codecademy.com/es/blog/78)
