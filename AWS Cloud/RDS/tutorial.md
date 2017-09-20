## Tutorials
The following tutorials show you how to perform common tasks that use Amazon RDS:
* Tutorial: Create an Amazon VPC for Use with an Amazon RDS DB Instance
* Tutorial: Create a Web Server and an Amazon RDS Database
* Tutorial: Restore a DB Instance from a DB Snapshot
* For videos, see AWS Instructional Videos and Labs.
## Tutorial: Restore a DB Instance from a DB Snapshot
Un escenario común cuando se trabaja con Amazon RDS es tener una instancia de DB con la que trabaje ocasionalmente, pero que no necesita tiempo completo. Por ejemplo, puede tener una encuesta trimestral de clientes que utiliza una instancia de Amazon Elastic Compute Cloud (Amazon EC2) para alojar un sitio web de encuestas de clientes y una instancia de DB que se utiliza para almacenar los resultados de la encuesta. Una manera de ahorrar dinero en tal escenario es para tomar una instantánea de base de datos de la instancia de la base de datos después de completar la encuesta, elimine la instancia de la base de datos y, a continuación, restaurar la instancia de DB cuando necesite realizar la encuesta de nuevo.  
En la siguiente ilustración, puede ver un posible escenario donde una instancia de EC2 que aloja un cliente encuesta está en la misma Amazon Virtual Private Cloud (Amazon VPC) como una instancia de DB que retiene los datos de la encuesta al cliente. Tenga en cuenta que cada instancia tiene su propio grupo de seguridad; la seguridad de la instancia EC2 permite acceso desde Internet mientras que el grupo de seguridad de instancia de DB permite el acceso desde la instancia de EC2. Cuando se realiza la encuesta, se puede detener la instancia de EC2 y la instancia de la base de datos puede ser eliminado después de crear una instantánea de DB final. Cuando necesite realizar otra encuesta, puede reinicie la instancia de EC2 y restaure la instancia de DB desde la instantánea de la base de datos.
![imagen](images/tuto1.jpg)  
Para obtener información acerca de cómo configurar los grupos de seguridad VPC necesarios para este escenario, Instancia de EC2 para conectarse con la instancia de la base de datos, vea Instancia de una base de datos en un VPC accesado por una instancia de EC2 en la misma VPC .
Debe crear una instantánea de base de datos antes de poder restaurar una instancia de DB desde una. Al restaurar la Instancia de la base de datos, proporcione el nombre de la instantánea de la base de datos a restaurar y proporcione un nueva instancia de DB que se crea desde la operación de restauración. No se puede restaurar desde una instantánea de base de datos a una instancia de DB existente; una nueva instancia de DB se crea cuando se restaura.
## Prerequisites for Restoring a DB Instance from a DB Snapshot
Algunos ajustes en la instancia de DB restaurada se restablecen cuando se restaura la instancia, por lo que debe conservar los recursos originales para poder restaurar la instancia de la base de datos a sus configuraciones anteriores. Por ejemplo, cuando restaurar una instancia de la base de datos de una instantánea de base de datos, el parámetro predeterminado de la base de datos y un grupo de seguridad predeterminado son asociado con la instancia restaurada. Esta asociación significa que el grupo de seguridad predeterminado no permiten el acceso a la instancia de DB y no hay parámetros de parámetros personalizados disponibles en el parámetro predeterminado grupo. Debe retener el grupo de parámetros de DB y el grupo de seguridad asociados con la instancia de DB que se utilizó para crear la instantánea de la base de datos.  
Los siguientes son necesarios antes de poder restaurar una instancia de DB desde una instantánea de base de datos:
* Debe haber creado una instantánea de base de datos de una instancia de BD antes de poder restaurar una Instantánea de base de datos. Para obtener más información acerca de la creación de una instantánea de base de datos, consulte Creación de una instantánea de base de datos.
* Debe conservar el grupo de parámetros y el grupo de seguridad asociados con la instancia de DB que creó la instantánea de la base de datos de.
* Debe conservar el VPC donde se encuentra la instancia de DB en la que se realizó la instantánea de DB.
* Debe determinar el grupo de opciones correcto para la instancia de DB restaurada:
* El grupo de opciones asociado con la instantánea de base de datos que restaura está asociado instancia de DB restaurada una vez que se crea. Por ejemplo, si la instantánea de base de datos que restaura desde Oracle Transparent Data Encryption (TDE), la instancia de DB restaurada utiliza el mismo grupo de opciones, que la opción TDE.
* No puede utilizar el grupo de opciones asociado con la instancia de DB original si intenta restaurar esa instancia en un VPC diferente o en una plataforma diferente. Esta restricción se produce porque cuando un grupo de opciones está asignado a una instancia de DB, también está vinculado a la plataforma que la instancia de DB está encendido, ya sea VPC o EC2-Classic (no-VPC). Si una instancia de DB está en un VPC, el grupo de opciones asociado con la instancia está vinculada a ese VPC.
* Si restaura una instancia de DB en un VPC diferente o en una plataforma diferente, debe asignar el grupo de opciones predeterminado a la instancia, asigne un grupo de opciones vinculado a ese VPC o crear un nuevo grupo de opciones y asignarlo a la instancia de la base de datos. Tenga en cuenta que con o opciones permanentes, como Oracle TDE, debe crear un nuevo grupo de opciones que incluya la opción persistente o permanente al restaurar una instancia de DB en un VPC diferente. Para más información sobre cómo trabajar con grupos de opciones, consulte Trabajar con grupos de opciones .
## Restoring a DB Instance from a DB Snapshot
You can use the procedure following to restore from a snapshot in the AWS Management Console.
To restore a DB instance from a DB snapshot
1. Sign in to the AWS Management Console and open the Amazon RDS console at https://
console.aws.amazon.com/rds/.
2. In the navigation pane, choose Snapshots.
3. Choose the DB snapshot that you want to restore from.
![imagen](images/tuto2.jpg)
4. Choose Restore Snapshot.
The Restore DB Instance window appears.
5. For DB Instance Identifier, type the name you want to use for the restored DB instance. If you are
restoring from a DB instance that you deleted after you made the DB snapshot, you can use the
name of that DB instance.
6. Choose Restore DB Instance.
## Modifying a Restored DB Instance
Tan pronto como se complete la operación de restauración, debe asociar el grupo de seguridad personalizado usado por la instancia que restauró con cualquier grupo de parámetros de BD personalizado aplicable que pueda tener.
Sólo el parámetro DB predeterminado y los grupos de seguridad están asociados con la instancia restaurada. Si tu desea restaurar la funcionalidad de la instancia de DB a la de la instancia de DB que la instantánea fue creado desde, debe modificar la instancia de DB para utilizar el grupo de seguridad y el grupo de parámetros utilizados por la instancia anterior de la base de datos.

Debe aplicar los cambios de forma explícita mediante el comando Modificar de la consola RDS, la opción **ModifyDBInstance** API o la herramienta de línea de comandos **aws rds modify-db-instance**, una vez que la instancia de DB esté disponible. Nosotros recomienda conservar los grupos de parámetros para las instantáneas de una base de datos que tenga para poder asociar una instancia restaurada con el archivo de parámetros correcto.

Puede modificar otras configuraciones en la instancia de DB restaurada. Por ejemplo, puede utilizar un almacenamiento diferente que la instantánea de la base de datos de origen. En este caso, el proceso de restauración es más lento debido a la trabajo necesario para migrar los datos al nuevo tipo de almacenamiento. En el caso de restaurar a o de Magnetic (Estándar), el proceso de migración es el más lento, porque el almacenamiento magnético no tiene el Capacidad IOPS del almacenamiento provisto de IOPS o de propósito general (SSD).

Los siguientes pasos suponen que su instancia de DB está en un VPC. Si su instancia de DB no está en un VPC, utilice el AWS Management Console para localizar el grupo de seguridad de DB que necesita para la instancia de DB.

*Para modificar una instancia de DB restaurada para tener la configuración de la instancia de DB original*
1. Inicie sesión en AWS Management Console y abra la consola Amazon RDS en https: //
console.aws.amazon.com/rds/.
2. En el panel de navegación, seleccione **Instancias**.
3. Seleccione la instancia de DB creada al restaurarla desde la instantánea de la base de datos. Hay dos cosas para notar aquí: El grupo de seguridad asignado a la instancia de DB es el grupo de seguridad predeterminado que permite que no haya acceso, y el mensaje de advertencia muestra que actualmente no hay permisos que permitan acceso entrante.

![paso3](images/tuto3.jpg)

4. Elija **Acciones de instancia** y a continuación, elija **Modificar**.
5. Seleccione el grupo de seguridad que desea utilizar para su instancia de base de datos. Si necesita agregar reglas a crear un nuevo grupo de seguridad para usar con una instancia de EC2, vea Una instancia de DB en un VPC Instancia de EC2 en el mismo VPC para obtener más información.
![paso4](images/tuto4.jpg)
6. Seleccione **Aplicar inmediatamente** (en la parte inferior de la página).
7. Seleccione **Continuar** y, a continuación, elija **Modificar instancia de base de datos**.

Observe que el nuevo grupo de seguridad se ha aplicado y que la instancia de DB está ahora autorizada para acceso.
![paso5](images/tuto5.jpg)

## Restoring From a DB Snapshot

Restaurar desde una instantánea de base de datos
Amazon RDS crea una instantánea de volumen de almacenamiento de la instancia de DB, haciendo una copia de seguridad de toda la instancia de DB y no sólo bases de datos individuales. Puede crear una instancia de DB restaurando desde esta instantánea de base de datos. Cuando usted restaura la instancia de la base de datos, proporciona el nombre de la instantánea de la base de datos para restaurar y, a continuación, proporciona un nombre para la nueva instancia de BD que se crea desde la restauración. No se puede restaurar desde una instantánea de base de datos a una instancia de DB existente; una nueva instancia de DB se crea cuando se restaura.  

Puede restaurar una instancia de base de datos y utilizar un tipo de almacenamiento diferente al de la instantánea de la base de datos de origen. En este caso, el proceso de restauración es más lento debido al trabajo adicional requerido para migrar los datos al nuevo tipo de almacenamiento. En el caso de restaurar desde o hacia el almacenamiento magnético (estándar), el proceso de el más lento debido a que el almacenamiento magnético no tiene la capacidad IOPS de IOPS provisto o General Finalidad (SSD) de almacenamiento.
### Consideraciones del grupo de parámetros
Cuando restaura una instancia de DB, el grupo de parámetros de DB predeterminado se asocia por ejemplo. Tan pronto como la restauración se haya completado y su nueva instancia de DB esté disponible, debe asociar cualquier grupo de parámetros de DB personalizado utilizado por la instancia que restauró. Debe aplicar estos cambios mediante el comando Modificar de la consola RDS, la API de Amazon RDS **ModifyDBInstance** o la AWS CLI comando **modify-db-instance**. 

*Importante*   
Recomendamos que retenga el grupo de parámetros para las instantáneas de DB que cree, de modo que puede asociar su instancia de DB restaurada con el grupo de parámetros correcto.
### Consideraciones del grupo de seguridad
Al restaurar una instancia de DB, los grupos de seguridad predeterminados se asocian con la instancia restaurada. Como tan pronto como la restauración esté completa y tu nueva instancia de DB esté disponible, debes asociar cualquier grupos de seguridad utilizados por la instancia que restauró. Debe aplicar estos cambios utilizando el RDS el comando Modify de la consola, el API de RDS de Amazon **ModifyDBInstance** o el AWS CLI **modify-db-instance** mando.
### Consideraciones del grupo de opciones
Cuando se restaura una instancia de la base de datos, el grupo de opciones asociado con la instantánea de la base de datos se asocia con la instancia de DB restaurada después de que se cree. Por ejemplo, si la instantánea de DB que está restaurando de usos Oracle Transparent Data Encryption, la instancia de DB restaurada utilizará el mismo grupo de opciones.
Al asignar un grupo de opciones a una instancia de DB, el grupo de opciones también está vinculado a la plataforma de la instancia de DB está en, ya sea VPC o EC2-Classic (no-VPC). Si una instancia de DB está en un VPC, la el grupo de opciones asociado con la instancia de DB está vinculado a ese VPC. Esto significa que no puede utilizar el grupo de opciones asignado a una instancia de DB si intenta restaurar la instancia en un VPC o sobre una plataforma diferente. Si restaura una instancia de DB en un VPC diferente o en una plataforma diferente, debe asignar el grupo de opciones predeterminado a la instancia, asignar un grupo de opciones vinculado a ese VPC o plataforma, o crear un nuevo grupo de opciones y asignarlo a la instancia de DB. Para persistencia o permanentes, al restaurar una instancia de DB en un VPC diferente, debe crear una nueva opción grupo que incluye la opción persistente o permanente.
### Consideraciones sobre Microsoft SQL Server
Amazon RDS no admite cambiar la configuración de almacenamiento de una base de datos de Microsoft SQL Server instancia al restaurar desde una instantánea de base de datos.
Cuando restaura una instantánea de base de datos de Microsoft SQL Server a una nueva instancia, siempre puede restaurar a misma edición que su instantánea. En algunos casos, también puede cambiar la edición de la instancia de DB. Los siguientes son las limitaciones cuando cambia ediciones:
* La instantánea de la base de datos debe tener suficiente espacio de almacenamiento asignado para la nueva edición.
* Sólo se admiten los siguientes cambios de edición:
* De la edición estándar a la edición Enterprise
* Desde Web Edition a Standard Edition o Enterprise Edition
* Desde Express Edition a Web Edition, Standard Edition o Enterprise Edition  

Si desea cambiar de una edición a una nueva edición que no es compatible con la restauración de una instantánea, puede intentar utilizar la función de copia de seguridad y restauración nativa. SQL Server verifica si su es compatible con la nueva edición basada en las características de SQL Server que ha habilitado en la base de datos. Para obtener más información, consulte Importar y exportar bases de datos de SQL Server .
### Consideraciones de Oracle
Si utiliza Oracle GoldenGate, guarde siempre el grupo de parámetros con el parámetro compatible. Si tu restaurar una instancia de una instantánea de base de datos, debe modificar la instancia restaurada para utilizar el parámetro grupo que tiene un valor de parámetro compatible o mayor compatible. Esto debe hacerse tan pronto como posible después de la acción de restauración y, a continuación, debe reiniciar la instancia de la base de datos.
## Consola de administración de AWS
Para restaurar una instancia de base de datos desde un DB snapshot.
1. Inicie sesión en AWS Management Console y abra la consola Amazon RDS en https: //
console.aws.amazon.com/rds/.
2. En el panel de navegación, elija **Snapshots**.
3. Elija DB snapshot que desea restaurar.
![paso6](images/tuto6.jpg)
4. Seleccione Restaurar snapshot.  
Aparecerá la ventana Restore DB Instance.
5. Para **DB Instance Identifier**, escriba el nombre de su instancia de DB restaurada.
6. Seleccione **Restaurar instancia de base de datos**.
7. Si desea restaurar la funcionalidad de la instancia de DB a la de la instancia de DB que se creó la instantánea, debe modificar la instancia de la base de datos para utilizar el grupo de seguridad. El siguiente paso es suponer que su instancia de base de datos está en un VPC. Si su instancia de DB no está en un VPC, utilice la EC2 Consola de administración para localizar el grupo de seguridad que necesita para la instancia de la base de datos.  
a. Inicie sesión en AWS Management Console y abra la consola Amazon VPC en https: //console.aws.amazon.com/vpc/.   
b. En el panel de navegación, elija Grupos de seguridad.   
c. Seleccione el grupo de seguridad que desea utilizar para las instancias de su BD. Si es necesario, agregue reglas a vincule el grupo de seguridad a un grupo de seguridad para una instancia de EC2. Para obtener más información, consulte Un DB Instancia en un VPC accedido por una instancia de EC2 en el mismo VPC .  

*CLI*  
Para restaurar una instancia de base de datos de una instantánea de base de datos, utilice el comando AWS CLI **restore-db-instance-from-dbsnapshot**.   
En este ejemplo, restaura desde una instantánea de BD creada anteriormente denominada *mydbsnapshot*. Restituye a una nueva instancia de DB denominada *mynewdbinstance*.

Ejemplo
For Linux, OS X, or Unix:

aws rds restore-db-instance-from-db-snapshot \
--db-instance-identifier mynewdbinstance \
--db-snapshot-identifier mydbsnapshot

For Windows:

aws rds restore-db-instance-from-db-snapshot ^
--db-instance-identifier mynewdbinstance ^
--db-snapshot-identifier mydbsnapshot

This command returns output similar to the following:

DBINSTANCE mynewdbinstance db.m3.large MySQL 50 sa creating 3 n
5.6.27 general-public-license

Después de restaurar la instancia de DB, debe agregar la instancia de DB al grupo de seguridad y grupo de parámetros utilizado por la instancia de DB utilizada para crear la instantánea de la base de datos si desea la misma como la de la instancia anterior de la base de datos.  

*API*   
Para restaurar una instancia de DB desde una instantánea de base de datos, llame a la función API de Amazon RDS
RestoreDBInstanceFromDBSnapshot con los siguientes parámetros:
* DBSnapshotIdentifier
* DBInstanceIdentifier

En este ejemplo, restaura desde una instantánea de BD creada anteriormente denominada *mydbsnapshot*. Restituye a una nueva instancia de DB denominada *mynewdbinstance*.

Ejemplo

https://rds.us-east-1.amazonaws.com/  
?Action=RestoreDBInstanceFromDBSnapshot  
&DBInstanceIdentifier=mynewdbinstance  
&DBSnapshotIdentifier=rds%3Amysqldb-2014-04-22-08-15  
&SignatureMethod=HmacSHA256  
&SignatureVersion=4  
&Version=2013-09-09  
&X-Amz-Algorithm=AWS4-HMAC-SHA256  
&X-Amz-Credential=AKIADQKE4SARGYLE/20140428/us-east-1/rds/aws4_request  
&X-Amz-Date=20140428T232655Z  
&X-Amz-SignedHeaders=content-type;host;user-agent;x-amz-content-sha256;x-amz-date  
&X-Amz-Signature=78ac761e8c8f54a8c0727f4e67ad0a766fbb0024510b9aa34ea6d1f7df52fe92  
