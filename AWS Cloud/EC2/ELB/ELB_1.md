# AWS: Elastic Load Balancing


## ¿Qué es Elastic Load Balancing?
Elastic Load Balancing distribuye el tráfico entrante de aplicaciones entre varias instancias EC2 y en varias zonas de disponibilidad. Esto aumenta la tolerancia a errores de las aplicaciones.

El balanceador de carga sirve como un único punto de contacto para los clientes, lo que aumenta la disponibilidad de la aplicación. Puede agregar y eliminar instancias del balanceador de carga en función de sus necesidades sin interrumpir el flujo general de solicitudes a la aplicación. Elastic Load Balancing escala el balanceador de carga a medida que cambia el tráfico dirigido a la aplicación y es capaz de adaptarse automáticamente a la mayoría de cargas de trabajo.

## Características de Elastic Load Balancing

| Característica        | Classic Load Balancer           | Balanceador de carga de aplicaciones  |
|:---:|:---:|:---:|
|Protocolos|HTTP, HTTPS, TCP, SSL|HTTP, HTTPS|
|Plataformas|EC2-Classic, EC2-VPC|EC2-VPC|
|Sesiones sticky (cookies)|✔|generadas por el balanceador de carga|
|Tiempo de inactividad de conexión|✔|✔|
|Vaciado de conexiones|✔|✔|
|Balanceo de carga entre zonas†|✔|Siempre habilitado|
|Comprobaciones de estado††|✔|Mejoradas|
|Métricas de CloudWatch|✔|Mejoradas|
|Logs de acceso|✔|Mejorados|
|Direccionamiento basado en host||✔|
|Direccionamiento basado en rutas||✔|
|Direccionamiento a varios puertos en la misma instancia||✔|
|Compatibilidad con HTTP/2||✔|
|Compatibilidad con Websockets||✔|
|Protección contra eliminación del balanceador de carga||✔|

† El balanceo de carga entre zonas siempre está habilitado para un Balanceador de carga de aplicaciones. Para un Classic Load Balancer, en cambio, está deshabilitado de forma predeterminada, aunque puede habilitarlo y deshabilitarlo según sus necesidades.

†† Para un Balanceador de carga de aplicaciones, puede especificar los códigos HTTP que indican una respuesta de comprobación de estado superada. Un Balanceador de carga de aplicaciones devuelve información mejorada sobre las causas de los errores en la comprobación de estado

## Acceso a ELB

Se puede acceder a ELB mediante las siguientes maneras:

* Consola de administración de AWS: proporciona una interfaz web que puede utilizar para obtener acceso a Elastic Load Balancing.
* La interfaz de línea de comandos de AWS (AWS CLI): proporciona comandos para numerosos servicios de AWS, incluido Elastic Load Balancing
* AWS SDK: proporcionan API específicas de cada lenguaje y administran automáticamente muchos de los detalles de la conexión, tales como el cálculo de firmas, el control de reintentos de solicitud y el control de errores.
* API de consulta: proporciona acciones de API de nivel bajo a las que se llama mediante solicitudes HTTPS. Utilizar el API de consulta es la forma más directa de obtener acceso a Elastic Load Balancing, pero requiere que la aplicación controle niveles de detalle de bajo nivel, tales como la generación del código hash para firmar la solicitud o el control de errores.

## Servicios AWS relacionados:

Elastic Load Balancing se combina con los siguientes servicios :

 * **Amazon EC2:** virtuales que ejecutan las aplicaciones en la nube. Puede configurar el balanceador de carga de modo que direccione el tráfico a las instancias EC2.
 
 * **Amazon ECS:** permite ejecutar, detener y administrar contenedores Docker en un clúster de instancias EC2. Puede configurar el balanceador de carga de forma que direccione el tráfico a los contenedores.

 * **Auto Scaling:** se asegura de que se ejecute la cantidad deseada de instancias, aunque una de ellas sufra un error, y permite aumentar o reducir automáticamente el número de instancias a medida que cambia la demanda de ellas. Si habilita Auto Scaling con Elastic Load Balancing, las instancias que Auto Scaling lanza se registran automáticamente en el balanceador de carga y se anula automáticamente el registro en el balanceador de carga de las instancias que se Auto Scaling termina.

 * **Amazon CloudWatch:** permite monitorizar el balanceador de carga y adoptar las medidas necesarias.

 * **Amazon Route 53:** servicio DNS de Amazon.

 ## Costos de Elastic Load Balancer

### Balanceador de carga clásico: 
Solo paga por lo que usa. Se le cobrará por cada hora u hora parcial en la que el balanceador de carga esté activo y por cada GB de datos transferido a través del balanceador de carga.

|Modo|Precio| 
|:---:|:---:|
|Por hora (u hora parcial)|$0.025 USD|
|Por GB de datos procesados |$0.008 USD|

### Balanceador de carga de aplicaciones:

Al igual que el balanceador clásico solo paga por lo que usa. Se le cobra cada hora u hora parcial durante la que se ejecute el balanceador de carga de aplicaciones y la cantidad de unidades de capacidad de balanceo de carga (LCU) utilizadas por hora.

|Modo|Precio| 
|:---:|:---:|
|Por hora (u hora parcial)|$0,0225 USD|
|Por hora de LCU|$0.008 USD|

Que es una LCU?

Una LCU mide las dimensiones en las que el balanceador de carga de aplicaciones procesa el tráfico (cantidad media por hora). Las cuatro dimensiones son las siguientes:

* **Conexiones nuevas:** cantidad de conexiones nuevas establecidas por segundo. Generalmente, se envían varias solicitudes por conexión.

* **Conexiones activas:** cantidad de conexiones activas por minuto.
Ancho de banda: cantidad de tráfico procesado por el balanceador de carga en Mbps.

* **Evaluaciones de regla**:  es el producto de la cantidad de reglas procesadas por su balanceador de carga y la tasa de solicitudes. Las primeras 10 reglas procesadas son gratis (Evaluaciones de regla = Tasa de solicitudes * (Cantidad de reglas procesadas - 10 reglas gratis)).


[Siguiente >](https://github.com/conapps/conapps-iot/blob/master/AWS%20Cloud/EC2/ELB/ELB_2.md)
