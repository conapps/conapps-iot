
[< Anterior AWS_IAM_Parte_1](https://github.com/conapps/conapps-iot/blob/master/AWS%20Cloud/IAM/AWS_IAM_Parte_1.md)

## _IAM Best Practices_

AWS recomienda seguir la siguiente guía para mejorar la seguridad sobre los recursos de AWS.

* Eliminar las _Access Keys_ para el usuario root.
* Crear usuarios individuales.
* Utilizar las Políticas definidas por AWS para asignar permisos donde sea posible.
* Utilizar grupos para asignar permisos a usuarios.
* Aplicar la regla de permisos mínimos.
* Configurar políticas de complejidad de claves.
* Habilitar MFA para usuarios con permisos elevados (root, administrator, etc).
* Utilizar roles para aplicaciones que corren sobre instancias de EC2.
* Delegar utilizando roles en lugar de compartir las credenciales.
* Rotar las credenciales regularmente.
* Eliminar usuarios y claves sin utilizar.
* Utilizar el campo "Conditions" cuando definimos _policies_ para mayor seguridad.
* Monitorear la actividad en nuestro _tenant_ de AWS (CloudTrial, CloudWatch).