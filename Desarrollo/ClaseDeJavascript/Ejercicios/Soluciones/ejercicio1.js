var nombre = "Juan";
var apellido = "Perez";

console.log('El nombre es...');
// Imprima en la consola el contenido de la variable nombre
console.log(nombre);

console.log('La primer letra de apellido es...');
// Imprima en la consola la primer letra del apellido utilizando la funcion .charAt()
console.log(apellido.charAt(0));

console.log('El nombre en mayuscula es...');
// Imprima en la consola el contenido de la variable nombre con todas las letras en mayúscula
console.log(nombre.toUpperCase());

console.log('El nombre completo es...');
/* Genere una variable llamada nombreCompleto e inicialicela con la concatenación del contenido de las variables nombre y apellido separadas por un espacio.
Imprima el contenido de nombreCompleto. */
var nombreCompleto = nombre + ' ' + apellido;
console.log(nombreCompleto);

console.log('La cantidad de letras de apellido es...');
// Imprima en consola la cantidad de letras que contiene la variable apellido.
console.log(apellido.length);

console.log('A continuacion el nombre entre comillas...');
// Imprima en consola el nombre entre comillas.
console.log('"' + nombre + '"');