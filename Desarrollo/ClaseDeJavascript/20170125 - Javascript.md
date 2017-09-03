JavaScript
===

*Fuentes*

- [Wikipedia](https://wikipedia.org/wiki/JavaScript)
- [CodeSchool](https://www.codeschool.com/)
- [Mozilla Developer Network](https://developer.mozilla.org)


Introducción
---

Javascript, comunmente abreviado como JS, es un lenguaje interpretado, de alto nivel, orientado a objetos, débilmente tipado y multi-paradigma.
Junto con HTML y CSS, Javascript es una de las tres tecnologías core que hacen posible la Web tal como la conocemos.
Javascript se utiliza para correr programas online y de esta forma hacer que las páginas sean interactivas. La mayoría de los sitios Web de hoy en día lo utilizan y todos los navegadores modernos lo soportan *sin la necesidad de instalar un plugin*.

Javascript (y el primer motor del lenguaje) fue desarrollado por Brendan Eich en 1995 para ser incluído en el navegador de la empresa para la que Eich trabajaba, Netscape Communications.
Un año mas tarde, Netscape entregó el lenguaje a ECMA International para su estandarización.
Hoy en día, la especificación estándar del lenguaje se llama ECMAScript, mantenida por una asociación de empresas internacionales llamada ECMA International. Las empresas miembro de ECMA International con derecho a voto son: Google, HP, hitachi, IBM, Intel, Konica Minolta, Microsoft, PayPal y Yahoo!.
Javascript es desde siempre la implementación mas popular de ECMAScript, existiendo algunas implementaciones menos populares como JScript (Internet Explorer) o ActionScript (Flash Player).

Inicialmente ECMAScript era soportado únicamente en los navegadores, pero debido a su increíble éxito en este ambiente, luego se extendió su uso a servidores e inclusive a ambientes "no Web" como ser en procesadores de texto y software para el manejo de PDFs.

Javascript en los navegadores
---

Como todo leguaje interpretado, el códgo Javascript se escribe en simples archivos de texto con una sintáxis particular (ECMAScript), y requiere de un motor, o intérprete, para poder ejecutarse.
La forma mas común de interacción con un motor de Javascript es a través de los navegadores Web; hagámos nuestro pimero ejémplo de ```"Hola Mundo!"``` con el navegador Google Chrome.

> *Ejercicio:*
> Abra el navegador Google Chrome.
> Con el juego de teclas ```ctl+shft+J``` ejecute las Chrome Developers Tools y en particular identifique la consola. Mediante el uso de la misma, el usuario puede interactuar directamente con el motor de Javascript del navegador; como es tradicional al aprender un nuevo lenguaje de programación, en este ejercicio la utilizaremos para ejeecutar nuestro primer mensaje de "Hola Mundo!" mediante el comando ```console.log("Hola Mundo!")```.

Ya sabemos como interactuar con el motor de Javascript de Google Chrome; veamos ahora como interactuar con el motor de Javascript de Firefox.

> *Ejercicio:*
> Abra el navegador Google Chrome.
> Investigue en Internet como acceder a la consola Javascript de Mozilla Firefox y ejecute ```alert("Hola Mundo!")```.

Ahora que tenemos una idea de como Javascript corre en los navegadores veamos como correr javascript en el servidor.

Server side Javascript
---

Javascript puede correrse en cualquier máquina, y en particular en un servidor, mediante la instalación de un intérprete del lenguaje llamado ```Node.js```. Node es un intérprete de Javascript basado en el motor V8 de Google (el de Chrome) que permite la ejecución de código Javascript. La documentación oficial de ```Node.js``` puede encontrarse [aquí](https://nodejs.org/en/docs/); en particular, las instrucciones de instalación están [aquí](https://nodejs.org/es/download/package-manager/#debian-and-ubuntu-based-linux-distributions).

Nosotros aprovecharemos lo que hemos aprendido sobre Docker para saltearnos la instalación y utilizar un ambiente que ya fue previamente confeccionado para esta instancia.

> *Ejercicio*
> Descargue el archivo [Dockerfile](Dockerfile) y utilicelo para generar una imagen. Con la imagen generada cree un contenedor que corra de forma interactiva el comando ```node```. Esto nos permitirá interactuar directamente con el motor de javascript para ejecutar nuestro primer comando en Node de la siguente manera:

```bash
> console.log('Hola mundo desde Node.js')
```

En el ejercicio anterior vimos como podemos trabajar de forma interactiva con Node.js, escribiendo instrucciones con sintáxis ECMAScript que se ejecutan inmediatamente. Sin embargo, este escenario no es el mas común a la hora de correr aplicaciones en producción, donde lo que se utilizan son scripts (archivos de texto) que ya tienen varias instrucciones escritas y que el motor ejecuta secuencialmente[*](#).

> *Ejercicio*
> Con la imagen generada en el ejercicio anterior cree un contenedor que corra el archivo [hola-mundo.js](hola-mundo.js) de la siguiente manera:

```bash
$ node hola-mundo.js
```


* _Mas adelante veremos que esta afirmación no es estrictamente cierta y que en Javascript es muy común que las instrucciones presentes en un archivo no se ejecuten secuencialmente._

[Siguiente -->](20170903-TiposDeDatos.md)
