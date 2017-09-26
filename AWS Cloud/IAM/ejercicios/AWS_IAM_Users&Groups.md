## Ejercicio 1: Manejo de usuarios mediante la consola de AWS (MC).

En este ejercicio, crearemos usuarios desde la consola de administración de AWS. 

Las tareas a realizar son las siguientes:

* Acceder a la [consola IAM](https://console.aws.amazon.com/iam/)

![IAM Users](../images/IAM_access.png)

* En el panel de IAM, haga click en *Add User*

![IAM Users](../images/IAM_user1.PNG)

* Indique el nombre de usuario.

Puede contener, letras, numeros, y los siguientes caracteres: mas (+), igual (=), coma (,), punto (.), arroba (@), guion bajo (_), y guion medio (-). El nombre no es _case sensitive_ y puede contener un máximo de 64 caracteres.

* Indique el tipo de acceso a otorgar
* Indique si la clave inicial es autogenerada y si se va a forzar el cambio en el primer logon.

![IAM Users](../images/IAM_user3.PNG)

* Por el momento no lo vamos a asignar a ningún grupo, hacemos clic en _next review_.

![IAM Users](../images/IAM_user4.PNG)

* Realizamos el review de las opciones seleccionadas.

![IAM Users](../images/IAM_user5.PNG)

![IAM Users](../images/IAM_user6.PNG)


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

* Listar access keys

```bash
aws iam list-access-keys --user-name miriarte3
```

```bash
{
    "AccessKeyMetadata": [
        {
            "UserName": "miriarte3",
            "AccessKeyId": "ASDF0897ASDF087ASDF",
            "Status": "Active",
            "CreateDate": "2017-08-19T12:18:10Z"
        }
    ]
}
```

* Listar certificados

```bash
aws iam list-signing-certificates --user-name miriarte3
```

* Listamos las políticas asociadas al usuario

```bash
aws iam list-attached-user-policies --user-name miriarte3
```

* Listamos los grupos a los que pretenece el usuario

```bash
aws iam list-groups-for-user --user-name miriarte3
```

* Borrar usuario (7 pasos)

1. Borramos la/s access key/s (si tiene)

```bash
aws iam delete-access-key --access-key ASDF0897ASDF087ASDF --user-name miriarte3
```

2. Borramos el certificado (si tiene)

```bash
aws iam delete-signing-certificate --user-name miriarte3 --certificate-id ADSFASDF987AD8S9F79ASDF
```

3. Desactiamos el dispositivo MFA (si tiene)

```bash
aws iam deactivate-mfa-device --user-name miriarte3 --serial-number arn:aws:iam::210987654321:mfa/BobsMFADevice
```

4. Desatachamos las políticas asociadas al usuario (si tiene)

```bash
aws iam detach-user-policy --user-name miriarte3 --policy-arn arn:aws:iam::123456789012:policy/PoliticaTest
```

5. Removemos el usuario de los grupos a los cuales pertenece (si pertenece)

```bash
aws iam remove-user-from-group --user-name miriarte3 --group-name admin
```

6. Borramos el perfil

```bash
aws iam delete-login-profile --user-name miriarte22
```

7. Borramos el usuario

```bash
aws iam delete-user --user-name miriarte3
```

---

## Ejercicio 2. Manejo de grupos mediante la consola de AWS (MC).

En el sigiente ejercicio vamos a crear un grupo y agregaremos el usuario creado en el ejercicio anterior.


* Acceder a la [consola IAM](https://console.aws.amazon.com/iam/)

![IAM Groups](../images/IAM_access.png)

* Hacer clic sobre la opción _Groups > Create new Group_.

![IAM Groups](../images/IAM_groups2.PNG)


* Indique el nombre del grupo.

Puede contener, letras, numeros, y los siguientes caracteres: mas (+), igual (=), coma (,), punto (.), arroba (@), guion bajo (\_), y guion medio (-). El nombre no es _case sensitive_ y puede contener un máximo de 128 caracteres. 

![IAM Groups](../images/IAM_groups3.PNG)


* Indique la política predefinida de permisos (por el momento ninguna).

![IAM Groups](../images/IAM_groups4.PNG)


* Por último, _Create Group_.

![IAM Groups](../images/IAM_groups5.PNG)


---
## Manejo de grupos mediante la linea de comandos de AWS (CLI).

* Ejecutar los siguientes comando para crear 3 grupos.

```bash
aws iam create-group --group-name admin1

aws iam create-group --group-name dev1

aws iam create-group --group-name test1

```

```bash
{
    "Group": {
        "Path": "/",
        "GroupName": "admin1",
        "GroupId": "8789789KJHJKHJH",
        "Arn": "arn:aws:iam::7767686786767:group/admin1",
        "CreateDate": "2017-08-16T19:20:40.331Z"
    }
}
```

* Ejecutar el siguiente comando para listar los grupos

```bash
aws iam list-groups
```

* Ejecutar el siguiente comando para modificar el nombre de un grupo.

```bash
aws iam update-group --group-name admin2 --new-group-name admin3
```

* Agregar el usuario a los grupos admin y dev.

```bash
aws iam add-user-to-group --user-name miriarte1 --group-name admin1

aws iam add-user-to-group --user-name miriarte1 --group-name dev1
```

* Vemos a que grupos pertenece el usuario miriarte1 

```bash
aws iam list-groups-for-user --user-name miriarte1
```

* Remover un usuario de un grupo.

```bash
aws iam remove-user-from-group --user-name miriarte1 --group-name dev1
```

* Borrar un grupo.

```bash
aws iam delete-group --group-name test1
```

---
Refs:

- [AWS CLI IAM](http://docs.aws.amazon.com/cli/latest/reference/iam/)
- [AWS IAM User Guide](http://docs.aws.amazon.com/IAM/latest/UserGuide/iam-ug.pdf)

---
[< Volver al teorico](https://github.com/conapps/conapps-iot/blob/master/AWS%20Cloud/IAM/AWS_IAM_Parte_1.md)