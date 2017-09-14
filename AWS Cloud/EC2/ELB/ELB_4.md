# Utilizando el AWS CLI con Elastic Load Balancer

En este ejemplo vamos a crear y agregar instancias a un balanceador similar al que realizamos mediante la GUI en el práctico anterior, pero a través del **CLI** de Amazon Web Services.

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20CLI/Intro.JPG "Intro")

Con el propósito de este lab vamos a utilizar las instancias creadas en el práctico anterior, para ello necesitamos saber su *InstanceId*.

Con el siguiente comando extraemos los instance ID:

`aws ec2 describe-instances | grep InstanceId`

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20CLI/Paso1.JPG "Paso1")

De esta manera visualizamos solamente las líneas que contienen el InstanceId de cada instancia. Esta información va a ser de utilidad al momento de crear el balanceador.

Debemos saber también el Security Group ID del SG en el cual vamos a crear el balanceador:

`aws ec2 describe-security-groups`

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20CLI/Paso2.JPG "Paso2")

Una vez obtenida la información necesaria procedemos a crear el balanceador con el siguiente comando:

`aws elb create-load-balancer --load-balancer-name $NOMBRE --listeners Protocol=HTTP,LoadBalancerPort=80,InstanceProtocol=HTTP,InstancePort=80 --subnets $IDSN --security-groups $IDSG`

**$NOMBRE** = nombre que elegimos para nuestro balanceador

**$IDSN** = ID de la subred en la cual se encuentran nuestran instancias

**$IDSG** = ID del security group al cual va a pertenecer el balancer

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20CLI/Paso3.JPG "Paso3")

Una vez ejecutado el comando con éxito nos muestra en pantalla el DNS name del nuevo Load Balancer.

Ahora nos hace falta agregar instancias al balanceador, para ello usamos el siguiente comando:

`aws elb register-instances-with-load-balancer --load-balancer-name $NOMBRE --instances $IDinstance1 $IDinstance2`

**$IDinstance** = utilizamos los InstanceIDs obtenidos anteriormente:

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20CLI/Paso4.JPG "Paso4")

Ahora si ejecutamos:

`aws elb describe-load-balancers`

podemos visualizar el Load Balancer recién creado.

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20CLI/Paso5.JPG "Paso5")

Ahora para borrar el Load Balancer utilizamos:

`aws elb delete-load-balancer --load-balancer-name $NOMBRE`

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20CLI/Paso6.JPG "Paso6")

Podemos ver la totalidad de los comandos disponibles para ELB en el siguiente [link.](http://docs.aws.amazon.com/cli/latest/reference/elb/index.html)

| [< Anterior](https://github.com/conapps/conapps-iot/blob/master/AWS%20Cloud/EC2/ELB/ELB_3.md) | [Siguiente >](https://github.com/conapps/conapps-iot/blob/master/AWS%20Cloud/EC2/ELB/AUTOSCALING_1.md)|
