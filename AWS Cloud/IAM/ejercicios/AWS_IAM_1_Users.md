## Manejo de usuarios mediante la consola de AWS (MC).

En este ejercicio, crearemos usuarios desde la consola de administración de AWS. 

Las tareas a realizar son las siguientes:

* Acceder a la [consola IAM](https://console.aws.amazon.com/iam/)

![IAM Users](../images/IAM_access.png)

* En el panel de IAM, haga click en *Add User*

![IAM Users](../images/IAM_user1.png)

* Indique el nombre de usuario. 

Puede contener, letras, numeros, y los siguientes caracteres: mas (+), igual (=), coma (,), punto (.), arroba (@), guion bajo (_), y guion medio (-). El nombre no es _case sensitive_ y puede contener un máximo de 64 caracteres. 

* Indique el tipo de acceso a otorgar
* Indique si la clave inicial es autogenerada y si se va a forzar el cambio en el primer logon.

![IAM Users](../images/IAM_user3.png)

* Por el momento no lo vamos a asignar a ningún grupo, hacemos clic en _next review_.

![IAM Users](../images/IAM_user4.png)

*Realizamos el review de las ociones.

![IAM Users](../images/IAM_user5.png)

![IAM Users](../images/IAM_user6.png)


---
## Manejo de usuarios mediante la linea de comandos de AWS (CLI).

* Crear un par de usuarios

```bash
aws iam create-user --user-name miriarte1

aws iam create-user --user-name miriarte2
```

* Ejemplo de salida cuando creamos un usuario

```bash
{
    "User": {
        "Path": "/",
        "UserName": "miriarte1",
        "UserId": "ADFASDFADF89078907ADSF",
        "Arn": "arn:aws:iam::23432234234234:user/miriarte1",
        "CreateDate": "2017-08-16T20:01:27.623Z"
    }
}
```

* Listar usuarios

```bash
aws iam list-users
```

* Modificar usuario

```bash
aws iam update-user --user-name miriarte2 --new-user-name miriarte3
```

* Borrar usuario

```bash
aws iam delete-user --user-name miriarte3
```




---
Refs:
[AWS CLI IAM](http://docs.aws.amazon.com/cli/latest/reference/iam/)




---
[< Volver al teorico](https://github.com/conapps/conapps-iot/blob/master/AWS%20Cloud/IAM/AWS_IAM_Parte_1.md#Grupos)

