Amazon Identity & Access Management (Amazon IAM)
===

*Fuentes:*
- [Documentación oficial](https://aws.amazon.com/iam)
- [Cloud academy](https://cloudacademy.com/amazon-web-services/overview-of-aws-identity-and-access-management-iam-course/)

---
## Introducción
---
¿Qué es Amazon IAM?      
---
Amazon Identity and Access Management (IAM) es un servicio que nos ayuda a controlar de forma segura el acceso a los servicios y recursos de AWS. 

### Características

IAM nos otorga las siguientes características:

* **Acceso compartido**

Podemos conceder permisos a otro usuarios para administrar y utilizar recursos de AWS sin tener que compartir nuestra clave de acceso.

* **Permisos granulares**

Podemos otorgarles distintos tipos de permisos a diferentes usuarios sobre diferentes recursos. Ej; A algunos usuarios podemos darle full access sobre EC2 y S3, y a otros usuaros de AWS podemos darle read-only sobre algunos buckets de S3, o permisos para administrar algunas instancias de EC2.

* **Acceso seguro para aplicaciones sobre EC2**

Podemos utilizar las funciones de IAM para otorgar credenciales de acceso a aplicaciones que se ejecutan sobre EC2 y que necesitan acceder a otros recursos de AWS, por ejemplo; buckets de S3, una base RDS o DynamoDB.

* **Multi-factor authentication (MFA)**

Podemos agregar autenticación en 2 pasos para mayor seguridad. Los usuarios deberán no solo la clave de acceso, sino que también, un código de acceso de algún dispositivo pre-configurado.

* **Federación de identidad**

Podemos darle acceso temporal a otro usuario (que ya tenga usuario en AWS) y que no pertenezca a nuestra organización.

* **Información de auditoría**

Si estamos utilizando [AWS CloudTrial](https://aws.amazon.com/es/cloudtrail/) recibiremos logs que incluyen registros de peticiones de acceso a recursos de nuestra cuenta basadas en información de IAM.

* **Payment Card Industry(PCI) & Data Security Standard (DSS)**

IAM soporta el manejo de información de tarjetas de crédito. Para más información consultar [PCI DSS](https://aws.amazon.com/es/compliance/pci-dss-level-1-faqs/).

* **Integración con otros servicios de AWS**

Es posible integrar IAM con otros servicios de AWS.

* **Sin cargos extra**

IAM es un servicio que se ofrece sin cargo.


---
## Acceso a IAM
---

Podemos utilizar AWS Identity and Access Management en cualquera de las siguientes formas.

* **AWS Management Console**

* **AWS Command Line Tools**

* **AWS SDKs**

* **IAM HTTPS API**


---
## Primer acceso como Root
---

Cuando crearmos por primera vez una cuenta en AWS, por defecto estamos creando una cuenta root. Con estas credenciales, podemos acceder a la Consola de administración.

Cuando utilizamos la cuenta root, tenemos acceso completo a todos los servicios y recursos de AWS, incluyendo la facturación. AWS recomienda **NO UTILIZAR LA CUENTA ROOT** para el trabajo diario y crear otros usuarios con los permisos necesarios.