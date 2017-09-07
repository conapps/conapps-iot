# Prácticos ELB

En este primer ejercicio práctico vamos crear 2 instancias en EC2 con un Apache Web Server instalado en ambas.

El objetivo del lab es configurar tanto las instancias como el ELB propiamente dicho y visualizar como se distribuye la carga de trabajo.

## Paso 1: ingresar a la consola de AWS

Vamos a realizar la configuración mediante la consola web de AWS, la cual se puede acceder mediante el siguiente [link](https://805750336955.signin.aws.amazon.com/console).

Luego de estar en la consola, ingresar al dashboard de EC2:

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso1.JPG "Paso1")

## Paso 2: crear las instancias

Hacer click en **Launch instance**

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso2.JPG "Paso2")

Con el propósito de este lab ya tenemos creada una AMI con un server Linux y Apache instalado, debemos hacer click en **My AMIs** y **Select**

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso3.JPG "Paso3")

Seleccionar la opción por defecto **t2.micro** y click en **Next: Configure Instance Details**

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso4.JPG "Paso4")

Cambiar el número de instancias a **"2"** , ya que para poder comprobar el corrector funcionamiento del balanceador precisamos tener dos instancias separadas.

Las instancias deben estar en la misma VPC que el balanceador.

Hacer click en **Next¨** para continuar con el wizard

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso5.JPG "Paso5")

Utilizar el storage default , ya que entra en el free tier.
Hacer click en **Next: Add Tags**:

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso6.JPG "Paso6")

El uso de tags es opcional, para continuar hacer click en **Next: Configure Security Group**

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso7.JPG "Paso7")

Seleccionar el SG ya creado para este lab, tiene el nombre **LabELB**.

El mismo permite conexiones de los protocolos HTTP y SSH, desde el puerto 80 y 22 respectivamente.

Click en **Review and Launch**

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso8.JPG "Paso8")

En esta parte podemos revisar que las opciones que seleccionamos son las correctas, una vez que estemos seguros hacer click en **Launch**:

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso9.JPG "Paso9")

Elegir una key pair existente, **elbtutorialkey**. La misma va a ser provista en el lab.

Click en **Launch Instances**

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso10.JPG "Paso10")

Una vez que las instancias terminen de inicializar, seleccionar una e ir a la pestaña **Description**



![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso11.JPG "Paso11")

Copiar la IP pública de la instancia:

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso12.JPG "Paso12")

Desde el putty ingresar `ec2-user@$instanceip` en el campo **Host Name**

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso13.JPG "Paso13")

Navegar desde el menú **Category** a SSH-->Auth.
Hacer click en **Browse¨** y seleccionar elbtutorialkey.ppk de donde se encuentre en nuestro equipo:

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso14.JPG "Paso14")

Si todo está correctamente configurado deberíamos ver el siguiente prompt:

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso15.JPG "Paso15")

En los siguientes pasos vamos a editar el archivo ***index.html*** de una de las instancias, para poder diferenciar a cual nos va a estar dirigiendo el **Load Balancer**

Navegar hasta la carpeta html con el siguiente comando:  `cd /var/www/html`

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso16.JPG "Paso16")

Abrir el editor Vi utilizando : `vi index.html`

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso17.JPG "Paso17")

Editar el mismo, cambiando de instancia **"1" a "2"**

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso18.JPG "Paso18")

Pegar la IP de la instancia que modificamos en el navegador para comprobar que se realizó el cambio.

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso19.JPG "Paso19")

Ya tenemos creadas ambas instancias con un web server levantado cada una y un index.html que refleja la identidad de las mismas.

Los siguientes pasos son para la creación del **Load Balancer:**

Desde el dashboard de **EC2** seleccionar **Load Balancers**

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso20.JPG "Paso20")

Click en **Create Load Balancer**

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso21.JPG "Paso21")

Seleccionar **Classic Load Balancer** y hacer click en **Continue**:

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso22.JPG "Paso22")

* Elegir un nombre descriptivo para el *balancer* 

* Seleccionar la misma VPC en la cual se encuentran las instancias EC2

* Tildar **Enable advanced VPC configuration**

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso23.JPG "Paso23")

Scrollear hacia abajo y seleccionar todas las **Subnets** donde se encuentren las instancias.

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso24.JPG "Paso24")

Seleccionar el **SG** disponible para este Lab

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso25.JPG "Paso25")
![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso26.JPG "Paso26")

En este paso podemos configurar los párametros para el health check que realiza el balancer sobre las instancias


* Response Timeout: La cantidad de tiempo a esperar para recibir una respuesta del health check. En segundos.

* HealthCheck Interval: La cantidad de tiempo en segundos entre un health check y el siguiente.

* Unhealthy Threshold: El número de fallos consecutivos que deben ocurrir para declarar una instancia inaccesible.

* Healthy Threshold: El número de health checks correctos para declara a una instancia como "Sana"

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso27.JPG "Paso27")

Seleccionar ambas instancias creadas previamente.

Marcar **Enable Cross-Zone Load Balancing** y **Enable Connection draining**

* Enable Cross-Zone Load Balancing: permite balancear carga entre instancias que no estén en la misma AZ (pero dentro de la misma región)

* Enable Connection draining: se asegura que el *balancer* deje de envíar requests a una instancia inaccesible.

Hacer click en **Next: Add Tags**

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso28.JPG "Paso28")

**Review and Create**

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso29.JPG "Paso29")

**Create**

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso30.JPG "Paso30")

Ir a la categoría **Load Balancers** en el dashboard de EC2 y copiar el **DNS name** del *Balancer* que creamos anteriormente

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso31.JPG "Paso31")

Pegar en el navegador y presionar F5, observar como intercambia entre las instancias de esta manera visualizamos el trabajo realizado por el *balancer*.

![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso32.JPG "Paso32")
![alt text](https://raw.githubusercontent.com/conapps/conapps-iot/master/AWS%20Cloud/EC2/ELB/images/Tutorial%20Classic%20LB/Paso33.JPG "Paso33")
