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
---
**Amazon Virtual Private Cloud (VPC)** nos permite aprovisionar recursos de Amazon Web Services (AWS), por ej. instancias de EC2, dentro de una red virtual que nosotros definimos dentro de AWS. Esta red virtual se parece mucho a una red tradicional que operamos en nuestro propio datacenter, pero con los beneficios de utilizar la infraestructura escalable de AWS.

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
Entonces, por qué no utilizar siempre la Default VPC?
La Default VPC es muy útil cuando estamos realizando pruebas en AWS.

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
## Direcciones IP Privada, Pública y Elástica

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


![alt text](./images/elastic_ip_02.png)

---
## VPC Subnets
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




### VPC NAT Gateway


### Elastic IPs














### Network ACLs




### Security Group






Ref:
* [Default VPC and Default Subnets](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/default-vpc.html)








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
