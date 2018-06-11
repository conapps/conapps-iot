Amazon Elastic Container Registry (Amazon ECR)
===

---

Amazon Elastic Container Registry (ECR) es un registro de contenedores de Docker completamente administrado que 
facilita a los desarrolladores las tareas de almacenamiento, administración e implementación de imágenes de 
contenedores de Docker.

Prerrequisitos 
---


Para el proyecto GreenGrow, vamos a necesitar tener instalado en 
nuestro ambiente de desarrollo una BBDD MySQL.

Para una mayor portabilidad y para que todos los desarrolladores
tengan el mismo ambiente de desarrollo, utilizaremos Docker como
gestor de contenedores para implementar dicha BBDD.

Para ello, será necesario seguir los pasos que detallo a continuación.

* **Instalar Docker**. Si no lo tienen instalado,  
pueden seguir la [siguiente guia](https://github.com/conapps/conapps-iot/blob/master/Desarrollo/claseDeDocker/20170801-Docker.md#instalaci%C3%B3n) paso a paso.
Powered by @Ismael.

* **Configurar la CLI de AWS**. Si no la tienen instalada y configurada, 
pueden seguir la [siguiente guia](https://github.com/conapps/conapps-iot/blob/master/AWS%20Cloud/S3/AWS_S3.md#l%C3%ADnea-de-comandos-de-amazon-s3) paso a paso.
Powered by @Fernando.

```
AWS Access Key ID [None]: <AKID>
AWS Secret Access Key [None]: <SAK>
Default region name [None]: us-east-1
Default output format [None]: json
```
**Nota:** las credenciales para el tenant de AWS Develop, se las paso por MS Teams.


Descargar imagen desde AWS ECR 
---

* Describir los repositorios de AWS ECR

Para descargar una imagen, es necesario conocer en que repo se encuentra,
para eso utilizamos el comando describe-repositories.
```
$ aws ecr describe-repositories

{
    "repositories": [
        {
            "repositoryName": "greengrow/mysql-server",
            "registryId": "805750336955",
            "repositoryArn": "arn:aws:ecr:us-east-1:805750336955:repository/greengrow/mysql-server",
            "createdAt": 1528570539.0,
            "repositoryUri": "805750336955.dkr.ecr.us-east-1.amazonaws.com/greengrow/mysql-server"
        }
    ]
}
```
* Ver las imagenes

Una vez que tenemos el nombre del repositorio, podemos listar las imagenes
con sus respectivos tags dentro del repo.
```
$ aws ecr list-images --repository-name greengrow/mysql-server

{
    "imageIds": [
        {
            "imageTag": "develop",
            "imageDigest": "sha256:3b2bb5b09edce73b1bc86d4a13a4e06dd19f789bd61b84e0a66e13311d627b0d"
        }
    ]
}
```
* Finalmente descargo la imagen.

```
$ docker pull 805750336955.dkr.ecr.us-east-1.amazonaws.com/greengrow/mysql-server:latest
```

Iniciar el contenedor con MySQL 
---

Previo a la inicialización del contenedor llamado mysql-server,
es necesario crear una custom-network en Docker utilizando el comando 
siguiente. Si desean pueden investigar un poco mas de como 
funcionan las redes en docker leyendo este lindo [instructivo](https://github.com/conapps/conapps-iot/blob/master/Desarrollo/claseDeDocker/20170807-Networking.md#networking).

```
$ docker network create --subnet=172.21.0.0/16 greengrow-network
```

Una vez creada la red, podemos levantar el contenedor con mysql.

```
docker run --rm --name mysql-server -d \
--net greengrow-network \
--ip 172.21.0.10 \
--hostname mysql-server \
-e 'DB_NAME=testdb' \
-e 'DB_USER=miriarte' \
-e 'DB_PASS=conatel' \
-e 'DB_NAME=testdb' \
805750336955.dkr.ecr.us-east-1.amazonaws.com/greengrow/mysql-server:develop
```
Dicho comando inicia un contenedor utilizando la imagen descargada desde AWS ECR,
levanta el motor mysql, crea una bbdd llamada testdb y crea un usuario llamado miriarte.

De esta forma, nos queda una "Maquina Virtual" con MySQL instalado y 100% funcional. 

##Otros comandos útiles

- Para conectarse al contenedor donde está corriendo mysql
```
$ docker exec -it mysql-server bash
```

- Para conectarse a mysql desde dentro del contenedor
```
$ root@mysql-server:/# mysql -u miriarte -p
```

- Para conectarse a mysql desde fuera del contenedor
```
mysql -u miriarte -p -h 172.21.0.10
```
