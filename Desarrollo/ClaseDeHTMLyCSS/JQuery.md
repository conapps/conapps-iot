***
## **Algunas Definiciones**

Antes de poder utilizar "jQuery", es necesario agregar otros elementos a nuestro código HTML.

* **Elemento Script y el DOM**

El tag "script" es utilizado comunmente para manipular imagenes, validación de formas, modificaciones dinamicas del contenido, etc.

Para entender con mayor profundidad el funcionamiento de scripts y jQuery, debemos introducir primero el concepto de DOM (Document Object Model). El DOM es una representación estructurada del documento y define de qué manera los programas pueden acceder, al fin de modificar, tanto su estructura, estilo y contenido.

Por ejemplo: 

![alt text](https://www.w3schools.com/js/pic_htmltree.gif "DOM")

&nbsp;

O en una forma más gráfica:

![alt text](https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/DocumentObjectModelES.svg/280px-DocumentObjectModelES.svg.png "DOM")

&nbsp;

Entonces, volviendo a los elementos script, una pagina no puede ser manipulada de forma segura hasta que el DOM (Document Object Model) está pronto, para luego si poder ser manipulada.

Para asegurarnos de que esto sea así, es posible utilizar la función "Document Ready" (por ahora no veremos funciones en detalle), la cual se incluye dentro de un elemento "script". 

Por ejemplo:

```HTML
<script>
  $(document).ready(function() { });
</script>
```

De esta forma, todo el código definido dentro de la funcion "Document Ready" será ejecutado una vez que el navegador haya cargado correctamente la página.

Por último, para importar la librería jQuery en nuestro código, es recomendable ir a la fuente original "jQuery CDN" y obtener la URL desde allí. Luego debemos incluirla dentro de un elemento "script":

```html
<script src="https://code.jquery.com/jquery-3.2.1.js">
</script>
```

Como medida de seguridad, podemos agregar los atributos "integrity" y "crossorigin" que permitan verificar que la librería importada no pfue manipulada. Al agregarlos, el código quedaría de esta forma:


```html
<script src="https://code.jquery.com/jquery-3.2.1.js" integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE=" 
crossorigin="anonymous">
</script>
```

&nbsp;

***

## **Funciones jQuery**


Todas las funciones jQuery comienzan con el simbolo "$". 

Por ejemplo:

```html
$("button").addClass("animated bounce");
```

El simbolo "$", se utiliza para referenciar el objeto, en este caso los elementos "button". Luego, mediante "addClass" definimos que clases asignarle al objeto referenciado, en este caso las clases "animated" y "bounce".

Esta función genera un efecto de rebote en los elementos a los que se aplica. 

&nbsp;

***

## **Agregar Clases**

En este caso, las clases se agregan mediante el string **"addClass()"**.

Hagamos el siguiente ejercicio para fijar el concepto:

**Ejercicio-1:** Dado el código a continuación, implementar la función mencionada para generar un efecto rebote en los botones de la izquierda únicamente. Luego, aplicar las clase "fadeOut" únicamente al botón 6

OBS: es necesario importar las librerías jQuery, Bootstrap y Animated.css

Código a utilizar:
```html
<div class="container-fluid">
  <h3 class="text-primary text-center">jQuery Playground</h3>
  <div class="row">
    <div class="col-xs-6">
      <h4>#left-well</h4>
      <div class="well" id="left-well">
        <button class="btn btn-default target" id="target1">#botón1</button>
        <button class="btn btn-default target" id="target2">#botón2</button>
        <button class="btn btn-default target" id="target3">#botón3</button>
      </div>
    </div>
    <div class="col-xs-6">
      <h4>#right-well</h4>
      <div class="well" id="right-well">
        <button class="btn btn-default target" id="target4">#botón4</button>
        <button class="btn btn-default target" id="target5">#botón5</button>
        <button class="btn btn-default target" id="target6">#botón6</button>
      </div>
    </div>
  </div>
</div>
```

Como resumen, para referenciar objetos:

- por tipo: **$("button")**
- por clase: **$(".btn")**
- por id: **$("#botón1")**

Teniendo esto en cuenta, podemos agregar clases a un mismo objeto de diferentes formas. 

&nbsp;

**Ejercicio-2:** Utilizando el mismo código, agregar las clases "animated"‚ "shake" y "btn-primary" al botón1, pero utilizando las 3 referencias (id, tipo y clase).

&nbsp;

***

## **Remover Clases**

De la misma forma que agregamos clases a un elemento con la función **"addClass()"**, también podemos quitarlas con la función **"removeClass()"**.

Por ejemplo:

```cs
    $("button").removeClass("btn-default");
```

&nbsp;

***
## **Remover un Elemento**

También es posible remover un elemento HTML. Para esto, jQuery cuenta con la función **".remove()"**.

Por ejemplo:

```cs
    $("botón5").remove();

```
**OBS:**La función **".remove()"** no recibe parametros dentro de si misma, ya que la referencia se hace mediante el simbolo **"$"**.

&nbsp;

***

## **Modificar el CSS de un Elemento**

Dentro de las funciones de jQuery, tenemos la llamada **".css()"**, la cual nos permite modificar las propiedades CSS de un elemento.

Por ejemplo, para modificar el color del botón1:

```cs
$("#target1").css("color", "blue");
```

Observemos las diferencias que existen si lo comparamos con las declaraciones CSS normales. Podemos ver que los valores se definene entre comillas y la separacion no se realiza con dos puntos, sino con una coma.

&nbsp;


***

## **Deshabilitar un Elemento**

También es posible modificar las propiedades que no son CSS. Por ejemplo, mediante la funcion **".prop()"** podemos deshabilitar un botón y el mismo quedará grisado sin poder clickearse.

Por ejemplo:

```html
$(".botón1").prop("disabled", true);
```

&nbsp;


***

## **Modificar Texto Dentro de un Elemento**

Mediante jQuery, también es posible modificar el texto entre diferentes tags.

Existe una función llamada **".html()"** que permite agregar tags HTML y texto dentro de un elemento ya existente. Cualquier contenido dentro del elemento referenciado será remplazado con el contenido dentro de la función.

Por ejemplo:

```html
$("h3").html("<em>Texto nuevo</em>");
```

En este caso, el contenido de los elementos "h3" será remplazado con lo siguiente: 

```html
<em>Texto nuevo</em>
```
**OBS:**El tag **"em"** se utiliza para enfatizar texto 

Por otra parte, también existe la función llamada **".text()"**, la cual permite modificar únicamente el texto, sin agregar otro tag.

&nbsp;

***

## **Mover Elementos**

Utilizando la función **".appendTo"**, podemos seleccionar elementos HTML y agregarlos a otro elemento.

Por ejemplo, en el código que venimos utilizando, donde figuran botones en un recuadro izquierdo y botones en otro recuadro derecho, podríamos mover los botones de un recuadro a otro mediante el siguiente comando:

```cs
$("#botón4").appendTo("#left-well");
```

&nbsp;

***

## **Clonar Elementos**

Además de mover elementos, es posible copiarlos desde un lugar a otro. 

La función llamada **".clone"** permite realizar dicha acción.

Por ejemplo, para copiar el botón2 desde el recuadro izquierdo al recuadro derecho, utilizaríamos el siguiente código: 

```html
$("#botón2").clone().appendTo("#left-well");
```

Observemos que para realizar la acción debemos encadenar dos funciones. Este metodo se llama "function chaining".

&nbsp;

***

## "**Parents"**

Todo elemento HTML cuenta con un elemento llamado "parent", desde cual puede heredar propiedades. 

Por ejemplo:

```html
<div class="container-fluid">
  <h3 class="text-primary text-center">Título</h3>
</div>
```

En este código, el "div" es el "parent" del elemento "h3", y este ultimo hereda la clase "container-fluid".

Con jQuery podemos utilizar la función **".parent()"**, que permite acceder al "parent" de un elemento dado.

Entonces, el siguiente código aplicaría color azul al fondo del parent de "left-well":

```cs
$("#left-well").parent().css("background-color", "blue")
```

**Ejercicio:**Utilizando el código con botones, definir un fondo rojo para el "parent" del botón1.

&nbsp;

***

## **"Child"**

Asimismo, algunos elementos tambíen pueden tener un "children". Un elemento "children" heredará de su "parent".

Por ejemplo, cada elemento HTML es hijo del elemento "body".

Para utilizar esta estructura, jQuery cuenta con la función llamada **".children()"**, la cual permite acceder a las propiedades del hijo del elemento seleccionado. Por ejemplo:

```cs
$("#left-well").children().css("color", "blue")
```

&nbsp;

***

## "**Nth-Child"**
También es posible apuntar a un elemento especifico dentro de una clase o tipo de elemento. Para estom existen selectores CSS dentro de jQuery, por ejemplo el llamado **"target:nth-child(n)"**, donde "target" es el elemento a referenciar. Mediante este selector, podemos apuntar a los enesimos elementos dentro de una clase o tipo de elemento.

Por ejemplo, teniendo en cuenta el siguiente código:

```html
<div class="well" id="left-well">
        <button class="btn btn-default target" id="target1">#target1</button>
        <button class="btn btn-default target" id="target2">#target2</button>
        <button class="btn btn-default target" id="target3">#target3</button>
      </div>

<div class="well" id="right-well">
        <button class="btn btn-default target" id="target4">#target4</button>
        <button class="btn btn-default target" id="target5">#target5</button>
        <button class="btn btn-default target" id="target6">#target6</button>
      </div>
```
Para apuntar al tercer elemento de los elementos con clase "btn" y agregarles la animación "animated bounce", podemos utilizar el selector de esta forma:

```cs
 $(".btn:nth-child(3)").addClass("animated bounce");
```

**Ejercicio:**De que otra forma podemos definir el selector para lograr el mismo resultado?

&nbsp;

***

## **"Pares e Impares"**
Si quisieramos apuntar a los elementos con números pares o impares, podemos utilizar los siguientes selectores:

```cs
$(".target:odd").addClass("animated shake"); 
$(".target:even").addClass("animated shake");
```

Por ejemplo, si utilizaramos el siguiente código:

```cs
 $(".btn:odd").addClass("animated bounce");
```

Estaríamos apuntando a los botones 1, 3, 5, etc.



