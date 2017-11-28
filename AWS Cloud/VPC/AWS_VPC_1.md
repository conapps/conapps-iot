Amazon Virtual Private Cloud (VPC)
===

*Fuentes:*
- [Documentación Oficial](https://aws.amazon.com/es/documentation/vpc/)
- [Página de AWS VPC](https://aws.amazon.com/es/vpc/)
- [Precios de AWS VPC](https://aws.amazon.com/es/vpc/pricing/)
- [Amazon Virtual Private Cloud (VPC): Tutorial For Beginners Class](https://youtu.be/fpxDGU2KdkA)
- [AWS re:Invent 2016: Creating Your Virtual Data Center: VPC Fundamentals and Connectivity (NET201)](https://youtu.be/Ul2NsPNh9Ik)
- [AWS re:Invent 2016: Extending Datacenters to the Cloud (NET305)](https://youtu.be/F2AWkGem7Sw)
- [AWS re:Invent 2016: From One to Many: Evolving VPC Design (ARC302)](https://youtu.be/3Gv47NASmU4)
- Otras fuentes referenciadas a lo largo de los documentos (Ref.)


## Indice
---
- [Introducción](#introduccion)
- Virtual Private Cloud
- Public, Private, and Elastic IP Addresses
- Public and Private Subnets
- Internet Gateways
- Route Tables
- NAT Gateway
- Security Groups
- Network ACLs
- VPC Best Practices
- Costs




---
## Introducción ##
---
### ¿Qué es Amazon Virtual Private Cloud (VPC)?      
Amazon Virtual Private Cloud (VPC) nos permite aprovisionar recursos de Amazon Web Services (AWS), por ej. instancias de EC2, dentro de una red virtual que nosotros definimos dentro de AWS. Esta red virtual se parece mucho a una red tradicional que operamos en nuestro propio datacenter, pero con los beneficios de utilizar la infraestructura escalable de AWS.

Podemos controlar todos los aspectos de la red virtual, incluyendo la selección de nuestro propio rango de direcciones IP, la creación de subredes, la configuración de tablas de ruteo, gateways, seguridad, e incluso si quisiéramos, el acceso a la misma desde nuestro datacenter.

Podemos personalizar la red virtual, por ej. crear una subred para el acceso público desde internet hacia nuestros servidores web en el frontend, y colocar los sistemas de backend como base de datos o servidores de aplicaciones en una subred privada sin acceso desde internet. Podemos también utilizar varias capas de seguridad, para controlar el acceso a las instancias de EC2 que se encuentren en cada una de las subredes.

Podemos incluso expandir nuestro datacenter privado (on-premise) hacia la nube de AWS, conectándolo a la red virtual VPC por medio de VPN, y viéndolo de esta forma como una extensión de nuestro propio datacenter. Esto nos permite crear un entorno de Hybrid Cloud donde podemos acceder tanto a los recursos de AWS como a los de nuestro propio datacenter.


###Beneficios de VPC

* **Múltiples opciones de conectividad**: conexión directa a internet, conexión a internet mediante NAT, conexión segura al datacenter on-premise via VPN, conexión directa a otras VPC, conexión con Amazon S3.
* **Características avanzadas de seguridad**: incluyendo grupos de seguridad (*Security Groups*) y listas de control de acceso a la red (*Network ACL*)
* **Sencillez**: creación de forma fácil y rápida desde la AWS console, incluyendo el asistente *VPC Wizard*.
* **Escalabilidad y fiabilidad**: los mismos beneficios que el resto de plataformas de AWS.
* **Integrado con otros servicios AWS**: tales como EC2, S3, etc.


### Casos de uso
* Hospedaje de un sitio web sencillo y con acceso público
* Hospedaje de aplicaciones web multicapa
* Hospedaje de aplicaciones web muy escalables en la nube de AWS y con conexión a su centro de datos
* Ampliar la red de su empresa en la nube
* Recuperación de desastres


Ref:
* [Amazon Virtual Private Cloud (VPC)](https://aws.amazon.com/es/vpc/)


---
## Conceptos Básicos ##
---

### AWS Default VPC
Cada cuenta de AWS incluye una VPC por defecto, la cual se ilustra en el siguiente diagrama:
![alt text](./images/default_vpc_01.png)


La Default VPC se encuenta preconfigurada y puede comenzar a utilizarse inmediatamente, por ej. para iniciar nuestras instancias de EC2 sin tener que realizar ninguna configuración previa.

La Default VPC incluye una red 172.31.0.0/16, con subnet mask /16, la cual nos provee de hasta 65.536 direcciones IP.  

Una VPC puede expandirse en múltiples *Availability Zones* en una región.
![alt text](./images/default_vpc_02.png)

Se debe tener en cuenta que si **eliminamos la Default VPC, no puede ser recuperada en forma sencilla**. Deberemos contactar a AWS Support para que ellos la vuelvan a restaurar.


*Ref.:*
[Default VPC and Default Subnets](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/default-vpc.html)





### VPC Peering
Podemos conectar nuestras propias VPC entre ellas, o con una VPC en otra cuenta de AWS, siempre y cuando se encuentren en la misma AWS Region, y no tengan rangos de IP solapados.

Las instancias que se encuentren en una VPC "A" no podrán comunicarse con instancias en la VPC "B" o "C" al menos que configuremos una *peering connection*.

![alt text](./images/vpc_peering_01.png)

Esta conexión es de tipo uno-a-uno, una VPC puede tener múltiples conexiones a otras VPC, pero no se va a conectar a otra por transitiva, salvo que específicamente tenga una conexión. En este caso, VPC "A" puede conectarse a "B" y "C", pero "B" no se podrá comunicar con "C".

![alt text](./images/vpc_peering_02.png)


### Hardware VPN Access
Por defecto las instancias que creamos dentro de una VPC no pueden comunicarse con nuestra propia red.
Pero podemos conectar la VPC a nuestro datacenter existente, mediante una *hardware VPN access*, con lo cual podemos expandir nuestro datacenter a la cloud, y crear un ambiente híbrido.
![alt text](./images/hardware_vpn_access_01.png)

Para hacer esto, necesitamos un *Virtual Private Gateway*, el cual es el concentrador de VPN del lado de Amazon. Luego del lado de nuestro datacenter necesitamos un *Customer Gateway* el cual puede ser físico o mediante software, y se encuentra de nuestro lado de la conexión VPN, lo cual permite crear el tunel VPN cuando el tráfico es generado desde nuestro lado de la conexión.

---
## Custom VPC
---
Entonces, por qué no utilizar siempre la Default VPC? La Default VPC es muy útil cuando estamos realizando pruebas en AWS.

Pero para un ambiente de producción, **crear una VPC propia** (o varias) nos permite, entre otras cosas:
* seleccionar nuestro propio rango de IP
* crear nuestras propias subredes, ya sea públicas y/o privadas
* mejorar nuestros seteos de seguridad

![alt text](./images/custom_vpc_01.png)


### Creando una Custom VPC

Veamos como crear una VPC propia, desde la consola de AWS.
![alt text](./images/create_custom_vpc_01.png)


Podemos crear la VPC utilizando el **VPC Wizard**, el cuál nos permite crear la VPC con configuraciones predefinidas por AWS, que se ajustan a diferentes entornos:
![alt text](./images/create_custom_vpc_02.png)


Por ej., una VPC con una única subnet privada, o una VPC con subnets privadas y públicas, etc.
![alt text](./images/create_custom_vpc_03.png)


Pero en nuestro caso **no vamos a usar el VPC Wizard**, para poder ir creando nuestra red virtual paso a paso, y así entender mejor sus componentes.

Para crear la VPC, vayamos a *Your VPCs* sobre el menú izquierdo, y luego a *Create VPC*.
![alt text](./images/create_custom_vpc_04.png)

A continuación debemos ingresar:
- Nombre de la VPC
- Rango de direcciones IP y la netmask, la cual debe estar entre /16 y /28. Con /16 obtenemos 65.536 direcciones IP en nuestra red.
- Si queremos o no asociar direcciones IPv6 provistas por Amazon (no se puede seleccionar el rango).
- El *Tenancy*, que indica si vamos a correr la instanciasen hardware dedicado o compartido. En general vamos a seleccionar la opciónd e *Default*.
  - *Default*: las instancias de EC2 que corramos en esta VPC, van a residir de acuerdo a la opción de *tenancy* que seleccionemos al crear la propia instancia de EC2.
  - *Dedicated* las instancias de EC2 que corramos en esta VPC, van a residir siempre en HW dedicado, sin importar que opción de *tenancy* seleccionemos al crear la instancia de EC2. Esto brinda una gran performance, pero a un costo significativamente superior.


.
![alt text](./images/create_custom_vpc_05.png)

Una vez creada, podemos ver abajo la información de la VPC.

Podemos ver, por ejemplo, que tiene una **Route Table** predefinida:
![alt text](./images/create_custom_vpc_06.png)

La cuál por defecto solo admite tráfico local:
![alt text](./images/create_custom_vpc_07.png)


Y también podemos ver que tienen una **Network ACL** predefinida:
![alt text](./images/create_custom_vpc_08.png)

Que por defecto permite todo el tráfico desde cualquier origen, tanto de entrada (Inbound) como de salida (Outbound).
![alt text](./images/create_custom_vpc_09.png)

Vamos a profundizar sobre estos puntos mas adelante.


Ref:
* [Getting Started With Amazon VPC](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/getting-started-ipv4.html#getting-started-create-vpc)
* [Creating a VPC](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/working-with-vpcs.html#Create-VPC)
* [EC2 Dedicated Instances](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/dedicated-instance.html)

---
## Direcciones IP Privadas, Públicas y Elásticas
---
### Private IP Adress
Las direcciones IP privadas (*Private IPs*) son direcciones que no se pueden acceder desde Internet.

Pueden ser utilizadas para comunicación interna entre las instancias de EC2, dentro de la misma red, es decir, dentro de la misma VPC.

Cuando creamos una instancia de EC2, se le asigna una dirección IP privada, y un nombre de host interno (*Private DNS*) que resuelve esa dirección por DNS en forma interna a nuestra red, no permitiendo el acceso al mismo desde internet.


### Public IP Address
Para acceder a una instancia de EC2 desde internet, necesitamos una dirección IP pública.

Cuando creamos una instancia, se le asigna una dirección IP pública (*IPv4 Public IP*), y un nombre de host externo (*Public DNS (IPv4)*) que resuelve esa dirección por DNS en forma pública, permitiendo así el acceso a la instancia desde Internet.

Las direcciones IP públicas son asociadas a nuestras instancias EC2 desde un pool de direcciones públicas de Amazon. Pero si detenemos (o terminamos) la instancia EC2, esa dirección IP pública es liberada, y cuando iniciamos nuevamente la instancia se le asigna una nueva dirección IP pública nueva, diferente de la anterior.

### Elastic IP Address
Si queremos que la instancia EC2 retenga la dirección IP pública, necesitamos utilizar una dirección IP pública, denominada *Elastic IP Adrress*.

Esta es una dirección IP pública estática o persistente, que es asignada a la cuenta de AWS, y nosotros podemos asignarla a una instancia según lo necesitemos (o a otros recursos, como vamos a ver mas adelante).

La *Elastic IP* permanece en nuestra cuenta de AWS hasta que nosotros decidamos liberarla.
Esta dirección IP tiene un costo adicional, solo si la misma no se encuentra asociada a una instancia, es decir, si no la estamos usando.

#### Creando una Elastic IP Address
Dentro de la sección de VPC, sobre el menú de la izquierda, tenemos la opción de *Elastic IPs*.
![alt text](./images/elastic_ip_01.png)

Seleccionamos *Allocate new address* y luego nuevamente *Allocate*.
Creamos una nueva Elastic IP, la cual por defecto no queda asociada a ningún servicio.
![alt text](./images/elastic_ip_02.png)


Debemos tener en cuenta que, **mientras la Elastic IP no se encuentre asociada a un servicio, Amazon nos cobrará el costo de la misma.** Por lo cual, lo ideal es crear la Elastic IP en el momento que la necesitemos (por ej., al crear el NAT Gateway, cosa que veremos más adelante).

![alt text](./images/elastic_ip_03.png)

---
## VPC Subnets
---
Una subred es un rango de direcciones IP dentro de la VPC.

Se pueden iniciar recursos de AWS (ej. instancias de EC2) dentro de una determinada subred que seleccionemos. No podemos iniciar ningún recurso en nuestra VPC si no tenemos por lo menos una subred definida.

La netmask para la subred por defecto de la *default VPC* de AWS, es /20, lo que provee hasta 4096 direcciones IP por subred (algunas pocas son de uso reservado por AWS).


### Availability Zones
Una VPC puede abarcar múltiples *availability zones* de una región, pero una *subnet* siempre está asociada con una única *availability zone* y no puede abarcar otras.
![alt text](./images/subnets_01.png)

Las *availability zones* son ubicaciones diferentes diseñadas para quedar aisladas en caso de error de otras zonas. Por lo cual, al iniciar nuestras instancias en distintas zonas de disponibilidad, podemos proteger nuestras aplicaciones de los errores que se puedan producir en alguna de estas, y brindarles redundancia.


### Private & Public Subnets
Las **subredes públicas** se utilizan para recursos que necesitan tener acceso a Internet, por ej.: servidores web. Una subred pública se hace pública cuando su *route table* envía al *Internet Gateway* todo el tráfico cuyo destino es Internet (ya veremos esto).

Las **subredes privadas** se utilizan para recursos que no requieren acceso a Internet, o que queremos proteger (aislar) de Internet, por ej.: servidores de bases de datos.

![alt text](./images/subnets_02.png)

De todas formas vamos a ver como podemos darle acceso a internet a la subred privada, si así lo necesitamos.


### Creando Subredes
Veamos entonces como crear una subred pública y una privada, dentro de nuestra *Custom VPC*, y en diferentes *availability zones*.

Dentro del VPC Dashboard, seleccionamos *Create Subnet*.
Colocamos el nombre de la subnet, en este caso para que luego sea fácil identificarla, le pondremos el siguiente nombre: *10.0.1.0_us-east-1b_iot-cloud_PUB*

Este nombre hace referencia al direccionamiento IP, la availability zone, la VPC sobre la cual estoy creando la subred, y el tipo de subred (Public, Private).

Seleccionamos la VPC, la availability zone y el rango de IP (/24 nos brinda 251 direcciones IP dentro de la subred, dado que AWS se reserva algunas).
![alt text](./images/subnets_03.png)

Y ya tenemos creada la primer subred.
![alt text](./images/subnets_04.png)


Ahora vamos a crear una segunda subred, la cual será privada. A esta subred la vamos a llamar *10.0.2.0_us-east-1c_iot-cloud_PRV*, va a estar en la AZ *us-east-1c*, con la subred 10.0.2.0/24.

![alt text](./images/subnets_05.png)

![alt text](./images/subnets_06.png)

Si revisamos la *route table* de ambas subredes (en la parte inferior), podemos ver que permiten la comunicación interna entre ambas subredes, pero no hacia internet, por lo tanto ambas subredes todavía son privadas. Vamos a ver a continuación como darle acceso a internet a la subred pública, mediante la creación de un Internet Gateway.

![alt text](./images/subnets_07.png)

Ref:
* [Conceptos básicos de VPC y Subredes](http://docs.aws.amazon.com/es_es/AmazonVPC/latest/UserGuide/VPC_Subnets.html#vpc-subnet-basics)

---
## Networking
---
Veremos más en detalle sobre *Internet Gatways*, *Route Tables* y *NAT Devices*, y como crear estos dispositivos en nuestra VPC.

### Internet Gateway

El *Internet Gateway* es un componente de la VPC que permite la comunicación entre las instancias que corren en la VPC e Internet.

Cumple con dos propósitos:
- proporcionar un destino en las tablas de ruteo de la VPC para todo el tráfico dirigido a Internet
- realizar la conversión de las direcciones de red (NAT) para las instancias que tengan asignadas direcciones IPv4 públicas.

El Internet Gateway escala horizontalmente, es redundante y con alta disponibilidad, por lo tanto no plantea riesgos de disponibilidad ni restricciones de ancho de banda para el tráfico de red. Soporta tráfico IPv4 e IPv6.

Para permitir a una VPC que se conecte a Internet, debemos agregarle un Internet Gateway. Solo podemos tener un único Internet Gateway por VPC.

![alt text](./images/internet_gateway_01.png)

Para lograr que las instancias EC2 de nuestra VPC tengan acceso a Internet, necesitamos verificar los siguientes puntos:
1. Agregar un Internet Gateway a la VPC
2. Asegurarnos de que las instancias en la subred tengan una dirección IP Pública o una Elastic IP, para que puedan conectarse a Internet
3. Asegurarnos de que la route table de la subred apunte al Internet Gateway
4. Asegurarno de que los Network ACLs y Security Groups permitan pasar el tráfico que nosotros queremos hacia y desde Internet (por ej. HTTP, SSH, etc.)
.

#### Creando un Internet Gateway
En el VPC Dashbord, sobre el menú izquierdo, seleccionamos la opción de *Internet Gateway*, y luego *Crear Internet Gateway*
![alt text](./images/internet_gateway_02.png)

Luego le ponemos un nombre, en este caso: *iot-cloud-IGW*
![alt text](./images/internet_gateway_03.png)

El Internet Gateway se crea, y queda en estado *detached* porque todavía no está asignado a ninguna VPC:
![alt text](./images/internet_gateway_04.png)

Seleccionamos la opción de *Attach to VPC*, y podemos elegir a cuál de nuestras VPC lo vamos a asignar:
![alt text](./images/internet_gateway_05.png)

![alt text](./images/internet_gateway_06.png)

Antes de que cualquier instancia de EC2 dentro de nuestra VPC pueda acceder a Internet, debemos asegurarnos que la *route table* de la subred pública apunte al Internet Gateway. En lugar de cambiar la *route table* principal, vamos a definir una *custom route table* para la subred.


### Route Table
La *route table* determina hacia donde se dirigirá el tráfico de la subred, por medio de la definición de un conjunto de reglas.
Cada subred debe estar asociada con una route table. Una subred solo puede estar asociada con una única route table, pero podemos asociar múltiples subredes a la misma route table.

Cada VPC tiene una route table por defecto (*Main Route Table*). Es una buena práctica dejar esta route table en su estado original, y crear una nueva route table (*Custom Route Table*) para poder customizar el routeo del tráfico de nuestra VPC.

La siguiente imagen muestra la *Main Route Table* y nuestra *Custom Route Table*.

![alt text](./images/route_table_01.png)

La *Custom Route Table* le indica al *Internet Gateway* que dirija el tráfico de Internet a la subred pública. Mientras que la subred privada sigue estando asociada a la *Main Route Table* (o tabla por defecto), la cuál no permite tráfico de Internet. Todo el tráfico dentro de la subred privada solo permanece local.

#### Creando una Custom Route Table
Veamos como crear un *Custom Route Table*, asociarla con el *Internet Gateway* y con nuestra *Public Subnet*.

Desde la consola, en el VPC Dashboard, sobre el menú de la izquierda seleccionamos *Route Tables*. Podemos ver que nuestra VPC *iot-cloud-vpc* solo tiene una route table asociada, que es la que se crea por defecto.
![alt text](./images/route_table_02.png)

Para crear una nueva, seleccionamos *Create Route Table*.
Ponemos el nombre para la route table, en este caso *iot-cloud-rtb*, y seleccionamos a cual VPC la vamos a asignar, en nuestro caso *iot-cloud-vpc*.
![alt text](./images/route_table_03.png)

Ahora ya tenemos nuestra nueva route table definida:
![alt text](./images/route_table_04.png)

Si vemos las rutas que tiene por defecto, solo tiene el acceso local a nuestra red interna 10.0.0.0/16. Lo que debemos hacer a continuación, es cambiar sus rutas para que apunten al Internet Gateway definido previamente.

Para esto editamos la tabla (*Edit*) y agregamos una nueva ruta, cuyo destino sea internet 0.0.0.0/0 y el target es nuestro Internet Gateway, que nos aparece para poder seleccionarlo.

![alt text](./images/route_table_05.png)

De esta forma, ahora tenemos acceso a Internet por medio de esta route table.
![alt text](./images/route_table_06.png)

Si vamos a la parte de *Subnet Associations*, podemos ver que todavía no tenemos ninguna subred asociada a nuestra nueva route table. Ambas subredes que habíamos definido antes (PUB y PRV) siguen estando asociadas a la *default route table*, que no tiene acceso a Internet.

Por lo tanto debemos cambiar esto, editando (*Edit*) la configuración, y seleccionando nuestra red PUB para que quede asociada a esta route table:
![alt text](./images/route_table_07.png)

Ahora podemos ver que nuestra public subnet (PUB) está asociada con esta route table, y esta route table está asociada con el Internet Gateway. Por lo tanto, cualquier instancia que coloquemos en esta public subnet va a tener acceso a Internet.

![alt text](./images/route_table_08.png)


### NAT Device
Pero que pasa si queremos darle acceso a Internet a nuestra subred Privada?
Para esto debemos utilizar un *NAT Device*.

Mediante un *NAT Device* podemos permitir que las instancias que corren en una subred privada se conecten hacia Internet, pero no permite que la conexión se inicie desde Internet hacia las instancias.
![alt text](./images/nat_device_01.png)

Como ya hemos visto, podemos utilizar subredes públicas y privadas para proteger nuestras instancias de forma de que no estén conectadas directamente a Internet. Por ej., nuestros servidores web se ubicarían en la subred pública, mientras que nuestros servidores de bases de datos estarían en la subred privada que no tiene conexión a Internet.
Pero de todas formas, nuestros servidores de base de datos podrían necesitar acceso a Internet, por ej. para bajar actualizaciones, o quizá para conectarse a otros recursos de AWS a través de Internet. Para estos casos, podemos utilizar un Network Access Translation (NAT) Device.

Este dispositivo reenvía el tráfico de las instancias que se encuentran en nuestra subred privada hacia internet (o hacia otros servicios de AWS), y luego cuando vuelve la respuesta, la toma y la envía de vuelta hacia la instancia correspondiente. Cuando el tráfico va hacia internet, la dirección IP origen de la instancia es reemplazada con la dirección IP del NAT Device, y cuando el tráfico vuelve desde internet el NAT device traduce nuevamente la dirección IP a la dirección IP privada de la instancia.

En nuestro diagrama, agregamos ahora el NAT device, el cual debe ubicarse en la subred pública para poder tener acceso a internet.
![alt text](./images/nat_device_02.png)

AWS provee dos tipos de NAT Devices:
* NAT Gateway
* NAT Instance

AWS recomiendo el uso de NAT Gateway dado que es un servicio autogestionado, que provee una mayor disponibilidad y ancho de banda comparado con un NAT Instance. Cada NAT Gateway es creado en una Availability Zone específica y es implementado con redundancia dentro de esa zona. Al ser un servicio autogestionado, una vez que el servicio es iniciado, nos podemos olvidar de él, dado que no requiere administración.

Un NAT Instance es iniciado desde una NAT AMI (Amazon Machine Image) y se ejecuta como una instancia en la VPC, por lo cual es "un equipo más" que debemos gestionar.

Dado que el NAT Gateway plantea muchas ventajas, además de ser la opción recomendada por AWS, veremos únicamente este dispositivo.


#### Creando un NAT Gateway
El NAT Gateway debe ubicarse en una subred pública, dado que necesita conectividad a Internet. También requiere contar con una *Elastic IP address* la cual asignaremos al momento de crearlo.

Una vez creado, debemos actualizar la *route table* asociada con nuestra subred privada de forma de apuntar el tráfico a Internet de esta subred a través del NAT Gateway. De esta forma, las instancias en nuestra subred privada podrán comunicarse hacia internet de una manera segura.

![alt text](./images/nat_device_03.png)

Para crear un NAT Gateway, vamos al menú correspondiente sobre la izquierda, en el VPC Dashboard, y seleccionamos *Create NAT Gateway:*
![alt text](./images/nat_device_04.png)

Luego debemos seleccionar la subred en la cuál vamos a colocar nuestro NAT Gateway. Debe ir necesariamente en la subred pública, para poder tener acceso a Internet. En el cuadro aparecen listadas las diferentes subredes que tenemos, y podemos hacer una busqueda escribiendo el ID o el nombre de la misma.
![alt text](./images/nat_device_05.png)

Ahora debemos seleccionar la *Elastic IP Address* que vamos a asociar al NAT Gateway. Previamente habíamos creado la Elastic IP, de no ser así, podemos crearla desde acá mismo:
![alt text](./images/nat_device_06.png)

Una vez que tenemos ambos parámetros configurados, creamos el NAT Gateway:
![alt text](./images/nat_device_07.png)

![alt text](./images/nat_device_08.png)

Para poder utilizar el NAT Gateway, debemos editar la *route table* para incluir una ruta que tenga como destino este NAT Gateway. Podemos hacer esto desde aquí mismo, mediante el botón *Edit route tables*.
Esto nos lleva directamente a la sección de Route Tables de nuestra VPC.

Aca podemos filtrar entre todas las route tables colocando el nombre (o parte) de la VPC en el cuadro de search, en este caso "iot".

![alt text](./images/nat_device_09.png)

En la imagen anterior, podemos ver que tenemos dos route tables, la *iot-cloud-rtb* es la tabla personalizada que creamos antes (customized route table), mientras que la que no tiene nombre es la tabla por defecto que AWS crea para la VPC (main rout table). Si queremos, podemos asignarle un nombre para que nos quede mas claro, en este caso la renombré como *iot-cloud-rtb-main*. Esta última es la que debemos configurar para que apunte al NAT Gateway.

Podemos ver que esta route table solo tiene asociada nuestra subred privada:
![alt text](./images/nat_device_10.png)


Y en sus rutas solo tiene configurado el tráfico local:
![alt text](./images/nat_device_11.png)


Lo que debemos hacer, es agregarle una ruta para que apunte al NAT Gateway para el tráfico a Internet.
Le damos *Edit* y luego *Add another route*, y le ponemos que todo el tráfico hacia 0.0.0.0/0 sea dirigido a nuestro NAT Gateway.

Ojo que debemos seleccionar como destino nuestro NAT Gateway que definimos recién, y no el Internet Gateway que usamos para nuestra subred pública (en el recuadro aparecen ambos lo cual podría dar lugar a confusión). Luego grabamos la ruta, la cual debería quedar así:

![alt text](./images/nat_device_12.png)

De esta forma, cualquier instancia que ahora creemos en nuestra subred privada va a poder acceder a Internet a través de este NAT Gateway.

---
## Seguridad
---
En esta sección, veremos lo que se refiere a elementos de seguridad dentro de la custom VPC en la cuál venimos trabajando, específicamente *Security Groups* y *Network ACLs*.

### Security Groups
Un *security group* funciona como un firewall virtual que controla el tráfico de una o varias instancias. En cada grupo de seguridad, agregamos una o varias reglas que permiten controlar el tráfico entrante y/o saliente hacia/desde las instancias EC2 asociadas con el mismo.

Si vemos nuestro diagrama, agregamos los *security groups*, con las instancias de EC2 dentro de estos.
![alt text](./images/security_groups_01.png)


#### Consideraciones para los Security Groups
Hay algunas reglas que debemos tener en cuenta para los *security groups*:
* actúan en el ámbito de la instancia, no a nivel de la subred.
* se pueden asociar hasta 5 *security groups* a una instancia.
* por defecto permiten todo el tráfico de salida, salvo que nosotros lo restrinjamos.
* solo admite reglas "permisivas", es decir, no podemos crear reglas que bloqueen accesos (*deny*).
* son con estado (*stateful*), si enviamos un request desde nuestra instancia el tráfico de retorno a ese request se admite automáticamente, independientemente de las reglas de entrada que tengamos definidas.
* podemos crear/modificar reglas al security group en cualquier momento y las mismas se aplican inmediatamente.


#### Creando Security Groups
Vamos a configurar dos ejemplos, con dos *security group*, habilitando diferente tipo de tráfico para nuestro servidor web (ubicado en la subred pública) y para el servidor de base de datos (ubicado en la subred privada).

Para la instancia del servidor web, vamos a crear un *security group* que permita el siguiente tráfico:
| Tipo     | Protocolo     | Puertos    | Origen      |   
|:--------:|:-------------:|:----------:|:-----------:|
| HTTP     | TCP           | 80         | 0.0.0.0/0   |
| HTTPS    | TCP           | 443        | 0.0.0.0/0   |
| SSH      | TCP           | 22         | 10.0.0.0/32 |
Al ser una instancia con Linux, vamos a habilitar SSH desde nuestra red interna, además de los puertos de HTTP/HTTPS. El SSH podríamos habilitarlo a todo el mundo si quisieramos, aunque resulta una buena práctica restringirlo a la red desde la cuales voy a acceder al aquipo.

Mientras que para la instancia del servidor de base de datos, vamos a crear otro *seciruty group*, que permita el siguiente tráfico:
| Tipo     | Protocolo     | Puertos    | Origen      |   
|:--------:|:-------------:|:----------:|:-----------:|
| MS SQL   | TCP           | 1433       | 0.0.0.0/0   |
| RDP      | TCP           | 3389       | 10.0.0.0/32 |
En este caso al ser una instancia con Windows, habilitamos RDP desde la red interna para poder administrar el equipo con mayor facilidad.

En ambos casos, cualquier otro tráfico debe ser bloqueado.

**Primer Security Group (Web Servers)**
Vayamos entonces al **VPC Dashboard** y seleccionemos la opción *Security Groups* en el menú de la izquierda. Podemos ver que se listan los que tenemos definidos actualmente, y seleccionamos *Create Security Group*:

![alt text](./images/security_groups_02.png)

Indicamos el nombre del *security group*, en este caso le vamos a poner *iot-cloud-SG-webservers*, una descripción, y seleccionamos la VPC donde lo vamos a crear (*iot-cloud-vpc*):
![alt text](./images/security_groups_03.png)


Una vez creado el security group, si vamos a ***Inbound Rules*** vemos que no hay reglas de entrada definidas, dado que por defecto no se le asigna ninguna:
![alt text](./images/security_groups_04.png)

Para crear una regla, seleccionamos *Edit*. Podemos o bien dejar seleccionada la opción de *Custom TCP Rule* e indicar nosotros el rango de puertos que queremos utilizar, o podemos directamente seleccionar las que AWS tiene predefinidas, en este caso usaremos la HTTP (80):

![alt text](./images/security_groups_05.png)

Luego debemos especificar el origen del tráfico (*Source*) sobre el cual vamos a aplicar esta regla. Podemos seleccionar otro *security group* como origen, o indicar una dirección IP puntual, o una subred (ej. 192.168.2.0/24).

En nuestro caso como es un web server y queremos darle acceso público a todo el mundo (a estos puertos), pondremos 0.0.0.0/0, lo cual le brinda acceso a cualquier dirección IP de origen.

![alt text](./images/security_groups_06.png)

Hacemos lo mismo para la regla del tráfico HTTPS (443), y para el SSH (22) habilitamos el tráfico desde nuestra red interna (10.0.0.0/32).

Luego grabamos la configuración y las reglas toman efecto.
![alt text](./images/security_groups_07.png)


En cuanto a las reglas de salida, ***Outbound Rules***, por defecto se permite todo el tráfico saliente, proveniente desde nuestra instancia. Lo vamos a dejar sin cambios:
![alt text](./images/security_groups_08.png)

**Segundo Security Group (Database Servers)**
De la misma forma creamos el segundo *security group* para nuestra instancia de base de datos.

Seleccionamos el puerto de MS SQL Server (1433). En cuanto al origen (*Source*) podríamos habilitarlo de forma pública para todo el mundo, pero en realidad lo que debemos hacer es permitir el tráfico hacia los database servers que provenga únicamente desde nuestros web servers, lo cuál sería mucho mas seguro. Para hacer esto, ponemos como origen el *security group* que corresponde a nuestros web servers, esto es el *iot-cloud-SG-webservers*.

![alt text](./images/security_groups_09.png)

También agregamos la regla para el tráfico RDP desde nuestra red privada (10.0.0.0/32) para poder administrar el equipo.
![alt text](./images/security_groups_10.png)









.
.
.
..


### Network ACLs
Puede configurar ACL de red con reglas similares a sus grupos de seguridad para añadir una capa de seguridad adicional a su VPC. Para obtener más información acerca de las diferencias entre los grupos de seguridad y las ACL de red, consulte Comparación de grupos de seguridad y ACL de red.



*Ref:*
[VPC Security Groups](http://docs.aws.amazon.com/es_es/AmazonVPC/latest/UserGuide/VPC_SecurityGroups.html)
[Comparación de grupos de seguridad y ACL de red](http://docs.aws.amazon.com/es_es/AmazonVPC/latest/UserGuide/VPC_Security.html#VPC_Security_Comparison)













### Configuración inicial
Abra una consola (terminal en Linux o cmd en Windows), y luego:

```bash
$ aws configure
AWS Access Key ID [None]: AKIAWOINCOKAO3UZB4TN
AWS Secret Access Key [None]: 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
Default region name [None]: us-east-1
Default output format [None]: json
```

Donde:
- *AWS Access Key ID [None]:* clave de acceso de su usuario (generada por IAM)
- *AWS Secret Access Key [None]:* clave secreta de su usuario (generada por IAM)
- *Default region name [None]:* el nombre de la región, ej: us-east-1
- *Default output format [None]:* introduzca json

(las claves incluidas más arriba son ejemplos y no son válidas para el acceso)




---
[Siguiente >](./AWS_VPC_2.md)
