Amazon Identity & Access Management (Amazon IAM)
===

*Fuentes:*

- [Documentación oficial](https://aws.amazon.com/iam)
- [Cloud academy](https://cloudacademy.com/amazon-web-services/overview-of-aws-identity-and-access-management-iam-course/)

---

## Indice

Insertar indice

---
## Introducción

¿Qué es Amazon IAM?

Amazon Identity and Access Management (IAM) es un servicio que nos ayuda a controlar de forma segura el acceso a los servicios y recursos de AWS.

### Características

IAM otorga las siguientes características:

- **Acceso compartido**

Podemos conceder permisos a otro usuarios para administrar y utilizar recursos de AWS sin tener que compartir nuestra clave de acceso.

- **Permisos granulares**

Podemos otorgarles distintos tipos de permisos a diferentes usuarios sobre diferentes recursos. Ej; A algunos usuarios podemos darle full access sobre EC2 y S3, y a otros usuaros de AWS podemos darle read-only sobre algunos buckets de S3, o permisos para administrar algunas instancias de EC2.

- **Acceso seguro para aplicaciones sobre EC2**

Podemos utilizar las funciones de IAM para otorgar credenciales de acceso a aplicaciones que se ejecutan sobre EC2 y que necesitan acceder a otros recursos de AWS, por ejemplo; buckets de S3, una base RDS o DynamoDB.

- **Multi-factor authentication (MFA)**

Podemos agregar autenticación en 2 pasos para mayor seguridad. Los usuarios deberán no solo la clave de acceso, sino que también, un código de acceso de algún dispositivo pre-configurado.

- **Federación de identidad**

Podemos darle acceso temporal a otro usuario (que ya tenga usuario en AWS) y que no pertenezca a nuestra organización.

- **Información de auditoría**

Si estamos utilizando [AWS CloudTrail](https://aws.amazon.com/es/cloudtrail/) recibiremos logs que incluyen registros de peticiones de acceso a recursos de nuestra cuenta basadas en información de IAM.

- **Payment Card Industry(PCI) & Data Security Standard (DSS)**

IAM soporta el manejo de información y transacciones asociadas a las tarjetas de crédito. Para más información consultar.

- **Integración con otros servicios de AWS**

Es posible integrar IAM con otros servicios de AWS.

- **Sin cargos extra**

IAM es un servicio que se ofrece sin cargo.

Refs: Más información sobre el standard de seguridad de los datos [PCI DSS](https://aws.amazon.com/es/compliance/pci-dss-level-1-faqs/).

---
## Identity vs Access Management

Es importante entender la diferencia entre el concepto de Identity y el de Access Management.

- **Identity**

Cuando nos referimos a Identity, estamos hablando de como vamos a identificar unívocamente a una persona/aplicación.

- **Access Management**

 Cuando hablamos de Access Management estamos hablando de qué es lo que un usuario/aplicación va a poder hacer dentro de AWS.

**Por defecto, los usuarios (salvo root) no tienen permisos para acceder a ningún recurso** salvo que se indique lo contrario mediante políticas.

---
## Tipos de acceso

Podemos utilizar AWS Identity and Access Management en cualquera de las siguientes formas.

- **Usuario + Password**
    - AWS Management Console

- **Access Key ID + Secret Access Key**
    - AWS Command Line Tools
    - AWS SDKs
    - HTTPS API REST

---

## El usuario root

Cuando crearmos por primera vez una cuenta en AWS, por defecto estamos creando una cuenta root. Con estas credenciales, podemos acceder a la Consola de administración.

Cuando utilizamos la cuenta root, tenemos acceso completo a todos los servicios y recursos de AWS, incluyendo la facturación. AWS recomienda **NO UTILIZAR LA CUENTA ROOT** para el trabajo diario y crear otros usuarios con los permisos necesarios.

---

## Responsabilidades

![IAM Responsability](images/IAM_responsibility.png)

---
## Usuarios

Como vimos anteriormente, el concepto de _Identity_
nos permite contestr la pregunta ¿quien es ese usuario?. En lugar de compartir la clave de root, podemos crear otras cuentas IAM que corresponderán a personas físicas en nuestra empresa, y que tendrán sus propias credenciales para acceder a la consola de administración.

**Puntos importantes a recordar:**

- Los usuarios IAM no son cuentas separadas de AWS.
- El usuario administrador con los permisos de administrator, no es el mismo que el usuario root.

Incluso se pueden generar _access keys_ para que puedan acceder de manera programática.

En la figura siguiente, Brad, Jim, DevApp1, DevApp2, TestApp1, y TestApp2 son usuarios IAM que fueron creados dentro de una sola cuenta de AWS, y cada usuario tiene sus propias credenciales.

![IAM Users](images/IAM_users.png)

---
## Grupos

Es posible organizar usuarios dentro de grupos IAM. Básicamente, un grupo es una colección de usuarios.

Todos los usuarios dentro de un grupo tienen los permisos asignados al grupo. Es una forma fácil de agrupar usuarios y permisos.

Por ejemplo: En la figura siguiente tenemos un grupo llamado **Admins**, otro **Developers** y otro **Test**. Los usuarios que estan dentro del grupo Admin, tienen los permisos que se hayan definido para los Administradores. Si un nuevo usuario administrador ingresa a la empresa, bastará con agregarlo al grupo para que tenga los mismos permisos que los otros administradores.

Otro caso puede ser un usuario Test que sea ascendido a developer. En este caso, agregaremos a Cathy al grupo Developers y la borraremos del grupo Test.

![IAM Groups](images/IAM_groups1.PNG)

Los permisos son atacheados a los grupos mediante políticas, ya sean predefinidas por AWS o creadas por nosotros.

De esta froma, los usuarios dentro del grupo, heredan dichos permisos. Solo basta con modificar la política del grupo para cambiar los permisos sobre todos los usuarios.

- **Máximo de 100 grupos por cuenta de AWS**. En caso de necesitar más, es necesario generar un ticket en AWS.
- **Un usuario puede ser asociado a un máximo de 10 grupos**.

![IAM Groups](images/IAM_groups_permissions.PNG)

---
## [Ejercicio # 1 y 2](ejercicios/AWS_IAM_1_Users_Groups.md)
---

## Roles

Un rol es muy parecido a un usuario, en el sentido de que se le pueden asignar permisos y luego ser atacheado a un servicio. Sin embargo, **un rol no tiene ningun tipo de credencial (user/password o access keys)**.

### Tipos de roles

- AWS Service Role
- AWS Service-Linked Role
- Rol for Cross-Account Access
- Rol for identify Provider Access.

## Credenciales Temporales

Las credenciales temporales son utilizadas principalmente para los roles. Se pueden generar credenciales temporales con permisos más restrictivos que los usuarios estandard y previene que se ejecuten tareas de forma accidental. Otro beneficio de las credenciales temporales es que expiran automáticamente despues de un tiempo determinado.

## ¿Cuando usar qué?

- Usuario
    - Cuando se crea una cuenta en AWS y solo existe un usuario que va a trabajar en AWS.
    - Cuando otras personas de la companía necesitan trabajar sobre AWS.
    - Cuando se desea utilizar CLI para trabajar en AWS.

- Rol
    - Cuando tenemos aplicaciones corriendo sobre una instancia de EC2 y la aplicación necesita acceder a otros servicios de AWS.
    - Cuando deseamos utilizar _features_ de algunos servicios los cuales si o si necesitan tener un rol asignados (Ej; Amazon S3 region replication).
    - Cuando los usuarios ya estan autenticados en la red empresarial y necesita utilizar AWS sin la necesidad de tener que loguearse nuevamente (SSO).

---

## Políticas (Policies)

Las IAM Policies son utilziadas para asignar permisos. El formato de definición de las políticas es json y la estructura base es la siguiente:

```bash
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt245245254535",
      "Action": "s3:*",
      "Effect": "Allow",
      "Resource": "*",
      "Condition": {
          "IpAddress": {
              "aws:SourceIp": "10.10.0.0/16"
          }
      }
    }
  ]
}
```

- **Version:**
    - Debe aparecer antes que el Statement.
    - Solo acepta 2 valores (2012-10-17 o 2008-10-17). 
    - Si no se especifica, toma 2008 por defecto. 
    - Con la versión 2008 hay _features_ que no funcionan (Ej; _policy variables_).

- **Statement:** 
    - Elemento obligatorio.
    - Elemento principal de la _policy_.
    - Incluye varios elementos dentro de un array json.
    - Formato: "Statement": [{...},{...},{...}].

- **Sid:**
    - Elemento opcional, se puede asignar un sid a cada statement.
    - Es un sub-id que puede ser utilizados por algunos servicios como SQS y SNS.

- **Acction:**
    - Elemento obligatorio.
    Describe la/s acción/es específica/s que serán permitidas o denegadas.
    - Cada servicio de AWS tiene su propio conjutno de tareas a realizar/denegar.
    - No es key sensitive -> iam:ListAccessKeys = IAM:listaccesskeys.
    - Se pueden concatenar acciones: "Action": [ "sqs:SendMessage", "sqs:ReceiveMessage", "ec2:StartInstances", "iam:ChangePassword", "s3:GetObject"].
    - Se pueden utilizar _wildcards (*)_: "Action": "s3:*" o "Action": "iam:\*AccessKey\*".

- Effect:
    - Solo acpeta 2 opciones: Allow o Deny.

- Resource:
    - Indica el recurso o recursos que cubre el statement.
    - Se utiliza el nombre ARN.
    ```bash
    "Resource": "arn:aws:s3:us-east-2:user-account-ID:my_corporate_bucket/*"
    ```

- Condition:
    - Campo opcional.
    - Permite setear condiciones para ejecutar la política.
    - Pueden incluir fechas, horas, ip origen, usuario, etc.
    ```bash
    "Condition": {
          "IpAddress": {
              "aws:SourceIp": "10.10.0.0/16"
          }
      }
    ```

Refs:

[AWS Reference Policies Elements](http://docs.aws.amazon.com/es_es/IAM/latest/UserGuide/reference_policies_elements.html)

[AWS Amazon Resources Names](http://docs.aws.amazon.com/es_es/general/latest/gr/aws-arns-and-namespaces.html)

[AWS Global Conditions Keys](http://docs.aws.amazon.com/es_es/IAM/latest/UserGuide/reference_policies_condition-keys.html#AvailableKeys)

---

## Tipos de Políticas (Type of policies)

- **AWS Managed Policies** 

Son políticas pre-creadas por AWS y pueden ser asociadas a Grupos, Roles y Usuarios (no recomendado)

- **Customer Managed Policies**

Son políticas creadas por el propio usuario y existen 3 formas de hacerlo:

    1. Copiar una Managed Policy y editarla.
    2. Utilizar el generador de policies.
    3. Escribir el json desde 0.

---
## Resolución de conflictos de permisos.

- Por defecto el acceso a todos los recursos esta prohibido.
- Solo se otorgará acceso a un recurso si existe un "Allow".
- Si existe un "Deny", sobreescribirá cualquier "Allow" que exista anteriormente.

![IAM Policy](images/IAM_policy3.png)
