| [<-- Volver](https://github.com/conapps/conapps-iot/blob/master/claseDeDocker/20170815-Storage.md) |
[Siguiente -->](#) |

## Networking

### Introducción

Cuando instalamos Docker, se crean por defecto 3 redes:

```bash
$ docker network ls
NETWORK ID          NAME                DRIVER
7fca4eb8c647        bridge              bridge
9f904ee27bf5        none                null
cf03ee007fb4        host                host
```

Los contenedores pueden conectarse a estas redes al momento de su creación con la opción ```--network```.
Si no especificamos ninguna opción, Docker conecta los contenedores a la red ```bridge``` por defecto.
Estas tres redes utilizan drivers dinsintos y por tanto tienen comportamientos también distintos, a continuación veremos una breve explicación de cada una de ellas:

#### bridge
La red ```bridge``` representa a la interface ```docker0``` en el host. Básicamente, al instalar Docker, se crea en el host una interface ```docker0``` que "mira" hacia el motor de Docker, se le asigna una dirección IP, y se la deja lista para que los containers que no definan ninguna red específica al momento de su creación se conecten a ella.

```bash
$ ifconfig
--> SALIDA OMITIDA PARA MAYOR CLARIDAD <--
docker0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.17.0.1  netmask 255.255.0.0  broadcast 0.0.0.0
        inet6 fe80::42:acff:fecb:1c79  prefixlen 64  scopeid 0x20<link>
        ether 02:42:ac:cb:1c:79  txqueuelen 0  (Ethernet)
        RX packets 8574  bytes 472977 (472.9 KB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 17876  bytes 25736022 (25.7 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
--> SALIDA OMITIDA PARA MAYOR CLARIDAD <--
```

La red se llama ```bridge``` debido a que técnicamente es eso, un bridge, que interconecta en capa 2 a todos los contenedores que la utilizan, (y a la interface ```docker0``` del host). La interface ```docker0``` existe para que los contenedores conectados a la red ```bridge``` tengan conectividad con el exterior; esto se hace con un PAT utilizando la IP de dicha interface.

#### none
La red tipo ```none``` básicamente deja al contenedor aislado del mundo.
Veamos esto con un ejercicio:

> Ejercicio:
> Crear una imagen llamada ```netubuntu``` basada en la imagen ubuntu, pero que tenga instalado el paquete ```net-tools```.

Ahora que contamos con la imagen ```netubuntu``` podemos verificar el funcionamiento de la red ```none``` con driver ```null```.


```bash
$ docker run -it --name my-none-container --rm --network=none netubuntu bash
root@68965d657e5d:/# ifconfig
lo        Link encap:Local Loopback  
          inet addr:127.0.0.1  Mask:255.0.0.0
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1
          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)
```


#### host
La red tipo ```host``` lo que hace es que el contenedor utiliza directamente el stack TCP/IP de la máquina host. Por lo que en lo que a red se refiere, el contenedor y el host son la misma cosa. Verfiquemos el funcionamiento de esta red:

```bash
$ docker run -it --name my-host-container --rm --network=host netubuntu bash
root@68965d657e5d:/# ifconfig
---> AQUÍ DEBERÍA VERSE EXACTAMENTE LO MISMO QUE EN EL HOST <---
```






| [<-- Volver](https://github.com/conapps/conapps-iot/blob/master/claseDeDocker/20170815-Storage.md) |
[Siguiente -->](#) |
