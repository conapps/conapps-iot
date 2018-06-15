Docker Compose
===

¿Qué es Docker Compose?

"Docker Compose" es una herramienta para definir y correr aplicaciones Docker 
multi-contenedor. Docker Compose está pensado, sobre todo para el entorno de
desarrollo y para cuando tenemos aplicaciones que empiezan a ser complejas.

Raramente una aplicación la podemos correr con un único ejecutable sino que
tiene una serie de componentes de los que dependemos alrededor.

Instalación
---

*  Ejecutar el siguiente comando para instalar docker-compose con pip
```
$ sudo pip install docker-compose
```

* Verificar la instalación
```
$ docker-compose --version
docker-compose version 1.21.2, build 1719ceb
```