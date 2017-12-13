## **Significado. Cómo funciona?**
Creada en 1980 con el propósito de mejorar la forma de compartir y leer documentos, sobre todo para investigadores.

El lenguaje permite tomar texto plano en cualquier editor de texto, y organizarlo en listas, link a otros sitios, agregado imágenes y mas.

HTML: Hyper Text Markup Language

Hypertext: Texto con mayores capacidades, interectivo.

Markup Language: Una forma de marcar texto, asignando o especificando atributos tales como fuentes, tamaños, listas, links, imágenes, etc.


&nbsp;

&nbsp;

***

## **Como crear un archivo HTML?**

Creando un archivo de texto cualquiera, modificando la extensión a .html

Luego lo podemos abrir con el propio navegador o editor html


&nbsp;

&nbsp;

***

## **Lectura de archivos HTML**

Ejecutar el archivo de texto .html con cualquier navegador. Editor online: http://cssdeck.com/labs

&nbsp;

&nbsp;

***

## **Definir el contenido**

En la mayoría de los casos, el contenido se colocará entre tags HTML, con su correspondiente apertura y cierre.

Ejemplo: 

```HTML
<h1>Texto entre tags</h1>
```

&nbsp;

&nbsp;

***

## **Uso de “Tags”**

Los tags le dicen al navegador la forma o estructura del contenido del sitio.

* **Cabezales:**

```HTML
<h1>, <h2>, <h3>, <h4>, <h5>, <h6>
```

&nbsp;

* **Párrafos:**

```HTML
<p>
```

&nbsp;

* **Comentarios:**

```HTML
<!-- comentario -->
```

&nbsp;



***

## **Comenzamos con CSS (Cascading Style Sheets), “Styles”**

Dentro del elemento “Style”, podemos crear selectores CSS para varios elementos al mismo tiempo. Por ejemplo, para que todos los elementos bajo el tag h2 sean rojos:

```HTML
<style>
  h2 {color: red;}
</style>
```

&nbsp;
* **“Style”, dentro de un tag:**

```HTML
<h1 style="color: red">texto en rojo</h1>
```
o también:

```HTML
<style>
  .red-text {
    color: red;
  }
</style>

<h1 style="color: red">texto en rojo</h1>
```

&nbsp;

* **Clases**

Son estilos reutilizables que pueden ser agregados a los elementos HTML. Por ejemplo:

```HTML
<style>
  .red-text {
    color: red;
  }
</style>

<h2 class="red-text">Texto que aparecerá en rojo</h2>
```

**OBS**: vemos que las clases se deben crear con un “.” al principio, pero no así al invocarlas.

&nbsp;

* **Font-size**

Dentro del Style, es posible modificar el tamaño de fuente (el mismo se mide en pixels "px"):

```HTML
<style>
  .red-text {
    color: red;
    font-size: 16px;
  }
</style>

<h2 class="red-text">Texto que aparecerá en rojo</h2>
```

&nbsp;

Para lograr que todos los tags “p” cuenten con las características definidas , también es posible definirlo de esta forma:

```HTML
<style>
  p {
  color: red;
  font-size: 16px;
  }
</style>
```

&nbsp;

* **Font-family**

Mediante esta propiedad, podemos elegir el tipo de letra a utilizar: 

```HTML
<style>
  .red-text {
    color: red;
  }
  p {
    font-size: 16px;
    font-family: Monospace;
  }
</style>
```

&nbsp;

* **Google fonts**

También es posible utilizar fuentes de "google". Para esto es necesario "llamarlas" desde google, referenciando el tipo de letra en un link.  

&nbsp;  

En este caso, colocamos el link en la parte superior del código, antes del "Style". Luego, podemos llamar la nueva fuente utilizando el "font-family":

```HTML
<link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet" type="text/css">

<style>
  .red-text {
    color: red;
  }
  p {
    font-size: 16px;
    font-family: Lobster;
  }
</style>
```

&nbsp;

* **Font-family degradation**

Al realizar llamadas a fuentes externas, es posible que la misma no esté disponibe en algún momento. Para estos casos, podemos definir alternativas. Esto se conoce como "degradation", y se realiza de esta forma:

```HTML
<style>
  h2 {
    font-family: Lobster, Monospace;
  }
</style>
```

Para este caso, si la fuente "Lobster" no estuviera disponible por algún motivo, se utilizará "Monospace".


&nbsp;

&nbsp;

***

## **Agregando Imagenes**

* **Tag "img"**

Mediante el tag "img", podemos agregar imagenes a nuestro sitio web, apuntando a una URL especifica con el atributo "src".

Por ejemplo:

```HTML
<img src="https://www.your-image-source.com/your-image.jpg">
```

A su vez, todas las imagenes **deben** contar con el atributo "alt". El texto ingresado dentro de dicho atributo será desplegado en caso de que la imagen no pueda ser  desplegada.
Por ejemplo:

```html
<img src="https://bit.ly/fcc-relaxing-cat" alt="gatitos">
```

&nbsp;

* **Propiedad "width"**  

Una de las propiedades de CSS es la llamada "width", mediante la cuel es posible controlar el ancho de una imagen. Al igual que las fuentes, el ancho de una imagen se mide en pixels "px". 
</br>

Por ejemplo:

```html
<style>
  .imagen-grande {
    width: 500px;
  }
</style>
```

&nbsp;

* **Borders**  

Los bordes en CSS cuentan con propiedades como **"style"**, **"color"** y **"width"**.
</br>

Por ejemplo, si quisieramos crear un borde sobre un elemento HTML, que sea rojo y de 5 pixeles, podríamos utilizar esta clase:

```html
<style>
  .thin-red-border {
    border-color: red;
    border-width: 5px;
    border-style: solid;
  }
</style>
```

**OBS:** Es posible aplicar multiples clases a un mismo elemento separando cada clase con un espacio, por ejemplo:

```html
<img class="class1 class2">
```
</br>


Para definir bordes redondeados, podemos utilizar la propiedad **"border-radius"**. La misma también cuenta con la medida en px, pero también puede definirse como porcentaje, haciendola completamente circular.
</br>

Por ejemplo:

```html
<style>
  .thin-red-border {
    border-radius: 10px;
  }
</style>
```

o

```html
<style>
  .thin-red-border {
    border-radius: 50%;
  }
</style>
```

&nbsp;

&nbsp;

***

## **Links a Otras Páginas con el Tag "a"**
Los elementos "a" (llamados "anchor" o ancla) son utilizados para definir un link hacia otras páginas.  
</br>

Ejemplo: 
```html
<a href="http://www.freecatphotoapp.com">Fotos de gatitos</a>
```

&nbsp;

* **Concepto de "nest" o "nesting"**

También podemos utilizar el tag "a" dentro de otros tags. Este es un diagrama que muestra la estructura de un tag "a", donde se utiliza el elemento "a" en el medio del elemento "p" (párrafo), por lo que el link aparecerá en el medio de la sentencia:

![alt text](https://i.imgur.com/hviuZwe.png "Diagrama")

y quedaría de esta forma:
<p>Here's a <a href="http://freecodecamp.org"> link to Free Code Camp</a> for you to follow.</p>

&nbsp;

* **Uso de "dead links"**

En algunos casos, es conveniente agregar elementos "a" en nuestro sitio, incluso antes de conocer hacia donde apuntan. Esto puede resultar útil cuando un link puede cambiar mediante el uso de **jQuery** (a ver más adelante...).
</br>

Para esto, se utiliza el valor "#" en el campo "href" del elemento "a". Por ejemplo:

```html
<a href="#">texto asociado a la imagen</a>
```

&nbsp;

* **Una imagen como link"**

Es posible definir una imagen como link. Para esto, simplemente debemos hacer un nesting de la imagen dentro de un elemento "a".
</br>

Por ejemplo: 

```html
<a href="#">
  <img src="https://bit.ly/fcc-running-cats" alt="Tres gatitos corriendo.">
</a>
```

&nbsp;

&nbsp;

***

## **Uso de Listas**

HTML cuenta con un elemento particular para el armado de listas desordenadas y otro para listas ordenadas. Para esto se utilizan los tags **"ul"** y **"ol"**.  
Por otra parte, para cada elemento de la lista se utiliza el tag "li".
</br>

Por ejemplo,
</br>

Listas desordenadas:

```html
<ul>
  <li>Pan</li>
  <li>1 Bizcocho</li>
  <li>Velas Rojas</li>
</ul>
```
</br>

Listas ordenadas:

```html
<ol>
  <li>Pagar cuentas</li>
  <li>Estudiar Markdown</li>
  <li>Bañar al gato</li>
</ol>
```

&nbsp;

&nbsp;

***

## **Campos de Texto**

Los campos de texto se utilizan, por ejemplo, para solicitar ingreso de datos al usuario:

Ingrese su edad: <input type="text">  

Se crean utilizando el siguiente tag:

```html
<input type="texto">
```
</br>

También es posible definir texto dentro del recuadro de ingreso, el cual será desplegado antes de ingresar algún caracter:

<input type="text" placeholder="texto previo...">

Se crean agregando el parámetro "placeholder" al tag anterior:

```html
<input type="text" placeholder="texto previo...">
```

&nbsp;

&nbsp;

***

## **Forms**
También podemos crear campos de texto que envíen datos a un servidor. Esto se puede realizar creando un elemento "form" y luego asignandole una acción mediante el parámetro "action".

Por ejemplo: 
```html
<form action="/url destino"></form>
```

Una vez que tenemos el elemento "form" creado, podemos hacer un "nesting" del "imput" de esta forma: 

```html
<form action="/url destino">
  <input type="text" placeholder="texto">
</form>
```
</br>

* **Submit Button**

También es posible agregar un botón "submit" al elemento "form". Al hacer click en este botón, los datos seran enviados a la URL especificada.

Por ejemplo: <button type="submit">Botonaso para enviar datos</button>

Este es el código asociado:

```html
<button type="submit">this button submits the form</button>
```

Al colocarlo dentro del elemento "form", podría quedar de esta forma:

```html
<form action="/url destino">
  <input type="text" placeholder="texto">
  <button type="submit">submit</button>
</form>
```
<form action="/url destino">
  <input type="text" placeholder="texto">
  <button type="submit">Botonaso para enviar datos</button>
</form>

</br>

</br>

* **Fields Requeridos**

Mediante el argumento "required", dentro del elemento "imput", podemos definir que campos serán obligatorio completar previo a enviar los datos.

Por ejemplo:
```html
<form action="/url destino">
  <input type="text" placeholder="texto" required>
  <button type="submit">Botonaso para enviar datos</button>
</form>
```

<form action="/url destino">
  <input type="text" placeholder="texto" required>
  <button type="submit">Botonaso para enviar datos</button>
</form>

</br>

</br>

* **Radio Buttons**

Estos botones me permiten por ejemplo predefinir las respuestas para que el usuario eliga una de ellas.

Por ejemplo:

<label><input type="radio" name="indoor-outdoor"> Un pibe (18-25)</label>
<label><input type="radio" name="indoor-outdoor"> Joven (26-32)</label>
<label><input type="radio" name="indoor-outdoor"> Un Viejo (33-99)</label>

Para definirlos, simplemente debemos hacer un "nesting" del elemento "imput" dentro de un nuevo elemento "label"

Nótese que puedo seleccionar una única opcion. Esto es debido a que los botones están vinculados con un mismo "name":

```html
<label><input type="radio" name="indoor-outdoor"> Un pibe (18-25)</label>
<label><input type="radio" name="indoor-outdoor"> Joven (26-32)</label>
<label><input type="radio" name="indoor-outdoor"> Un Viejo (33-99)</label>
```

</br>

</br>

* **CheckBoxes**

En caso de presentar mas de una opcion posible, podemos utilizar "checkboxex". Estos son "imputs" del tipo "checkbox".

Por ejemplo:

<label><input type="checkbox" name="sentimientos"> Cansado</label>
<label><input type="checkbox" name="sentimientos"> Enamorado</label>
<label><input type="checkbox" name="sentimientos"> Estreñido</label>

```html
<label><input type="checkbox" name="sentimientos"> Cansado</label>
<label><input type="checkbox" name="sentimientos"> Enamorado</label>
<label><input type="checkbox" name="sentimientos"> Estreñido</label>
```

</br>

Tanto los "checkbox" como los "radio buttons", pueden ser configurados para pre-seleccionados por defecto.

Por ejemplo:
<label><input type="checkbox" name="sentimientos" checked> Cansado</label>
<label><input type="checkbox" name="sentimientos"> Enamorado</label>
<label><input type="checkbox" name="sentimientos"> Estreñido</label>

Para esto, simplemente agregamos la palabra "checked" al final del elemento "imput", de esta forma:

```html
<label><input type="checkbox" name="sentimientos" checked> Cansado</label>
```

&nbsp;

&nbsp;

***


## **Elemento "div"**

El elemento "div" es muy útil para referenciar bloques de código y aplicar propiedades de clases CSS previamente definidas.

Por ejemplo, podríamos encerrar dos listas dentro de un elemento "div", para luego asignarle una clase a todo lo que este contenido dentro del "div".

Entonces, si creamos una nueva clase en el elemento "style" que modifique el color de fondo, podemos asignar esta clase al "div" en lugar de asignarlo a cada elemento de forma individual.

Este es un ejemplo:

```html
<style>
  .fondo-verde {
    background-color:green;
  }
</style>

<div class="fondo-verde">
  <ul>
    <li>Pan</li>
    <li>1 Bizcocho</li>
    <li>Velas Rojas</li>
  </ul>

  <ol>
    <li>Pagar cuentas</li>
    <li>Estudiar Markdown</li>
    <li>Bañar al gato</li>
  </ol>
</div>
```
Y este código se vería de esta forma espantosamente fea:
<style>
  .fondo-verde {
    background-color:green;
  }
</style>

<div class="fondo-verde">
  <ul>
    <li>Pan</li>
    <li>1 Bizcocho</li>
    <li>Velas Rojas</li>
  </ul>

  <ol>
    <li>Pagar cuentas</li>
    <li>Estudiar Markdown</li>
    <li>Bañar al gato</li>
  </ol>
</div>


&nbsp;

&nbsp;

***


## **"Id" de un Elemento**

Además de clases, cada elemento HTML puede tener también un atributo llamado "id".

Los atributos "id" deberían ser únicos, sin embargo no hay una verificación de que esto sea así, sino mas bien se define por convención.

Por ejemplo: 

```html
<h2 id="La foto de un gatito">
```

Una vez que definimos "id", podemos aplicarle "Styles" mediante CSS de esta forma:

```html
<style>
#La-foto-de-un-gatito {
  background-color: green;
}
</style>
```
Como observación, las clases se referencian con un **"."**, pero los id se referencian con un **"#"**.
&nbsp;

&nbsp;

***


## **Padding, Margin, y Border**
Todos los elementos HTML son esencialmente rectángulos, los cuales tienen propiedades que definen el espacio que los rodea o mejor dicho el espacio que contienen.

Estas propiedades son llamadas "padding", "margin" y "border"



&nbsp;

* **Padding**

Esta propiedad controla la cantidad de espacio entre el elemento y su borde.

Por ejemplo:

<style>
  .texto-predefinido {
    margin-bottom: -25px;
    text-align: center;
  }

  .caja {
    border-style: solid;
    border-color: black;
    border-width: 5px;
    text-align: center;
  }

  .caja-amarilla {
    background-color: yellow;
    padding: 10px;
  }
  
  .caja-roja {
    background-color: red;
    padding: 20px;
  }

  .caja-verde {
    background-color: green;
    padding: 10px;
  }
</style>
<h5 class="texto-predefinido">margin</h5>

<div class="caja caja-amarilla">
  <h5 class="caja caja-roja">padding</h5>
  <h5 class="caja caja-verde">padding</h5>
</div>

En esta figura vemos que los recuadros verde y rojo están incluidos dentro del recuadro amarillo. A su vez, el recuadro rojo tiene mayor "padding" que el verde.

**Ejercicio:** Teniendo en cuenta el código para los recuadros mostrados, modificar el "padding" del recuadro verde para que sea igual al recuadro rojo.

```html
<style>
  .texto-predefinido {
    margin-bottom: -25px;
    text-align: center;
  }

  .caja {
    border-style: solid;
    border-color: black;
    border-width: 5px;
    text-align: center;
  }

  .caja-amarilla {
    background-color: yellow;
    padding: 10px;
  }
  
  .caja-roja {
    background-color: red;
    padding: 20px;
  }

  .caja-verde {
    background-color: green;
    padding: 10px;
  }
</style>
<h5 class="texto-predefinido">margin</h5>

<div class="caja caja-amarilla">
  <h5 class="caja caja-roja">padding</h5>
  <h5 class="caja caja-verde">padding</h5>
</div>
```

&nbsp;

También es posible modificar el "padding" de cualquiera de los cuatro lados del elemento: **"padding-top"**, **padding-right**, **padding-bottom** y **padding-left**

**Ejercicio:** Modificar el "padding" de la caja verde, pero únicamente sobre los lados superior e izquierdo. Luego definir valores diferentes para los lados inferior y derecho. Evaluar resultados.

&nbsp;

En lugar de especificar cada lado por eseparado, también es posible definir el "padding" de cada lado en una única sentencia. por ejemplo:

```html
padding: 10px 20px 10px 20px;
```

Estos valores corresponden de esta forma: superior, derecha, inferior, izquierda.

&nbsp;

* **Margin**

La propiedad "margin" define la cantidad de espacio entre el borde de un elemento y los elementos que lo rodean.

En esta imagen de ejemplo, podemos ver que la caja roja tiene mas "margin" que la verde:


<style>
  .texto-predefinido {
    margin-bottom: -25px;
    text-align: center;
  }

  .caja {
    border-style: solid;
    border-color: black;
    border-width: 5px;
    text-align: center;
  }

  .caja-amarilla {
    background-color: yellow;
    padding: 10px;
  }
  
  .caja-roja {
    background-color: red;
    padding: 20px;
    margin: 20px;
  }

  .caja-verde {
    background-color: green;
    padding: 10px;
    margin: 10px;
  }
</style>
<h5 class="texto-predefinido">margin</h5>

<div class="caja caja-amarilla">
  <h5 class="caja caja-roja">padding</h5>
  <h5 class="caja caja-verde">padding</h5>
</div> 

Si aumentamos el margen de la caja verde, aumenta la distancia entre su borde y los elementos que lo rodean.

&nbsp;

**Ejercicio:** Intenten agregar la propiedad "margin" a las cajas verde y roja para lograr una imagen similar a la de arriba.

Por el contrario, si disminuimos el "margin", la distancia entre los bordes y el resto de los elementos disminuye.

&nbsp;

**Ejercicio:** Intenten definir "margin" negativo para la caja verde y evalúen el resultado.

&nbsp;

***
## **Body**
Otro elemento en HTML es el llamado "Body". El mismo representa el cuerpo entero de la página y también cuenta con propiedades modificables. 

Por ejemplo, podemos modificar su color mediante esta sentencia:

```html
body {
  background-color: black;
}
```


&nbsp;

***

## **Overrides**

**Ejercicio-1:** Intenten crear ualgunos elementos h1 y h2 con un texto cualquiera, para luego modificar su color y tipo de letra pero agregando propiedades dentro del "body".

**Ejercicio-2:** Luego observemos que ocurre cuando creamos una clase llamada "texto-rosado" que también modifique el color a rosado y se la apliquemos al texto ya creado. 

**Ejercicio-3:** Crear una segunda clase llamada "texto-azul" que modifique el color del texto a azul y aplicarsela al mismo elemento que ya contaba con la clase "texto-rosado". Cual tiene preferencia?

**Ejercicio-4:** Crear un id que tenga como propiedad el color anaranjado y asignarselo a uno de los elementos h1 y h2. Cual tiene preferencia entre todos?

**Ejercicio-5:** Asignar un "in-line style" que defina el color blanco a uno de los elementos h1. Observen la precedencia. Esta es la nomenclatura: 

```html
<h1 style="color: green">"
```

&nbsp;

Entonces, en resumen, podríamos afirmar lo siguiente:

- Las clases hacen "override" sobre las propiedades definidas en el body

- Si asignamos dos clases a un mismo elemento, los atributos que se pisen quedarán definidos por la ultima clase declarada en el "style"

- Las propiedades del "id" hacen "override" sobre las propiedades de las clases

- El tipo de style "in-line" hace "override" sobre todas las declaraciones en el "style"

&nbsp;


* **Keyword "!important"**

Para los casos en los que nos queremos asegurar que un elemento reciba las propiedades adecuadas, podemos utilizar la palabra "!important" al costado de dicho elemento. Este tomará precedencia frente a cualquier otra propiedad.

Por ejemplo: 

```html
<style>

  .texto-rosado {
    color: pink !important;
  }
  .texto-azul {
    color: blue;
  }
</style>
```


&nbsp;

***

## **Representación de Colores**

Los colores que venimos utilizando pueden ser definidos de distintas formas. 

Representación hexadecimal:

```html
<style>

  .texto-negro *
  {
    color: #000000;
  }
</style>
```
En esta representación se utilizan 2 digitos por cada color: rojo, verde y azul.

También se pueden abreviar y en lugar de utilizar 6 digitos, se definen con 3, donde cada color tiene un único digito. En este caso, el rojo pasa de **"#FF0000"** a **"#F00"**

&nbsp;

Representación RGB (red, green, blue):

```html
<style>
  body {
    background-color: rgb(0, 0, 0);
  }
</style>
```

&nbsp;

***

## **Uso de Bootstrap**

Bootstrap es una librería o framework utilizada para el diseño web. 

&nbsp;

**Auto-Ajuste del tamaño de Página**

Entre otras cosas, podemos hacer que la página web ajuste sus medidas de forma automatica dependiendo del tamaño de la pantalla con la que estemos accediendo a la misma.

De esta forma, no requeriremos definir diferentes páginas para diferentes dispositivos de acceso.

Para poder utilizarla, debemos referenciar la librería con el elemento "link" de esta forma:

```html
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css"/>
```

Para lograr automatizar el ajuste del tamaño de la página, podemos utilizar la clase "container-fluid", asignandosela a los elementos HTML que contenga la misma.

**Ejercicio-1:** Tomemos el código recientemente credo con las fotos de gatitos, agregemos un "div" que englobe todos los elementos HTML, por ultimo a este div asignarle la clase **"container-fluid"**, la cual viene dentro de la librería "bootstrap".

&nbsp;

**Auto-Ajuste del tamaño de Imagenes**

También es posible automatizar el ajuste del tamaño para las imagenes. Esto se logra definiendo la clase **"img-responsive"** a una imagen. Por ejemplo:

```html
  <img src="https://bit.ly/fcc-running-cats" class="img-responsive" alt="Tres gatitos re tiernos corriendo ">
```

&nbsp;

**Centrado de Texto**

Mediante esta librería, tambien es posible centrar texto para que quede mas lindo. Lo único que deberíamos hacer es agregar la clase **"text-center"** a un elemento HTML:

```html
<h2 class="text-center">texto mucho mas lindo</h2>
```

&nbsp;

**Botones**

Bootstrap también cuenta con sus propios "styles" para los botones, y que también se ven mucho mas lindos :)

Para esto, simplemente agregamos la clase **"btn"** a uno de nuestros botones:

```html
<button class="btn"> Botón mucho mas lindo y en este caso largo</button>
```

Normalmente, el largo del botón definido dependerá del texto que contenga. PEro es posible definirlo pra que tome todo el largo disponible. Para esto, podemos utilizar la clase **"btn-block"**.

Mediante la clase **"btn-primary"**, podemos resaltar el botón, dandole un color predefinido. Como observación, las clases asociadas a los botones pueden también se pueden asociar, entonces podríamos tener un boton definido de esta forma:

```html
<button class="btn btn-block btn-primary"> Botonaso!</button>
```

Mediante la clase **"btn-info"**, podemos llamar la atención del usuario a visualizar una acción opcional, por ejemplo un botón de "más información". Esta clase le asignará otro color predefinido, menos llamativo que la clase "btn-primary".

También contamos con la clase **"btn-danger"**, generalmente utilizada para comunicar al usuario que la acción será destructiva, por ejemplo el borrado de una foto.

&nbsp;

**Grids**

Mediante Bootstraps también podemos hacer uso de **"grids"** o cuadriculas. Esto permite colocar elementos ordenados según filas y columnas como en una tabla.

Para utilizar "grids", es necesario utilizar la clase **"row"**, la cual se aplica a los elementos html. A su vez,las filas cuentan con 12 espacios predefinidos, tal como se muestra en la siguiente imagen:

  <a href="#"><img  src="https://i.imgur.com/FaYuui8.png" alt="A cute orange cat lying on its back. "></a>

Luego, es ncesario definir el tamaño de la fila (xs, sm, md,lg) y la cantidad de columnas que utilizará de las 12 preestablecida. Estos parametros se incluyen en el nombre de la clase. Por ejemplo ".col-**xs**-**4**"

Ejemplo con 3 botones:

```html
  <div class="row">

    <div class="col-xs-4">
      <button class="btn btn-block btn-primary">Me gusta</button>
    </div>

    <div class="col-xs-4">
      <button class="btn btn-block btn-info">Info</button>
    </div>

    <div class="col-xs-4">
      <button class="btn btn-block btn-danger">Borrar</button>
    </div>

  </div>
```































