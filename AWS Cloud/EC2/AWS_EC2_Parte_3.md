| [< Anterior](https://github.com/conapps/conapps-iot/blob/master/AWS%20Cloud/EC2/AWS_EC2_Parte2.md) |

---
### Load Balancing


El balanceador de carga clásico ***enruta el tráfico en función de la información a nivel de red*** o aplicación y es ideal para balancear el tráfico de forma sencilla en varias instancias de EC2 en las que se requiere alta disponibilidad, escalado automático y seguridad excelente. 

Características:

* <u>**Alta disponibilidad**</u> 
    
    Puede distribuir el tráfico entrante entre las instancias de Amazon EC2 en una única zona de disponibilidad o en varias.
    
    Escala automáticamente la capacidad de administración de solicitudes como respuesta al tráfico de aplicaciones entrante.

* <u>**Comprobaciones de estado**</u> 
    Puede detectar el estado de las instancias de Amazon EC2. 
    
    Cuando detecta instancias de Amazon EC2 en mal estado, deja de enrutar el tráfico a dichas instancias y reparte la carga entre las instancias en buen estado restantes.

* <u>**Características de seguridad**</u>
    Cuando se utiliza Virtual Private Cloud (VPC), puede crear y administrar grupos de seguridad asociados al balanceador de carga clásico para proporcionar opciones adicionales de seguridad y de redes. 
    
    También puede crear un balanceador de carga clásico sin direcciones IP públicas que funcione como ​balanceador de carga interno (no accesible desde Internet).

* <u>**Sesiones persistentes**</u>
    
    Los balanceadores de carga clásicos permiten unir determinadas sesiones de usuario persistentes a instancias EC2 específicas mediante cookies. 
    
    El tráfico se enrutará a las mismas instancias, a medida que el usuario continúa accediendo a la aplicación.

* <u>**Soporte con IPv6**</u>

    Admiten el uso de las versiones 4 y 6 del protocolo de Internet (IPv4 e IPv6). El soporte con IPv6 actualmente no se encuentra disponible para VPC.


* <u>**Monitorización operativa**</u>
    


 ### Tipos de Balanceadores
 Elastic Load Balancer (ELB) soporta dos tipos de balanceadores de carga:
 


* **Balanceadores de carga de aplicación**

    Un Application Load Balancer es una opción de balanceo de carga del servicio Elastic Load Balancing que opera en la capa de la aplicación y le permite definir reglas de enrutamiento en función del contenido en varios servicios o contenedores ejecutados en una o más instancias de Amazon Elastic Compute Cloud (Amazon EC2).

    Un Balanceador de carga de aplicaciones actúa como la capa de aplicación, es decir,capa 7 del modelo OSI. 
    
    Una vez que el balanceador de carga ha recibido una solicitud, evalúa las reglas del agente de escucha por orden de prioridad con el fin de determinar qué regla se debe aplicar. 
    
    A continuación, selecciona un destino en el grupo de destino para la acción de la regla aplicando el algoritmo de direccionamiento de turno rotativo. 
    
    Tenga en cuenta que puede configurar las reglas del agente de escucha de tal forma que las solicitudes se direccionen a diferentes grupos de destino en función del contenido del tráfico de aplicación. 
    
    El direccionamiento se lleva a cabo de manera independiente para cada grupo de destino, aunque un destino se haya registrado en varios grupos de destino.

    El balanceador de carga distribuye el tráfico entrante de aplicaciones entre varios destinos, tales como instancias EC2, en varias zonas de disponibilidad. 
    
    Esto aumenta la tolerancia a errores de las aplicaciones. 
    
    Elastic Load Balancing detecta los destinos en mal estado y direcciona el tráfico solamente a los destinos en buen estado.

    El balanceador de carga actúa como único punto de contacto para los clientes. 
    Esto aumenta la disponibilidad de la aplicación. 

    Puede configurar las comprobaciones de estado, que se utilizan para monitorizar el estado de los destinos registrados, de tal forma que el balanceador de carga solo pueda enviar solicitudes a los destinos en buen estado.

    ![alt text](./images/EC2_AppLB.png)

* **Balanceadores de carga Clásicos**

    El balanceador de carga clásico enruta el tráfico en función de la información a nivel de red o aplicación y es ideal para balancear el tráfico de forma sencilla en varias instancias de EC2 en las que se requiere alta disponibilidad, escalado automático y seguridad excelente. 
    
    Para aplicaciones que necesitan capacidades de enrutamiento avanzadas, microservicios o arquitecturas basadas en contenedores, recomendamos el balanceador de carga de aplicaciones.
    
    ![alt text](./images/EC2_ClassicLB.png)


*  **Beneficios**

    * **<u>Beneficios de los Balanceadores de carga de aplicación, frente a los Balanceadores de carga clásicos.**</u>

    * **Compatibilidad con el direccionamiento basado en rutas.** 

    Puede configurar reglas para el agente de escucha que reenvíen las solicitudes en función de la dirección URL contenida en la solicitud. Esto permite estructurar la aplicación en servicios de menor tamaño y direccionar las solicitudes al servicio correcto según el contenido de la URL.

    * **Compatibilidad con el direccionamiento de solicitudes a varios servicios en una sola instancia EC2 si se registra la instancia mediante varios puertos.**

    * **Compatibilidad con las aplicaciones en contenedores.** 
    Amazon EC2 Container Service (Amazon ECS) permite seleccionar un puerto no utilizado al programar una tarea y registrarla en un grupo de destino mediante este puerto. De este modo, puede hacer un uso eficiente de los clústeres.

    * **Compatibilidad con la monitorización independiente del estado de cada servicio**, pues las comprobaciones de estado se definen para cada grupo de destino y muchas métricas de CloudWatch se notifican también para cada grupo de destino. Si adjunta un grupo de destino a un grupo de Auto Scaling, podrá escalar cada servicio dinámicamente en función de la demanda.

    * **Los logs de acceso contienen información adicional y se almacenan en formato comprimido.**

    * **Mejora del desempeño del balanceador de carga.**

Por mas información consulte:  http://docs.aws.amazon.com/es_es/elasticloadbalancing/latest/userguide/load-balancer-getting-started.html

**Nota:**  
   *  ***Tema Relacionado: ELB***
   *  ***Presentadores: Fernando/Pablo***
   * ***Fecha Prevista: 03/11/2017*** 

---

### Auto Scaling
Auto Scaling permite mantener la disponibilidad de la aplicación y aumentar o reducir dinámicamente la capacidad de Amazon EC2 según las condiciones que defina. 

Se puede usar Auto Scaling para la administración de un grupo de instancias de EC2 con el fin de ayudar a mantener el estado y la disponibilidad de las mismas y garantizar que ejecute la cantidad deseada de instancias de Amazon EC2. 

También se puede usar Auto Scaling para el escalado dinámico de las instancias de EC2 con el fin de incrementar automáticamente la capacidad en función de la demanda, para mantener el desempeño y reducir la capacidad durante los periodos de menor demanda , de forma de reducir los costos. 

Auto Scaling resulta adecuado tanto para aplicaciones con patrones estables de demanda como para aquellas aplicaciones que muestran variaciones de uso según la hora, el día o la semana. 

Además de Auto Scaling para Amazon EC2, es posible usar Auto Scaling de aplicaciones para escalar automáticamente recursos para otros servicios de AWS, incluidos Amazon ECS, flotas de subasta de Amazon EC2, clústeres de Amazon EMR, flotas de AppStream 2.0 y Amazon DynamoDB.



 Por mas información consulte:  http://docs.aws.amazon.com/es_es/autoscaling/latest/userguide/GettingStartedTutorial.html

**Nota:**  
   *  ***Tema Relacionado: Auto Scaling***
   *  ***Presentadores: Guillermo/Andrés***
   * ***Fecha Prevista: 10/11/2017*** 


---
| [< Anterior](https://github.com/conapps/conapps-iot/blob/master/AWS%20Cloud/EC2/AWS_EC2_Parte2.md) | 
