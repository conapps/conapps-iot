| [< Anterior](https://github.com/conapps/conapps-iot/blob/master/AWS%20Cloud/EC2/AWS_EC2_Parte_3.md) | 


**<u>Laboratorio**</u>
------------
**Información Complementaria**

--------------------------------------------------------------------------------------------------

<u>Referencia fundamental:</u> http://docs.aws.amazon.com/cli/latest/reference/ec2/

--------------------------------------------------------------------------------------------------

**Para ver todas las regiones:**



    aws ec2 describe-regions

******************************************************************************************************

**Para ver todas las instancias que tenemos levantadas en la región pej.: eu-west-1**

    aws ec2 describe-instances --region eu-west-1 --output json

******************************************************************************************************

**Si queremos ver todas las instancias que tenemos levantadas en todas las regiones:**

    aws ec2 describe-instances

******************************************************************************************************


**A continuaciòn se debe producir una tabla mostrando los campos Endpoint y RegionName 
de las regiones AWS que soportan Ec2.**


    aws ec2 describe-regions

**Si queremos ver las availability zones de una determinada region:**

    aws ec2 describe-availability-zones --region us-west-2

******************************************************************************************************

<u>Luego necesitaremos generar un par de claves (publica y privada, para conectarnos a las diferentes instancias de EC2</u>

--------------------------------------------------------------------------------------------------


**Creating a Key Pair:**
-------------------------
    aws ec2 create-key-pair --key-name MyKeyPair --output text > MyKeyPair.pem



Tenga en cuenta que para Windows PowerShell, la redirección de archivos predeterminada es la codificación UTF-8, 
que no se puede utilizar con algunos clientes SSH. 

Por lo tanto, debe especificar explícitamente la codificación ASCII en el comando out-file.

    aws ec2 create-key-pair --key-name MyKeyPair --output text | out-file -encoding ascii -filepath MyKeyPair.pem



<u>Para Windows tipearemos el siguiente comando:</u>


    aws ec2 create-key-pair --key-name MyKeyPair --output text > MyKeyPair.pem


Nota:

Si está utilizando un cliente SSH en una computadora Linux para conectarse a su instancia, 
utilice el siguiente comando para establecer los permisos de su archivo de clave privada para que solo pueda leerlo.

chmod 400 MyKeyPair.pem



*******************************************************************************************************

**Para ver el par de claves creadas, tipeamos el siguiente comando:**

    aws ec2 describe-key-pairs --key-name MyKeyPair


*******************************************************************************************************

**Para borrar un key Pair:**
    
    aws ec2 delete-key-pair --key-name MyKeyPair


Creado el key pair, se deberá crear si no existe, un Grupo de seguridad (o security group)

--------------------------------------------------------------------------------------------------

**Security Groups:**
---------------

Un grupo de seguridad actúa como un firewall virtual que controla el tráfico de una o más instancias. 
Al iniciar una instancia, se asocian uno o más grupos de seguridad con la instancia. 
Añade reglas a cada grupo de seguridad que permite el tráfico hacia o desde sus instancias asociadas. 
Puede modificar las reglas de un grupo de seguridad en cualquier momento; 
Las nuevas reglas se aplican automáticamente a todas las instancias asociadas con el grupo de seguridad. 

Cuando decidimos si permitir que el tráfico alcance una instancia, evaluamos todas las reglas de todos 
los grupos de seguridad que están asociados con la instancia.

Ver!! Reglas de Grupo de Seguridad
-------------------------------------

Nosotros en esta primera instancia, usaremos el security group que ya viene creado por defecto.

********************************************************************************************************


**Para ver las AMIs disponibles**
------------------------------------------

    aws ec2 describe-images

-Muestra todas las AMIs disponibles en Amazon-


En cambio:
Si queremos ver todas las AMIs que sean Windows

    aws ec2 describe-images --owners amazon --filters "Name=platform,Values=windows"


********************************************************************************************************

**Para crear una nueva instancia en EC2**
-----------------------------------------

    aws ec2 run-instances --image-id ami-27a58d5c --count 1 --instance-type t2.micro --key-name MyKeyPair --security-groups default


**Ver los datos completos de una instancia**

    aws ec2 describe-instances (Me mostrarà la instancia levantada)


**Ver el estado de las instancias que tenemos actualmente**

    aws ec2 describe-instances

*************************************************************************************************************

**Terminar una Instancia**
---------------------------

    aws ec2 terminate-instances --instance-ids i-0cb6ca095f82ddc41

*************************************************************************************************************

**Snapshots**
---------------

Para ver los volúmenes que tenemos creados:

    aws ec2 describe-volumes



**<u>Crear un Snapshot</u>**

    aws ec2 create-snapshot --volume-id vol-0a888b48885235068 --description "Primer snapshot desde CLI."

<u>Se mostrará una salida del estilo..</u>

    "Description": "Primer snapshot desde CLI",
    "Encrypted": false,
    "VolumeId": "vol-0a888b48885235068",
    "State": "pending",
    "VolumeSize": 30,
    "StartTime": "2017-08-21T12:54:39.000Z",
    "Progress": "",
    "OwnerId": "805750336955",
    "SnapshotId": "snap-091fdb87b65653476"


**Para ver el status de un snapshot:**

    aws ec2 describe-snapshots --snapshot-id snap-091fdb87b65653476


    "Snapshots": [
        {
            "Description": "Primer snapshot desde CLI",
            "Encrypted": false,
            "VolumeId": "vol-0a888b48885235068",
            "State": "completed",
            "VolumeSize": 30,
            "StartTime": "2017-08-21T12:54:39.000Z",
            "Progress": "100%",
            "OwnerId": "805750336955",
            "SnapshotId": "snap-091fdb87b65653476"

    }

<u>Como vemos en el State, este snapshot ya quedó pronto (State completed)</u>


**************************************************************************************************************

**Recuperación de volumenes desde un snapshot previamente creado**
-------------------------------------------------------------------


**Primeramente vamos a crear un nuevo volumen partiendo desde ese snapshot**


    aws ec2 create-volume --size 30 --availability-zone us-east-1b --snapshot-id snap-091fdb87b65653476 --volume-type gp2


<u>Vemos la siguiente salida:</u>

    {
        "AvailabilityZone": "us-east-1b",
        "Encrypted": false,
        "VolumeType": "gp2",
        "VolumeId": "vol-03211f85305feb5ec",
        "State": "creating",
        "Iops": 100,
        "SnapshotId": "snap-091fdb87b65653476",
        "CreateTime": "2017-08-21T13:13:10.999Z",
        "Size": 30
    }

------------------------------------------------------------------------

<u>Posteriormente debemos detener la instancia (No terminarla)</u> 

Una vez detenida la instancia, debemos hacer un detach del volumen que deseamos sobreecribir con este nuevo volumen creado.


    aws ec2 stop-instances --instance-ids i-0adbf68029ce0ed02



**Para conocer el id de instancia, recordamos el comando:**


    aws ec2 describe-instances


Una vez ejecutado el stop, tendremos la siguiente salida:

    {
        "StoppingInstances": [
            {
                "InstanceId": "i-0adbf68029ce0ed02",
                "CurrentState": {
                    "Code": 64,
                    "Name": "stopping"
                },
                "PreviousState": {
                    "Code": 16,
                    "Name": "running"
                }
            }
        ]
    }


*******************************************************************************
**<u>Detach de un volumen**</u>

Primeramente necesitamos ver los volumenes que tenemos y su estado:


    aws ec2 describe-volumes

Se mostrará la siguiente salida:

    {
        "Volumes": [
            {
                "AvailabilityZone": "us-east-1b",
                "Attachments": [
                    {
                        "AttachTime": "2017-08-21T12:30:55.000Z",
                        "InstanceId": "i-0adbf68029ce0ed02",
                        "VolumeId": "vol-0a888b48885235068",
                        "State": "attached",
                        "DeleteOnTermination": true,
                        "Device": "/dev/sda1"
                    }
                ],
                "Encrypted": false,
                "VolumeType": "gp2",
                "VolumeId": "vol-0a888b48885235068",
                "State": "in-use",
                "Iops": 100,
                "SnapshotId": "snap-090d97f72bf1330c1",
                "CreateTime": "2017-08-21T12:30:54.963Z",
                "Size": 30
            },
            {
                "AvailabilityZone": "us-east-1b",
                "Attachments": [],
                "Encrypted": false,
                "VolumeType": "gp2",
                "VolumeId": "vol-03211f85305feb5ec",
                "State": "available",
                "Iops": 100,
                "SnapshotId": "snap-091fdb87b65653476",
                "CreateTime": "2017-08-21T13:13:10.999Z",
                "Size": 30
            }
        ]
    }


Ahi se muestran los 2 volumenes. Uno que está ya atacheado, y el otro disponible. 

<u>Lo que haremos será un detach del volumen que se encuentra atacheado.</u>


    aws ec2 detach-volume --volume-id vol-0a888b48885235068


La salida será lo siguiente:

    {
        "AttachTime": "2017-08-21T12:30:55.000Z",
        "InstanceId": "i-0adbf68029ce0ed02",
        "VolumeId": "vol-0a888b48885235068",
        "State": "detaching",
        "Device": "/dev/sda1"
    }


---------------------------------------------------------

**<u>Luego haremos un attach del volumen que queremos colocar:</u>**

    aws ec2 attach-volume --volume-id vol-03211f85305feb5ec --instance-id i-0adbf68029ce0ed02 --device /dev/sda1


El device id lo obtenemos desde los detalles de la AMI. Para ello ejecutamos el siguiente comando:


    aws ec2 describe-images --image-ids ami-27a58d5c

siendo image-ids el id de la ami en la que estamos trabajando. Dicho id lo obtenemos del resultado de ejecutar aws ec2 describe-instances




**Ejecutamos un describe-volumes para verificar:**

    PS C:\Program Files (x86)\AWS Tools\PowerShell\AWSPowerShell> aws ec2 describe-volumes
    {
        "Volumes": [
            {
                "AvailabilityZone": "us-east-1b",
                "Attachments": [],
                "Encrypted": false,
                "VolumeType": "gp2",
                "VolumeId": "vol-0a888b48885235068",
                "State": "available",
                "Iops": 100,
                "SnapshotId": "snap-090d97f72bf1330c1",
                "CreateTime": "2017-08-21T12:30:54.963Z",
                "Size": 30
            },
            {
                "AvailabilityZone": "us-east-1b",
                "Attachments": [
                    {
                        "AttachTime": "2017-08-21T13:50:44.000Z",
                        "InstanceId": "i-0adbf68029ce0ed02",
                        "VolumeId": "vol-03211f85305feb5ec",
                        "State": "attached",
                        "DeleteOnTermination": false,
                        "Device": "/dev/sda1"
                    }
                ],
                "Encrypted": false,
                "VolumeType": "gp2",
                "VolumeId": "vol-03211f85305feb5ec",
                "State": "in-use",
                "Iops": 100,
                "SnapshotId": "snap-091fdb87b65653476",
                "CreateTime": "2017-08-21T13:13:10.999Z",
                "Size": 30
            }
        ]
    }


y finalmente starteamos nuevamente la instancia.....

    PS C:\Program Files (x86)\AWS Tools\PowerShell\AWSPowerShell> aws ec2 start-instances --instance-ids i-0adbf68029ce0ed02

    {
        "StartingInstances": [
            {
                "InstanceId": "i-0adbf68029ce0ed02",
                "CurrentState": {
                    "Code": 0,
                    "Name": "pending"
                },
                "PreviousState": {
                    "Code": 80,
                    "Name": "stopped"
                }
            }
        ]
    }

-------------------------------------------------------

**<u>Para terminar, tener en cuenta lo siguiente:**</u>
--------------------------------------------------

* Eliminar volúmenes EBS

* Los volúmenes EBS que no tienen "Eliminar en terminación" establecido en true persistirán después de que se cierre esta instancia. 

* Estos volúmenes pueden incurrir en un costo EBS por Amazon EC2 Pricing. 
ara eliminar volúmenes asociados a esta instancia, vaya a la pantalla Volúmenes.

* Revisar que en la consola no hayan quedado instancias corriendo.

* Tener en cuenta que es muy simple poder cometer un error al confundirse en que región se está trabajando. Lo recomendable es, en una primera etapa, elegir una única región para trabajar. De esa forma evitaremos que nos ocurra que nos queden en ejecución instancias en otras regiones, y por lo tanto no tendremos inconvenientes con los costos incurridos. 


-------------------------------------------------------

| [< Anterior](https://github.com/conapps/conapps-iot/blob/master/AWS%20Cloud/EC2/AWS_EC2_Parte_3.md) | 





