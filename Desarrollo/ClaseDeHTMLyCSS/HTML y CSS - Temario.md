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

























