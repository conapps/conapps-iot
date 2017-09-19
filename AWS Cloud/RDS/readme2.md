# Setting Up for Amazon RDS

Antes de utilizar Amazon RDS por primera vez, realice las siguientes tareas:
1. Regístrese para AWS
2. Cree un usuario de IAM
3. Determinar los requisitos
4. Proporcionar acceso a la instancia de DB en el VPC mediante la creación de un grupo de seguridad

## Sign Up for AWS

Regístrese para AWS.

Cuando se registra en Amazon Web Services (AWS), su cuenta AWS se registra automáticamente para todos servicios en AWS, incluyendo Amazon RDS. Se le cobrará sólo por los servicios que utiliza. Con Amazon RDS, solo paga por los recursos que usa. La instancia de Amazon RDS DB que creaste será en vivo (no se ejecuta en una caja de arena). Usted incurrirá en las tarifas de uso estándar de Amazon RDS para la instancia hasta que termine. Para obtener más información acerca de las tasas de uso de Amazon RDS, consulte la Página de producto RDS. Si es un nuevo cliente de AWS, puede comenzar con Amazon RDS de forma gratuita; para Para más información, vea AWS Free Usage Tier.
Si ya tiene una cuenta AWS, vaya a la siguiente tarea. Si no tiene una cuenta de AWS, use la siguiente procedimiento para crear uno.
Para crear una cuenta de AWS
1. Abra [aws](https://aws.amazon.com/) y, a continuación, seleccione Create an AWS Account.
2. Siga las instrucciones en línea.
Parte del procedimiento de registro implica recibir una llamada telefónica e ingresar un PIN usando el teclado teléfono. Anote su número de cuenta de AWS, porque lo necesitará para la siguiente tarea.

## Create an IAM User

Crear un usuario de IAM

Los servicios en AWS, como Amazon RDS, requieren que usted proporcione credenciales al acceder a ellos, por lo que que el servicio puede determinar si tiene permiso para acceder a sus recursos. La consola requiere tu contraseña. Puede crear claves de acceso para su cuenta AWS para acceder a la interfaz de línea de comandos o API. Sin embargo, no recomendamos que acceda a AWS utilizando las credenciales de su cuenta de AWS; recomendamos que utilice AWS Identity and Access Management (IAM) en su lugar. Crear un usuario de IAM, y luego agregar el usuario a un grupo IAM con permisos administrativos o conceder a este usuario administrativo permisos. A continuación, puede acceder a AWS utilizando una URL especial y las credenciales para el usuario de IAM. Si se ha inscrito en AWS pero no ha creado un usuario de IAM para usted, puede crear uno utilizando el IAM consola.

Para crear un usuario de IAM y agregar el usuario a un grupo de administradores
1. Inicie sesión en AWS Management Console y abra la consola IAM en [console](https://console.aws.amazon.com/iam/).
2. En el panel de navegación, elija **Users** y, a continuación, elija **Add user**.
3. Para **user name**, escriba un nombre de usuario, como Administrador. El nombre puede consistir en letras, dígitos, y los siguientes caracteres: más (+), igual (=), coma (,), punto (.), arroba (@), subrayado (_) y guión (-). El nombre no distingue entre mayúsculas y minúsculas y puede tener un máximo de 64 caracteres.
4. Seleccione la casilla de verificación situada junto al acceso a **AWS Management Console**, seleccione **custom password** y, a continuación, escriba la contraseña del nuevo usuario en el cuadro de texto. Opcionalmente, puede seleccionar Requerir restablecimiento de contraseña en forzar al usuario a seleccionar una nueva contraseña la próxima vez que el usuario inicie sesión.
5. Elija Siguiente: **Permissions**.
6. En la página Establecer permisos para usuarios, elija Agregar usuario a grupo.
7. Seleccione **Crear grupo**.
8. En el cuadro de diálogo **Crear grupo**, escriba el nombre del nuevo grupo. El nombre puede consistir en letras, dígitos, y los siguientes caracteres: más (+), igual (=), coma (,), punto (.), en (@), subrayado (_), y guión (-). El nombre no es sensible a mayúsculas y minúsculas y puede tener un máximo de 128 caracteres de longitud.
9. Para **Filter**, seleccione **Job function**.
10. En la lista de políticas, active la casilla de verificación de **AdministratorAccess**. A continuación, elija **Crear grupo**.
11. En la lista de grupos, seleccione la casilla de verificación para su nuevo grupo. Seleccione **Actualizar** si es necesario para ver el grupo en la lista.
12. Seleccione **Next: Review** para ver la lista de pertenencias de grupo que se agregarán al nuevo usuario.
Cuando tú está listo para continuar, elija **Crear usuario**.

Puede utilizar este mismo proceso para crear más grupos y usuarios y para dar acceso a
Recursos de cuenta de AWS. Para obtener más información sobre el uso de políticas para restringir los permisos de los usuarios a AWS específicos , vaya a **Access Management and Example Policies for Administering AWS Resources.**

Para iniciar sesión como este nuevo usuario de IAM, cierre la sesión de la consola AWS y,a continuación, utilice la siguiente URL, donde your_aws_account_id es su número de cuenta AWS sin los guiones (por ejemplo, si su AWS número de cuenta es 1234-5678-9012, su ID de cuenta de AWS es 123456789012):

[console](https://your_aws_account_id.signin.aws.amazon.com/console/)

Introduzca el nombre de usuario y la contraseña de IAM que acaba de crear. Cuando inicia sesión, la barra de navegación muestra "your_user_name @ your_aws_account_id".
Si no desea que la URL de su página de inicio de sesión contenga su ID de cuenta de AWS, puede alias de cuenta. Desde el panel IAM, haga clic en Personalizar e introduzca un alias, como el nombre de su empresa.
Para iniciar sesión después de crear un alias de cuenta, utilice la siguiente URL:

[console](https://your_account_alias.signin.aws.amazon.com/console/)

Para verificar el enlace de inicio de sesión de los usuarios de IAM para su cuenta, abra la consola IAM y compruebe AWS Account Alias.

## Determine Requirements

El elemento básico de Amazon RDS es la instancia de DB. La instancia de DB es donde creas tu base de datos. Una instancia de DB proporciona una dirección de red denominada Endpoint. Tus aplicaciones se conectan al punto extremo expuesto por la instancia de la base de datos cada vez que necesitan acceder a las bases de datos creadas en ese DB  por ejemplo. La información que especifica al crear la instancia de DB controla los elementos de configuración tales como almacenamiento, memoria, motor de base de datos y versión, configuración de red, seguridad y períodos de mantenimiento.
Debe conocer la instancia de su base de datos y las necesidades de red antes de crear un grupo de seguridad y antes de crear una instancia de base de datos. Por ejemplo, debe saber lo siguiente:
* ¿Cuáles son los requisitos de memoria y procesador para su aplicación o servicio? Usted usará estos cuando determine qué clase de instancia de DB utilizará al crear su instancia de base de datos.
Para obtener especificaciones acerca de las clases de instancia de DB, consulte DB Instance Class 
* Su instancia de DB es más probable en una nube virtual privada (VPC); algunas instancias heredadas no están en un VPC, pero si usted es un nuevo usuario de RDS (dos años o menos) o accede a una nueva región, lo más probable es que cree una instancia de DB dentro de un VPC. Las reglas de grupo de seguridad que necesita para conectarse a una instancia de DB dependen si su instancia de DB está en un VPC predeterminado, en un VPC definido por el usuario o fuera de un VPC.
Por información sobre cómo determinar si su cuenta tiene un VPC predeterminado en una región, consulte Determinación de si Está utilizando la plataforma EC2-VPC o EC2-Classic . La siguiente lista describe las reglas para cada opción VPC:
* **Default VPC**: si su cuenta AWS tiene un VPC predeterminado en la región, ese VPC está configurado para soportar instancias de BD. Si especifica el VPC predeterminado al crear la instancia de DB:
* Debe crear un grupo de seguridad VPC que autorice las conexiones desde la aplicación o servicio a la instancia de Amazon RDS DB con la base de datos. Tenga en cuenta que debe utilizar la API de Amazon EC2 o la opción Grupo de seguridad en la consola VPC para crear grupos de seguridad VPC. Para más información, vea Paso 4: Cree un grupo de seguridad VPC .
* Debe especificar el grupo de subred de la base de datos predeterminada. Si esta es la primera instancia de DB que ha creado en la región, Amazon RDS creará el grupo de subnet de la base de datos por defecto cuando crea la instancia de la base de datos.
* **User-defined VPC** : si desea especificar un VPC definido por el usuario cuando cree una instancia de DB:
* Debe crear un grupo de seguridad VPC que autorice las conexiones desde la aplicación o servicio a la instancia de Amazon RDS DB con la base de datos. Tenga en cuenta que debe utilizar la API de Amazon EC2 o la opción Grupo de seguridad en la consola VPC para crear grupos de seguridad VPC. Para más información, vea Paso 4: Crear un grupo de seguridad VPC.
* El VPC debe cumplir con ciertos requisitos para alojar instancias de DB, tales como tener al menos dos subredes, cada uno en una zona de disponibilidad independiente. Para obtener información, consulte Amazon Virtual Private Cloud (VPCs) y Amazon RDS .
* Debe especificar un grupo de subred de base de datos que defina qué subredes en ese VPC pueden Instancia de DB. Para obtener información, consulte la sección Grupo de subredes de DB en Trabajar con una instancia de base de datos en un VPC.
* **Sin VPC**: si su cuenta AWS no tiene un VPC predeterminado y no especifica un valor definido por el usuario VPC:
* Debe crear un grupo de seguridad de DB que autorice las conexiones de los dispositivos y de Amazon Instancias de RDS que ejecutan las aplicaciones o utilidades que accederán a las bases de datos en el DB por ejemplo.
 Para obtener más información, consulte Trabajo con grupos de seguridad de DB .

* ¿Necesita soporte de conmutación por error? En Amazon RDS, una réplica en espera de su instancia de base de datos que puede ser utilizado en caso de una conmutación por error se denomina despliegue de Multi-AZ. Si tiene cargas de trabajo de producción, debe utilizar un despliegue de Multi-AZ. Para los propósitos de la prueba, usted puede conseguir generalmente cerca con una sola instancia, no-Multi-AZ.
* ¿Tiene su cuenta AWS políticas que otorgan los permisos necesarios para realizar Amazon RDS operaciones Si se está conectando a AWS mediante credenciales IAM, su cuenta IAM debe tener IAM políticas que otorgan los permisos necesarios para realizar operaciones de Amazon RDS. 
Para más información, consulte Autenticación y control de acceso para Amazon RDS .
* ¿En qué puerto TCP / IP va a estar escuchando su base de datos? El firewall de algunas empresas puede bloquear conexiones al puerto predeterminado para el motor de base de datos. Si el firewall de su empresa bloquea el valor predeterminado puerto, elija otro puerto para la nueva instancia de DB. Tenga en cuenta que una vez que cree una instancia de DB que escucha en un puerto que especifique, puede cambiar el puerto modificando la instancia de la base de datos.
* ¿En qué región desea su base de datos? Tener la base de datos cerca de la aplicación o servicio web podría reducir la latencia de la red.
* ¿Cuáles son sus requisitos de almacenamiento? ¿Necesita usar IOPS provisto? Amazon RDS proporciona tres tipos de almacenamiento: magnético, de uso general (SSD) y provisto IOPS (operaciones de entrada / salida por segundo) . El almacenamiento magnético, también llamado almacenamiento estándar, ofrece un almacenamiento rentable que es ideal para aplicaciones con requisitos de E / S de luz o de ráfaga. De propósito general, almacenamiento con respaldo SSD, también llamado gp2, puede proporcionar un acceso más rápido que el almacenamiento basado en disco. El almacenamiento IOPS provisto está diseñado para satisfacer las necesidades de cargas de trabajo intensivas en E / S, en particular las cargas de trabajo de bases de datos, que son sensibles al almacenamiento rendimiento y consistencia en el rendimiento de E / S de acceso aleatorio. 
Para obtener más información sobre Amazon RDS almacenamiento, consulte Almacenamiento para Amazon RDS .

Una vez que tenga la información que necesita para crear el grupo de seguridad y la instancia de DB, vamos al siguiente paso.

## Provide Access to the DB Instance in the VPC by Creating a Security Group

Su instancia de DB probablemente se creará en un VPC. Los grupos de seguridad proporcionan acceso a la instancia de la base de datos en el VPC. Actúan como un cortafuegos para la instancia asociada de DB, controlando ambos entrantes y salientes tráfico en el nivel de instancia. Las instancias de DB se crean de forma predeterminada con un cortafuegos y una seguridad predeterminada que impide el acceso a la instancia de la base de datos. Por lo tanto, debe agregar reglas a un grupo de seguridad que le permiten conectarse a su instancia de base de datos. Utilice la información de red y configuración que determinado en el paso anterior para crear reglas para permitir el acceso a su instancia de DB.

El grupo de seguridad que debe crear será un grupo de seguridad VPC, a menos que tenga una instancia de BD heredada no en un VPC que requiere un grupo de seguridad de DB. Si creó su cuenta de AWS después de marzo de 2013, las ocasiones son muy buenas que usted tiene un VPC por defecto, y su instancia de DB se creará en ese VPC. DB instancias en un VPC requieren que agregue reglas a un grupo de seguridad VPC para permitir el acceso a la instancia.

Por ejemplo, si tiene una aplicación que tendrá acceso a una base de datos en su instancia de base de datos en un VPC, debe agregar una regla TCP personalizada que especifique el intervalo de puertos y las direcciones IP que la aplicación utilizará para acceder a la base de datos. Si tiene una aplicación en una instancia de Amazon EC2, puede utilizar el VPC o EC2 grupo de seguridad configurado para la instancia de Amazon EC2.

*Para crear un grupo de seguridad VPC*

1. Inicie sesión en AWS Management Console y abra la consola Amazon VPC en [console](https://console.aws.amazon.com/vpc).
2. En la esquina superior derecha de AWS Management Console, seleccione la región en la que desea cree el grupo de seguridad VPC y la instancia de DB. En la lista de recursos de Amazon VPC para región, debe mostrar que tiene al menos un VPC y varias subredes. Si no lo hace, no tienen un VPC predeterminado en esa región.
3. En el panel de navegación, haga clic en **Grupos de seguridad**.
4. Haga clic en **Crear grupo de seguridad**.
5. En la ventana Crear grupo de seguridad, escriba la etiqueta **Nombre**, el **nombre del grupo** y la **descripción** del grupo de seguridad. Seleccione **VPC** en el que desea crear su instancia de base de datos. Haga clic en **Sí, Crear**.
6. Deberá seleccionarse el grupo de seguridad VPC que creó. El panel de detalles en la parte inferior del ventana de la consola muestra los detalles del grupo de seguridad y las pestañas para reglas de salida. Haga clic en la pestaña **Reglas de entrada**.
7. En la ficha **Reglas de entrada**, haga clic en **Modificar**. Seleccione **Regla TCP personalizada** en la lista **Tipo**. Escriba el puerto valor que utilizará para su instancia de base de datos en el cuadro de texto **PortRange** y, a continuación, escriba la dirección IP (valor CIDR) desde el que accederá a la instancia o seleccione un nombre de grupo de seguridad en el cuadro de texto **Origen**.
8. Si necesita agregar más direcciones IP o rangos de puertos diferentes, haga clic en **Agregar otra regla**.
9. Si es necesario, puede utilizar la pestaña **Reglas de salida** para agregar reglas para el tráfico saliente.
10. Cuando haya terminado, haga clic en **Guardar**.

Utilizará el grupo de seguridad VPC que acaba de crear como grupo de seguridad para su instancia de BD cuando usted lo crea. Si su instancia de DB no va a estar en un VPC, entonces vea el tema Working with DB Grupos de seguridad para crear un grupo de seguridad de DB que usará al crear su base de datos por ejemplo.

Finalmente, una nota rápida acerca de las subredes VPC: Si utiliza un VPC predeterminado, un grupo de subred predeterminado todas las subredes VPC ya han sido creadas para usted. Cuando se utiliza el lanzamiento de una instancia de base de datos para crear una instancia de base de datos, puede seleccionar el VPC predeterminado y utilizar el valor predeterminado para la subred de base de datos Grupo.

Una vez que haya completado los requisitos de configuración, puede utilizar sus requisitos y la seguridad grupo que creó para iniciar una instancia de base de datos. Para obtener información sobre la creación de una instancia de DB, consulte la documentación pertinente en la siguiente tabla:

| Database Engine | Relevant Documentation |
| --- | --- |
| Amazon Aurora |  Creating a DB Cluster and Connecting to a Database on an Amazon Aurora DB Instance |
| MariaDB | Creating a MariaDB DB Instance and Connecting to a Database on a MariaDB DB Instance |
| Microsoft SQL Server | Creating a Microsoft SQL Server DB Instance and Connecting to a DB Instance |
| MySQL | Creating a MySQL DB Instance and Connecting to a Database on a MySQL DB Instance |
| Oracle | Creating an Oracle DB Instance and Connecting to a Database on an Oracle DB Instance |
| PostgreSQL |  Creating a PostgreSQL DB Instance and Connecting to a Database on a PostgreSQL DB Instance |



 


