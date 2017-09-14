# Práctico Auto Scaling

En este práctico vamos a realizar la configuración de un grupo de **Auto Scaling** mediante la consola web de AWS.

Nos dirigimos a *Launch Configurations* y hacemos click en *Create Auto Scaling group* :

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Autoscaling/Paso1.JPG "Paso1")

La creación de una *launch configuration* precede al grupo de Auto Scaling , ya que el mismo necesita un template de donde crear las instancias de forma dínamica.

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Autoscaling/Paso2.JPG "Paso2")

Vamos a seleccionar la misma AMI utilizada en el práctico de ELB, la misma se encuentra en la categoría *My AMIs* :

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Autoscaling/Paso3.JPG "Paso3")

Seleccionamos t2.micro, está por defecto y es la instancia que entra en el **free tier** :

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Autoscaling/Paso4.JPG "Paso4")

Elegimos un nombre descriptivo para el *Launch Configuration*

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Autoscaling/Paso5.JPG "Paso5")

Dejamos el default para el storage:

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Autoscaling/Paso6.JPG "Paso6")

Seleccionamos el *Security Group* creado con el propósito de este lab: 

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Autoscaling/Paso7.JPG "Paso7")

Click en **Create Launch configuration** : 

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Autoscaling/Paso8.JPG "Paso8")

* Ingresar un nombre para el *Auto Scaling Group*
* Empezar con 2 instancias
* Seleccionar las **Subnets** donde queremos que se creen las instancias
![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Autoscaling/Paso9.JPG "Paso9")

En **Advanced details** debemos tildar el checkbox "Receive traffic from one or more load balancers", de esta manera podemos asociar el balancer que teníamos creado del práctico anterior.

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Autoscaling/Paso10.JPG "Paso10")

* Seleccionar el combo señalado en la captura.

* Configurar para que el mínimo de instancias sea 2 y el máximo 4.

* Hacer click en "Add new alarm":

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Autoscaling/Paso11.JPG "Paso11")

* Creamos un nuevo *topic* al cual se va a notificar la alarma que estamos configurando.

* Vamos a configurar para que la alarma se active cuando: el promedio de utilización de CPU sea MAYOR o IGUAL a 75% por un período de 5 minutos consecutivo.

* Click en *Create Alarm*

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Autoscaling/Paso12.JPG "Paso12")

Vamos a realizar el mismo procedicmiento pero para quitar instancias cuando el CPU no esta activo:

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Autoscaling/Paso13.JPG "Paso13")

* Creamos un nuevo *topic* al cual se va a notificar la alarma que estamos configurando.

* Vamos a configurar para que la alarma se active cuando: el promedio de utilización de CPU sea MENOR o IGUAL a 40% por un período de 5 minutos consecutivo.

* Click en *Create Alarm*

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Autoscaling/Paso14.JPG "Paso14")

Elegir la alarma recién creada y establecer la cantidad de instancias a remover cuando se cumplan las condiciones dictadas.

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Autoscaling/Paso15.JPG "Paso15")

Revisar que el **Auto Scaling Group** esté asociado a nuestro *Load Balancer* y que las condiciones son las correctas.

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Autoscaling/Paso16.JPG "Paso16")

Hemos creado con éxito un grupo de Auto Scaling asociado a nuestro balanceador de cargas.

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Autoscaling/Paso17.JPG "Paso17")


| [< Anterior](https://github.com/conapps/conapps-iot/blob/master/AWS%20Cloud/EC2/ELB/AUTOSCALING_1.md) 