# Cómo funciona Elastic Load Balancing

Un balanceador de carga acepta el tráfico entrante de los clientes y direcciona las solicitudes a sus instancias EC2 registradas en una o varias zonas de disponibilidad. Asimismo, el balanceador de carga monitoriza el estado de las instancias registradas en él y se asegura de direccionar el tráfico únicamente a las que se encuentran en buen estado. Cuando el balanceador de carga detecta una instancia en mal estado, deja de direccionar el tráfico hacia ella. Solo continuará direccionando el tráfico hacia ella cuando detecte que vuelve a encontrarse en buen estado.

Puede configurar el balanceador de carga para que acepte el tráfico entrante especificando uno o varios agentes de escucha (*listeners*). Un agente de escucha es un proceso que comprueba solicitudes de conexión. Se configura con un protocolo y número de puerto para las conexiones de los clientes al balanceador de carga y con un protocolo y número de puerto para las conexiones del balanceador de carga a las instancias.

Elastic Load Balancing admite dos tipos de balanceadores de carga: Balanceador de carga de aplicaciones y Classic Load Balancer. Hay una diferencia fundamental entre la forma de configurar ambos tipos. Con un Classic Load Balancer, se registran las instancias en el balanceador de carga. Con un Balanceador de carga de aplicaciones, se registran las instancias como destinos en un grupo de destino y se direcciona el tráfico a un grupo de destino.

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/logo.png "Logo ELB")

## Zonas de disponibilidad e instancias

Cuando se habilita una zona de disponibilidad para el balanceador de carga, ELB crea en ella un nodo de balanceador de carga. Si registra instancias en una zona de disponibilidad, pero no la habilita, las instancias registradas no reciben tráfico.

Con un Classic Load Balancer, recomendamos habilitar varias zonas de disponibilidad. Con un Balanceador de carga de aplicaciones, es imprescindible habilitar varias zonas de disponibilidad. Después de habilitar varias zonas de disponibilidad, si una de ellas deja de estar disponible o no contiene ninguna instancia en buen estado, el balanceador de carga puede continuar direccionando el tráfico a las instancias en buen estado de otra zona de disponibilidad.

El balanceo de carga entre zonas siempre está habilitado en un Balanceador de carga de aplicaciones y está deshabilitado de forma predeterminada en un Classic Load Balancer. 

Si está habilitado el balanceo de carga entre zonas, el balanceador de carga distribuye el tráfico equitativamente entre todas las instancias registradas en todas las zonas de disponibilidad habilitadas. Si el balanceo de carga entre zonas está deshabilitado, el balanceador de carga distribuye el tráfico equitativamente entre todas las zonas de disponibilidad habilitadas. Por ejemplo, supongamos que hay 10 instancias en la zona de disponibilidad us-west-2a y 2 instancias en us-west-2b. Si el balanceo de carga entre zonas está deshabilitado, las solicitudes se distribuyen equitativamente entre us-west-2a y us-west-2b. En consecuencia, las 2 instancias de us-west-2b prestan servicio a la misma cantidad de tráfico que las 10 instancias de us-west-2a. Sin embargo, si el balanceo de carga entre zonas está habilitado, el balanceador de carga distribuye las solicitudes entrantes equitativamente entre las 12 instancias.

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/availability_zones.png "AZs")


## Algoritmo de direccionamiento

Con un Classic Load Balancer, el nodo de balanceador de carga que recibe la solicitud selecciona una instancia registrada mediante el algoritmo de direccionamiento de turno rotativo para los agentes de escucha TCP y mediante el algoritmo de direccionamiento de mínimas solicitudes pendientes para los agentes de escucha HTTP y HTTPS.

Con un Balanceador de carga de aplicaciones, el nodo de balanceador de carga que recibe la solicitud evalúa las reglas del agente de escucha por orden de prioridad con el fin de determinar qué regla se debe aplicar. A continuación, selecciona un destino en el grupo de destino para la acción de la regla aplicando el algoritmo de direccionamiento de turno rotativo. El direccionamiento se lleva a cabo de manera independiente para cada grupo de destino, aunque un destino se haya registrado en varios grupos de destino.

## Esquema del balanceador de carga

Al crear un balanceador de carga en una VPC, debe decidir si va a ser un balanceador de carga interno o va a estar expuesto a Internet. Tenga en cuenta que los Classic Load Balancers que se crean en EC2-Classic deben ser balanceadores de carga expuestos a Internet.

Los nodos de un balanceador de carga expuesto a Internet tienen direcciones IP públicas. El nombre de DNS de un balanceador de carga expuesto a Internet se puede resolver públicamente para obtener las direcciones IP públicas de los nodos. Por tanto, los balanceadores de carga expuestos a Internet pueden dirigir las solicitudes de los clientes a través de Internet.

Los nodos de un balanceador de carga interno solo tienen direcciones IP privadas. El nombre de DNS de un balanceador de carga interno se puede resolver para obtener las direcciones IP privadas de los nodos. Por lo tanto, los balanceadores de carga internos solo puede direccionar las solicitudes de los clientes que tienen acceso a la VPC para el balanceador de carga.

Tenga en cuenta que tanto los balanceadores de carga expuestos a Internet como los internos direccionan las solicitudes a las instancias mediante direcciones IP privadas. Por lo tanto, las instancias no requieren direcciones IP públicas para recibir las solicitudes desde un balanceador de carga, ya sea interno o expuesto a Internet.