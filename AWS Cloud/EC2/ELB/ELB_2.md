# Cómo funciona Elastic Load Balancing

Un balanceador de carga acepta el tráfico entrante de los clientes y direcciona las solicitudes a sus instancias EC2 registradas en una o varias zonas de disponibilidad. Asimismo, el balanceador de carga monitoriza el estado de las instancias registradas en él y se asegura de direccionar el tráfico únicamente a las que se encuentran en buen estado. Cuando el balanceador de carga detecta una instancia en mal estado, deja de direccionar el tráfico hacia ella. Solo continuará direccionando el tráfico hacia ella cuando detecte que vuelve a encontrarse en buen estado.

Puede configurar el balanceador de carga para que acepte el tráfico entrante especificando uno o varios agentes de escucha (*listeners*). Un agente de escucha es un proceso que comprueba solicitudes de conexión. Se configura con un protocolo y número de puerto para las conexiones de los clientes al balanceador de carga y con un protocolo y número de puerto para las conexiones del balanceador de carga a las instancias.

Elastic Load Balancing admite dos tipos de balanceadores de carga: Balanceador de carga de aplicaciones y Classic Load Balancer. Hay una diferencia fundamental entre la forma de configurar ambos tipos. Con un Classic Load Balancer, se registran las instancias en el balanceador de carga. Con un Balanceador de carga de aplicaciones, se registran las instancias como destinos en un grupo de destino y se direcciona el tráfico a un grupo de destino.

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/logo.png "Logo ELB")

## Zonas de disponibilidad e instancias

Cuando se habilita una zona de disponibilidad para el balanceador de carga, ELB crea en ella un nodo de balanceador de carga. Si registra instancias en una zona de disponibilidad, pero no la habilita, las instancias registradas no reciben tráfico.

Con un Classic Load Balancer, recomendamos habilitar varias zonas de disponibilidad. Con un Balanceador de carga de aplicaciones, es imprescindible habilitar varias zonas de disponibilidad. Después de habilitar varias zonas de disponibilidad, si una de ellas deja de estar disponible o no contiene ninguna instancia en buen estado, el balanceador de carga puede continuar direccionando el tráfico a las instancias en buen estado de otra zona de disponibilidad.

El balanceo de carga entre zonas siempre está habilitado en un Balanceador de carga de aplicaciones y está deshabilitado de forma predeterminada en un Classic Load Balancer. 
