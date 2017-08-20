Amazon Glacier
===

*Fuentes:*
- [Documentación oficial](https://aws.amazon.com/es/documentation/glacier/)
- [Página de AWS Glacier](https://aws.amazon.com/es/glacier/)
- [Precios de AWS Glacier](http://aws.amazon.com/es/glacier/pricing/)
- [AWS re:Invent 2016: Deep Dive on Amazon Glacier (STG302)](https://youtu.be/dfr9mBcDJ-U)
- [AWS S3 Master Class](https://youtu.be/VC0k-noNwOU)
- Otras fuentes referenciadas a lo largo de los documentos (Ref:)


## Indice.
---
- [Introducción](#introduccion)
- [Conceptos Básicos](#conceptos-básicos)
- [Primeros Pasos](#primeros-pasos)
- [Linea de Comandos de Amazon S3](#línea-de-comandos-de-amazon-s3)
- [Folders](#folders)

---
## Introducción ##
---
¿Qué es Amazon Glacier?      
---
Amazon Glacier es un servicio de almacenamiento en la nube seguro, duradero y de muy bajo costo para archivar datos y realizar backups a largo plazo.
Permite almacenar con seguridad cantidades pequeñas o grandes de datos a un costo muy bajo, lo que representa un ahorro significativo en comparación con una solución local.
Amazon Glacier proporciona tres opciones para el acceso (recuperación) de los datos, que van desde unos pocos minutos a varias horas.

### Características
* Fácil de usar
* Muy bajo costo: desde 0,004 USD por GB por mes
* Seguro: todos los datos son encriptados *at rest*
* Durable: 99.999999999% (5-6 veces mayor que 2 copias de cintas)
* Escalable
* Integrado con otros servicios AWS

### Casos de uso
* Sustitución de cinta magnética (tape) para archivado de datos en ubicaciones remotas
* Archivado de recursos multimedia (imágenes, videos, audio, etc.)
* Archivado de información a largo plazo (historia clínica, etc.)
* Archivado conforme a requisitos reglamentarios o legales (disponibles por 10 o 20 años)
* Almacenamiento de datos científicos
* Preservación de contenido digital (bibliotecas, agencias gubernamentales, etc.)

Amazon Glacier es un almancenamiento de tipo *object storage* y puede extender las capacidades de Amazon S3 para archivar datos a largo plazo reduciendo los costos.

Ref:
[Amazon Glacier](https://aws.amazon.com/es/glacier/)
[Detalles del producto Amazon Glacier](https://aws.amazon.com/es/glacier/details/)

---
### Formas de acceso a Glacier
Al igual que el resto de los servicios de Amazon, puede accederse y utilizarse de diversas formas:

* API REST
* AWS Management Console
* AWS CLI
* AWS SDK


Ref.:
[API Reference for Amazon Glacier](http://docs.aws.amazon.com/es_es/amazonglacier/latest/dev/amazon-glacier-api.html)
[Consola Web de AWS](https://console.aws.amazon.com/console/home)
[AWS Command Line Interfce (CLI)](https://aws.amazon.com/es/cli/)
[AWS SDK para Python (Boto3)](https://aws.amazon.com/es/sdk-for-python/)
[AWS SDK para Java](https://aws.amazon.com/es/sdk-for-java/)

---
## Conceptos Básicos ##
---
Ref:
[Getting Started with Amazon Glacier](https://docs.aws.amazon.com/es_es/amazonglacier/latest/dev/amazon-glacier-getting-started.html)

### Vaults
Son los contenedores donde se almacenan los datos en Glacier. Representan el nivel mas alto de "jerarquía" dentro del almacenamiento.
Se pueden crear hasta 1000 *vaults* por cuenta, y cada *vault* puede crear un número ilimitado de *archives*.

El nombre del *vault* debe ser único para una cuenta y dentro de cada región en la cual es creado. Una cuenta puede tener dos *vaults* con el mismo nombre pero en diferentes regions. El nombre debe tener entre 1 y 255 caracteres, puede tener mayúsculas, guión bajo (\_), guión (-) y puntos (.), no puede tener espacios ni otros caracteres especiales.  

Ref.:
[Working with Vaults in Amazon Glacier](http://docs.aws.amazon.com/es_es/amazonglacier/latest/dev/working-with-vaults.html)


### Archives
Son los datos que almacenamos en Amazon Glacier, es la información que nosotros subimos y accedemos.

Un *archive* puede contener cualquier tipo de datos en cualquier formato.
Solo pueden escribirse una vez (*write-once*), el tamaño máximo para un *archive* es de 40TB, y un *vault* puede contener una cantidad ilimitada de *archives*.

Los datos almacenados en Amazon Glacier son inmutables, lo que significa que, una vez creado un archivo, no se puede actualizar (*write once*). Eso garantiza que datos como los registros de conformidad y normativos no se puedan modificar una vez archivados.

Ref.:
[Working with Archives in Amazon Glacier](http://docs.aws.amazon.com/es_es/amazonglacier/latest/dev/working-with-archives.html)


### Inventory
Es un índice que contiene la lista de *archives* que tenemos almacenados. Este índice se refresca cada 24hrs.

---
## Primeros pasos ##
---

### Como acceder a los datos
La consola web de AWS se puede utilizar para crear y eliminar *vaults* en Amazon Glacier. Sin embargo, toda otra interacción con Glacier, por ejemplo para subir datos, requiere el uso de otros métodos por fuera de la consola.

* Acceso directo a Amazon Glacier mediante la API de Glacier, ya sea desde línea de comando mediante la **AWS CLI** (Command Line Interface) o desde nuestro propio código utilizando el **AWS SDK** (Software Development Kit).

* Integrándolo con **AWS S3 Lifecycle Policies**, que permite mover en forma automatizada datos desde S3 hacia Glacier, en base a ciertas políticas y criterios configurables.

* Mediante **herramientas y/o gateways de terceros**, por ej. Veeam, Synology, Veritas, NetApp, FastGlacier, Commvault, Cloudberry, etc.


Para trabajar con Glacier vamos a usar principalmente la línea de comandos AWS CLI.
Si no tiene instalada y configurada la CLI puede revisar [aquí](https://github.com/conapps/conapps-iot/blob/master/AWS%20Cloud/S3/20170810_AWS_S3_Parte_2.md#línea-de-comandos-de-amazon-s3)  la primer clase de S3 donde se explica como hacerlo.

---
### Crear un *Vault*

Ingrese a la Consola de Administración de Amazon Web Services, y acceda a Glacier.
![alt text](./images/Glacier_console_01.png)
.

Si es la primera vez que entramos debemos seleccionar *Get started* para comenzar:
![alt text](./images/Glacier_console_02.png)

* Podemos seleccionar la región donde almacenar nuestros datos, en la parte superior derecha de la consola. Recuerde que el servicio de Glacier no está disponible en todas las regiones, y los precios suelen variar de acuerdo a la región seleccionada.
  ![alt text](./images/Glacier_vault_01.png)

.
* Ingrese el nombre del *vault* (recuerde que el nombre debe cumplir ciertos requisitos):
  ![alt text](./images/Glacier_vault_02.png)

.
* Por el momento no es necesario configurar notificaciones de eventos.
  Si quisiéramos, podríamos configurar notificaciones para que Glacier nos notifique cuando una operación sea completada. Las notificaciones se realizan mediante Amazon SNS (un tema que abordaremos en otra clase).
  ![alt text](./images/Glacier_vault_03.png)
.

* Repase la configuración y complete la creación del *vault*
  ![alt text](./images/Glacier_vault_04.png)
.

Listo! El *vault* ahora aparece listado dentro de la consola de Glacier.
![alt text](./images/Glacier_vault_05.png)


### Utilizando la CLI con Glacier

Probemos primero de listar el *vault* que creamos anteriormente:
```bash
$ aws glacier list-vaults --account-id -
{
    "VaultList": []
}
```
Como podemos ver, recibimos una lista vacía, y no nos muestra el *iot-cloud-vault-01* que creamos antes.
Pero tengamos en cuenta que los *vaults* son específicos de las regiones de AWS. Lo que está pasando en este caso, es que creamos este *vault* en Oregon (us-west-2) pero nuestra CLI estaba configurada en N. Virginia (us-east-1).

Cambiemos la configuración de la CLI para apuntar a la región correcta, mediante *aws configure* e ingresando *us-west-2* en la región (los otros campos no los cambiamos):

```bash
$ aws configure
AWS Access Key ID [****************B4TN]:
AWS Secret Access Key [****************BfX3]:
Default region name [us-east-1]: us-west-2
Default output format [json]:
```

Probemos nuevamente de listar, ahora si, obtenemos el *vault* que habíamos creado:
```bash
$ aws glacier list-vaults --account-id -
{
    "VaultList": [
        {
            "VaultARN": "arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-vault-01",
            "VaultName": "iot-cloud-vault-01",
            "CreationDate": "2017-08-17T17:53:40.893Z",
            "NumberOfArchives": 0,
            "SizeInBytes": 0
        }
    ]
}
```

Ahora ya podemos crear un segundo *vault* desde la CLI (y luego listarlos):
```bash
$ aws glacier create-vault --account-id - --vault-name iot-cloud-vault-02
{
    "location": "/805750336955/vaults/iot-cloud-vault-02"
}


$ aws glacier list-vaults --account-id -
{
    "VaultList": [
        {
            "VaultARN": "arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-vault-01",
            "VaultName": "iot-cloud-vault-01",
            "CreationDate": "2017-08-17T17:53:40.893Z",
            "NumberOfArchives": 0,
            "SizeInBytes": 0
        },
        {
            "VaultARN": "arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-vault-02",
            "VaultName": "iot-cloud-vault-02",
            "CreationDate": "2017-08-17T18:47:42.244Z",
            "NumberOfArchives": 0,
            "SizeInBytes": 0
        }
    ]
}
```

Y obviamente, ambos *vaults* aparecen listados en la consola web:

![alt text](./images/Glacier_vault_06.png)

---
### Subir Datos
Los archivos en Glacier no pueden ser subidos desde la consola Web, lo haremos mediante la CLI.

Primero vamos a crear un archivo llamado *mi_archivo_01.zip* para subir a Glacier.

**En Linux:**
```bash
$ dd if=/dev/urandom of=mi_archivo_01.zip bs=3145728 count=1
1+0 records in
1+0 records out
3145728 bytes (3,1 MB, 3,0 MiB) copied, 0,0697288 s, 45,1 MB/s
```

**En Windows:**
```bash
C:\temp>fsutil file createnew mi_archivo_01.zip 3145728
File C:\temp\mi_archivo_01.zip is created
```

Veamos como subir un archivo con la CLI.
Podemos utilizar el comando *upload_archive* para subirlo.
```bash
$ aws glacier upload-archive --account-id - --vault-name iot-cloud-vault-01 --body mi_archivo.zip
{
    "location": "/805750336955/vaults/iot-cloud-vault-01/archives/2VijuHqLP8HZR-BG9FH4nm-13nZa7iPXYvBaXEVWPMcMIWEkc1nd69xBvM5iAroNaR8FPGTeqQXuz5h6FjorUEPNQwH5LfLsaHDodRv5TKUYgmM59IdzLGbAOqKl8llRi5X5t6nv5w",
    "checksum": "f58e64a2381d9a68934b7ce8db45450654c6af977f6c40ca23b263ba994d9b27",
    "archiveId": "2VijuHqLP8HZR-BG9FH4nm-13nZa7iPXYvBaXEVWPMcMIWEkc1nd69xBvM5iAroNaR8FPGTeqQXuz5h6FjorUEPNQwH5LfLsaHDodRv5TKUYgmM59IdzLGbAOqKl8llRi5X5t6nv5w"
}
```
Si fuera un archivo muy grande podríamos dividirlo en partes y utilizar el comando *initiate-multipart-upload* (puede revisar este comando en la documentación de referencia).

Si vamos a la consola web, no vamos a notar ningún cambio. Esto es porque las columnas *Size* y *# of Archives* muestran la información en base al *Inventary* que todavía no se actualizó, y se actualiza una vez por día. Tendremos que esperar hasta mañana para ver alguna diferencia aquí.
![alt text](./images/Glacier_vault_06.png)


También podemos listar los detalles del *vault* mediante:
```bash
$ aws glacier describe-vault --account-id - --vault-name iot-cloud-vault-01
{
    "VaultARN": "arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-vault-01",
    "VaultName": "iot-cloud-vault-01",
    "CreationDate": "2017-08-17T17:53:40.893Z",
    "NumberOfArchives": 0,
    "SizeInBytes": 0
}
```
Ref:
[Using Amazon Glacier with the AWS Command Line Interface](http://docs.aws.amazon.com/cli/latest/userguide/cli-using-glacier.html)
[AWS CLI Command Reference - Glacier](http://docs.aws.amazon.com/cli/latest/reference/glacier/index.html)


---
### Recuperar Datos
Los datos en Glacier no pueden ser recuperados en forma directa.

Lo que debemos hacer es:
1) Iniciar un Job indicando que datos queremos recuperar
2) Esperar a que el Job sea procesado por Glacier y finalice. Esto puede demorar de 3 a 5 horas normalmente, aunque hay opciones de recuperar datos en minutos con un costo mayor.
3) Recibir la notificación de que el Job terminó (si configuramos notificaciones).
4) Descargar la "salida del job".

[Download an Archive from a Vault in Amazon Glacier](https://docs.aws.amazon.com/es_es/amazonglacier/latest/dev/getting-started-download-archive.html)
[How do I use the AWS CLI to view the contents of my Amazon Glacier vault?](https://aws.amazon.com/es/premiumsupport/knowledge-center/cli-glacier-vault/)


---
### Trabajando con Amazon S3 Lifecycle Policies y Glacier
Una de las formas mas fáciles de trabajar con Glacier es haciéndolo desde S3, mediante *Lifecycle Policies*.

En la clase de S3 ya vimos como crear una policy para mover datos a diferentes capas de almacenamiento, o incluso a Glacier. Puede ver esto [aquí](https://github.com/conapps/conapps-iot/blob/master/AWS%20Cloud/S3/20170812_AWS_S3_Parte_3.md#lifecycle-policies). Revisemos nuevamente como hacerlo.

Comencemos por crear un *bucket* donde almacenar los archivos que enviaremos a Glacier, y subamos un archivo a este bucket (utilizo el mismo archivo de 3MB que habíamos creado anteriormente, pero ahora lo llamo *mi_backup.zip*).

Recuerde que esto lo estamos haciendo en S3, por lo cual podemos o bien usar la consola web de AWS o la CLI mediante comandos de s3.
```bash
$ aws s3 mb s3://iot-cloud-bucket-glacier
make_bucket: iot-cloud-bucket-glacier

$ aws s3 cp mi_backup.zip s3://iot-cloud-bucket-glacier/
upload: .\mi_backup.zip to s3://iot-cloud-bucket-glacier/mi_backup.zip
```

Ahora definamos una regla de *lifecycle* sobre este bucket, para mover todos los archivos del bucket que tengan más de 1 día de antiguedad a Glacier (este es el mínimo período de tiempo que podemos especificar). Recuerde que si lo desea puede filtrar a que objetos aplica esta regla, utilizando *prefixes* y/o *tags* (ya vimos esto antes).

Ya debería saber como hacer esto, pero repasemos como crear la regla:

![alt text](./images/Glacier_lifecycle_01.png)

![alt text](./images/Glacier_lifecycle_02.png)

![alt text](./images/Glacier_lifecycle_03.png)

![alt text](./images/Glacier_lifecycle_04.png)

![alt text](./images/Glacier_lifecycle_05.png)


Podemos ver los detalles de la regla que acabamos de crear, desde la CLI:
```bash
$ aws s3api get-bucket-lifecycle-configuration --bucket iot-cloud-bucket-glacier
{
    "Rules": [
        {
            "ID": "archivado-a-glacier",
            "Filter": {
                "Prefix": ""
            },
            "Status": "Enabled",
            "Transitions": [
                {
                    "Days": 1,
                    "StorageClass": "GLACIER"
                }
            ]
        }
    ]
}
```

Podemos ver que nuestro objeto *"mi_backup.zip"* se encuentra en la *Storage Class: Standard* de Amazon S3. Esto es porque cuando hicimos el upload no especificamos una clase de storage específica y por lo tanto S3 lo almacena por defecto en esta clase.

Esto podemos verlo con la CLI:
```bash
$ aws s3api list-objects --bucket iot-cloud-bucket-glacier
{
    "Contents": [
        {
            "Key": "mi_backup.zip",
            "LastModified": "2017-08-17T19:48:57.000Z",
            "ETag": "\"b944a8c500fe92d9e3af3ab9f0c53f0b\"",
            "Size": 3145728,
            "StorageClass": "STANDARD",
            "Owner": {
                "DisplayName": "aws.develop",
                "ID": "e6dd2e564aeb8d6e8c0e9fad1cb10c86902822b4e2b12bb0508a032825603031"
            }
        }
    ]
}
```
O bien con la consola web:
![alt text](./images/Glacier_lifecycle_06.png)

Bien ahora solo debemos esperar hasta mañana, y si todo funciona como debe, nuestro objeto *mi_backup.zip* debería ser archivado, pasando a la *storage class: glacier*.

 **--- 24hrs mas tarde ---**

Luego que pasó el intervalo de tiempo que especificamos en la regla anterior (en nuestro caso era 1 día), podemos ver que la regla funcionó como esperabamos, y ahora el objeto *mi_backup.zip* se encuentra en la clase de storage *Glacier*

```bash
$ aws s3api list-objects --bucket iot-cloud-bucket-glacier
{
    "Contents": [
        {
            "Key": "mi_backup.zip",
            "LastModified": "2017-08-17T19:48:57.000Z",
            "ETag": "\"b944a8c500fe92d9e3af3ab9f0c53f0b\"",
            "Size": 3145728,
            "StorageClass": "GLACIER",
            "Owner": {
                "DisplayName": "aws.develop",
                "ID": "e6dd2e564aeb8d6e8c0e9fad1cb10c86902822b4e2b12bb0508a032825603031"
            }
        }
    ]
}
```

Ahora ya no podemos acceder en forma directa al objeto, no podemos cambiarle sus propiedades, ni tampoco descargar el objeto.


 

``` bash
$ aws s3api head-object --bucket iot-cloud-bucket-glacier --key mi_backup.zip
{
    "AcceptRanges": "bytes",
    "Restore": "ongoing-request=\"true\"",
    "LastModified": "Thu, 17 Aug 2017 19:48:57 GMT",
    "ContentLength": 3145728,
    "ETag": "\"b944a8c500fe92d9e3af3ab9f0c53f0b\"",
    "ContentType": "application/zip",
    "Metadata": {},
    "StorageClass": "GLACIER"
}
```

[How Do I Restore an S3 Object That Has Been Archived to Amazon Glacier?](http://docs.aws.amazon.com/es_es/AmazonS3/latest/user-guide/restore-archived-objects.html)
