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

### AWS

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

### EC2

- Introducción.
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
  - Introducción.
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

### VPC

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

### ELB

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

### CloudWatch

- Introducción.
- Alertas.
- Dashboards.
- Lectura de logs.

### Auto Scaling

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

### IAM

- Introducción.
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

### RDS

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

### Redshift

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


### DynamoDB

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

### S3

- Introducción.
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

### SQS

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

### SNS

- Introducción.
- Escenarios comunes.
  - Alertas.
  - Email.
  - SMS.
  - Notificaciones push.
- Labs.
  - Crear un "SNS Topic".
  - Crear una subscripción.
  - Publicación de un "SNS Topic".
  - Subscripción de una cola a un "SNS Topic".

### ECS

- Introducción.
- Conceptos de Docker.
- Clusters.
  - Creación.
  - Escalamiento.
  - Destrucción.
- Instancias de conteiners.
  - AMIs.
  - Funcionamiento.
  - Conexión.
  - Administración remota.
- Agente.
- Definición de tareas.
  - Arquitectura.
- Tareas programadas.
- Servicios.
  - Balanceo de carga.
  - Auto-scaling.
  - Creación, actualización y destrucción.
- Monitoreo.
- Labs.
  - Levantar una instancia de ECS.
  - Levantar un container dentro de una instancia de ECS.

### CloudFront

- Conceptos básicos de "Content Delivery Networks.
- Conceptos básicos de CloudFront.
  - Distribuciones.
  - Origenes.
  - Control de cache.
  - Funcionalidades avanzadas.

### Route 53

- Conceptos básicos de DNS.
  - TLDs.
  - Nombres de dominios.
  - Sub-dominios.
  - Name servers.
  - Zonas.
  - Tipos de registros.
    - SOA.
    - A y AAAA.
    - CNAME.
    - MX.
    - NS.
    - PTR.
    - TXT.
    - SRV.
- Conceptos básicos de Route 53.
- Registro de dominios.
- Servicio de DNS.
- Hosted Zones.
- Politicas de direccionaiento.
  - Simples.
  - Por pesos.
  - Por latencia.
  - Por fallas.
  - Por ubicación.
  - Por salud de servicio.
- Robustez.
- Labs.
  - Verificación de funcionamiento.

### Lambda

- Introducción
- ¿Que es "serverless"?
- Function as a Service (FaaS).
- ¿Como funciona?
  - Ejecuciones concurrentes.
  - Manejo de errores.
  - Ambiente de ejecución.
- Lenguajes soportados.
- Autenticación y control de acceso.
- Conexión con otros servicios.
- Labs.
  - Creación de una función Lambda  en NodeJS.
  - Llamar una función Lambda al cargar un archivo en S3.

### API Gateway

- Introducción.
- Elementos.
  - Endpoints.
  - Metodos.
  - Integraciones.
  - Escenas.
- Modificación de mensajes HTTP.
  - Mapeo de datos.
  - Verificación de requests.
- Monitoreo.
- Labs.
  - Creación de un API con metodos integrados con funciones Lambda.

### CloudFormation

- Introducción.
- Casos de uso.
- Construcción de una topología en JSON.
- Construcción de una topología en YAML.
- Funciones y referencias.
- Multiples deployments.
- Limitaciones.
- AWS SAM.
- Labs.
  - Levantar un VPC con CloudFormation.
  - Levantar un servicio de API Gateway + Lambda con CloudFormation.

### ElastiCache

- Introducción.
  - Cacheo en memoria.
  - Patrones de acceso.
  - Motores de cache.
    - Memcached.
    - Redis.
- Nodos y Clusters.
- Auto-discovery.
- Escalamiento.
  - Escalamiento horizontal.
  - Escalamiento vertical.
- Replicación y multi-az.
- Backup y recuperación.
- Control de acceso.
- Labs.
  - Crear un cluster de Memcached.

### EMR

- Introducción.
- Hadoop.
- Hadoop distributed file system (HDFS).
- EMR file system (EMRFS).
- Casos de uso.

### Elastic Beanstalk

- Introducción.
- Arquitectura.
- Consideraciones de diseño.
  - Escalabilidad.
  - Seguridad.
  - Almacenamiento.
  - Tolerancia ante fallas.
  - Conectividad.
- Plataformas soportadas.
- Administración de aplicaciones.
  - Administración de versiones.
  - Ciclo de vida de las versiones.
- Administración de ambientes.
  - Creación de ambientes.
  - Deployments.
  - Cambios de configuración.
  - Actualizaciones.
  - Configuración
    - Opciones.
    - Auto-scaling.
    - EC2.
    - Balanceadores de carga.
    - Bases de datos.
    - HTTPS
- Monitoreo.
- Integración con otros servicios de AWS.
  - CloudFront.
  - CloudWatch.
  - DynamoDB.
  - IAM.
  - RDS.
  - S3.
  - VPC.
- Funcionamiento con Docker.
  - Único container.
  - Multiples containers.
- Funcionamiento con Python.
  - Ambiente de desarrollo.
  - Utilizando Django.
  - Utilizando Flask. 
- Labs.

### AWS IoT

- Introducción.
  - Acceso.
  - Servicios relacionados.
  - Cosas.
- Administración de cosas.
  - Registro.
  - Tipos.
- Seguridad e identidad.
  - Autenticación con certificados X.509.
  - Autorización.
    - Políticas.
- Message Broker.
  - Protocolos.
  - Topicos.
  - Eventos.
- Device shadows.
  - Flujo.
  - Documentos.
  - API REST.
  - Topicos MQTT.
- Monitoreo.
  - CloudWatch.

### NGINX

- Introducción.
- Instalación en Ubuntu.
- Configuración
  - Vocabulario.
  - Virtual Hosts.
  - Logging.
  - Directivas.
  - Modulos.
- Funcionalidades.
  - Modificación de headers.
  - Gzip.
  - CGI.
  - Limitación.
  - Streaming de video.
  - HTTP2.
- Seguridad
  - SSL.
  - Autenticación básica.
  - Mejores practicas.
- Reverse Proxy.
- Balanceador de carga.

### Cloud HSM

### Workmail, Worspaces, Workdocs (Aplicaciones de oficina en la nube)

Desarrollo frontend
---
### JavaScript

- Conceptos generales.
  - Statements.
  - Expressions.
  - Ejecución.
  - I/O.
  - Operadores.
  - Valores y Tipos.
  - Conversión entre tipos.
  - Comentarios.
  - Variables.
  - Bloques.
  - Condicionales.
  - Loops.
  - Funciones.
  - Scopes.
- Introducción a JavaScript
  - Objetos.
  - Arrays.
  - Equalidad.
  - Scopes y Hoisting.
  - `'strict mode'`
  - Funciones como valores.
  - IIFEs.
  - Closure.
  - `this`
  - Prototypes.
  - Polyfilling & Transpiling.
  - DOM API.
- Scopes & Closure.
  - ¿Que es un scope?
  - Global scope.
  - *Nested Scope*
  - Lexical Scope.
  - Function scope.
  - `let` y `const`
  - Clojure.
  - Modulos.
  - `import` & `export`.
- `this`.
  - ¿Que es `this`?
  - Call-site.
    - Por defecto.
    - Implicito.
    - Explicito.
    - `bind`
    - `new`
- Objetos.
  - Sintaxis.
  - Tipo.
  - Objetos existentes.
  - Contenidos.
  - Acceso a propiedades.
  - Propiedad vs Metodo.
  - Arrays.
  - Duplicar objetos.
  - Iteraciones.
- ¿Clases?
  - Teoría.
  - Clases de JavaScript.
  - Mixins.
- Object Prototypes.
  - ​

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
