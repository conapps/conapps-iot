| [< Anterior](https://github.com/conapps/conapps-iot/blob/master/AWS%20Cloud/S3/20170810_AWS_S3_Parte_2.md) | [Siguiente >](https://github.com/conapps/conapps-iot/blob/master/AWS%20Cloud/S3/20170812_AWS_S3_Parte_4.md) |

---
### Versionado

El versionado ayuda a proteger los datos contra el borrado de los mismos, manteniendo multiples versiones de cada objeto de un bucket, identificándolos mediante un *version ID* único. Permite preservar y recuperar cada una de las versiones del objeto en el *bucket*. Si un usuario modifica o elimina un objeto, puede recuperar la última versión del objeto, referenciando la *version ID*, *bucket* y *object key*.

El versionado se realiza a nivel de *bucket*, y preserva en forma automática todas las copias de los objetos contenidos en el mismo. Incluso mantiene el historial de versiones de los objetos eliminados.
Si borramos un objeto, en lugar de eliminarlo en forma permanente S3 le inserta una marca de borrado, de forma que podemos recuperarlo. Mientras que si sobreescribimos un objeto, se convierte en una nueva versión del objeto en el bucket. Siempre se puede restaurar una versión previa de un objeto.

El versionado está apagado por defecto está apagado, y una vez habilitado no puede ser removido de ese *bucket*, solo puede ser suspendido.

Se debe tener en cuenta que todas las versiones del objeto ocupan espacio en S3, por lo cual podemos incrementar nuestros costos de almacenamiento sensiblemente. Una buena práctica sería utilizar las *lifecycle policies* para eliminar versiones viejas, o moverlas viejas a capas de almacenamiento mas baratas o archivarlas a Glacier.

El versionado se puede habilitar en el momento de crar un *bucket*, o sobre uno ya existente.
Probemos de crear un nuevo bucket y habilitarle el versionado (puede hacerse al crearlo o luego desde las propiedades):

![alt text](./images/S3_versionning_01.png)
---
![alt text](./images/S3_versionning_02.png)
---
![alt text](./images/S3_versionning_03.png)
---
![alt text](./images/S3_versionning_04.png)
---

Ahora bien, probemos de subir un objeto nuevo a este bucket, por ejemplo el *documento1.txt* que tenemos en nuestro equipo:
```bash
$ cat documento1.txt
HOLA MUNDO!!  que original, no?

$ aws s3 cp documento1.txt s3://iot-cloud-bucket-versionado
upload: .\documento1.txt to s3://iot-cloud-bucket-versionado/documento1.txt
```

Modifiquemos en nuestro equipo el contenido del *documento1.txt* (puede hacerlo con un editor/notepad si lo prefiere):
```bash
$ echo "... agrego algo de información al documento 1" >> documento1.txt

$ cat documento1.txt
HOLA MUNDO!!  que original, no?
... agrego algo de información al documento 1
```

Y volvamos a subir el *documento1.txt* al mismo bucket que antes, con lo cual vamos a sobrescribir nuestro objeto:
```bash
$ aws s3 cp documento1.txt s3://iot-cloud-bucket-versionado
upload: .\documento1.txt to s3://iot-cloud-bucket-versionado/documento1.txt
```

Bien, ahora vayamos a la consola web de S3, y veamos el contenido del *iot-cloud-bucket-versionado*.

Lo primero que podemos ver, es que en la parte superior se habilitan las opciones ***All | Deleted objects***, esto nos muestra que ese *bucket* tiene objetos con versiones.

![alt text](./images/S3_versionning_05.png)

Si seleccionamos el *documento1.txt*, podemos ver en sus propiedades las diferentes versiones del objeto, con sus fechas y la capa de almacenamiento donde se encuentra cada una. También podemos descargar y eliminar una versión del objeto.
![alt text](./images/S3_versionning_06.png)


Con la **CLI** podemos listar los objetos que se encuentran en nuestro bucket (*s3api list-objects*) y también poder ver las características de las diferentes versiones del archivo (*s3api list-object-vesions*):

```bash
$ aws s3api list-objects --bucket iot-cloud-bucket-versionado
{
    "Contents": [
        {
            "Key": "documento1.txt",
            "LastModified": "2017-08-12T18:51:00.000Z",
            "ETag": "\"17b60662b5e30ea4310aff30dbed84d4\"",
            "Size": 80,
            "StorageClass": "STANDARD",
            "Owner": {
                "DisplayName": "aws.develop",
                "ID": "253b019b7f4fd45d661c9fdb0619b56bad91f8eb9fea1ef96d0aeab3e189cf2d"
            }
        }
    ]
}

$ aws s3api list-object-versions --bucket iot-cloud-bucket-versionado
{
    "Versions": [
        {
            "ETag": "\"17b60662b5e30ea4310aff30dbed84d4\"",
            "Size": 80,
            "StorageClass": "STANDARD",
            "Key": "documento1.txt",
            "VersionId": "oNlqAiHtpUFJ2vK.ionRwJS1yanXVHmY",
            "IsLatest": true,
            "LastModified": "2017-08-12T18:51:00.000Z",
            "Owner": {
                "DisplayName": "aws.develop",
                "ID": "253b019b7f4fd45d661c9fdb0619b56bad91f8eb9fea1ef96d0aeab3e189cf2d"
            }
        },
        {
            "ETag": "\"fb4794e7e7bfbffb4630114f236cc02d\"",
            "Size": 34,
            "StorageClass": "STANDARD",
            "Key": "documento1.txt",
            "VersionId": "lM.eixwBplCnnot.eM.hLMGw3aTwA5iW",
            "IsLatest": false,
            "LastModified": "2017-08-12T18:32:15.000Z",
            "Owner": {
                "DisplayName": "aws.develop",
                "ID": "253b019b7f4fd45d661c9fdb0619b56bad91f8eb9fea1ef96d0aeab3e189cf2d"
            }
        }
    ]
}
```

Probemos de bajar el archivo *documento1.txt"*. Si lo bajamos como siempre, vamos a obtener la última versión que tiene los cambios que habíamos realizado.

```bash
$ aws s3 cp s3://iot-cloud-bucket-versionado/documento1.txt documento1-actual.txt
download: s3://iot-cloud-bucket-versionado/documento1.txt to .\documento1-actual.txt

$ cat documento1-actual.txt
HOLA MUNDO!!  que original, no? :P
... agrego algo de información al documento 1
```

Si queremos obtener la versión anterior, debemos referenciar al *VersionId* correspondiente. La podemos ver mas arriba, cuando listamos las versiones del objeto: *"VersionId": "lM.eixwBplCnnot.eM.hLMGw3aTwA5iW"*.
Bajemos esta versión anterior, pero con otro nombre para poder ver su contenido.

```bash
$ aws s3api get-object --bucket iot-cloud-bucket-versionado --key documento1.txt --version-id lM.eixwBplCnnot.eM.hLMGw3aTwA5iW documento1-old.txt
{
    "AcceptRanges": "bytes",
    "LastModified": "Sat, 12 Aug 2017 18:32:15 GMT",
    "ContentLength": 34,
    "ETag": "\"fb4794e7e7bfbffb4630114f236cc02d\"",
    "VersionId": "lM.eixwBplCnnot.eM.hLMGw3aTwA5iW",
    "ContentType": "text/plain",
    "Metadata": {}
}

$ cat documento1-old.txt
HOLA MUNDO!!  que original, no? :P
```

Que pasa si borramos el objeto?
Probemos de borrar el *documento1.txt* (ya debería saber como hacer esto).
```bash
$ aws s3 rm s3://iot-cloud-bucket-versionado/documento1.txt
delete: s3://iot-cloud-bucket-versionado/documento1.txt
```

Si vamos a la consola web y seleccionamos *Deleted objects* podemos ver la lista de objetos borrados incluyendo sus versiones:
![alt text](./images/S3_versionning_07.png)

Y podemos descargarlo, o bien hacer un *Undo delete*.
![alt text](./images/S3_versionning_08.png)


Refs:
[Using Versioning](http://docs.aws.amazon.com/es_es/AmazonS3/latest/dev/Versioning.html)
[Managing Objects in a Versioning-Enabled Bucket](http://docs.aws.amazon.com/es_es/AmazonS3/latest/dev/manage-objects-versioned-bucket.html)
[AWS CLI Command Reference: s3api](http://docs.aws.amazon.com/cli/latest/reference/s3api/index.html)



---
## Cross-Region Replication
---
La replicación entre regiones es una característica de Amazon S3 que permite copiar objetos en forma automática entre diferentes regiones de AWS. Cada objeto que subamos a un bucket de S3 se replicará en forma asincrónica en otro bucket situado en otra región de AWS que seleccionemos.

Para activar esta característica, es necesario agregar la configuración de replicación al *bucket* de origen, indicando cierta información, particularmente hacia que región lo vamos a copiar. Podemos replicar un *bucket* completo, o seleccionar solo algunos objetos, filtrando que copiar (y/o que no) por medio de *prefixes* o *tags*. Para usar la replicación es requerido que tanto el *bucket* origen como destino tengan el versionado activado.

Se debe tener en cuenta que cuando se habilita esta opción, se comienzan a replicar todos los objetos nuevos a partir de ese momento, pero los objetos anteriores que puedan existir en el bucket no son copiados. Los objetos de la copia destino son exactamente iguales a los originales, con la misma metadata (incluyendo la fecha de creación original), los mismos tags, permisos, etc. AWS S3 encripta el tráfico entre las regiones utilizando SSL.

El uso de esta característica implica cargos adicionales. Debemos pagar los cargos de S3 por almacenamiento, solicitudes y transferencia de datos entre regiones de la copia replicada, además de los cargos de almacenamiento de la copia principal. El precio de la copia replicada se basa en la región de destino, mientras que los precios de las solicitudes y la transferencia de datos entre regiones se basan en la región de origen.

Veamos como configurarlo.
* Creamos el *bucket* de origen, en una determinada región de AWS, y con *versioning* habilitado.
  ![alt text](./images/S3_replication_01.png)
  .
  ![alt text](./images/S3_replication_02.png)
  .

* Creamos el *bucket* de destino, en una región diferente de AWS, y con *versioning* habilitado.
  ![alt text](./images/S3_replication_03.png)
  .
  ![alt text](./images/S3_replication_04.png)
  .

* Habilitamos la replicación en el *bucket* de origen.
Podemos seleccionar a donde replicar, que objetos replicar, a que clase de storage destino vamos a replicar. Nuestro usuario debe contar con permisos para poder replicar, para lo cual podemos directamente crear un nuevo rol en IAM desde aquí mismo (necesitamos tener acceso a IAM para esto) o podemos seleccionar un rol de IAM existente (por ej. que haya sido creado por nuestro administrador de IAM).
![alt text](./images/S3_replication_05.png)
.
![alt text](./images/S3_replication_06.png)
.
![alt text](./images/S3_replication_07.png)
.
![alt text](./images/S3_replication_08.png)
.

Para verificar que la replicación funciona, podemos simplemente subir un objeto al *bucket origen* y verificar que el mismo sea replicado al *bucket destino*. O podemos cambiar las propiedades de un objeto (metadata, tags, ACLs) y verificar que las mismas son modificadas en el objeto replicado.

El tiempo que le toma a S3 replicar la información depende del tamaño de los objetos que estamos replicando.
Puede llevar varias horas dependiendo de la cantidad de información.


Refs:
[Cross-Region Replication](http://docs.aws.amazon.com/es_es/AmazonS3/latest/dev/crr.html)
[Cross-Region Replication FAQs](https://aws.amazon.com/es/s3/faqs/#crr)
[How to enable Cross-Region (AWS Console)](http://docs.aws.amazon.com/es_es/AmazonS3/latest/user-guide/enable-crr.html)
[Walkthrough 1: Configure Cross-Region Replication Replication for same AWS user account](http://docs.aws.amazon.com/es_es/AmazonS3/latest/dev/crr-walkthrough1.html)
[Amazon S3 Pricing](https://aws.amazon.com/es/s3/pricing/)


---
## Static Web Pages
---


---
## Seguridad en Amazon S3
---

### Access Controls (ACLs)

---
### Encryption
* None
* Amazon S3 Master Key
* AWS KMS master-key
34.50

---
### Aditional Security Features
* Audit Logs
* MULTI-FACTOR AUTHENTICATION DELETE
* TIME-LIMTED ACCESS TO OBJECTS


---
### Throughput omptimisation

---
## Amazon Glacier
---



---
| [< Anterior](https://github.com/conapps/conapps-iot/blob/master/AWS%20Cloud/S3/20170810_AWS_S3_Parte_2.md) | [Siguiente >](https://github.com/conapps/conapps-iot/blob/master/AWS%20Cloud/S3/20170812_AWS_S3_Parte_4.md) |
