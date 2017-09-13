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
                matematica: 20,
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



console.log('El promedio de edad de los estudiantes es: ');
// Imprimir a consola el promedio de edad de los estudiantes.



console.log('El promedio de edad de los estudiantes con beca es: ');
// Imprimir a consola el promedio de edad de los estudiantes con beca



console.log('Imprimiendo la ficha completa de los estudiantes...');
/*Imprimir la ficha completa de los estudiantes en el siguiente formato respetando tabulación
* <apellido>, <nombre>
*     Edad: <edad>
*     Nacionalidad: <nacionalidad>
*     Becado: SI/NO
* */



console.log('Imprimientdo jovenes promesas...');
// Imprimir nombre y apellido de aquellos estudiantes menores a 30 años, que tengan beca y que hayan mejorado sus
// calificaciones en matematica año a año durante los 3 periodos. Resolver el ejercicio utilizando while().



console.log('Imprimiendo resultados...');
var materias = ['matematica', 'fisica', 'historia'];
/*Imprimir los resultados de todos los alumnos utilizando el formato que se muestra a continuación. Para resolver este
* ejercicio NO se pueden escribir las palabras 'matematica', 'fisica' ni 'historia'
*
* <apellido>, <nombre>:
*   Periodo: <periodo>
*       Matematica: <calificacion>
*       Fisica: <calificacion>
*       Historia: <calificacion>
*   ...
*   ...
*   ...
*   Periodo: <periodo>
*       Matematica: <calificacion>
*       Fisica: <calificacion>
*       Historia: <calificacion>
*
* */


