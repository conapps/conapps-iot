Introducción Amazon Web Services
===

Se podría definir como un servicio de delivery de recursos de IT a demanda en internet, los cuales son facturados en la medida que se van utilizando. 

Un par de definiciones

- Cloud computing les permite a las empresas consumir recursos computacionales, como lo son máquinas virtuales, almacenamiento, red, aplicaciones, así como también; electricidad, UPS y generadores, en vez de tener que construir y mantener una infraestructura local.

- Cloud computing provee una forma fácil de acceder a servidores, almacenamiento, bases de datos y una gran variedad de aplicaciones mediante internet. Dichas plataformas de servicios cloud, son dueñas de todo el equipamiento y la infraestructura necesaria para brindar todos los servicios mediante aplicaciones web.

### ¿Quiénes ofrecen cloud computing?

Existen un gran numero de proveedores, los más grandes son:

1.	Amazon
2.	Microsoft
3.	Google
4.	Alibaba
5.	IBM
6.	Oracle
7.	Otros


### Ventajas de utilizar cloud computing



El costo del hardware cada vez más bajo, los servidores cada vez más potentes, y la posibilidad de virtualizar ambientes de trabajo, trajo consigo un nuevo paradigma.

**1. Cambiar los grandes gastos de inversiones gastos variables.**

En lugar de tener que realizar una cuantiosa inversión en hardware y software incluso antes de saber qué uso les vamos a dar, se puede utilizar cloud computing y pagar únicamente cuando se consumen recursos informáticos, y solamente en función del consumo realizado.

**2.	Economía en escala masiva**

Mediante el uso de cloud computing, se puede reducir los costos variables que tendríamos por el uso de nuestros propios recursos. En la nube se suman los costos y consumos realizados por cientos de miles de usuarios. De esta forma, los proveedores como Amazon, Microsoft y otros, pueden aplicar mejores técnicas de economía de escala lo cual se traduce en precios más bajos para el cliente final.

**3.	Dejar de adivinar capacidades**

No es necesario tener que “adivinar” las necesidades de capacidad de la infraestructura. Al tomar una decisión respecto a la capacidad antes de implementar una aplicación, a menudo se acaba por acumular recursos costosos y ociosos, o se descubre (luego de implementar) que se dispone de una capacidad limitada. Con una implementación del tipo cloud computing, estos problemas desaparecen, ya que se puede obtener acceso a los recursos necesarios y aumentar o reducir la capacidad en segundos.

**4.	Aumente la velocidad y la agilidad**

En un entorno cloud, la disponibilidad de nuevos recursos está en todo momento a un simple clic del mouse. Esto significa que se puede reducir el tiempo que dichos recursos tardan en estar disponibles para los desarrolladores, pasando de semanas a cuestión de minutos. 

El resultado, es un aumento espectacular en la agilidad de la organización para poner en producción un sistema, ya que se reducen notablemente los tiempos y costos para hacer pruebas, investigación y deploy de aplicaciones.

**5.	Reducción de costos**

Mejorar e incrementar la capacidad de centrarse en proyectos que hagan destacar el negocio, en lugar de hacerlo en la infraestructura. Cloud computing nos permite centrarnos en los clientes, en lugar de la gigantesca tarea de instalar, ampliar y mantener servidores, sistemas de almacenamiento, networking, etc.

 
**6.	Disponibilidad a nivel mundial**

Podemos realizar el deploy de aplicaciones en cuestión de minutos, de forma sencilla, utilizando las regiones de AWS alrededor del mundo. De esta forma podremos ofrecer una menor latencia y una mejor experiencia a los clientes de forma sencilla y a un costo relativamente bajo.


Tipos de cloud computing
===

**Infraestructura como servicio (IaaS)**

La infraestructura como servicio contiene los recursos y servicios básicos. Por lo general, nos brinda el acceso a las características de redes (Networking), equipamiento virtual (VM), y almacenamiento (Storage). IaaS nos brinda el mayor nivel de flexibilidad y control de la administración en torno a los recursos de IT y, por lo tanto, es muy parecido a los recursos de IT existentes en la actualidad, con los que muchos departamentos de IT estamos acostumbrados.

**Plataforma como servicio (PaaS)**

PaaS elimina la necesidad de las empresas de tener que administrar la infraestructura (generalmente hardware y sistemas operativos) y permiten centrarse en la implementación y la administración de las aplicaciones. Esto contribuye a mejorar la eficiencia, pues no hay que preocuparse del aprovisionamiento de recursos, la planificación de la capacidad, el mantenimiento de software, los parches y ninguna de las arduas tareas que conocemos actualmente.

**Software como servicio (SaaS)**

SaaS proporciona un producto completo que el proveedor de servicio (AWS en este caso) ejecuta y administra. En la mayoría de los casos, quienes hablan de SaaS, en realidad se refieren a aplicaciones de usuario final. 
Implementando SaaS, no es necesario pensar en cómo se mantiene el servicio ni cómo se administra la infraestructura que corre debajo. Un ejemplo común que muchos utilizamos a diario es el sistema de mensajería Gmail, nos permite enviar/recibir correos sin tener que administrar la infraestructura ni los sistemas operativos en los que se ejecuta el programa de mail.


Modelos de implementación de cloud computing
===

**Nube o Cloud**

Una aplicación basada en la nube se encuentra 100% “hosteada" en los servidores de AWS, de modo que todos los componentes de la aplicación se ejecutan en esta. Las aplicaciones 100% cloud se han creado directamente en la nube, o se han transferido desde la infraestructura existente para aprovechar los beneficios de cloud computing. Dichas aplicaciones, se pueden construir en partes de infraestructura de bajo nivel (IaaS) o pueden utilizar servicios de nivel superior que proporcionan abstracción de los requisitos de administración (PaaS o SaaS).

**Hibrida**

Una arquitectura en la nube híbrida, es la integración de los recursos on-premise (on-prem) con los recursos de la cloud. El método más común de implementación híbrida consiste en conectar la cloud y la infra on-premise para ampliar e incrementar los recursos y servicios.
“…Puedo hablar algo del ejemplo de Office365 y BI…”

**On-Premise**

La implementación de recursos On-Premise mediante herramientas de administración de recursos y virtualización se denomina a veces “nube privada”. La implementación On-Premise no aporta muchos de los beneficios de la cloud computing, pero a veces se utiliza por su capacidad de proporcionar recursos dedicados. En la mayoría de los casos, este modelo de implementación es idéntico al de la infraestructura IT antigua (actual), mientras que utiliza tecnologías de virtualización y administración de aplicaciones para intentar incrementar el uso de los recursos.


Introducción a los servicios de AWS
===

Amazon ofrece un sinfín de servicios, los cuales se pueden segmentar en sub-grupos. A medida que vayamos avanzando en las presentaciones de cada uno de los grupos, veremos en detalle cada uno de estos temas, pero para comprender en un inicio explicaremos en que consiste cada uno de ellos.


EC2 (Elastic Compute Cloud)
===

EC2 es uno de los servicios más comunes y utilizados en AWS y permite crear máquinas virtuales dentro de nuestro ambiente de AWS.  Para tener una mayor comprensión de que es EC2, podemos desglosarlo en varios ítems:
1.	Amazon Machine Images (AMI): Templates de las instancias
2.	EC2 Instances type: Tipos de instancias (CPU, Memoria, Storage y Networking)
3.	Instance Purchasing Options: La forma en que se contrata la instancia
4.	Tenancy: Indica donde recide la instancia (Shared Instance, Dedicated Instance, Dedicated Host)
5.	User data: Permite ejecutar funciones en el boot, actualizar S.O 
6.	Storage Options: Persistan storage (EBS Volumenes) o Ephemeral Storage (EC2)
7.	Security: Tipos de firewall


S3 (Simple Storage Service)
===

Amazon Simple Storage Service (Amazon S3) coloquialmente, S3 podría verse como un gran storage en internet. Se puede utilizar S3 para guardar y obtener cualquier cantidad de datos en cualquier momento, desde cualquier lugar mediante internet. 
Está diseñado para ofrecer una durabilidad del 99,999999999%. Se utiliza para almacenar y distribuir archivos multimedia, big data, destino de backups, entre otros.
Como parte del “free tier”, se puede comenzar a utilizar Amazon S3 de forma gratuita. Al registrarse, los clientes nuevos de AWS reciben 5 GB de almacenamiento estándar en Amazon S3, 20.000 solicitudes Get, 2.000 solicitudes Put y 15 GB de transferencia de datos saliente al mes durante un año.
Para sacarle el máximo provecho a S3, es necesario entender unos simples concepto. S3 guarda los datos como objetos en dentro de una especie de contenedores llamados buckets. Cuando subimos un archivo, se le pueden setear permisos, así como cualquier metadata  .


EBS (Elastic Block Store )
===

Amazon Elastic Block Store (Amazon EBS) provee volúmenes de almacenamiento para utilizar con las instancias de EC2. Cada volumen de EBS, es replicada automáticamente dentro de la AZ para redundancia de datos, ofreciendo alta disponibilidad y durabilidad. EBS ofrece consistencia y una latencia muy baja. Por otro lado se puede expandir/contraer los volúmenes en minutos.
Esta designado para grandes volúmenes de datos, usualmente análisis de big data (como hadoop/HDFS y EMR clusters). 

Los volúmenes pueden ir desde 1 GB hasta 16 TB y una vez creado, puede ser attacheado a una instancia de EC2 en la misma AZ. Una vez attacheada, aparecerá como una unidad montada como cualquier otra unidad. En este momento, la instancia puede interactuar con el volumen como si fuera un disco local, se puede formatear o instalar aplicaciones directamente.
Un volumen puede ser atacheado a una sola instancia a la vez, pero muchos volúmenes pueden ser atacheados a una sola instancia.
También pueden ser utilizados como particiones de boot de instancias EC2.
 

Amazon Glacier
===

Amazon Glacier es un storage seguro, durable y extremadamente barato para backups de datos a largo plazo. Las organizaciones pueden archivar poco o grandes cantidades de información por un costo bajo por GB por mes. 

Para poder mantener los costos bajos Amazon Glacier esta optimizado para el acceso infrecuente de los datos, donde el acceso a la información puede demorar varias horas. Amazon S3 puede trabajar en conjunto con Amazon Glacier para permitirles a las organizaciones elegir el storage corrector para su carga de trabajo.

¿Cómo puedo recuperar datos del servicio?
Cuando haga una solicitud para recuperar datos de Glacier, iniciará un trabajo de recuperación de un archivo. Una vez completado el trabajo de recuperación, los datos estarán disponibles para descargarlos o acceder a ellos mediante Amazon Elastic Compute Cloud(Amazon EC2) durante 24 horas. Existen tres opciones para recuperar los datos, cada una de ellas con distintos tiempos de acceso y costos: recuperaciones Expedited, Standard y Bulk.
 ¿Qué son las recuperaciones Standard?
Las recuperaciones Standard le permiten acceder a cualquiera de sus archivos en cuestión de horas. Las recuperaciones Standard suelen completarse en unas 3-5 horas.


VPC (Virtual Private Cloud )
===

Amazon Virtual Private Cloud permite a las organizaciones aislar una sección de la Cloud de AWS donde se pueden ejecutar los recursos en una red virtual privada. Las empresas y organizaciones tienen el completo control sobre el ambiente vitual, incluyendo la selección de los rangos de ip, creación de sub-redes, y configuración de ruteo y gateways. 

Además, las empresas y organizaciones pueden extender su data center utilizando una vpn con AWS Direct Connect.
- Expandir la capacidad existente de la infra on-premise.
- Ejecutar en DR desde AWS.
- Ejecutar ambientes aislados de testing y developing.
- Ejecutar sistemas de escritorios virtuales en la red corporativa.

ELB
===

Elastic Load Balancing distribuye automáticamente el tráfico entrante de las aplicaciones entre varias instancias de Amazon EC2. Permite conseguir tolerancia a errores en las aplicaciones, ya que ofrece de manera integral la capacidad de balanceo de carga necesaria para enrutar el tráfico de las aplicaciones.

Elastic Load Balancing ofrece dos tipos de balanceadores de carga. Ambos aportan alta disponibilidad, escalado automático y excelente seguridad.
Los dos tipos son:
- Balanceador de carga clásico, que enruta el tráfico en función de la información a nivel de aplicación o de red. Es ideal para balancear el tráfico de forma sencilla en varias instancias de EC2.
- Balanceador de carga de aplicaciones, que enruta el tráfico en función de la información avanzada a nivel de aplicación que incluye el contenido de la solicitud. Es ideal para aplicaciones que necesitan capacidades de enrutamiento, microservicios y arquitecturas basadas en contenedores. También ofrece la capacidad de enrutar el tráfico a múltiples servicios o de balancear la carga en numerosos puertos de la misma instancia de EC2.

Route 53
===

Amazon Route 53 es un servicio web DNS (Sistema de nombres de dominio) escalable y de alta disponibilidad en la nube. Está diseñado para ofrecer a los desarrolladores y las empresas un método de confianza y rentable de redirigir a los usuarios finales a las aplicaciones en Internet convirtiendo nombres legibles para las personas como www.example.com en direcciones IP numéricas como 192.0.2.1 que utilizan los equipos para conectarse entre ellos. 

Amazon Route 53 también es conforme con IPv6.

Amazon Route 53 conecta de forma efectiva las solicitudes del usuario con la infraestructura en ejecución en AWS – como instancias de Amazon EC2, balanceadores de carga de Elastic Load Balancing o buckets de Amazon S3.

RDS
===

Amazon Relational Database Service permite configurar, utilizar y escalar una base de datos relacional en la nube. Proporciona capacidad rentable y escalable a la par que automatiza las arduas tareas administrativas como el aprovisionamiento de hardware, la configuración de bases de datos, los parches y los backups 

Amazon RDS está disponible para varios tipos de instancias de base de datos (optimizadas para memoria, desempeño o E/S) y le proporciona seis motores de bases de datos familiares incluidos Amazon Aurora, PostgreSQL, MySQL, MariaDB, Oracle y Microsoft SQL Server. Puede usar AWS Database Migration Service para migrar o replicar sus bases de datos existentes en Amazon RDS con facilidad.

DynamoDB
===

DynamoDB es un servicio de base de datos NoSQL  rápido y flexible para todas las aplicaciones que requieran latencias bajas y de pocos milisegundos a cualquier escala. 100% administrada en la nube, compatible con modelos de almacenamiento clave-valor y documentos. El modelo flexible, desempeño fiable y escalado automático la hacen ideal para celulares, webs, juegos e IoT.
Amazon DynamoDB Accelerator (DAX) es una memoria caché totalmente administrada y de gran disponibilidad que puede reducir los tiempos de respuesta de Amazon DynamoDB de milisegundos a microsegundos, incluso con millones de solicitudes por segundo.

ElastiCache
===

Amazon ElastiCache es un servicio web que facilita la creación, administración y escalado de una memoria cache distribuida en la cloud. Provee alta performance, escalamiento y costos reducidos para una solución de cache mientras se remueve la complejidad asociada con la implementación y la administración distribuida de un ambiente de cache.

 
Redshift
===

Redshift es un servicio de data warehouse  a escala de Petabytes constituido por una colección de recursos informáticos llamado	s nodos, los cuales están organizados dentro de un grupo llamado cluster. Cada cluster corre una instancia de Amazon Redshift y contiene una o más bases de datos.

CloudFront
===

Amazon CloudFront es un servicio web que agiliza la distribución de contenido web estático y dinámico a los usuarios finales, por ejemplo, archivos .html, .css, .php, imágenes y archivos multimedia en general. 
CloudFront entrega el contenido a través de una red mundial de ubicaciones de borde. Cuando un usuario final solicita contenido que se distribuye con CloudFront, el usuario se redirige a la ubicación de borde que ofrece la mínima latencia para que el contenido se entregue con el máximo desempeño posible. Si el contenido ya se encuentra en dicha ubicación de borde, CloudFront lo entrega inmediatamente. Si el contenido no se encuentra actualmente en dicha ubicación de borde, CloudFront lo recupera de un bucket de Amazon S3 o de un servidor HTTP (por ejemplo, un servidor web) que el usuario haya identificado como la fuente para la versión definitiva del contenido.

Amazon SES
===

Simple Email Service (SES) es una plataforma de correo que provee de forma sencilla y bajo costo la posibilidad de enviar y recibir correos utilizando nuestro propios dominios.
Por ejemplo, podemos utilizar SES para realizar envíos masivos de correos de marketing con una oferta especial, o correos de transacciones como una confirmación de orden de compra y otros tipos de correos como newsletters. 
Puedo extender las funcionalidades de las instancias de EC2 agregando la capacidad de enviar/recibir correos.
Como el resto de los servicios de AWS, solo se paga por lo que se utiliza.

Amazon SNS
===

Amazon Simple Notification Service (SNS) es un servicio de notificaciones móviles y mensajes completamente administrado para coordinar la entrega de mensajes a clientes y puntos de conexión suscritos. 
Se puede distribuir mensajes a una gran cantidad de suscriptores, incluidos servicios y sistemas distribuidos, y dispositivos móviles. Es fácil configurar, usar y enviar de manera confiable notificaciones a todos sus puntos de conexión. SNS elimina la complejidad y la sobrecarga asociada con la administración y el uso de infraestructura y software de mensajería dedicados.

Amazon SQS
===

Amazon Simple Queue Service (AWS SQS) es un servicio de cola de mensajes distribuido lanzado al mercado en 2004. Soporta de manera programática la posibilidad de enviar o recibir mensajes via web services. De esta forma, provee un sistema altamente escalable que resuelve los típicos errores entre emisor y receptor del mensaje.
En otras palabras, AWS SQS ofrece un servicio de cola de mensajes confiable y altamente escalable mientras dichos mensajes viajan entre aplicaciones o microservicios. 
Provee una API como mucho de los otros servicios de AWS y también puede ser consumida desde un lenguaje de programación mediante su SDK.

CloudSearch
===

Amazon CloudSearch es un servicio totalmente gestionado en la nube que provee de forma fácil la instalación, administración y el escalamiento de soluciones de búsqueda para nuestras sitios o aplicaciones.
Con CloudSearch, podemos realizar búsquedas de grandes colecciones de datos como páginas web, documentos, posts, o información relacionada a un producto. También podemos agregar capacidad de búsqueda sin la necesidad de volvernos expertos o preocuparnos por proveer el hardware necesario, instalarlo y mantenerlo. En tanto el tráfico y los datos varían, CloudSearch escala de forma automática para cumplir con los requerimientos.

EMR
===

Amazon Elastic MapReduce proporciona un marco Hadoop   hosteado 100% en la nube que facilita, acelera y rentabiliza la posibilidad de procesar enormes cantidades de datos en instancias de Amazon EC2 dinámicamente escalables.
En Amazon EMR, también se pueden ejecutar otros marcos de trabajo distribuidos populares, como lo son Apache Spark, HBase, Presto y Flink, e interactuar con otros servicios de almacenamiento de datos en AWS como lo son S3 y DynamoDB.

IAM
===

AWS Identity and Access Management (IAM) permite controlar de forma segura el acceso de los usuarios a servicios y recursos de AWS. Con IAM puede crear y administrar usuarios y grupos de AWS, así como utilizar permisos para permitir o denegar el acceso de estos a los recursos de AWS. 
IAM es una característica de su cuenta de AWS que se ofrece sin cargos adicionales. Solo se le cobrará por la utilización de los demás servicios de AWS por parte de sus usuarios.

Amazon CloudWatch
===

Amazon CloudWatch es un servicio de monitoreo de los recursos de la nube de AWS y de las aplicaciones que se ejecutan en AWS. Puede utilizar Amazon CloudWatch para recopilar y realizar el seguimiento de métricas y logs, establecer alarmas y reaccionar automáticamente a los cambios en sus recursos AWS. Amazon CloudWatch puede monitorizar recursos de AWS como, por ejemplo, instancias de Amazon EC2, tablas de Amazon DynamoDB e instancias de base de datos de Amazon RDS, así como métricas personalizadas generadas por las aplicaciones y los servicios, y los logs generados por las aplicaciones. 
Puede utilizar Amazon CloudWatch para obtener visibilidad para todo el sistema sobre la utilización de recursos, el desempeño de las aplicaciones y el estado de funcionamiento. Puede usar esta información para iniciar y mantener la ejecución de la aplicación sin problemas.

Amazon SWF
===

Amazon SWF ayuda a los desarrolladores a diseñar, ejecutar y escalar trabajos de fondo que siguen pasos paralelos o secuenciales. Se puede pensar en AWF como un workflow de trabjajo.

Deployment & Management Services

Web Interface
Management Console
Presentadores: Marcelo Iriarte
Management Console es una herramienta web que nos permite administrar los servicios de AWS de manera sencilla. También posee una aplicación móvil para ver rápidamente los recursos en cualquier lugar.


Beanstalk
===

AWS Elastic Beanstalk es un servicio fácil de utilizar para implementar y escalar servicios y aplicaciones web desarrollados con Java, .NET, PHP, Node.js, Python, Ruby, Go y Docker en servidores familiares como Apache, Nginx, Passenger e IIS.
Solo tiene que cargar el código y Elastic Beanstalk administrará de manera automática la implementación, desde el aprovisionamiento de la capacidad, el equilibrio de carga y el escalado automático hasta la monitorización del estado de la aplicación. Al mismo tiempo, tendrá el control absoluto de los recursos de AWS que alimentan su aplicación y podrá obtener acceso a los recursos subyacentes cuando quiera.
No se cargan tarifas adicionales por Elastic Beanstalk; solo paga por los recursos de AWS que necesite para almacenar y ejecutar las aplicaciones.

CloudFormation
===

AWS CloudFormation ofrece a desarrolladores y administradores de sistemas un método sencillo de crear una colección de recursos de AWS relacionados entre sí para ofrecerlos de una manera ordenada y predecible.
Puede utilizar las plantillas de muestra de AWS CloudFormation o crear las suyas propias para describir los recursos de AWS, así como cualquier dependencia asociada o parámetros de tiempo de ejecución necesarios para ejecutar su aplicación. No necesita saber el orden de aprovisionamiento de los servicios de AWS ni los detalles del funcionamiento de esas dependencias. CloudFormation se encarga de todo eso por usted. Después de haber implementado los recursos, puede modificarlos y actualizarlos de forma controlada y predecible, aplicando de hecho el control de versiones a la infraestructura de AWS de la misma forma en que se hace con el software. También puede visualizar las plantillas como diagramas y editarlas arrastrándolas en una interfaz de ratón con AWS CloudFormation Designer.
Puede implementar y actualizar una plantilla y su colección de recursos asociados (lo que se conoce como pila) con la consola de administración de AWS, la interfaz de línea de comandos (CLI) de AWS o las API. CloudFormation está disponible sin gastos adicionales; los clientes pagan únicamente los recursos de AWS necesarios para ejecutar sus aplicaciones.


Acceso a AWS
===

Existen distintas formas de acceder a los servicios de AWS, a continuación, los repasamos

**AWS Management Console**

Una de las formas más comunes para acceder es mediante la consola web de AWS, inicialmente los usuarios prefieren dicha interfaz porque les es más intuitivo su uso. La consola es de fácil uso y es accesible desde cualquier lugar, incluso desde un celular. También se utiliza mucho para ver estadísticas, gráficas de uso e indicadores de performance. 
Se pueden realizar la mayoría de las tareas mediante MC, pero requiere una persona que las ejecute a mano, en otras palabras, no es lo ideal para automatizar procesos.

**AWS Command Line Interface**

La línea de comandos, no es tan fácil ni intuitiva de utilizar como lo es la Consola de Administración, pero una vez familiarizados, es muy potente y útil para automatizar procesos y tareas mediante scripts.
La linea de comandos puede ejecutarse en distintos sistemas operativos, Linux, MAC y Windows utilizando Power Shell.


**Application Programming Interfaces (API’s)**

Todos los servicios de AWS fueron creados con el fin de ser consumidos mediante web services sobre el protocolo http. Es posible generar un request directo a AWS para generar una acción. Esto ofrece una gran flexibilidad en términos de automatización, pero conlleva tener que programas los requests y autenticar los mismos, ya que no queremos que nos ejecuten código en nuestros sistemas.
 

**AWS Software Development Kits (SDK)**

AWS provee varios SDK para leguajes populares de programación, de esta forma, hace más fácil el acceso a las API expuestas por  los servicios de AWS, sin el esfuerzo extra que requiere generar cada http request de las API. Actualmente se pueden bajar el SDK para el lenguaje deseado para:
1.	Android 
2.	JavaScript
3.	iOS
4.	Java
5.	.net
6.	Node.js
7.	PHP
8.	Python
9.	Ruby
 

**AWS Mobile Applications**

AWS provee 2 aplicaciones para móviles iOS y Android llamadas AWS Console Mobile App. Son muy útil cuando no se tiene acceso desde un pc, no posee todas las funcionalidades y es muy útil para operaciones de read-only			


AWS Regions and Availability Zones
==

Uno de los conceptos más importantes y menos entendidos de los fundamentos de AWS son las regiones y zonas. Es muy importante entender estos conceptos y sus diferencias, ya que serán necesarias para la arquitectura de las soluciones relacionadas a la geolocalización de los servicios y la proximidad al usuario final.

**Regions**

Podemos imaginarnos las regiones de AWS como una colección de data centers ubicadas geográficamente en un determinado lugar en el mundo.

Cada una de las regiones tiene su propio código que se descompone de la siguiente manera:

| Ubicacion Geográfica        | Ciudad           | Nombre  |
| ------------- |:-------------:| -----:|
| US East     | Northern Virginia | us-east-1 |
| US West     | Northern California | us-west-1 |
| US West  | Oregon    |   us-west-2 |
| UE | Irlanda      |    Eu-west-1 |


La primera parte del nombre (US, UE, SA) indica en que parte del mundo están ubicados los Data Centers. Esto es importante porque dependiendo que región seleccionemos, es donde nuestra información se almacenará.
También es importante consumir los servicios de las regiones más cercanas a los clientes, por un tema de latencia en el tráfico. Generalmente la latencia entre regiones ubicadas geográficamente lejos es mayor, lo que implica que el tiempo de respuesta sea mayor.	

[www.cloudping.info](www.cloudping.info)


Es muy importante saber qué región vamos a utilizar, incluso antes de comenzar a interactuar con los servicios. Si queremos, por ejemplo, iniciar una VM en Irlanda, primero debemos seleccionar la región para luego poder iniciar la VM.

- Nota: Es fundamental apagar todas las instancias que iniciemos para que no generen costos adicionales.

No todos los servicios de AWS están en todas las regiones. Consultar la siguiente URL para ver en detalle que servicios están disponible por región.

[Regiones & Productos](https://aws.amazon.com/es/about-aws/global-infrastructure/regional-product-services/)



Availability Zones
==

El concepto de availability zone está muy relacionado con las regiones. Podemos pensar que una región esta compuesta por varias availability zones.
Una forma fácil de entender el concepto es asociar una AZ con un Data Center, por lo tanto, una región puede tener uno o más Data Centers. 
Para muchos de los servicios de AWS, no solo hay que decirle en que Region queremos ejecutar el servicio, sino que también en qué AZ deseamos hacerlo (Ejemplo: EC2 Instance)
Notemos que algunas regiones tienen más AZ que otras, con la salvedad que cada Región tiene al menos 2 AZ, a excepción de China (limited preview).

| Region        | Availability Zone |
| ------------- |:-------------:| 
| us-west-1    | us-west-1a | 
|              | us-west-1b | 


La letra al final, indica en que AZ estoy.
Es importante saber que aunque estemos en distintas AZ dentro de una misma región, contamos con algunas características importantes:
- Conexión de alta velocidad (10 Gbps)
Esto nos permite realizar el deploy de una aplicación, en varias instancias en distintos data centers. 
- Nos permite tolerancia a fallos (fault tolerant). La aplicación puede seguir corriendo aunque un data center entero desaparezca por causas de problemas técnicos o incluso un desastre ambiental.
 

Cuentas de AWS
==

Es necesario contar con una cuenta para tener acceso a los servicios de AWS. La cual será asociada a una tarjeta de crédito internacional sobre la cual ser irán cargando los gastos de utilización. 
Por defecto, tenemos acceso a todas las regiones, salvo AWS GovCloud (EEUU) y Beijing.
La cuenta quedará asociada a la dirección de correo que ingresamos cuando creamos la cuenta.
Por otra parte, AWS recomienda NO utilizar dicha cuenta para trabajar, sino que recomienda asociar nuevas cuentas de usuarios con los permisos justos y determinados utilizando IAM (Identity and Access Management). Tema que profundizaremos más adelante
Una empresa o compañía puede tener varias cuentas distribuidas por departamento, equipo o aplicación. Una buena práctica es enmarcarlos en los siguientes roles:
- Develop
- Testing
- Producción

**Multiples cuentas de usuario**

AWS permite como vimos anteriormente tener varias cuentas de usuario asociadas a una misma empresa o compañía. Hay que tener en claro un detalle que muchas veces los usuarios no lo entienden cuando crean las cuentas.
La asignación de las AZ dentro de una región, pueden o no, ser las mismas para cuentas distintas, inclusos si esas cuentas pertenecen a la misma compañía o persona. Si bien la aplicación la ejecutaremos en la misma región y “misma AZ” de echo puede no ser así. Ya que si bien las 2 AZ son la letra a, puede no corresponder físicamente con el mismo datacenter. Es necesario contactar a AWS para conocer que DC esta mapeado en cual AZ para cada cuenta en particular.

¿Por qué se les ocurre que esto sea así?

1.	¿No sería más fácil tener mapeado igual todos los Data Centers con sus respectivas AZ para todos los usuarios?

2.	AWS tiene cientos de miles de usuarios, imaginen por un segundo que la mayoría de los usuarios creen sus VM con sus respectivos storages en un mismo DC. 

3.	AWS realiza esto para mantener un balanceo de carga de forma muy fácil, incluso, x defecto, la mayoría de los usuarios elegirían la AZ a, porque es la primera en el drop down.