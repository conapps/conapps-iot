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



- [Conceptos Básicos](#conceptos-básicos)
- [Primeros Pasos](#primeros-pasos)
- [Linea de Comandos de Amazon S3](#línea-de-comandos-de-amazon-s3)
- [Folders](#folders)
- [Acerca de los Datos](./AWS_S3_Parte_2.md)
    - [Consistencia de los Datos](./AWS_S3_Parte_2.md#consistencia-de-los-datos)
    - [Clases de Storage en S3](./AWS_S3_Parte_2.md#s3-storage-classes)
    - [Metadatos](./S3/AWS_S3_Parte_2.md#object-metadata)
    - [Tags](./AWS_S3_Parte_2.md#tags)
    - [Versionado](./AWS_S3_Parte_2.md#versionado)
- [Gestión de los Datos](./AWS_S3_Parte_3.md#gestión-de-los-datos)
    - [Lifecycle Policies](./AWS_S3_Parte_3.md#lifecycle-policies)
    - [Analytics](./AWS_S3_Parte_3.md#analytics)
    - [Metrics](./AWS_S3_Parte_3.md#metrics)
    - [Inventory](./AWS_S3_Parte_3.md#S3-inventory)
- [Páginas Web estáticas](./AWS_S3_Parte_3.md#static-web-pages)
- [Replicación entre Regiones](./AWS_S3_Parte_3.md#cross-region-replication)
- [Control de Acceso](./AWS_S3_Parte_3.md#access-control)
    - [Bucket Policy](./AWS_S3_Parte_3.md#bucket-policy-ejemplo)
    - [AWS Policy Generator](./AWS_S3_Parte_3.md#policy-generator)
    - [Audit Logs](./AWS_S3_Parte_3.md#audit-logs)
- [Protección de los Datos](./AWS_S3_Parte_3.md#protección-de-los-datos)
    - [Datos en Tránsito](./AWS_S3_Parte_3.md#datos-en-tránsito)
    - [Server Side Encryption (SSE)](./AWS_S3_Parte_3.md#server-side-encryption-sse)
    - [Client Side Encryption](./AWS_S3_Parte_3.md#client-side-encryption)
- [Información adicional](./AWS_S3_Parte_3.md#información-adicional)
- [Herramientas para AWS S3](./AWS_S3_Parte_3.md#herramientas-para-aws)

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

Una VPC puede expandirse en múltiples *Availability Zones* en una región,
![alt text](./images/default_vpc_02.png)

Se debe tener en cuenta que si **eliminamos la Default VPC, no puede ser recuperada en forma sencilla**. Deberemos contactar a AWS Support para que ellos la vuelvan a restaurar.



### VPC Peering
Podemos conectar nuestras propias VPC entre ellas, o con una VPC en otra cuenta de AWS, siempre y cuando se encuentren en la misma AWS Region, y no tengan rangos de IP solapados.

Las instanacias que se encuentren en una VPC "A" no podrán comunicarse con instancias en la VPC "B" o "C" al menos que configuremos una *peering connection*.

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




### VPC Subnets





### Route Table





### Elastic IPs




### Internet Gateway




### VPC NAT Gateway




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
