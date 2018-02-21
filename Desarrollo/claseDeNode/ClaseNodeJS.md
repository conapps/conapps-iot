#  Node.js


## Inroduccion

Node.js es un entorno de ejecución para JavaScript construido con el motor de JavaScript V8 de Chrome. Node.js usa un modelo de operaciones E/S sin bloqueo y orientado a eventos, que lo hace liviano y eficiente. 

Como instalarlo: 

Utilizaremos la herramienta `nvm`, que es una herramienta para poder instalar y administrar diferentes versiones de node.

Primero descargaremos `nvm`, copiando en la linea de comandos:

```bash
 $ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
```
Luego de instalado asegurese de tener la version correcta de `nvm` utilizando el comando `nvm --version`

Algunos comandos utiles para utilizar `nvm`:

+ Lista de comandos para nvm: `$ nvm`
+ Instalacion de Node que se esta usando: `$ nmv current`
+ Instalar la utlima version: `$ nvm install node`
+ Usar la ultima version: `$ nvm use node`

Utilizando estos dos ultimos comandos es que podemos instalar `Node.js` en nuestros ordenadores.

_______

## Primeros pasos

Escribiremos nuestro primer programa.

La consigna es escribir un programa que reciba uno o más números como argumentos de la consola e imprima la suma de dichos números a consola(stdout).

Primero crear un archivo llamado `program.js`

Como primera instancia se tiene que saber que se puede acceder a los argumentos de la línea de comandos usando el objeto global `process`, el cual tiene una propiedad `argv` que es un array con toda la información del comando. Ej: `process.argv`.

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
____

### Al agua solos

Para resolver este ejercicio debes iterar en la lista de argumentos de modo que sólo escribas la suma. El primer elemento de la lista siempre es 'node', el segundo es la ruta al program.js; por ende, debes comenzar a iterar en el tercer elemento (índice 2 de la lista) sumando cada elemento sucesivo hasta el final.

Ten en cuenta que todos los elementos de `process.argv` son cadenas de caracteres ('strings') por lo que debes convertirlas a números, por ejemplo: agregando el prefijo `+` o llamando a `Number()`. Ej: `+process.argv[2]` ó `Number(process.argv[2])`.
____

## Trabajando con Node.js

Ahora escribiremos un programa que, usando una llamada síncrona al sistema de archivos, lea un archivo recibido por argumento e imprima a consola la cantidad de saltos de línea ('\n') que contiene. El programa recibirá la ruta al archivo como único argumento.

Para resolver este ejercicio usaremos el módulo `fs` del núcleo de Node. Para cargar dicho módulo o cualquier módulo es necesario hacer:

```js
var fs = require('fs')
```

De este modo, el módulo `fs` estará disponible en esa variable.

Pero, como importamos este modulo?

Con **`NPM`**
### NPM
NPM es un gestor de módulos y aplicaciones para Node.js, con el cual los desarrolladores podemos crear, compartir y reutilizar módulos en nuestras aplicaciones. Nos permite utilizar desde pequeños módulos hasta aplicaciones completas de un cátalogo que a día de hoy es bastante extenso, incluso puedes crear tus propios modulos.

#### Instalacion de modulos

Hay dos formas de instalar módulos en NPM. Es muy importante saber cómo funcionan por que dependiendo de nuestras necesidades optaremos por usar una u otra.

Localmente
Con la instalación local el módulo deseado se instalará localmente en el proyecto que estemos trabajando en una carpeta llamada node_modules.

Esta carpeta se crea automáticamente cuando instalemos un módulo ejecutando el siguiente comando:
```bash
$ npm install [nombre_modulo]
```
Si por ejemplo nuestra aplicación Node.js se llama app.js la estructura de carpetas que tendremos será la siguiente:
```
    - app.js
    - node_modules
        - nombre_modulo
        
```        
Esta es la forma más común de instalar módulos en Node.js y también la más recomendada.

Globalmente
En Node.js hay módulos/aplicaciones que permiten utilizarlos mediante la línea de comandos desde cualquier lugar de nuestro sistema de archivos. En este caso lo recomendable es instalarlos de forma global con el siguiente comando:
```bash
$ npm install -g [nombre_modulo]
```

Al hacerlo así podremos usar el modulo en cualquiera de nuestros proyectos.

Para utilizar los módulos, que acabamos de instalar, desde nuestras aplicaciones Node.js, tan solo debemos seguir esta sintaxis:

```node
var modulo = require('modulo');
```

#### El archivo package.json

Una tarea fundamental para trabajar con NPM es conocer el archivo `package.json`. Utilizar este archivo en nuestros proyectos tiene muchas ventajas:

* No tenemos que instalar módulos uno a uno ya que se van a descargar de forma automática.
* Facilita la instalación de nuestra aplicación a otros desarrolladores.
* Todos los ficheros y documentación de una determinada aplicación se almacena en un solo lugar.

Este archivo se debe crear en la raíz de nuestro proyecto de tal manera que quede como se muestra a continuación:

```
    - app.js
    - node_modules
    - package.json
        
```  

El aspecto más sencillo de un archivo package.json es el siguiente:
```JSON
{
	"name": "miapp",
	"version": "0.0.1",
	"dependencies": {
		"nombre_modulo": "version",
		"nombre_modulo2": "version"
	}
}
```

De esta manera si nuestra aplicación usa diferentes módulos no haría falta instalarlos uno a uno, tan solo ejecutaríamos el siguiente comando (siempre desde la raíz de nuestro proyecto):
```bash
$ npm install
```

NPM leerá las dependencias incluidas en el archivo package.json y realizara la instalación de los módulos necesarios para nuestro proyecto. De igual manera a la hora de compartir nuestra aplicación, no haría falta copiar el contenido de la carpeta `node_modules` porque estas dependencias ya estarían incluidas en el JSON.

Una práctica muy común a la hora de compartir nuestra aplicación en GitHub es añadir al fichero .gitignore la carpeta node_modules, así cuando un usuario se descargue nuestra aplicación, con el comando `npm install` instalará todas sus dependencias.

_____

Luego de tener el modulo importado tenemos que saber que toda operación síncrona (o de bloqueo) del sistema de archivos en el módulo `fs` tiene sufijo 'Sync'. Para leer un archivo debes usar `fs.readFileSync('/path/to/file')`. Éste *devuelve* un objeto `Buffer` con los contenidos del archivo.

Los objetos `Buffer` de Node son una representación eficiente de Arrays de datos en variedad de formatos como ser ASCII, binarios o UTF-8 entre otros. Los objetos `Buffer` se pueden convertir en String usando el método `toString()` por ejemplo: `var str = buf.toString()`.
#### Intentandolo
Si buscas una forma sencilla de contar el número de saltos de línea en un string, piensa que puedes convertir un `String` de Javascript en un array de substrings usando `.split()`, y que puedes usar '\n' como delimitador. Nótese que el fichero de test no tiene ningún salto de línea ('\n') al final de la última línea, con lo que al usar este método acabarás obteniendo un array que tiene un elemento más que el número de saltos de línea.


____

## Cambiando el paradigma


Ahora escribremos el mismo programa que antes pero esta vez usaremos **the Node.js way**: asíncronicamente (async).

Vamos a sustituir `fs.readFileSync()` por `fs.readFile()` y en lugar de esperar que retorne un valor, vamos a tener que procesar el resultado con una función de callback que se invoca al terminar la lectura del archivo.

La forma habitual de usar callbacks en Node.js es con la siguiente firma:

```js
funcion1(parametros,function callback (error, data) { /* ... */ })
```

o en ES6

```js
funcion1(parametros,(data,error) => {/* ... */ })
```

Puedes validar si ocurrió un error controlando si el primer parámetro es nulo. Si no hay errores, 'data' será un objeto Buffer de Node.js.
Al igual que pasa con `readFileSync()`, puedes pasar 'utf8' como segundo parámetro y luego el callback como tercero de modo de que data sea un `String` y no un `Buffer`.

____

## Aumentando la complejidad

### Ejercicio 

El programa debe imprimir el listado de archivos de un directorio filtrando por extensión. Nuevamente el primer argumento será la ruta al directorio (ej: '/path/dir/') y el segundo la extensión a filtrar, por ejemplo si recibes 'txt' deberás filtrar todos los archivos que terminen en .txt. Debes usar Async I/O.

Deberás escribir un archivo modular para hacer la tarea. Dicho módulo debe exportar una función que reciba tres parámetros en orden: la ruta del directorio, la extensión para filtrar y una función de callback. La idea es encapsular toda la lógica dentro del módulo.

En Node, los callbacks suelen tener una firma convencional de tener (error, data). Esto implica que si hay un error el primer parámetro devuelve el error sino viene null y el segundo parámetro son los datos. Para este ejercicio los datos a devolver es la lista de archivos en forma de Array. Si ocurre un error, por ejemplo en la llamada a fs.readdir(), el callback debe llamarse con dicho error.

Para completar el ejercicio no debes imprimir desde el módulo, sólo desde el programa principal. En caso de que el módulo devuelva un error a tu programa principal, simplemente compruébalo y escribe un mensaje informativo en consola.

El módulo debe cumplir el siguiente contrato:

* Exportar una función que reciba los parámetros mencionados.
* Llamar al callback una única vez cuando ocurre un error o con la lista correspondiente.
* No debe modificar variables globales o stdout.
* Capturar los posibles errores y devolverlos en el callback.

La ventaja de usar contratos es que el módulo puede ser usado por cualquiera que asuma este contrato.

____
 #### PISTAS

* La función `fs.readdir()` recibe como parámetros: una ruta(path) y un callback. La firma del callback es:

```js
function callback (error, lista) { /* ... */ }
```

* La `lista` es un arreglo de nombres de archivos de tipo String.

* Además, el módulo `path` puede resultar útil, especialmente la función `extname`.

* Para crear un módulo basta con crear un nuevo archivo en el directorio de trabajo. Para definir una *función de export*, debes asignar la función al objeto global `module.exports`, por ejemplo:

```js
module.exports = function (args) { /* ... */ }
```

* También puedes usar una función con nombre y asignar el nombre a exports.

* Para llamar a esta función desde el programa debes usar `require` de la misma forma que para cargar el módulo de `fs` salvo que debes agregar el prefijo './' para indicar que es un archivo del directorio actual. Por ejemplo si tu módulo se llama 'mymodule.js' deberás usar:

```js
var mymodule = require('./mymodule.js')
```

El '.js' es opcional y en la mayoría de los casos se omite.

*  Ahora ya tienes cargada la función del módulo en la variable `mymodule` y la puedes invocar.

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
___
# Por mas informacion
[link](Repaso.md)
