Conocimientos de base
---
1. Git.
 * ¿Qué y para que sirve es VCS? 
 * ¿Qué es GIT?
 * **Continúa...**
2. Github.
 * **Continúa...**
3. Docker.
 * **Continúa...**
4. Dockerhub.
 * **Continúa...**

Cloud (Infraestructura)
---

###AWS

- ¿Que es cloud computing?
  - Ventajas.
  - Modelos de implementación.
- Fundamentos de AWS.
  - Infraestructura global.
    - Regiones.
    - Availability Zones.
  - Seguridad y Compliance.
- Plataforma de AWS.
  - Acceso.
  - Servicios de red y computo.
  - Almacenamiento y CDN.
  - Monitoreo y administración.
  - Servicios de aplicación.

###EC2

- Nociones básicas.
  - Tipos de instancias.
  - AMIs
- Instancias.
  - Acceso a instancias.
  - Ciclo de vida de una instancia.
  - Security groups.
  - Opciones de instancias.
    - On-demand.
    - Reservadas.
    - Spot.
- Opciones de tenencia.
  - Compartida.
  - Instancia dedicada.
  - Host dedicado.
  - Placement group.
- EBS
  - Nociones Basicas.
    - Volumenes Magneticos.
    - Volumenes SSD de uso general.
    - Volumenes SSD con IPOS provisionados.
    - Instancias Amazon optimizadas para EBS.
  - Protección de datos.
    - Snapshots.
    - Recuperando volumenes.
    - Opciones de encripción.
  - Labs.
    - Lanzar una instancia on-demand de Linux.
    - Lanzar una instancia on-demand de Windows.
    - Elimnar instancias.
    - Lanzar una instancia tipo spot.
    - Acceder a metadatos dentro de una instancia.
    - Añadir un volumen EBS a una instancia.
    - Realizar una snapshot y recuperar una instancia.
    - Lanzar un volumen EBS encriptado.
    - Remover un volumen de boot para añadirlo a otra instancia.

###VPC

- Introducción.
- Sub-redes.
- Tabla de rutas.
- Internet Gateways.
- Opciones de DHCP.
- Direcciones IP elasticas (EIPs).
- Tarjetas de red elásticas (ENIs).
- Endpoints.
- Peering entre VPCs.
- Security Groups.
- Network access control lists (ACLs).
- Instancias de NAT y NAT Gateways.
- Virtual Private Gateways (VPGs), Customer Gateways (CGWs), y Virtual Private Networks (VNPs).
- Labs.
  - Crear un VPC personalizado.
  - Crear dos redes dentro de VPC.
  - Conectar un VPC a Internet.
  - Lanzar una instancia dentro de un VPC.

###ELB

- Nociones generales.
- Tipos de balanceadores.
  - Balanceadores de cara a Internet.
  - Balanceadores internos.
  - Balanceadores de HTTPS.
  - Listeners.
- Configuración.
  - Timeouts.
  - Balanceo entre zonas.
  - Connection draining.
  - Proxy.Sticky sessions.
  - Health checks.

###CloudWatch

- Nociones basicas.
- Alertas.
- Dashboards.
- Lectura de logs.

###Auto Scaling

- Planes.
- Instancias mínimas.
- Manual.
- Componentes.
  - Configuración de inicio.
  - Auto scaling group.
  - Politicas de escalamiento.
- Labs.
  - Crear un ELB.
  - Crear una metrica en CloudWatch.
  - Crear una configuración de inicio y un "Auto scaling group".
  - Crear un politica de escalamiento.
  - Crear una aplicación web que escale.

###IAM

- Nociones básicas.
- Principals.
  - Usuario root.
  - Usuarios IAM.
  - Roles y tokens de seguridad.
  - Roles EC2.
  - Acceso desde otras cuentas.
  - Federation.
- Autenticación.
  - Usuario y contraseña.
  - Llave de acceso.
  - Token.
- Autorización.
- Politícas.
- Asociación de politicas a principals.
- Otras funciones.
  - Multiples factores de autenticación (MFA).
  - Llaves rotativas.
  - Resolución de permisos multiples.
- Labs.
  - Crear un grupo IAM.
  - Crear una politica de inicio de sesión.
  - Crear un usuario IAM.
  - Crear un rol IAM.
  - Crear llaves rotativas.
  - Configuración de MFA.
  - Resolver conflictos de permisos.

###RDS

- Introducción a bases de datos relacionales.
- Introducción a bases de datos NoSQL.
- Data warehouses.
- Instancias de bases de datos.
- Beneficios operacionales.
- Motores de bases de datos.
  - MySQL.
  - PostgreSQL.
  - MariaDB.
  - Oracle.
  - Microsoft SQL Server.
- Modelos de licenciamiento.
  - Licencia incluida.
  - Bring your own license.
- Amazon Aurora.
  - Instancia principal.
  - Intancias de replica.
- Opciones de almacenamiento.
  - Magnetico.
  - Proposito general.
  - IPOS provisionados.
- Respaldo y recuperación.
- Respaldos automáticos.
- Snapshots de bases de datos.
- Alta disponibilidad con Multi-AZ.
- Escalamiento.
  - Vertical.
  - Horizontal.
  - Replicas de lectura.
- Seguridad.
- Labs.
  - Crear una instancia RDS de MySQL.
  - Crear una replica de lectura

###Redshift

- Nodos y clusters.
- Diseño de tablas.
   - Tipos de datos.
   - Modos de compresión.
   - Estrategia de distribución.
   - Sort keys.
- Carga de datos.
- Consulta de datos.
- Snapshots.
- Seguridad.
- Labs.
   - Lanzar un cluster de RedShift.


###DynamoDB

- Introducción.
- Modelo de datos.
- Tipos de datos.
- Sets de datos.
   - Primary key.
   - Partition key.
   - Sort key.
   - Aprovisionamiento de capacidad.
   - Indices secundarios.
      - Indices secundarios globales.
      - Indices secundarios locales.
- Escribiendo y leyendo datos.
   - Escribiendo.
   - Leyendo.
   - Consistencia eventual.
   - Operaciones batch.
   - Busqueda de objetos.
- Escalabilidad y particionamiento.
- Seguridad.
- Streams.
- Labs.
   - Lectura y escritura sobre una tabla de DynamoDB.

###SQS

- Introducción.
- Ciclo de vida de los mensajes.
- Delay queues y timeouts.
- Separar throughput de latencia.
- Operaciones en colas, ids únicas, y metadatos.
- Colas e identificadores de mensajes.
- Atributos de mensajes.
- Long polling.
- Dead letter queues.
- Control de acceso.

###S3

- Nociones básicas.
- Almacenamiento de objetos vs almacenamiento de archivos.
- Amazon Glacier.
- Elementos.
   - Buckets.
   - Vaults.
   - Archivos.
   - Objetos.
   - Llaves.
   - Prefijos y delimitadores.
- Operaciones e interfaces.
   - Operaciones permitidas.
   - Interface REST.
- Servicios.
   - Disponibilidad y durabilidad.
   - Versionado.
   - Replicación entre regiones.
   - Control de acceso.
   - Hosting de páginas web.
   - Clases de almacenamiento.
   - Ciclo de vida de los objetos.
   - Encripción.Logs.
   - Notificaciones.
- S3 vs Glacier.
- Mejores practicas.
- Laboratorios.
  - [Funcionamiento basico](https://docs.aws.amazon.com/AmazonS3/latest/gsg/GetStartedWithS3.html).
   - [Configurar un sitio web estatico](http://docs.aws.amazon.com/AmazonS3/latest/dev/HostingWebsiteOnS3Setup.html).
   - [Configurar versionado de objetos](http://docs.aws.amazon.com/AmazonS3/latest/dev/Versioning.html).
   - [Configurar el ciclo de vida de un objeto](http://docs.aws.amazon.com/AmazonS3/latest/dev/object-lifecycle-mgmt.html).

###ECS

###CloudFront

###R53

###Cloud HSM

###Workmail, Worspaces, Workdocs (Aplicaciones de oficina en la nube)

###Elastic Beanstalk

###AWS IoT

###NGINX

Desarrollo frontend
---
1. **Completar...**

Desarrollo Backend
---

1. Introducción a Python, qué es y para que sirve.
2. El intérprete de Python.
 * Diferencias entre Python 2.7 y Python 3.X.
 * Indentado.
3. Operaciones matemáticas con Python.
 * Tipo de datos `int` y `float`.
 * Orden de precedencia en las operaciones.
4. Variables, qué son y como se usan.
 * Convenciones sobre como nombrar las variables.
 * Uso de variables en operaciones matemáticas.
5. Strings.
 * La función `print()`
 * La función `input()`
 * Concatenación de strings
 * Cast de un número a string.
 * La función `format()`
 * Slicing.
6. Condicionales.
 * Comparadores `<, <=, ==, >=, >, !=`
 * Booleanos.
 * `if` statement.
 * `else`statement.
 * `elif` statement.
 * `and` y `or` en `if` statements.
 * Condicionales anidados.
7. Listas.
 * Funcionamiento general.
 * Como crear una lista.
 * Como agregar elementos a la lista.
 * Como borrar elementos de la lista `remove` vs `del`.
 * Slicing.
8. Diccionarios.
 * Funcionamiento general.
 * Como crear un diccionario.
 * Como accesar un valor.
 * Como agregar un item a un diccionario.
 * Como borrar un item del diccionario.
 * Método `get` para evitar excepciones cuando la key no existe.
 * Tipo de datos `None`.
 * Función `update()`.
9. Comparaciones.
 * Como comparar listas.
 * Como comparar dicionarios.
 * Listas multidimensionales.
 * Listas y diccionarios combinados.
10. **Continúa...**


Networking
---
1. **Completar...**

Electrónica y control
---
1. **Completar...**
