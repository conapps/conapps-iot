## Ejercicio 3. Manejo de grupos mediante la consola de AWS (MC).

En el sigiente ejercicio vamos a crear un grupo y agregaremos el usuario creado en el ejercicio anterior.


* Acceder a la [consola IAM](https://console.aws.amazon.com/iam/)

![IAM Groups](../images/IAM_access.png)

* Hacer clic sobre la opción _Groups > Create new Group_.

![IAM Groups](../images/IAM_groups2.png)


* Indique el nombre del grupo.

Puede contener, letras, numeros, y los siguientes caracteres: mas (+), igual (=), coma (,), punto (.), arroba (@), guion bajo (\_), y guion medio (-). El nombre no es _case sensitive_ y puede contener un máximo de 128 caracteres. 

![IAM Groups](../images/IAM_groups3.png)


* Indique la política predefinida de permisos _AdministratorAccess_.

![IAM Groups](../images/IAM_groups4.png)


* Por último, _Create Group_.

![IAM Groups](../images/IAM_groups5.png)


---
## Ejercicio 4. Manejo de grupos mediante la linea de comandos de AWS (CLI).



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

* Agregar un usuario al nuevo grupo.

```bash
aws iam add-user-to-group --user-name miriarte1 --group-name admin1
```

* Borrar un grupo.

```bash
aws iam delete-group --group-name borrar1
```

---
Refs:

- [AWS CLI IAM](http://docs.aws.amazon.com/cli/latest/reference/iam/)
- [AWS IAM User Guide](http://docs.aws.amazon.com/IAM/latest/UserGuide/iam-ug.pdf)

---
[< Volver al teorico](https://github.com/conapps/conapps-iot/blob/master/AWS%20Cloud/IAM/AWS_IAM_Parte_1.md)