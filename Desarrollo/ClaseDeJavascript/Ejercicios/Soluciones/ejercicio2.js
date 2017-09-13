var numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

console.log('Imprimiendo todos los numeros en orden ascendente:');
// Imprimir a consola todos los numeros en orden ascendente
for (var i = 0; i < numeros.length; i++) {
    console.log(numeros[i]);
}


console.log('Imprimiendo todos los numeros pares en orden ascendente:');
// Imprimir a consola todos los numeros pares en orden ascendente
for (var i = 0; i < numeros.length; i++) {
    if (numeros[i] % 2 == 0) {
        console.log(numeros[i]);
    }
}


console.log('Imprimiendo todos los numeros en orden descendiente:');
// Imprimir a consola todos los numeros en orden descendiente
for (var i = numeros.length - 1; i >= 0; i--) {
    console.log(numeros[i]);
}


console.log('Imprimiendo los numeros de  tres en tres:');
// Imprimir a consola los numeros de tres en tres, en este caso: 1, 4, 7, 10, 13, 16, 19
for (var i = 0; i < numeros.length; i += 3) {
    console.log(numeros[i]);
}


console.log('La suma de todos los numeros es:');
// Imprimir a consola la suma de todos los numeros
var suma = 0;
for (var i = 0; i < numeros.length; i++) {
    suma += numeros[i];
}
console.log(suma);


var numerosAdicionales = [21, 22, 23, 24, 25]
console.log('Imprimiendo todos los numeros y los numeros adicionales... ');
/* Concatenar el contenido de numerosAdicionales al final de la lista llamada numeros e
imprimir el array resultante en orden ascendente */
for (var i = 0; i < numerosAdicionales.length; i++) {
    numeros.push(numerosAdicionales[i]);
}
for (var j = 0; j < numeros.length; j++) {
    console.log(numeros[j]);
}
