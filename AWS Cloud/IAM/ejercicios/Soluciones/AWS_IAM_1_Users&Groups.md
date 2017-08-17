Ejercicio #1: Creación de usuarios y grupos
===

---
## 1. Creación de usuario & grupo mediante la consola de administración (MC).
---

This procedure describes how to use the AWS Management Console to create an IAM user for yourself and add that user to a group that has administrative permissions from an attached managed policy. To create an administrator user for yourself and add the user to an administrators group (console)

* Use your AWS account user and password to sign in as the to the IAM console at [IAM](https://console.aws.amazon.com/iam/).

* In the navigation pane, choose Users and then choose Add user.

* For User name, type a user name, such as Administrator. The name can consist of letters, digits,
and the following characters: plus (+), equal (=), comma (,), period (.), at (@), underscore (_), and
hyphen (-). The name is not case sensitive and can be a maximum of 64 characters in length.

* Select the check box next to AWS Management Console access, select Custom password, and then
type your new password in the text box. If you're creating the user for someone other than yourself,
you can optionally select Require password reset to force the user to create a new password when
first signing in.

* Choose Next: Permissions.

* On the Set permissions for user page, choose Add user to group.

* Choose Create group.

* In the Create group dialog box, type the name for the new group. The name can consist of letters,
digits, and the following characters: plus (+), equal (=), comma (,), period (.), at (@), underscore (_),
and hyphen (-). The name is not case sensitive and can be a maximum of 128 characters in length.

* In the policy list, select the check box next to AdministratorAccess. Then choose Create group.

* Back in the list of groups, select the check box for your new group. Choose Refresh if necessary to
see the group in the list.

* Choose Next: Review to see the list of group memberships to be added to the new user. When you
are ready to proceed, choose Create user.

---
## 2. Altas, bajas y modificación de usuarios & grupos mediante la linea de comandos (CLI)
---

### 1. ABM de usuario mediante linea de comandos (AWS CLI)

* Crear usuario

```bash
aws iam create-user --user-name jorge
```


```bash
{
    "User": {
        "Path": "/",
        "UserName": "jorge",
        "UserId": "ADFASDFADF89078907ADSF",
        "Arn": "arn:aws:iam::23432234234234:user/jorge",
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
aws iam update-user --user-name jorge --new-user-name roberto
```



---

### 2. ABM de grupo mediante linea de comandos (AWS CLI)

* Ejecutar el siguiente comando para crear el grupo **admin**

```bash
aws iam create-group --group-name admin
```

```bash
{
    "Group": {
        "Path": "/",
        "GroupName": "admin",
        "GroupId": "AJKH454J5656JKH67",
        "Arn": "arn:aws:iam::3563563566757:group/admin",
        "CreateDate": "2017-08-16T19:20:40.331Z"
    }
}
```

* Ejecutar el siguiente comando para listar los grupos 

```bash
aws iam list-groups
```

```bash
{
    "Groups": [
        {
            "Path": "/",
            "GroupName": "admin",
            "GroupId": "AJKH454J5656JKH67",
            "Arn": "arn:aws:iam::3563563566757:group/admin",
            "CreateDate": "2017-08-16T19:20:40Z"
        }
    ]
}
```

* Ejecutar el siguiente comando para modificar el nombre de un grupo.

```bash
aws iam update-group --group-name admin --new-group-name admin-1
```


---
### 3. Agregar un usuario a un grupo mediante linea de comandos (AWS CLI)

```bash
aws iam add-user-to-group --user-name roberto --group-name admin-1
```
---
### 4. Borrar usuarios y grupos mediante linea de comandos (AWS CLI)


* Ejecutar el siguiente comando para borrar un grupo.

```bash
aws iam delete-group --group-name admin-1
```

* Borrar usuario

```bash
aws iam delete-user --user-name roberto
```

---
Refs:
[AWS CLI IAM](http://docs.aws.amazon.com/cli/latest/reference/iam/)