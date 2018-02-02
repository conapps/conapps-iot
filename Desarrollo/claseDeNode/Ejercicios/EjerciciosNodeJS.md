## Ejercicio 1

Escribe un programa que reciba uno o más números como argumentos de la consola e imprima la suma de dichos números en la consola(stdout).
_______
### PISTAS

Puedes acceder a los argumentos de la línea de comandos usando el objeto global `process`, el cual tiene una propiedad `argv` que es un array con toda la información del comando. Ej: `process.argv`.

Para comenzar puedes escribir un programa que contenga:

```js
console.log(process.argv)
```

Luego, para ejecutarlo desde la consola usa `node program.js` y algunos números como arguments. Ej.:

```sh
$ node program.js 1 2 3
```

La salida estándar a consola será algo parecido a:

```js
[ 'node', '/path/to/your/program.js', '1', '2', '3' ]
```

Para resolver este ejercicio debes iterar en la lista de argumentos de modo que sólo escribas la suma. El primer elemento de la lista siempre es 'node', el segundo es la ruta al program.js; por ende, debes comenzar a iterar en el tercer elemento (índice 2 de la lista) sumando cada elemento sucesivo hasta el final.

___________


## Ejercicio 2

Escribe un programa que use operación de sistema de archivos asíncrona para leer un archivo e imprimir en consola el número de saltos de línea ('\n') que contiene. Similar a  ejecutar `cat file | wc -l`.

El programa recibirá la ruta al archivo como único argumento.

### PISTAS
La forma habitual de usar callbacks en Node.js es con la siguiente firma:

```js
function callback (error, data) { /* ... */ }
```

Puedes validar si ocurrió un error controlando si el primer parámetro es nulo. Si no hay errores, 'data' será un objeto Buffer de Node.js.
Al igual que pasa con `readFileSync()`, puedes pasar 'utf8' como segundo parámetro y luego el callback como tercero de modo de que data sea un `String` y no un `Buffer`.


## Ejercicio 3

Crea un programa que dado un directorio imprima una lista de archivos filtrados por la extensión. El primer argumento será la ruta al directorio (ej: '/path/dir/') y el segundo la extensión a filtrar, por ejemplo si recibes 'txt' deberás filtrar todos los archivos que **terminen en .txt**.

La lista de archivos a imprimir en consola debe hacerse un archivo por línea y debes utilizar Async I/O. Deberás crear dos archivos para resolver el ejercicio.

Deberás escribir un archivo *modular* para hacer la tarea. Dicho módulo debe *exportar* una función que reciba **tres** parámetros en orden: la ruta del directorio, la extensión para filtrar y una función de callback. La idea es encapsular toda la lógica dentro del módulo.

En Node, los callbacks suelen tener una firma convencional de tener (error, data). Esto implica que si hay un error el primer parámetro devuelve el error sino viene `null` y el segundo parámetro son los datos. Para este ejercicio los datos a devolver es la lista de archivos en forma de Array. Si occurre un error, por ejemplo en la llamada a `fs.readdir()`, el callback debe llamarse con dicho error.

Para completar el ejercicio **no debes** imprimir desde el módulo, sólo desde el programa principal. En caso de que el módulo devuelva un error a tu programa principal, simplemente compruébalo y escribe un mensaje informativo en consola.

El módulo debe cumplir el siguiente contrato:
1. Exportar una función que reciba los parámetros mencionados.
2. Llamar al callback una única vez cuando ocurre un error o con la lista correspondiente.
3. No debe modificar variables globales o stdout.
4. Capturar los posibles errores y devolverlos en el callback.

La ventaja de usar contratos es que el módulo puede ser usado por cualquiera que asuma este contrato.


----------------------------------------------------------------------
### PISTAS

La función `fs.readdir()` recibe como parámetros: una ruta(path) y un callback. La firma del callback es:

```js
function callback (error, lista) { /* ... */ }
```

La `lista` es un arreglo de nombres de archivos de tipo String.

Para crear un módulo basta con crear un nuevo archivo en el directorio de trabajo. Para definir una *función de export*, debes asignar la función al objeto global `module.exports`, por ejemplo:

```js
module.exports = function (args) { /* ... */ }
```

También puedes usar una función con nombre y asignar el nombre a exports.

Para llamar a esta función desde el programa debes usar `require` de la misma forma que para cargar el módulo de `fs` salvo que debes agregar el prefijo './' para indicar que es un archivo del directorio actual. Por ejemplo si tu módulo se llama 'mymodule.js' deberás usar:

```js
var mymodule = require('./mymodule.js')
```

El '.js' es opcional y en la mayoría de los casos se omite.

Ahora ya tienes cargada la función del módulo en la variable `mymodule` y la puedes invocar.

Ten en cuenta que es buena práctica en Node controlar errores y devolverlos bien al principio del código:

```js
function bar (callback) {
  foo(function (err, data) {
    if (err)
      return callback(err) // devolver el error

    // ... no hay error, continuar con los cálculos.

    // si todo termina bien, llamar el callback con `null` como parámetro de error

    callback(null, data)
  })
}
```
