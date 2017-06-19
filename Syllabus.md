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
1. AWS
  * ¿Que es cloud computing?
    * Ventajas.
    * Modelos de implementación.
  * Fundamentos de AWS.
    * Infraestructura global.
      * Regiones.
      * Availability Zones.
    * Seguridad y Compliance.
  * Plataforma de AWS.
    * Acceso.
    * Servicios de red y computo.
    * Almacenamiento y CDN.
    * Monitoreo y administración.
    * Servicios de aplicación.
2. EC2.
   1. Nociones básicas.
      1. Tipos de instancias.
      2. AMIs
   2. Instancias.
      1. Acceso a instancias.
      2. Ciclo de vida de una instancia.
      3. Security groups.
      4. Opciones de instancias.
         1. On-demand.
         2. Reservadas.
         3. Spot.
      5. Opciones de tenencia.
         1. Compartida.
         2. Instancia dedicada.
         3. Host dedicado.
         4. Placement group.
      6. EBS
         1. Nociones Basicas.
            1. Volumenes Magneticos.
            2. Volumenes SSD de uso general.
            3. Volumenes SSD con IPOS provisionados.
         2. Instancias Amazon optimizadas para EBS.
         3. Protección de datos.
            1. Snapshots.
            2. Recuperando volumenes.
            3. Opciones de encripción.
      7. Labs.
         1. Lanzar una instancia on-demand de Linux.
         2. Lanzar una instancia on-demand de Windows.
         3. Elimnar instancias.
         4. Lanzar una instancia tipo spot.
         5. Acceder a metadatos dentro de una instancia.
         6. Añadir un volumen EBS a una instancia.
         7. Realizar una snapshot y recuperar una instancia.
         8. Lanzar un volumen EBS encriptado.
         9. Remover un volumen de boot para añadirlo a otra instancia.
3. VPC.
   1. Introducción.
   2. Sub-redes.
   3. Tabla de rutas.
   4. Internet Gateways.
   5. Opciones de DHCP.
   6. Direcciones IP elasticas (EIPs).
   7. Tarjetas de red elásticas (ENIs).
   8. Endpoints.
   9. Peering entre VPCs.
   10. Security Groups.
   11. Network access control lists (ACLs).
   12. Instancias de NAT y NAT Gateways.
   13. Virtual Private Gateways (VPGs), Customer Gateways (CGWs), y Virtual Private Networks (VNPs).
   14. Labs.
       1. Crear un VPC personalizado.
       2. Crear dos redes dentro de VPC.
       3. Conectar un VPC a Internet.
       4. Lanzar una instancia dentro de un VPC.
4. ELB.
   1. Nociones generales.
   2. Tipos de balanceadores.
      1. Balanceadores de cara a Internet.
      2. Balanceadores internos.
      3. Balanceadores de HTTPS.
      4. Listeners.
   3. Configuración.
      1. Timeouts.
      2. Balanceo entre zonas.
      3. Connection draining.
      4. Proxy.
      5. Sticky sessions.
      6. Health checks.
5. CloudWatch.
   1. Nociones basicas.
   2. Alertas.
   3. Dashboards.
   4. Lectura de logs.
6. Auto Scaling.
   1. Planes.
      1. Instancias mínimas.
      2. Manual.
   2. Componentes.
      1. Configuración de inicio.
      2. Auto scaling group.
      3. Politicas de escalamiento.
   3. Labs.
      1. Crear un ELB.
      2. Crear una metrica en CloudWatch.
      3. Crear una configuración de inicio y un "Auto scaling group".
      4. Crear un politica de escalamiento.
      5. Crear una aplicación web que escale.
7. IAM.
   1. Nociones básicas.
   2. Principals.
      1. Usuario root.
      2. Usuarios IAM.
      3. Roles y tokens de seguridad.
         1. Roles EC2.
         2. Acceso desde otras cuentas.
         3. Federation.
   3. Autenticación.
      1. Usuario y contraseña.
      2. Llave de acceso.
      3. Token.
   4. Autorización.
      1. Politícas.
      2. Asociación de politicas a principals.
   5. Otras funciones.
      1. Multiples factores de autenticación (MFA).
      2. Llaves rotativas.
      3. Resolución de permisos multiples.
   6. Labs.
      1. Crear un grupo IAM.
      2. Crear una politica de inicio de sesión.
      3. Crear un usuario IAM.
      4. Crear un rol IAM.
      5. Crear llaves rotativas.
      6. Configuración de MFA.
      7. Resolver conflictos de permisos.
8. RDS.
   1. Introducción a bases de datos relacionales.
   2. Introducción a bases de datos NoSQL.
   3. Data warehouses.
   4. Instancias de bases de datos.
      1. Beneficios operacionales.
      2. Motores de bases de datos.
         1. MySQL.
         2. PostgreSQL.
         3. MariaDB.
         4. Oracle.
         5. Microsoft SQL Server.
      3. Modelos de licenciamiento.
         1. Licencia incluida.
         2. Bring your own license.
      4. Amazon Aurora.
         1. Instancia principal.
         2. Intancias de replica.
      5. Opciones de almacenamiento.
         1. Magnetico.
         2. Proposito general.
         3. IPOS provisionados.
      6. Respaldo y recuperación.
      7. Respaldos automáticos.
      8. Snapshots de bases de datos.
      9. Alta disponibilidad con Multi-AZ.
      10. Escalamiento.
          1. Vertical.
          2. Horizontal.
          3. Replicas de lectura.
      11. Seguridad.
      12. Labs.
          1. Crear una instancia RDS de MySQL.
          2. Crear una replica de lectura.
9. Redshift.
   1. Nodos y clusters.
   2. Diseño de tablas.
      1. Tipos de datos.
      2. Modos de compresión.
      3. Estrategia de distribución.
      4. Sort keys.
   3. Carga de datos.
   4. Consulta de datos.
   5. Snapshots.
   6. Seguridad.
   7. Labs.
      1. Lanzar un cluster de RedShift.
10. DynamoDB.
    1. Introducción.
    2. Modelo de datos.
       1. Tipos de datos.
       2. Sets de datos.
       3. Primary key.
          1. Partition key.
          2. Sort key.
       4. Aprovisionamiento de capacidad.
       5. Indices secundarios.
          1. Indices secundarios globales.
          2. Indices secundarios locales.
    3. Escribiendo y leyendo datos.
       1. Escribiendo.
       2. Leyendo.
       3. Consistencia eventual.
       4. Operaciones batch.
       5. Busqueda de objetos.
    4. Escalabilidad y particionamiento.
    5. Seguridad.
    6. Streams.
    7. Labs.
       1. Lectura y escritura sobre una tabla de DynamoDB.
11. SQS.
    1. Introducción.
    2. Ciclo de vida de los mensajes.
    3. Delay queues y timeouts.
    4. Separar throughput de latencia.
    5. Operaciones en colas, ids únicas, y metadatos.
    6. Colas e identificadores de mensajes.
    7. Atributos de mensajes.
    8. Long polling.
    9. Dead letter queues.
    10. Control de acceso.
12. S3
    1. Nociones básicas.
    2. Almacenamiento de objetos vs almacenamiento de archivos.
    3. Amazon Glacier.
    4. Elementos.
      1. Buckets.
      2. Vaults.
      3. Archivos.
      4. Objetos.
      5. Llaves.
      6. Prefijos y delimitadores.
    5. Operaciones e interfaces.
      1. Operaciones permitidas.
      2. Interface REST.
    6. Servicios.
      1. Disponibilidad y durabilidad.
        1. Versionado.
        2. Replicación entre regiones.
      2. Control de acceso.
      3. Hosting de páginas web.
      4. Clases de almacenamiento.
      5. Ciclo de vida de los objetos.
      6. Encripción.
      7. Logs.
      8. Notificaciones.
    7. S3 vs Glacier.
    8. Mejores practicas.
    9. Laboratorios.
      1. [Funcionamiento basico](https://docs.aws.amazon.com/AmazonS3/latest/gsg/GetStartedWithS3.html).
      2. [Configurar un sitio web estatico](http://docs.aws.amazon.com/AmazonS3/latest/dev/HostingWebsiteOnS3Setup.html).
      3. [Configurar versionado de objetos](http://docs.aws.amazon.com/AmazonS3/latest/dev/Versioning.html).
      4. [Configurar el ciclo de vida de un objeto](http://docs.aws.amazon.com/AmazonS3/latest/dev/object-lifecycle-mgmt.html).
13. ECS.
14. CloudFront.
15. R53.
16. Cloud HSM.
17. Workmail, Worspaces, Workdocs (Aplicaciones de oficina en la nube).
18. DynamoDB.
19. Elastic Beanstalk.
20. AWS IoT.
21. NGINX.

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
