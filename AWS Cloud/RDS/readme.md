# QUE ES Amazon Relational Database
Service (Amazon RDS)?

El servicio Amazon Database Relacional (Amazon RDS) es un servicio web que facilita la configuración,
operar y escalar una base de datos relacional en la nube. 

Proporciona una capacidad rentable y
base de datos relacional estándar del sector y gestiona tareas comunes de administración de bases de datos.

*TEMAS*

* Componentes de Amazon RDS 
* Interfaces RDS disponibles 
* Cómo se le cobra por Amazon RDS 
* Supervisión de una instancia de la base de datos RDS de Amazon 

¿Por qué desea un servicio de base de datos relacional administrado? Debido a que Amazon RDS se hace cargo de las tareas de gestión difíciles o tediosas de una base de datos relacional.

* Cuando compra un servidor, obtiene CPU, memoria, almacenamiento y IOPS, todos juntos. Con Amazon RDS, estos se dividen para que pueda escalar de forma independiente. Así, por ejemplo, si necesita más CPU, menos IOPS o más almacenamiento, puede asignarlos fácilmente.
* Amazon RDS administra copias de seguridad, parches de software, detección automática de fallos y recuperación.
* Para ofrecer una experiencia de servicio administrado, Amazon RDS no proporciona Shell access a Instancias de BD, y restringe el acceso a ciertos procedimientos del sistema y tablas que requieren privilegios
* Puede realizar copias de seguridad automatizadas cuando las necesite o crear su propia copia de seguridad instantánea. Estas copias de seguridad se pueden utilizar para restaurar una base de datos y el proceso de restauración de Amazon RDS funciona de manera fiable y eficiente.
* Puede obtener alta disponibilidad con una instancia primaria y una instancia secundaria síncrona que puede fallover a cuando ocurren los problemas. También puede utilizar MySQL, MariaDB o PostgreSQL Read Replicas para aumentar la escala de lectura.
* Puede utilizar los productos de base de datos que ya conoce: MySQL, MariaDB, PostgreSQL, Oracle, Microsoft SQL Server y el nuevo motor de Amazon Aurora DB compatible con MySQL .
* Además de la seguridad de su paquete de base de datos, puede ayudar a controlar quién puede acceder a su RDS utilizando AWS IAM para definir usuarios y permisos. También puede ayudar a proteger sus bases de datos poniéndolos en una nube privada virtual.

Para empezar a aprender más:

* Si es nuevo en RDS pero está familiarizado con otros servicios Web de Amazon, comience con una introducción a los componentes de Amazon RDS . Esta sección analiza los componentes clave de Amazon RDS y cómo se asignan a aquellos con los que trabaja actualmente en su red local.
* Para obtener una descripción general de todos los productos AWS, consulte ¿Qué es Cloud Computing?
* Amazon Web Services proporciona una serie de servicios de base de datos. Para obtener orientación sobre el servicio que es mejor para su entorno, consulte Ejecución de bases de datos en AWS

# Amazon RDS Components
*TEMAS*
* Instancias de DB 
* Regiones y zonas de disponibilidad 
* Grupos de Seguridad 
* Grupos de parámetros DB 
* Grupos de opciones de DB 

Instancias de BD

El elemento básico de Amazon RDS es la instancia de DB. Una instancia de DB es una base de datos aislada en la nube. Una instancia de base de datos puede contener varias bases de datos creadas por el usuario y puede acceder a él utilizando las mismas herramientas y aplicaciones que utiliza con una instancia de base de datos independiente. Tú puedes crear y modificar una instancia de la base de datos utilizando la interfaz de línea de comandos de AWS, la API de Amazon RDS o AWS Management Console.

Cada instancia de DB ejecuta un motor de DB. Amazon RDS actualmente soporta las versiones de MySQL, MariaDB, PostgreSQL, Oracle y Microsoft SQL Server. Cada motor DB tiene sus propias funciones soportadas, y cada versión de un motor DB puede incluir características específicas. Además, cada motor DB tiene un conjunto de grupos de parámetros de BD que controlan el comportamiento de las bases de datos que gestiona.
La capacidad de cálculo y memoria de una instancia de DB está determinada por su clase de instancia de DB. Tú puedes seleccionar la instancia de DB que mejor se adapte a sus necesidades. Si sus necesidades cambian con el tiempo, puede cambiar Instancias de BD. 

Para obtener información acerca de las clases de instancia de DB, vea DB Instance Class .
 Para información de precios sobre las clases de instancia de DB, vaya a la sección de precios del servicio Amazon Database Relational (Amazon RDS) .
[link](https://aws.amazon.com/es/rds/)

Para cada instancia de DB, puede seleccionar de 5 GB a 6 TB de capacidad de almacenamiento asociada. Cada instancia de DB class tiene requisitos mínimos y máximos de almacenamiento para las instancias de BD que se crean a partir de él. Es importante tener suficiente espacio de almacenamiento para que sus bases de datos tengan espacio para crecer y que El motor DB tiene espacio para escribir entradas de contenido o registro.
El almacenamiento de instancias de DB viene en tres tipos: magnético, de uso general (SSD) y provisto de IOPS (SSD).
Se diferencian en características de rendimiento y precio, lo que le permite adaptar su rendimiento de almacenamiento y costo para las necesidades de su base de datos. Para una discusión completa de los diferentes tipos de volumen, vea el tema Tipos de volumen de Amazon EBS.
Puede ejecutar una instancia de DB en una nube privada virtual utilizando la Amazon Virtual Private Cloud (VPC). Cuando utiliza una nube privada virtual, tiene control sobre su red virtual:  puede seleccionar su propio rango de direcciones IP, crear subredes y configurar el enrutamiento y el acceso listas de control. La funcionalidad básica de Amazon RDS es la misma si se ejecuta en un VPC o no; Amazon RDS administra copias de seguridad, parches de software, detección automática de fallas y recuperación. Sin costo adicional para ejecutar su instancia de DB en un VPC. 
Para obtener más información sobre VPC y RDS, consulte Amazon Virtual Private Cloud (VPCs) y Amazon RDS .

*Regiones y Zonas de disponibilidad*

Los recursos de computación en la nube de Amazon están alojados en instalaciones de centros de datos altamente disponibles en diferentes áreas del mundo (por ejemplo, Norteamérica, Europa o Asia). Cada ubicación del centro de datos se denomina región.Cada región contiene varias ubicaciones distintas llamadas Zonas de Disponibilidad o AZs. Cada zona de disponibilidad está diseñada para aislarse de fallas en otras Zonas de Disponibilidad, y para proporcionar servicios económicos, de baja frecuencia conectividad de red a otras Zonas de Disponibilidad en la misma región. Al iniciar instancias en Zonas de disponibilidad separadas, puede proteger sus aplicaciones del fallo de una sola ubicación.
Para lista de regiones y Zonas de disponibilidad, véase Regiones y Zonas de disponibilidad .
Puede ejecutar su instancia de DB en varias Zonas de disponibilidad, una opción denominada despliegue de Multi-AZ. Al seleccionar esta opción, Amazon automáticamente proporciona y mantiene un modo de espera sincrónico réplica de su instancia de base de datos en una zona de disponibilidad diferente. La instancia principal de la base de datos es sincrónica replicado a través de Zonas de disponibilidad en la réplica en espera para proporcionar redundancia de datos, soporte de conmutación por error, eliminar las congelaciones de E / S y minimizar los picos de latencia durante las copias de seguridad del sistema.

*Grupos de Seguridad*

Un grupo de seguridad controla el acceso a una instancia de DB. Lo hace al permitir el acceso a rangos de direcciones IP o instancias de Amazon EC2 que especifique.
Amazon RDS utiliza grupos de seguridad de DB, grupos de seguridad VPC y grupos de seguridad de EC2. En lenguaje sencillo, un grupo de seguridad de DB controla el acceso a una instancia de DB que no está en un VPC, un grupo de seguridad VPC controla acceso a una instancia de DB dentro de un VPC, y un grupo de seguridad de Amazon EC2 controla el acceso a un EC2 y se puede usar con una instancia de DB. 
Para obtener más información acerca de los grupos de seguridad, consulte Amazon Grupos de seguridad RDS .

*Grupos de parámetros DB*

Gestiona la configuración de un motor de base de datos mediante un grupo de parámetros de base de datos. Un grupo de parámetros de DB contiene valores de configuración del motor que se pueden aplicar a una o más instancias de DB del mismo tipo de instancia. Amazon RDS aplica un grupo de parámetros de DB predeterminado si no especifica un parámetro de DB cuando crea una instancia de DB. El grupo predeterminado contiene valores predeterminados para la base de datos específica motor y clase de instancia de la instancia de DB.

*Grupos de opciones de DB*

Algunos motores de DB ofrecen herramientas que simplifican la gestión de sus bases de datos y hacer el mejor uso de su datos. Amazon RDS hace que estas herramientas estén disponibles a través de grupos de opciones. Ejemplos de opciones disponibles son:
Oracle Application Express (APEX), cifrado de datos transparente de SQL Server y MySQL memcached apoyo. 
Para obtener más información sobre los grupos de opciones, consulte Trabajar con grupos de opciones .

# Available RDS Interfaces

*TEMAS*

* Consola Amazon RDS 
* Interfaz de línea de comandos 
* Interfaces programáticas 

Hay varias formas en las que puede interactuar con Amazon RDS.
*Consola Amazon RDS*

La consola Amazon RDS es una sencilla interfaz de usuario basada en la web. Desde la consola, puede realizar casi todas las tareas que necesita hacer desde la consola RDS sin necesidad de programación. Para acceder al Consola RDS de Amazon, inicie sesión en AWS Management Console y abra la consola Amazon RDS en
[console](https://console.aws.amazon.com/rds/)

*Interfaz de línea de comandos*

Amazon AWS proporciona una interfaz de línea de comandos que le da acceso a gran parte de la funcionalidad que está disponible en la Amazon RDS API. Para obtener más información, consulte la AWS Command Line Interface Documentación y referencia de la interfaz de línea de comandos AWS para Amazon RDS.

*Interfaces programáticas*

En la tabla siguiente se enumeran los recursos que puede utilizar para acceder a Amazon RDS mediante programación.

| recurso | descripción | 
| --- | --- |
| AWS SDKs | Los SDK de AWS incluyen código de ejemplo, bibliotecas, herramientas, documentación y plantillas. Para descargar los SDK de AWS, vaya a AWS Software Development Kits (SDK). |
| Libraries | AWS proporciona bibliotecas, código de ejemplo, tutoriales y otros recursos para desarrolladores de software que prefieren crear aplicaciones utilizando API en lugar de SOAP de Amazon Relational Database Service y API de consulta. Estas bibliotecas proporcionan funciones básicas (no incluidas en Amazon Relational Servicio de base de datos de SOAP y API de consulta), como autenticación de solicitud, solicitud de reintentos y manejo de errores para que pueda comenzar más fácilmente. Las bibliotecas y los recursos están disponibles para los siguientes idiomas: Java, PHP, Python, Ruby, Windows and .NET.Para bibliotecas y código de ejemplo en todos los idiomas, vea Código de ejemplo y bibliotecas. |
| Amazon RDS API | Si lo prefiere, puede codificar directamente a la API de Amazon RDS. Para más información, consulte Amazon RDS Application Programming Interface (API) , y vea el Amazon Relational Database Service API Referencia. |


# How You Are Charged for Amazon RDS

Cuando usa Amazon RDS, paga sólo por lo que usa, y no hay ningún costo mínimo o de configuración. Se facturan de acuerdo con los siguientes criterios.

* Clase de instancia: el precio se basa en la clase (por ejemplo, micro, small, large, xlarge) de la instancia de DB consumado.
* Tiempo de ejecución: la hora de instancia le factura, lo que equivale a una instancia única que se ejecuta para una hora. Por ejemplo, una instancia única que se ejecuta durante dos horas y dos instancias que se ejecutan para una hora consumen 2 horas-instancia. Si una instancia de DB se ejecuta por sólo una parte de una hora, se le cobrará una hora de instancia completa.
* Almacenamiento: la capacidad de almacenamiento que ha proporcionado a su instancia de base de datos se factura por GB por mes. Si aumenta su capacidad de almacenamiento aprovisionada durante el mes, su factura será proporcional.
* Solicitudes de E / S por mes: número total de solicitudes de E / S de almacenamiento que ha realizado en un ciclo de facturación.
* Almacenamiento de copia de seguridad: el almacenamiento de copia de seguridad es el almacenamiento asociado a las copias de seguridad automatizadas de la base de datos y cualquier instantánea de base de datos activa que haya tomado. Aumentar el período de retención de copias de seguridad o tomar instantáneas de base de datos adicionales aumenta el almacenamiento de copia de seguridad consumido por su base de datos. Amazon RDS proporciona almacenamiento de copia de seguridad hasta el 100% de su almacenamiento de base de datos Cargos adicionales. Por ejemplo, si dispone de 10 GB de almacenamiento de bases de datos provisionales, proporcionan hasta 10 GB de mes de almacenamiento de copia de seguridad sin cargo adicional. La mayoría de las bases de datos requieren menos almacenamiento primario para una copia de seguridad que para el conjunto de datos primario, por lo que si no mantiene varias copias de seguridad, nunca pague el almacenamiento de copia de seguridad. El almacenamiento de copia de seguridad es gratuito sólo para instancias de BD activas.
* Transferencia de datos: transferencia de datos a Internet dentro y fuera de su instancia de base de datos.
Además de los precios RDS regulares, puede adquirir instancias de DB reservadas. Las instancias de DB reservadas le permiten hacer un pago inicial único para una instancia de DB y reservar la instancia de DB para una instancia de uno o tres años a tasas significativamente más bajas. 

Para obtener más información sobre instancias de DB reservadas, consulte Instancias de DB reservadas .
Para obtener información sobre precios de Amazon RDS, consulte la página del producto Amazon RDS.

# Monitoring an Amazon RDS DB Instance

Hay varias maneras en las que puede realizar un seguimiento del rendimiento y la integridad de una instancia de la base de datos. Puede utilizar el gratis Amazon CloudWatch servicio para supervisar el rendimiento y la salud de una instancia de DB; actuación los gráficos se muestran en la consola Amazon RDS. Puede suscribirse a eventos de Amazon RDS para ser notificado cuando se producen cambios con una instancia de DB, una instantánea de DB, un grupo de parámetros de DB o un grupo de seguridad de DB. 
Para obtener más información acerca de Amazon CloudWatch, consulte Visualización de métricas de instancias de BD .
Para más información sobre la notificación de eventos de Amazon RDS, consulte Uso de la notificación de eventos de Amazon RDS .

# QUE SIGUE?

Esta sección le presenta los componentes de infraestructura básica que ofrece RDS. Que deberias hacer después?

*INICIO*

Cree una instancia de BD utilizando las instrucciones de la sección Introducción a Amazon RDS .

*Temas específicos del motor de base de datos*

Puede revisar la información específica de un motor DB particular en las siguientes secciones:

* Oracle en Amazon RDS 
* MySQL en Amazon RDS 
* Microsoft SQL Server en Amazon RDS 
* PostgreSQL en Amazon RDS 
* Aurora on Amazon RDS (p. 425)
* MariaDB on Amazon RDS







