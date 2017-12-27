***
## **Comenzamos con jQuery**

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

Por último, para importar la librería jQuery en nuestro código, es recomendable ir a la fuente original "jQuery CDN" y obtener la URL desde allí.

&nbsp;

***

## **Funciones jQuery**

Todas las funciones jQuery
