Instancias de contenedor Amazon ECS
===

*Fuentes:*
- [Documentación oficial](http://docs.aws.amazon.com/es_es/AmazonECS/latest/developerguide/ECS_instances.html#container_instance_life_cycle)




## Temas
---
- [Conceptos de instancia de contenedor](#conceptos-de-instancia-de-contenedor)
- [Comprobar el rol de instancia de su cuenta](#comprobar-el-rol-de-instancia-de_su_cuenta)


&nbsp;
---
## Conceptos de instancia de contenedor ##

*La instancia de contenedor debe estar ejecutando el agente de contenedor de Amazon ECS para registrar en uno de sus clústeres. Si está utilizando la AMI optimizada para Amazon ECS, el agente ya está instalado. Para utilizar un sistema operativo diferente, instale el agente. 

*Dado que el agente de contenedor de Amazon ECS realiza llamadas a Amazon ECS en su nombre, debe lanzar instancias de contenedor con un rol de IAM que se autentique en su cuenta y proporcione los permisos requeridos a nivel de recursos.

*Si alguno de los contenedores asociado a sus tareas requiere conectividad externa, puede mapear sus puertos de red a puertos en la instancia de contenedor de Amazon ECS de host para que sean accesibles desde Internet. El grupo de seguridad de la instancia de contenedor debe permitir el acceso de entrada a los puertos que desea exponer.

*Le recomendamos encarecidamente lanzar sus instancias de contenedor dentro de un VPC, dado que Amazon VPC ofrece más control sobre la red y ofrece capacidades de configuración más amplias.




&nbsp;
## Comprobar el rol de instancia de su cuenta

El agente contenedor de Amazon ECS realiza llamadas a los API de Amazon ECS en su nombre. Las instancias de contenedor que ejecutan el agente requieren una política de IAM y rol para que el servicio sepa que el agente le pertenece.

En la mayoría de los casos, el rol de instancia de Amazon ECS se crea automáticamente en la experiencia de primer uso de la consola. Puede utilizar el procedimiento siguiente para comprobar y ver si la cuenta ya dispone de un rol de servicio de Amazon ECS.


Para comprobar si ecsInstanceRole está en la consola de IAM

1-Inicie sesión en la Consola de administración de AWS y abra la consola de IAM en https://console.aws.amazon.com/iam/.

2-Seleccione Roles en el panel de navegación.

3-En la lista de roles, busque ecsInstanceRole. Si el rol existe, no es necesario crearlo. Si el rol no existe, siga los procedimientos que se indican en Rol de IAM de instancia de contenedor de Amazon ECS para crear el role.




[Siguiente >](https://github.com/conapps/conapps-iot/blob/master/AWS%20Cloud/ECS _(Amazon _EC2 _Container _Service)/ECS_Parte_4 Primeros_pasos_con_ECS.md)
