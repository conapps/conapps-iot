| [< Anterior](https://github.com/conapps/conapps-iot/blob/master/AWS%20Cloud/S3/AWS_Glacier.md) |

---
## Trabajando con Glacier mediante AWS CLI
---
Como vimos anteriormente, son pocas las operaciones que podemos realizar mediante la consola web de Glacier.
Por lo tanto, tenemos que trabajar o bien con la CLI o mediante SDK o REST (en nuestro caso vamos ausar la CLI).

Si no tiene instalada y configurada la CLI puedes revisar [aquí](https://github.com/conapps/conapps-iot/blob/master/AWS%20Cloud/S3/20170810_AWS_S3_Parte_2.md#línea-de-comandos-de-amazon-s3)  la primera clase de S3 donde se explica como hacerlo.

La CLI de Glacier nos pide siempre que indiquemos el usuario en los comandos que ejecutamos, mediante la opción *account-id*. Podemos poner nuestro usuario, o simplemente ponemos un *"-"* con lo cual va a usar los datos del usuario que configuramos por defecto para la herramienta (cosa que ya hicimos antes en el curso de S3 mediante *aws configure*).

Probemos primero de listar el *vault* que creamos anteriormente:
```bash
$ aws glacier list-vaults --account-id -
{
    "VaultList": []
}
```
Como podemos ver recibimos una lista vacía, y no nos muestra el *iot-cloud-vault-01* que creamos antes mediante la consola web.

Tengamos en cuenta que los *vaults* son específicos de las regiones de AWS donde los creamos. Lo que está pasando en este caso, es que nosotros habíamos creado ese *vault* en Oregon (us-west-2) pero nuestra CLI estaba configurada en N. Virginia (us-east-1).

Para solucionar esto, podemos pasarle la región a la CLI en el comando:
```bash
$ aws glacier list-vaults --account-id - --region us-west-2
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

Para que sea mas fácil y no tengamos que poner la región en cada comando que usamos, podemos simplemente cambiar la configuración de la CLI para apuntar a la región correcta, mediante *aws configure* e ingresando *us-west-2* (o la que corresponda) en la configuración de la región.

Probemos nuevamente de listar sin especificar la región, y ahora si, obtenemos el *vault* que habíamos creado antes:
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
---
### Crear un *vault*

Para crear un nuevo *vault* desde la CLI, utilizamos el comando `aws glacier create-vault`
```bash
$ aws glacier create-vault --account-id - --vault-name iot-cloud-vault-02
{
    "location": "/805750336955/vaults/iot-cloud-vault-02"
}
```
Ahora si listamos, podemos ver ambos:
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
Refs:
[Creating a Vault in Amazon Glacier](http://docs.aws.amazon.com/amazonglacier/latest/dev/creating-vaults.html)



---
### Subir Datos
Los archivos en Glacier no pueden ser subidos desde la consola Web, lo haremos mediante la CLI (también podemos hacerlo con el SDK desde nuestro código).

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

Si vamos a la consola web, no vamos a notar ningún cambio. Esto es porque las columnas *Size* y *# of Archives* muestran la información en base al *Inventary* que todavía no se actualizó, y se actualiza una vez por día. Tendremos que esperar 24 horas  para ver alguna diferencia.


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

Ahora una vez transcurridas las primeras 24hrs, la información de inventario se actualiza, y podemos ver que el *vault* tiene 1 archivo y algo así como 3MB de datos (que fue lo que subimos):
```bash
$ aws glacier describe-vault --account-id - --vault-name iot-cloud-vault-01
{
    "VaultARN": "arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-vault-01",
    "VaultName": "iot-cloud-vault-01",
    "CreationDate": "2017-08-17T17:53:40.893Z",
    "LastInventoryDate": "2017-08-18T13:25:55.144Z",
    "NumberOfArchives": 1,
    "SizeInBytes": 3178496
}
```

### Listar el contenido de un *Vault*
Pero como obtenemos el contenido de un *vault*?
Esto no podemos verlo en la consola web, y debemos recurrir una vez mas a la CLI.

Veamos primero de subir un par de archivos adicionales al *vault* para tener algunos datos mas.
Recuerden que la información sobre estos nuevos archivos que vamos a subir no se actualizará en el inventario hasta mañana.
```bash
$ aws glacier upload-archive --account-id - --vault-name iot-cloud-vault-01 --body lab-glacier.zip
{
    "location": "/805750336955/vaults/iot-cloud-vault-01/archives/Z0v2TFdYeLINlOBkKa6vjXAwrdjyzPDJmH2kaTRbx7rS79sWwwGSIDkoTOeiizKmIY1_rmfO9DPCDlF7iXY4I6Dzaj8VSbN32OfihLLb7YBl3kENlbRv9i8s4C4sIyRFDs3UVUtTFg",
    "checksum": "657a715f87baa9d89b651d185d8bc73147e686ee91252edcd57bae3c310b7490",
    "archiveId": "Z0v2TFdYeLINlOBkKa6vjXAwrdjyzPDJmH2kaTRbx7rS79sWwwGSIDkoTOeiizKmIY1_rmfO9DPCDlF7iXY4I6Dzaj8VSbN32OfihLLb7YBl3kENlbRv9i8s4C4sIyRFDs3UVUtTFg"
}

$ aws glacier upload-archive --account-id - --vault-name iot-cloud-vault-01 --body lab-s3.zip
{
    "location": "/805750336955/vaults/iot-cloud-vault-01/archives/zNBKFYgdEvi34i5l2zth0gECNUX1bMe0otS1f56paBTAdTiG8kt8CuUycQgnQ2o-J52v_KcDGd3w5aSMVXT3DIHgpQ0ix00ohqwc3H2bG08FieHs83tAIqtby_Y0x0qLhqP_ZSwagQ",
    "checksum": "cbc2c6b93acf2bc11971c22a0ffa6fdb9592d36513a31245c391685e4cf70103",
    "archiveId": "zNBKFYgdEvi34i5l2zth0gECNUX1bMe0otS1f56paBTAdTiG8kt8CuUycQgnQ2o-J52v_KcDGd3w5aSMVXT3DIHgpQ0ix00ohqwc3H2bG08FieHs83tAIqtby_Y0x0qLhqP_ZSwagQ"
}
```

Para ver el contenido de un *vault* debemos iniciar un *job* de la siguiente forma:
```bash
$ aws glacier initiate-job --account-id - --vault-name iot-cloud-vault-01 --job-parameters "{\"Type\": \"inventory-retrieval\"}"
{
    "location": "/805750336955/vaults/iot-cloud-vault-01/jobs/49KitZMjk3WO-PoOUOgKBA2lH_fBR7NBUyyKM56_e5fDW7R3y8MM0pCowoCHaioqhBTZWwvkI6BroHv-7Lt3MhSiX8xo",
    "jobId": "49KitZMjk3WO-PoOUOgKBA2lH_fBR7NBUyyKM56_e5fDW7R3y8MM0pCowoCHaioqhBTZWwvkI6BroHv-7Lt3MhSiX8xo"
}
```

Ahora, el job que iniciamos antes queda corriendo y puede demorar unas horas. Tenga en cuenta el valor del *jobId* dado que lo necesitaremos más adelante.
Podemos ver el estado del *job* mediante el siguiente comando, el estado *"StatusCode"* indicará *"InProgress"* o *"Succeeded"*
```bash
$ aws glacier list-jobs --account-id - --vault-name iot-cloud-vault-01
{
    "JobList": [
        {
            "JobId": "49KitZMjk3WO-PoOUOgKBA2lH_fBR7NBUyyKM56_e5fDW7R3y8MM0pCowoCHaioqhBTZWwvkI6BroHv-7Lt3MhSiX8xo",
            "Action": "InventoryRetrieval",
            "VaultARN": "arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-vault-01",
            "CreationDate": "2017-08-21T18:50:16.130Z",
            "Completed": false,
            "StatusCode": "InProgress",
            "InventoryRetrievalParameters": {
                "Format": "JSON"
            }
        }
    ]
}
```

*-- algunas horas mas tarde --*

```bash
$ aws glacier list-jobs --account-id - --vault-name iot-cloud-vault-01
{
    "JobList": [
        {
            "JobId": "49KitZMjk3WO-PoOUOgKBA2lH_fBR7NBUyyKM56_e5fDW7R3y8MM0pCowoCHaioqhBTZWwvkI6BroHv-7Lt3MhSiX8xo",
            "Action": "InventoryRetrieval",
            "VaultARN": "arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-vault-01",
            "CreationDate": "2017-08-21T18:50:16.130Z",
            "Completed": true,
            "StatusCode": "Succeeded",
            "StatusMessage": "Succeeded",
            "InventorySizeInBytes": 450,
            "CompletionDate": "2017-08-21T22:35:36.412Z",
            "InventoryRetrievalParameters": {
                "Format": "JSON"
            }
        }
    ]
}
```

Ahora que el job finalizó, debemos grabar la salida del job a un archivo (por ejemplo *lista.txt*), necesitamos el *JobID* para esto:
```bash
$ aws glacier get-job-output --account-id - --job-id 49KitZMjk3WO-PoOUOgKBA2lH_fBR7NBUyyKM56_e5fDW7R3y8MM0pCowoCHaioqhBTZWwvkI6BroHv-7Lt3MhSiX8xo --vault-name iot-cloud-vault-01 lista.txt
{
    "status": 200,
    "acceptRanges": "bytes",
    "contentType": "application/json"
}

```

Y por último, podemos abrir este archivo para ver el inventario del contenido de nuestro *vault*.
La salida es en formato JSON, y podemos ver que los objetos almacenados en nuestro *iot-cloud-vault-01* son xxxx
```bash
$ cat lista.txt

```







---
### Recuperar un archive desde Glacier
Los datos en Glacier no pueden ser recuperados en forma directa, ni tampoco utilizando la consola web.

Los pasos que debemos realizar para recuperar un *archive* son los siguientes:
- Iniciar un Job indicando que *archive* queremos recuperar.
- Esperar a que el Job sea procesado por Glacier y finalice. Esto puede demorar de 3 a 5 horas normalmente, aunque hay opciones de recuperar datos en minutos con un costo mayor.
- Obtener el resultado del Job y descargarlo a nuestro disco local (esta salida es el archivo que pedimos descargar).


Comencemos por iniciar el Job para recuperar el *archive*. Esto lo hacemos mediante nuevamente con el comando `aws glacier initiate-job`, pero en este caso debemos indicar cuál es el *archive* que queremos recuperar.

Esto lo hacemos creando un archivo de texto local (cuyo nombre puede ser cualquiera), con el siguiente contenido:
```bash
$ cat objeto-a-recuperar.json
{
   "Type": "archive-retrieval",
   "ArchiveId":"grHW86f7glvFFhFgMCDNDYehZcfTg_h9yMRkrSeroT1iaUzIki8S0hIu1TG2W3Tr0yl1EIGWqoz1gnk5LFLEF-y-RmwQlwN19Zd-dPSivzB3ohRgozkPfBGL6s9Ji1r0tRI4dzfafA",
   "Description": "2017-08-23 Recuperacion respaldo01.tar.gz"
}
```

Donde:
* *Type:* indica el tipo de operación que vamos a realizar con el job, en este caso es *"archive-retrieval"*.
* *ArchiveID:* indica el ID del *archive* que quiero recuperar.
Este valor es el mismo ID que nos devolvió el comando `aws glacier upload-archive` cuando subimos nuestro archivo inicialmente al *vault*. Si no lo guardamos, lo podemos obtener listando el contenido del *vault* como hicimos antes.
* *Description:* es una descripción cualquiera que le podemos poner a nuestro Job, es buena práctica ponerle un texto coherente con la operación que estamos realizando, dado que nos va a permitir identificar luego el Job entre varios que hayamos ejecutado.

Ahora que tenemos este archivo creado, podemos iniciar el Job mediante `aws glacier inititate-job`, haciendo referencia al *vault* donde se encuentra el *archive* que queremos recuperar y que *archive* queremos recuperar:  

```bash
$ aws glacier initiate-job --account-id - --vault-name iot-cloud-mis-respaldos --job-parameters file://objeto-a-recuperar.json
{
    "location": "/805750336955/vaults/iot-cloud-mis-respaldos/jobs/xuHm2_rhY_FWBFtv5Rd17iH420GjUu4-6V190wSfgiWEu26_rcVabKfaYV0ySOAoCP4NOVPcwssgNIqqkY1CGcXV9zZ4",
    "jobId": "xuHm2_rhY_FWBFtv5Rd17iH420GjUu4-6V190wSfgiWEu26_rcVabKfaYV0ySOAoCP4NOVPcwssgNIqqkY1CGcXV9zZ4"
}
```

Nuevamente, este Job va a demorar varias horas en finalizar. Podemos ver el estado mediante `aws glacier list-jobs`, y en este caso le agrego la opción `--statuscode InProgress` para listar solo los trabajos que se encuentran ejecutando (opcional):

```bash
$ aws glacier list-jobs --account-id - --vault-name iot-cloud-mis-respaldos --statuscode InProgress
{
    "JobList": [
        {
            "JobId": "xuHm2_rhY_FWBFtv5Rd17iH420GjUu4-6V190wSfgiWEu26_rcVabKfaYV0ySOAoCP4NOVPcwssgNIqqkY1CGcXV9zZ4",
            "JobDescription": "2017-08-23 Recuperacion respaldo01.tar.gz",
            "Action": "ArchiveRetrieval",
            "ArchiveId": "grHW86f7glvFFhFgMCDNDYehZcfTg_h9yMRkrSeroT1iaUzIki8S0hIu1TG2W3Tr0yl1EIGWqoz1gnk5LFLEF-y-RmwQlwN19Zd-dPSivzB3ohRgozkPfBGL6s9Ji1r0tRI4dzfafA",
            "VaultARN": "arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-mis-respaldos",
            "CreationDate": "2017-08-24T00:24:18.152Z",
            "Completed": false,
            "StatusCode": "InProgress",
            "ArchiveSizeInBytes": 5798098,
            "SHA256TreeHash": "ca6d26f5487ba41e5e10a06502e1ea96efcea8f35624cc9c6ec3920653cc3c0e",
            "ArchiveSHA256TreeHash": "ca6d26f5487ba41e5e10a06502e1ea96efcea8f35624cc9c6ec3920653cc3c0e",
            "RetrievalByteRange": "0-5798097",
            "Tier": "Standard"
        }
    ]
}
```

Luego de varias horas, podemos ver que el Job finalizó:
```bash
$ aws glacier list-jobs --account-id - --vault-name iot-cloud-mis-respaldos
{
    "JobList": [
        {
            "JobId": "xuHm2_rhY_FWBFtv5Rd17iH420GjUu4-6V190wSfgiWEu26_rcVabKfaYV0ySOAoCP4NOVPcwssgNIqqkY1CGcXV9zZ4",
            "JobDescription": "2017-08-23 Recuperacion respaldo01.tar.gz",
            "Action": "ArchiveRetrieval",
            "ArchiveId": "grHW86f7glvFFhFgMCDNDYehZcfTg_h9yMRkrSeroT1iaUzIki8S0hIu1TG2W3Tr0yl1EIGWqoz1gnk5LFLEF-y-RmwQlwN19Zd-dPSivzB3ohRgozkPfBGL6s9Ji1r0tRI4dzfafA",
            "VaultARN": "arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-mis-respaldos",
            "CreationDate": "2017-08-24T00:24:18.152Z",
            "Completed": true,
            "StatusCode": "Succeeded",
            "StatusMessage": "Succeeded",
            "ArchiveSizeInBytes": 5798098,
            "CompletionDate": "2017-08-24T04:16:21.770Z",
            "SHA256TreeHash": "ca6d26f5487ba41e5e10a06502e1ea96efcea8f35624cc9c6ec3920653cc3c0e",
            "ArchiveSHA256TreeHash": "ca6d26f5487ba41e5e10a06502e1ea96efcea8f35624cc9c6ec3920653cc3c0e",
            "RetrievalByteRange": "0-5798097",
            "Tier": "Standard"
        },
        {
            "JobId": "GlIniFul_WwdJn7Q_ip4LFydsT0_ufeXuXfC1q7TAMcycHMLZg9wV-7nxB0XR9BV3yqKlwRGuaKdGeFPsY3ouoGiPEmU",
            "Action": "InventoryRetrieval",
            "VaultARN": "arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-mis-respaldos",
            "CreationDate": "2017-08-23T13:43:19.352Z",
            "Completed": true,
            "StatusCode": "Succeeded",
            "StatusMessage": "Succeeded",
            "InventorySizeInBytes": 806,
            "CompletionDate": "2017-08-23T17:38:08.047Z",
            "InventoryRetrievalParameters": {
                "Format": "JSON"
            }
        }
    ]
}

```
Note que en la salida del comando anterior pueden aparecer varios Jobs que corresponden a solicitudes anteriores que hemos ejecutado. En este caso podemos identificar nuestro Job o bien revisando la *CreationDate* y/o el tipo de acción que realizamos *"Action": "ArchiveRetrieval"*, o quizá mejor, mediante la descripción que le pusimos cuando iniciamos el trabajo *"JobDescription": "2017-08-23 Recuperacion respaldo01.tar.gz"*.


Solo solo nos resta recuperar la salida de dicho job, que contiene ni mas ni menos, el archivo que queremos descargar.

Una vez más, para esto utilizamos el comando `aws glacier get-job-output`, con el ID del *job*, y guardamos la salida (que es nuestro archivo a descargar) en nuestro disco local.

```bash
$ aws glacier get-job-output --account-id - --vault-name iot-cloud-mis-respaldos --job-id "xuHm2_rhY_FWBFtv5Rd17iH420GjUu4-6V190wSfgiWEu26_rcVabKfaYV0ySOAoCP4NOVPcwssgNIqqkY1CGcXV9zZ4" respaldo01-recuperado.tar.gz
{
    "checksum": "ca6d26f5487ba41e5e10a06502e1ea96efcea8f35624cc9c6ec3920653cc3c0e",
    "status": 200,
    "acceptRanges": "bytes",
    "contentType": "application/octet-stream",
    "archiveDescription": "20170822-respaldo01"
}
```

Y finalmente, obtenemos nuestro archivo *respaldo01-recuperado.tar.gz*:
```bash
$ ls -la
total 5669
drwxr-xr-x 1 VM 197121       0 ago 24 11:29 ./
drwxr-xr-x 1 VM 197121       0 ago 23 21:22 ../
-rw-r--r-- 1 VM 197121     255 ago 23 21:23 objeto-a-recuperar.json
-rw-r--r-- 1 VM 197121 5798098 ago 24 11:30 respaldo01-recuperado.tar.gz
```

Ref:
> [Basic Command-line AWS Glacier Workflow](https://www.madboa.com/blog/2016/09/23/glacier-cli-intro/)
> [Downloading an Archive in Amazon Glacier](http://docs.aws.amazon.com/amazonglacier/latest/dev/downloading-an-archive.html)
> [AWS CLI Command Line - Glacier](http://docs.aws.amazon.com/cli/latest/reference/glacier/index.html)







Ref:
* [Using Amazon Glacier with the AWS Command Line Interface](http://docs.aws.amazon.com/cli/latest/userguide/cli-using-glacier.html)
* [AWS CLI Command Reference - Glacier](http://docs.aws.amazon.com/cli/latest/reference/glacier/index.html)
* [How do I use the AWS CLI to view the contents of my Amazon Glacier vault?](https://aws.amazon.com/es/premiumsupport/knowledge-center/cli-glacier-vault/)
* [Download an Archive from a Vault in Amazon Glacier](https://docs.aws.amazon.com/es_es/amazonglacier/latest/dev/getting-started-download-archive.html)















## Trabajando con Glacier mediante AWS CLI

### Crear un Vault

```bash
$ aws glacier create-vault --account-id - --vault-name iot-cloud-mis-respaldos
{
    "location": "/805750336955/vaults/iot-cloud-mis-respaldos"
}
```

Podemos ver los detalles del vault creado:
```bash
$ aws glacier describe-vault --account-id - --vault-name iot-cloud-mis-respaldos
{
    "VaultARN": "arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-mis-respaldos",
    "VaultName": "iot-cloud-mis-respaldos",
    "CreationDate": "2017-08-22T17:15:01.608Z",
    "NumberOfArchives": 0,
    "SizeInBytes": 0
}
```

O podemos listar todos nuestros vaults:
```bash
$ aws glacier list-vaults --account-id -
{
    "VaultList": [
        {
            "VaultARN": "arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-mis-respaldos",
            "VaultName": "iot-cloud-mis-respaldos",
            "CreationDate": "2017-08-22T17:15:01.608Z",
            "NumberOfArchives": 0,
            "SizeInBytes": 0
        },
        {
            "VaultARN": "arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-vault-01",
            "VaultName": "iot-cloud-vault-01",
            "CreationDate": "2017-08-17T17:53:40.893Z",
            "LastInventoryDate": "2017-08-22T14:27:25.122Z",
            "NumberOfArchives": 3,
            "SizeInBytes": 9541428
        },
        {
            "VaultARN": "arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-vault-02",
            "VaultName": "iot-cloud-vault-02",
            "CreationDate": "2017-08-17T18:47:42.244Z",
            "LastInventoryDate": "2017-08-22T14:27:21.078Z",
            "NumberOfArchives": 2,
            "SizeInBytes": 12651336
        }
    ]
}
```

### Subiendo archivos
Archivos a subir:

```bash
$ ls -la ./work/respaldos/
total 5668
drwxr-xr-x 1 VM 197121       0 ago 22 14:21 ./
drwxr-xr-x 1 VM 197121       0 ago 22 14:21 ../
-rw-r--r-- 1 VM 197121 5798098 ago 22 14:03 respaldo01.tar.gz
-rw-r--r-- 1 VM 197121    2803 ago 22 14:04 respaldo02.tar.gz
```

Subo el primer archivo:
```bash
$ aws glacier upload-archive --vault-name iot-cloud-mis-respaldos --account-id - --archive-description "20170822-respaldo01.tar.gz" --body ./work/respaldos/respaldo01.tar.gz
{
    "location": "/805750336955/vaults/iot-cloud-mis-respaldos/archives/grHW86f7glvFFhFgMCDNDYehZcfTg_h9yMRkrSeroT1iaUzIki8S0hIu1TG2W3Tr0yl1EIGWqoz1gnk5LFLEF-y-RmwQlwN19Zd-dPSivzB3ohRgozkPfBGL6s9Ji1r0tRI4dzfafA",
    "checksum": "ca6d26f5487ba41e5e10a06502e1ea96efcea8f35624cc9c6ec3920653cc3c0e",
    "archiveId": "grHW86f7glvFFhFgMCDNDYehZcfTg_h9yMRkrSeroT1iaUzIki8S0hIu1TG2W3Tr0yl1EIGWqoz1gnk5LFLEF-y-RmwQlwN19Zd-dPSivzB3ohRgozkPfBGL6s9Ji1r0tRI4dzfafA"
}
```

Subo el segundo archivo:
```bash
$ aws glacier upload-archive --vault-name iot-cloud-mis-respaldos --account-id - --archive-description "20170822-respaldo02.tar.gz" --body ./work/respaldos/respaldo02.tar.gz
{
    "location": "/805750336955/vaults/iot-cloud-mis-respaldos/archives/gP0DzSjjWYTOEWffBN16bbRW8aVnIjjZQURb2g5cisi57KjOgkBHyVKdVW-jYJRhK0ADPiJIznaL-vFJRnu319J_ZTvqfv4FyeGWTR1zUnXc0b6QtWhK3fDSoJZwFn2DjmV5B7cUXw",
    "checksum": "b90737ab33703c878fa3ff5b15ca7f5ca93a62fe4a10e4ca4d07408777696b9e",
    "archiveId": "gP0DzSjjWYTOEWffBN16bbRW8aVnIjjZQURb2g5cisi57KjOgkBHyVKdVW-jYJRhK0ADPiJIznaL-vFJRnu319J_ZTvqfv4FyeGWTR1zUnXc0b6QtWhK3fDSoJZwFn2DjmV5B7cUXw"
}
```

### Listar contenido del Vault

Dado que el inventario de Glacier se realiza una vez por día, no veremos los objetos que subimos hasta el otro día.

Luego que el inventario se actualice, podemos ver que el *vault* tiene 2 archivos y que ocupan un total de 5866437 bytes:
```bash
$ aws glacier describe-vault --account-id - --vault-name iot-cloud-mis-respaldos
{
    "VaultARN": "arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-mis-respaldos",
    "VaultName": "iot-cloud-mis-respaldos",
    "CreationDate": "2017-08-22T17:15:01.608Z",
    "LastInventoryDate": "2017-08-23T06:01:23.241Z",
    "NumberOfArchives": 2,
    "SizeInBytes": 5866437
}
```

```bash
$ aws glacier initiate-job --account-id - --vault iot-cloud-mis-respaldos --job-parameters '{ "Type": "inventory-retrieval" }'

An error occurred (ResourceNotFoundException) when calling the InitiateJob operation: Inventory retrieval jobs for vault arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-mis-respaldos cannot be initiated yet, as Amazon Glacier has not yet generated an initial inventory for this vault.
```

```bash
$ aws glacier initiate-job --account-id - --vault iot-cloud-mis-respaldos --job-parameters '{ "Type": "inventory-retrieval" }'
{
    "location": "/805750336955/vaults/iot-cloud-mis-respaldos/jobs/GlIniFul_WwdJn7Q_ip4LFydsT0_ufeXuXfC1q7TAMcycHMLZg9wV-7nxB0XR9BV3yqKlwRGuaKdGeFPsY3ouoGiPEmU",
    "jobId": "GlIniFul_WwdJn7Q_ip4LFydsT0_ufeXuXfC1q7TAMcycHMLZg9wV-7nxB0XR9BV3yqKlwRGuaKdGeFPsY3ouoGiPEmU"
}
```

```bash
$ aws glacier list-jobs --account-id - --vault-name iot-cloud-mis-respaldos
{
    "JobList": [
        {
            "JobId": "GlIniFul_WwdJn7Q_ip4LFydsT0_ufeXuXfC1q7TAMcycHMLZg9wV-7nxB0XR9BV3yqKlwRGuaKdGeFPsY3ouoGiPEmU",
            "Action": "InventoryRetrieval",
            "VaultARN": "arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-mis-respaldos",
            "CreationDate": "2017-08-23T13:43:19.352Z",
            "Completed": false,
            "StatusCode": "InProgress",
            "InventoryRetrievalParameters": {
                "Format": "JSON"
            }
        }
    ]
}
```

```bash
$ aws glacier list-jobs --account-id - --vault-name iot-cloud-mis-respaldos
{
    "JobList": [
        {
            "JobId": "GlIniFul_WwdJn7Q_ip4LFydsT0_ufeXuXfC1q7TAMcycHMLZg9wV-7nxB0XR9BV3yqKlwRGuaKdGeFPsY3ouoGiPEmU",
            "Action": "InventoryRetrieval",
            "VaultARN": "arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-mis-respaldos",
            "CreationDate": "2017-08-23T13:43:19.352Z",
            "Completed": true,
            "StatusCode": "Succeeded",
            "StatusMessage": "Succeeded",
            "InventorySizeInBytes": 806,
            "CompletionDate": "2017-08-23T17:38:08.047Z",
            "InventoryRetrievalParameters": {
                "Format": "JSON"
            }
        }
    ]
}
```
```bash
$ aws glacier get-job-output --account-id - --vault-name iot-cloud-mis-respaldos --job-id GlIniFul_WwdJn7Q_ip4LFydsT0_ufeXuXfC1q7TAMcycHMLZg9wV-7nxB0XR9BV3yqKlwRGuaKdGeFPsY3ouoGiPEmU inventario-iot-cloud-mis-respaldos.out
{
    "status": 200,
    "acceptRanges": "bytes",
    "contentType": "application/json"
}
```

```bash
$ cat inventario-iot-cloud-mis-respaldos.out
{
  "VaultARN":"arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-mis-respaldos",
  "InventoryDate":"2017-08-23T01:56:27Z",
  "ArchiveList":[
    {
      "ArchiveId":"grHW86f7glvFFhFgMCDNDYehZcfTg_h9yMRkrSeroT1iaUzIki8S0hIu1TG2W3Tr0yl1EIGWqoz1gnk5LFLEF-y-RmwQlwN19Zd-dPSivzB3ohRgozkPfBGL6s9Ji1r0tRI4dzfafA",
      "ArchiveDescription":"20170822-respaldo01.tar.gz",
      "CreationDate":"2017-08-22T17:24:07Z",
      "Size":5798098,
      "SHA256TreeHash":"ca6d26f5487ba41e5e10a06502e1ea96efcea8f35624cc9c6ec3920653cc3c0e"
    },
    {
      "ArchiveId":"gP0DzSjjWYTOEWffBN16bbRW8aVnIjjZQURb2g5cisi57KjOgkBHyVKdVW-jYJRhK0ADPiJIznaL-vFJRnu319J_ZTvqfv4FyeGWTR1zUnXc0b6QtWhK3fDSoJZwFn2DjmV5B7cUXw",
      "ArchiveDescription":"20170822-respaldo02.tar.gz",
      "CreationDate":"2017-08-22T17:25:15Z",
      "Size":2803,
      "SHA256TreeHash":"b90737ab33703c878fa3ff5b15ca7f5ca93a62fe4a10e4ca4d07408777696b9e"
    }
  ]
}
```


---
### Eliminar un *archive*

Primero debemos saber (o encontrar) el ID del archive que queremos elminar.
Esto podemos obtenerlo mediante el siguiente job

```bash
$ aws glacier describe-vault --account-id - --vault-name iot-cloud-vault-01
{
    "VaultARN": "arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-vault-01",
    "VaultName": "iot-cloud-vault-01",
    "CreationDate": "2017-08-17T17:53:40.893Z",
    "LastInventoryDate": "2017-08-22T21:36:02.430Z",
    "NumberOfArchives": 4,
    "SizeInBytes": 12719924
}

$ aws glacier initiate-job --account-id - --vault iot-cloud-vault-01 --job-parameters '{ "Type": "inventory-retrieval" }'
{
    "location": "/805750336955/vaults/iot-cloud-vault-01/jobs/C1GhafeRgMRzjb-3TPxkVzN-Jkesh9u4IxWgRpa-OdoHaik5Q33BJ5103XznPk6p16TpSRwhcEEDaWrT1hj4vmoaJh98",
    "jobId": "C1GhafeRgMRzjb-3TPxkVzN-Jkesh9u4IxWgRpa-OdoHaik5Q33BJ5103XznPk6p16TpSRwhcEEDaWrT1hj4vmoaJh98"
}

$ aws glacier list-jobs --account-id - --vault-name iot-cloud-vault-01
{
    "JobList": [
        {
            "JobId": "C1GhafeRgMRzjb-3TPxkVzN-Jkesh9u4IxWgRpa-OdoHaik5Q33BJ5103XznPk6p16TpSRwhcEEDaWrT1hj4vmoaJh98",
            "Action": "InventoryRetrieval",
            "VaultARN": "arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-vault-01",
            "CreationDate": "2017-08-24T01:55:08.685Z",
            "Completed": false,
            "StatusCode": "InProgress",
            "InventoryRetrievalParameters": {
                "Format": "JSON"
            }
        }
    ]
}

$ aws glacier list-jobs --account-id - --vault-name iot-cloud-vault-01


$ aws glacier get-job-output --account-id - --vault-name iot-cloud-vault-02 --job-id vk-GKPNNmjrinm5A6gDh3UF3hdN6f80R2yJ-PJvzw7ne6BDrZLJhDvsdOK_pxTO5uyqufgwp4Jtxi2iMe90Fn7-qq113 inventario-iot-cloud-vault-01.out

$ cat inventario-iot-cloud-vault-01.out
{
  "VaultARN":"arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-vault-02",
  "InventoryDate":"2017-08-22T07:32:12Z",
  "ArchiveList":[
    {
      "ArchiveId":"SZIARej9QQzpLDM7mJStkAoA3RnY-WpNJ8Fz46ay1bYYTG5VSzCnsyHVEY4jn7lne9-943LSwt1xE1N8fRt0iCgsreAytNWYwpYih7_HW3DEcDSN0HRIKjwozCPLjxHmVnWy72W1YQ",
      "ArchiveDescription":"",
      "CreationDate":"2017-08-21T18:38:59Z",
      "Size":6292900,
      "SHA256TreeHash":"657a715f87baa9d89b651d185d8bc73147e686ee91252edcd57bae3c310b7490"
    },
    {
      "ArchiveId":"Soqd_sa_vc88Q0uMkTDqGgq0hywCo-djEaD4Z3c5se09vg1TAucV_tIHVTx1WNdcI32smfV4evMeH4QK24QHX2ybR32MxUvu2fMhNku-xVzHu4GZcsAT0_iEdRLKFgvCE6hOYe27rQ",
      "ArchiveDescription":"",
      "CreationDate":"2017-08-21T18:42:22Z",
      "Size":6292900,
      "SHA256TreeHash":"657a715f87baa9d89b651d185d8bc73147e686ee91252edcd57bae3c310b7490"
    }
  ]
}
```

$ aws glacier delete-archive --account-id - --vault-name iot-cloud-vault-01 --archive-id "skjfskfslfhsjfh"





Ref:
* [Delete an Archive from a Vault in Amazon Glacier](http://docs.aws.amazon.com/amazonglacier/latest/dev/getting-started-delete-archive.html)
* [CLI Command Reference: aws glacier delete-archive](http://docs.aws.amazon.com/cli/latest/reference/glacier/delete-archive.html)

---
### Eliminar un *vault*
Para eliminar un vault desde la CLI:
```bash


```

[Deleting a Vault in Amazon Glacier](http://docs.aws.amazon.com/amazonglacier/latest/dev/deleting-vaults.html)
