Amazon Domain Name System: Route 53
===

*Fuentes:*
- [Documentación Oficial](https://aws.amazon.com/es/route53/)



## Indice
---
- [Introducción](#introduccion)

---
## Introducción ##
---
### ¿Qué es Amazon Domain Name System (Route 53)? 

Amazon Route 53 es un servicio DNS (Sistema de nombres de dominio) escalable y de alta disponibilidad en la nube. Está diseñado para ofrecer a los desarrolladores y las empresas un método confiable y rentable para redirigir a los usuarios finales a las aplicaciones en Internet convirtiendo nombres legibles para las personas como www.ejemplo.com en direcciones IP numéricas como 192.0.2.1 que utilizan los equipos para conectarse entre ellos. Amazon Route 53 también es conforme con IPv6.



### Beneficios de Route 53

ToDo

### Casos de uso

ToDo

---
## Conceptos Básicos ##

- Servidor autoritativo vs no-autoritativo

---
## Hosted Zone ##

ToDo

---
## Tipos de Registros ##

ToDo

**A**

**AAAA**

**CNAME**

**MX**

**NS**

**PTR**

**SOA** 

Cada zona, contiene este tipo de registro al comienzo. El registro SOA contiene los siguientes datos:

- _Owner:_ El nombre del host o el Dominio al que pertenece este registro SOA.

- _TTL:_ Es un entero de 32 bits que representa en segundos, la cantidad de tiempo que un servidor DNS debe almacenar en caché esta entrada antes de descartarla. Este tiempo es opcional y si no se especifica, se utilizará el TTL mínimo del registro SOA.

- _Class_: Define la familia de protocolos a utilizar. En la mayoría de los casos veremos una entrada del tipo IN correspondiente para los sisteas sobre internet. El otro valor definidio en RFC 1034 es el CH para el sistema Chaos, el cual fue utilizado de forma experimental en el MIT.

- _Type_: Define el tipo de registro.

- _Authoritative Server_: Define el primer servidor DNS autoritativo para la zona.

- _Responsable_: Define el correo de la persona responsable de dicha zona. Se utiliza un (.) en vez de (@),

- _Serial number_: Define cuantas veces la zona ha sido actualizada. Cuando un servidor secundario (esclavo), contacta al servidor primario (master) de la zona para determinar si es necesario realizar una transferencia de zona, el servidor secundario compara su propio numero de serie con el numero de serie del servidor primario. Si el _serial_ del _master_ es mayor, el servidor esclavo inicia la transferencia de zona.

- _Refresh_: Define la frecuencia con la que el servidor secundario de la zona chequea para saber si existen cambios.

- _Retry_: Define cuanto tiempo después de enviar una solicitud de transferencia de zona, el servidor secundario, espera una respuesta del servidor primario antes de volver a intentarlo.

- _Expire_: Define la cantidad de tiempo en segundos que un servidor de nombres secundario (o servidores) mantendrá una zona antes de que ya no se considere autoritativa.

- _Minimum TTL_: Define la cantidad de tiempo en segundos que los registros de un dominio son válidos, dicho parámetro puede ser sobreescrito por el TTL de otro registro.


**SPF**

**SRV**

**TXT**
 

 ---
## Políticas de Ruteo (Routing Policy)

ToDo

- Simple
- Weighted
- Latency
- Failover
- Geo-Location


 ---
## Límites

ToDo


---
## Precios

ToDo

- Cantidad de Zonas.
- Cantidad de queries.
- Tipo de queries.
- Health Checks
- Dominios comprados

---
## Service Level Agreement (SLA)

ToDo

---
## Registro de Dominios ##

ToDo


### Transferencias de Dominios

ToDo


### Transferencias de Dominios

ToDo
