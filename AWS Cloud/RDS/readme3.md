# Getting Started with Amazon RDS

En esta sección se muestra cómo crear y conectarse a una instancia de BD utilizando Amazon RDS. Usted puede crear,o lanzar, una instancia de DB que utiliza MySQL, Oracle, PostgreSQL, Microsoft SQL Server, Amazon Aurora o MariaDB.

*IMPORTANTE*   
Debe completar las tareas en la sección Configuración de Amazon RDS antes de crear o conectarse a una instancia de DB.

Crear una instancia de DB y conectarse a una base de datos en una instancia de DB es ligeramente diferente para cada uno de los motores DB; elija el motor de base de datos inferior que desea utilizar para obtener información detallada sobre la creación y conectarse a la instancia de DB. Después de haber creado y conectado a su instancia de DB, hay instrucciones para ayudarle a eliminar la instancia de la base de datos.

*TEMAS*

* Creación de un clúster de bases de datos y conexión a una base de datos en una instancia de Amazon Aurora DB 
* Creación de una instancia de MariaDB DB y conexión a una base de datos en una instancia de MariaDB DB 
* Creación de una instancia de BD de Microsoft SQL Server y conexión a una instancia de base de datos 
* Creación de una instancia de MySQL DB y conexión a una base de datos en una instancia de MySQL DB 
* Creación de una instancia de Oracle DB y conexión a una base de datos en una instancia de Oracle DB 
* Creación de una instancia de DB de PostgreSQL y conexión a una base de datos en un DB de PostgreSQL Instancia 
* Tutorial: Crear un servidor web y una base de datos Amazon RDS 

## Creating a MySQL DB Instance and Connecting to a Database on a MySQL DB Instance

La forma más sencilla de crear una instancia de base de datos es utilizar AWS Management Console. Una vez que haya creado la instancia de DB, puede utilizar las utilidades estándar de MySQL como MySQL Workbench para conectarse a una base de datos en la instancia de DB.

*TEMAS*
* Creación de una instancia de base de datos MySQL 
* Conexión a una base de datos en una instancia de DB Ejecución del motor de base de datos MySQL 
* Eliminación de una instancia de DB

## Creating a MySQL DB Instance
El elemento básico de Amazon RDS es la instancia de DB. Este es el entorno en el que se ejecutará sus bases de datos MySQL.   
En este ejemplo, se crea una instancia de base de datos que ejecuta el motor de base de datos MySQL denominado west2-mysqlinstance1, con una clase de instancia de DB db.m1.small, 5 GB de almacenamiento y respaldos automáticos habilitados con un período de retención de un día.   
**Para crear una instancia de MySQL DB**
1. Inicie sesión en AWS Management Console y abra la consola Amazon RDS en [CONSOLE](https://console.aws.amazon.com/rds/).
2. En la esquina superior derecha de la consola Amazon RDS, elija la región en la que desea crear la instancia de DB.
3. En el panel de navegación, seleccione **Instances**.
4. Seleccione **Launch DB Instance**. Se abrirá el Asistente para instancias de DB de inicio **Select Engine** en la página.
paso1 imagen
5. En la página Select Engine, elija el icono de MySQL y, a continuación, seleccione **Select** para el DB de MySQL .
6. En la página Especificar detalles de la base de datos, especifique la información de la instancia de la base de datos. La siguiente tabla muestra para una instancia de ejemplo de base de datos. Cuando los ajustes sean como los desea, seleccione **Siguiente**. 

| For This Parameter | Do This |
| --- | --- |
| Licence Modes | Choose the default, general-public-license, to use the general license agreement for MySQL. MySQL has only one license model. |
| DB Engine Version | Choose the default version of MySQL. Note that Amazon RDS supports multiple versions of MySQL in some regions. |
| DB Instance Class | Choose db.m1.small for a configuration that equates to 1.7 GB memory, 1 ECU (1 virtual core with 1 ECU), 64-bit platform, and moderate I/O capacity. |
| Multi-AZ Deployment | Choose Yes to have a standby replica of your DB instance created in another Availability Zone for failover support. We recommend Multi-AZ for production workloads to maintain high availability. For development and testing,you can choose No. |
| Allocated Storage | Type 5 to allocate 5 GB of storage for your database. In some cases, allocating a higher amount of storage for your DB instance than the size of your database can improve I/O performance. |
| Storage Type | Choose the storage type Magnetic. |
| DB Instance Identifier | Type a name for the DB instance that is unique for your account in the region you chose. You can add some intelligence to the name, such as including the region and DB engine you chose, for example west2-mysqlinstance1. |
| Master Username | Type a name using alphanumeric characters that you will use as the master user name to log on to your DB instance. This will be the user name you use to log on to your database on the DB instance for the first time. |
| Master Password and Confirm Password | Type a password that contains from 8 to 41 printable ASCII characters (excluding /,", and @) for your master user password. This will be the password you will use when you use the user name to log on to your database. Then type the password again in the Confirm Password box. |

paso2 imagen

7. En la página **Configure Advanced Settings**, proporcione información adicional que necesita RDS iniciar la instancia de MySQL DB. La tabla muestra la configuración de una instancia de ejemplo de base de datos. Especifica tu Información de la instancia de base de datos y, a continuación, seleccione Iniciar instancia de base de datos.

