Amazon Elastic Container Registry (Amazon ECR)
===

---

Amazon Elastic Container Registry (ECR) es un registro de contenedores de Docker completamente administrado que 
facilita a los desarrolladores las tareas de almacenamiento, administración e implementación de imágenes de 
contenedores de Docker.

Prerrequisitos 
---


Para el proyecto GreenGrow, vamos a necesitar tener instalado en 
nuestro ambiente de desarrollo, un entorno de desarrollo pyhton + flask
y por otro lado vamos a necesitar una BBDD MySQL.

Para una mayor portabilidad y para que todos los desarrolladores
tengan el mismo ambiente de desarrollo, utilizaremos Docker y Docker-compose como
gestor de contenedores para implemenr dicho ambiente.

Para ello, será necesario seguir los pasos que detallo a continuación.

* **Instalar Docker**. Si no lo tienen instalado,  
pueden seguir la [siguiente guia](https://github.com/conapps/conapps-iot/blob/master/Desarrollo/claseDeDocker/20170801-Docker.md#instalaci%C3%B3n) paso a paso.
Powered by @Ismael.

* **Instalar Docker-compose**. Si no lo tienen instalado,  
pueden seguir la [siguiente guia](https://github.com/conapps/conapps-iot/blob/master/Desarrollo/claseDeDocker/20180615-Docker-Compose.md) paso a paso.


* **Configurar la CLI de AWS**. Si no la tienen instalada y configurada, 
pueden seguir la [siguiente guia](https://github.com/conapps/conapps-iot/blob/master/AWS%20Cloud/S3/AWS_S3.md#l%C3%ADnea-de-comandos-de-amazon-s3) paso a paso.
Powered by @Fernando.

**Nota:** las credenciales para el tenant de AWS Develop, se las paso por MS Teams.


Iniciar entorno de desarrollo
---

En esta instancia, ya estamos en condiciones de iniciar el ambiente de desarrollo.

* Clono el repositorio 
```
$ git clone https://github.com/conapps/conapps-iot.git
```

* Me paro en la carpeta iot-greengrow
```
$ cd /conapps-iot/AWS Cloud/Scripts/iot-greengrow
```

* Ejecuto el siguiente comando
```
$ docker-compose up -d
```

Este comando ya nos deja iniciados los contenedores mysql-server y flask-server 
listos para ser utilizados.

## Otros comandos útiles

* Para detener los contenedores ejecutamos
```
$ docker-compose stop
```

* Para borrar los contendores ejecutamos
```
$ docker-compose rm -f
```







#### Pull image from AWS ECR 


* Describir los repositorios de AWS ECR

Para descargar una imagen, es necesario conocer en que repo se encuentra,
para eso utilizamos el comando describe-repositories.
```
$ aws ecr describe-repositories
{
    "repositories": [
        {
            "registryId": "805750336955",
            "repositoryUri": "805750336955.dkr.ecr.us-east-1.amazonaws.com/greengrow/flask-server",
            "createdAt": 1529081363.0,
            "repositoryName": "greengrow/flask-server",
            "repositoryArn": "arn:aws:ecr:us-east-1:805750336955:repository/greengrow/flask-server"
        },
        {
            "registryId": "805750336955",
            "repositoryUri": "805750336955.dkr.ecr.us-east-1.amazonaws.com/greengrow/mysql-server",
            "createdAt": 1528570539.0,
            "repositoryName": "greengrow/mysql-server",
            "repositoryArn": "arn:aws:ecr:us-east-1:805750336955:repository/greengrow/mysql-server"
        }
    ]
}

```
* Ver las imagenes disponibles con sus respectivos tags

Una vez que tenemos el nombre del repositorio, podemos listar las imagenes
con sus respectivos tags dentro del repo.


```
$ aws ecr list-images --repository-name greengrow/mysql-server
{
    "imageIds": [
        {
            "imageDigest": "sha256:<Token>",
            "imageTag": "latest"
        }
    ]
}
```
```
$ aws ecr list-images --repository-name greengrow/flask-server
{
    "imageIds": [
        {
            "imageDigest": "sha256:<Token>",
            "imageTag": "latest"
        }
    ]
}

```


* Finalmente descargo la imagen.

```
$ docker pull 805750336955.dkr.ecr.us-east-1.amazonaws.com/greengrow/mysql-server:develop
```


#### Push image to AWS ECR 


* Obtener el comando de login para autenticar nuestro cliente Docker en el repositorio AWS ECR.

```
$ aws ecr get-login --no-include-email --region us-east-1
```

El comando devolverá un nuevo comando que debemos ejecutar tal cual sale en pantalla.

```
$ docker login -u AWS -p <TOKEN> https://805750336955.dkr.ecr.us-east-1.amazonaws.com
```



#### Otros comandos útiles

- Para conectarse al contenedor donde está corriendo mysql
```
$ docker exec -it mysql-server bash
```

- Para conectarse a mysql desde dentro del contenedor
```
$ root@mysql-server:/# mysql -u <user> -p
```

- Para conectarse a mysql desde fuera del contenedor
```
mysql -u <user> -p -h mysql-server
```
