var estudiantes = [
    {
        nombre: 'Juan',
        apellido: 'Perez',
        nacionalidad: 'Uruguay',
        edad: 35,
        tieneBeca: true,
        calificaciones: [
            {
                periodo: 2017,
                matematica: 90,
                fisica: 90,
                historia: 90
            },
            {
                periodo: 2016,
                matematica: 90,
                fisica: 94,
                historia: 90
            },
            {
                periodo: 2015,
                matematica: 90,
                fisica: 60,
                historia: 90
            }
        ]
    },
    {
        nombre: 'John',
        apellido: 'Doe',
        nacionalidad: 'Estados Unidos',
        edad: 15,
        tieneBeca: false,
        calificaciones: [
            {
                periodo: 2017,
                matematica: 80,
                fisica: 70,
                historia: 90
            },
            {
                periodo: 2016,
                matematica: 90,
                fisica: 44,
                historia: 50
            },
            {
                periodo: 2015,
                matematica: 15,
                fisica: 60,
                historia: 85
            }
        ]
    },
    {
        nombre: 'Max',
        apellido: 'Mustermann',
        nacionalidad: 'Alemania',
        edad: 80,
        tieneBeca: true,
        calificaciones: [
            {
                periodo: 2017,
                matematica: 50,
                fisica: 90,
                historia: 90
            },
            {
                periodo: 2016,
                matematica: 65,
                fisica: 94,
                historia: 90
            },
            {
                periodo: 2015,
                matematica: 90,
                fisica: 60,
                historia: 90
            }
        ]
    },
    {
        nombre: 'Ivan',
        apellido: 'Horvat',
        nacionalidad: 'Croacia',
        edad: 20,
        tieneBeca: false,
        calificaciones: [
            {
                periodo: 2017,
                matematica: 91,
                fisica: 20,
                historia: 20
            },
            {
                periodo: 2016,
                matematica: 90,
                fisica: 94,
                historia: 90
            },
            {
                periodo: 2015,
                matematica: 90,
                fisica: 60,
                historia: 90
            }
        ]
    },
    {
        nombre: 'Yamada',
        apellido: 'Taro',
        nacionalidad: 'Japon',
        edad: 25,
        tieneBeca: true,
        calificaciones: [
            {
                periodo: 2017,
                matematica: 90,
                fisica: 10,
                historia: 20
            },
            {
                periodo: 2016,
                matematica: 80,
                fisica: 94,
                historia: 90
            },
            {
                periodo: 2015,
                matematica: 75,
                fisica: 60,
                historia: 90
            }
        ]
    }
];


console.log('Imprimiendo nombre y apellido de cada estudiante...');
// Imprimir a consola el nombre y apellido de todos los estudiantes en el siguiente
// formato "apellido, nombre"
for (var i = 0; i < estudiantes.length; i++) {
    console.log(estudiantes[i].apellido + ', ' + estudiantes[i].nombre);
}


console.log('El promedio de edad de los estudiantes es: ');
// Imprimir a consola el promedio de edad de los estudiantes.
var promedioDeEdad = 0;
for (var i = 0; i < estudiantes.length; i++) {
    promedioDeEdad += estudiantes[i].edad;
}
promedioDeEdad /= estudiantes.length;
console.log(promedioDeEdad);


console.log('El promedio de edad de los estudiantes con beca es: ');
// Imprimir a consola el promedio de edad de los estudiantes con beca
var promedioDeEdad = 0;
var contador = 0;
for (var i = 0; i < estudiantes.length; i++) {
    if (estudiantes[i].tieneBeca) {
        promedioDeEdad += estudiantes[i].edad;
        contador++
    }
}
promedioDeEdad /= contador;
console.log(promedioDeEdad);


console.log('Imprimiendo la ficha completa de los estudiantes...');
/*Imprimir la ficha completa de los estudiantes en el siguiente formato respetando tabulación
* <apellido>, <nombre>
*     Edad: <edad>
*     Nacionalidad: <nacionalidad>contador
*     Becado: SI/NO
* */
for (var i = 0; i < estudiantes.length; i++) {
    console.log(estudiantes[i].apellido + ', ' + estudiantes[i].nombre);
    console.log('\tEdad: ' + estudiantes[i].edad);
    console.log('\tNacionalidad: ' + estudiantes[i].nacionalidad);
    var textoBeca = estudiantes[i].tieneBeca ? 'SI' : 'NO';
    console.log('\tBecado: ' + textoBeca);
}


console.log('Imprimientdo jovenes promesas...');
// Imprimir nombre y apellido de aquellos estudiantes menores a 21 años, que no tengan beca y que tengan calificaciones
// en matemática de al menos 90 para los tres periodos. Resolver el ejercicio utilizando while().
var indice = 0;
while (indice < estudiantes.length) {
    var cumpleConCalificaciones = estudiantes[indice]['calificaciones'][0]['matematica'] >= 90 &&
        estudiantes[indice]['calificaciones'][1]['matematica'] >= 90 &&
        estudiantes[indice]['calificaciones'][2]['matematica'] >= 90;
    if (estudiantes[indice].edad < 21 && !estudiantes[indice].tieneBeca && cumpleConCalificaciones) {
        console.log(estudiantes[indice].nombre + ' ' + estudiantes[indice].apellido);
    }
    indice++;
}




var materias = ['matematica', 'fisica', 'historia'];
console.log('Imprimiendo resultados...');
/*Imprimir los resultados de todos los alumnos utilizando el formato que se muestra a continuación. Para resolver este
* ejercicio NO se pueden escribir las palabras 'matematica', 'fisica' ni 'historia'
*
* <apellido>, <nombre>:
*   Periodo: <periodo>
*       MATEMATICA: <calificacion>
*       FISICA: <calificacion>
*       HISTORIA: <calificacion>
*   ...
*   ...
*   ...
*   Periodo: <periodo>
*       MATEMATICA: <calificacion>
*       FISICA: <calificacion>
*       HISTORIA: <calificacion>
*
* */
for (var i = 0; i < estudiantes.length; i++) {
    console.log(estudiantes[i].apellido + ', ' + estudiantes[i].nombre);
    for (var j = 0; j < estudiantes[i].calificaciones.length; j++) {
        console.log('\tPeriodo: ' + estudiantes[i].calificaciones[j].periodo);
        for (var n = 0; n < materias.length; n++) {
            console.log('\t\t' + materias[n].toUpperCase() + ': ' + estudiantes[i].calificaciones[j][materias[n]]);
        }
    }
}


