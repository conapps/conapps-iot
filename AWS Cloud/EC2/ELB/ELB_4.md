# Utilizando el AWS CLI con Elastic Load Balancer

En este ejemplo vamos a crear y agregar instancias a un balanceador similar al que realizamos mediante la consola en el práctico anterior pero a través del **CLI** de Amazon Web Services.

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

