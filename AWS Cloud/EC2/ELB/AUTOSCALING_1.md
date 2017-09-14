# Auto Scaling AWS

## ¿Qué es Auto Scaling?

Auto Scaling ayuda a garantizar que tiene el número correcto de instancias EC2 disponibles para controlar la carga de su aplicación. Crea colecciones de instancias EC2, denominadas grupos de Auto Scaling. Puede especificar el número mínimo de instancias en cada grupo de Auto Scaling y Auto Scaling garantizará que el grupo nunca tenga menos de esas instancias. 

Puede especificar el número máximo de instancias en cada grupo de Auto Scaling y Auto Scaling garantizará que el grupo nunca tenga más de esas instancias. Si especifica la capacidad deseada, cuando crea el grupo o con posterioridad, Auto Scaling garantiza que el grupo tenga ese número de instancias. Si especifica políticas de escalado, Auto Scaling puede iniciar o terminar instancias conforme aumente o disminuya la demanda.

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Autoscaling/AS%20diagram.png "Diagrama autoscaling")

## Componentes de Auto Scaling

### Grupos
> Las instancias de EC2 se organizan en grupos para que puedan tratarse como una unidad lógica a efectos de escalado y administración. Cuando crea un grupo, puede especificar su número mínimo, máximo y deseado de instancias EC2.

### Configuraciones de lanzamiento
> Su grupo utiliza una configuración de lanzamiento como una plantilla para sus instancias EC2. Cuando crea una configuración de lanzamiento, puede especificar información como el ID de AMI, el tipo de instancia, el par de claves, los grupos de seguridad y el mapeo de dispositivos de bloques para las instancias.

### Planes de escalado
> Un plan de escalado indica a Auto Scaling cuándo y cómo escalar. Por ejemplo, puede basar un plan de escalado en la aparición de determinadas condiciones.

## Precios de Auto Scaling

No se aplican tarifas adicionales con Auto Scaling, por lo que es fácil probarlo y determinar cómo puede beneficiar a su arquitectura de AWS.

## Servicios relacionados

Para distribuir automáticamente el tráfico entrante de la aplicación entre varias instancias de un grupo Auto Scaling, utilice Elastic Load Balancing.

Para monitorizar las estadísticas básicas de las instancias y los volúmenes de Amazon EBS, utilice Amazon CloudWatch.

| [< Anterior](https://github.com/conapps/conapps-iot/blob/master/AWS%20Cloud/EC2/ELB/ELB_4.md) | [Siguiente >](https://github.com/conapps/conapps-iot/blob/master/AWS%20Cloud/EC2/ELB/AUTOSCALING_2.md)|
