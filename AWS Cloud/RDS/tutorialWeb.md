# Tutorial: Create a Web Server and an Amazon RDS Database

Este tutorial le ayuda a instalar un servidor web Apache con PHP y crear una base de datos MySQL. La web servidor se ejecuta en una instancia de Amazon EC2 utilizando Amazon Linux, y la base de datos MySQL es un Amazon RDS Instancia de MySQL DB. Tanto la instancia de Amazon EC2 como la instancia de Amazon RDS DB se ejecutan en una base VPC en Amazon Virtual Private Cloud servicio (Amazon VPC).

Nota   
Este tutorial funciona con Amazon Linux y puede que no funcione para otras versiones de Linux como Ubuntu.

Antes de comenzar este tutorial, debe tener un VPC con subredes públicas y privadas, y grupos de seguridad correspondientes. Si no los tiene, complete el siguiente tutorial:Crear un VPC de Amazon para Uso con una instancia de Amazon RDS DB (página 407).

En este tutorial, realiza los siguientes procedimientos:
* Step 1: Create an RDS DB Instance
* Step 2: Create an EC2 Instance and Install a Web Server

## Step 1: Create an RDS DB Instance
En este paso se crea una instancia de Amazon RDS MySQL DB que mantiene los datos utilizados por una web application.

Nota  
Antes de comenzar este paso, debe tener un VPC con subredes públicas y privadas y grupos de seguridad correspondientes. Si no las tiene, consulte Tutorial: Crear un VPC de Amazon para Uso con una instancia de Amazon RDS DB (página 407).

**To launch a MySQL DB instance**
1. Sign in to the AWS Management Console and open the Amazon RDS console at https://
console.aws.amazon.com/rds/.
2. In the top-right corner of the AWS Management Console, choose the region in which you want to
create the DB instance. This example uses the US West (Oregon) region.
3. Choose Instances.
4. Choose Launch DB Instance.
5. On the Select Engine page, shown following, choose the MySQL DB engine, and then choose Select.
6. On the Production page, below Dev/Test, choose MySQL This instance is intended for use outside
of production, and then choose Next Step.
7. On the Specify DB Details page, shown following, set these values:
* DB Engine Version: Use the default value.
* DB Instance Class: db.t2.micro
* Multi-AZ Deployment: No
* Storage Type: Magnetic
* Allocated Storage: 50 GB
* DB Instance Identifier: tutorial-db-instance
* Master Username: tutorial_user
* Master Password: Choose a password.
* Confirm Password: Retype the password.
8. Choose Next Step and set the following values in the Configure Advanced Settings page, shown
following:
* VPC: Choose an existing VPC, for example tutorial-vpc (vpc-f1b76594)
* Subnet group: Create a new DB Subnet Group
* Publicly Accessible: No
* Availability Zone: No Preference
* VPC Security Group(s): Choose an existing security group, for example tutorial-dbsecuritygroup
* Database Name: sample
9. To create your Amazon RDS MySQL DB instance, choose Launch DB Instance.
10. On the next page, choose View Your DB Instances to view your RDS MySQL DB instance.
11. Wait for the status of your new DB instance to show as available. Then choose the selection box to
the left of your DB instance to display the DB instance details, shown following.

Anote el endpoint de su instancia de base de datos. Este endpoint muestra el nombre del servidor y el puerto que que utiliza para conectar su servidor web a su instancia de RDS DB.
Para asegurarse de que su instancia de RDS MySQL DB sea lo más segura posible, verifique que las fuentes externas al VPC no puede conectarse a su instancia de RDS MySQL DB.

**Next Step**  
Step 2: Create an EC2 Instance and Install a Web Server (p. 69)

## Step 2: Create an EC2 Instance and Install a Web Server
In this step you create a web server to connect to the Amazon RDS DB instance that you created in Step
1: Create an RDS DB Instance (p. 65).
### Launch an EC2 Instance
First you create an Amazon EC2 instance in the public subnet of your VPC.
To launch an EC2 instance
1. Sign in to the AWS Management Console and open the Amazon EC2 console at https://
console.aws.amazon.com/ec2/.
2. Choose EC2 Dashboard, and then choose Launch Instance, as shown following.
3. Choose the Amazon Linux Amazon Machine Image (AMI), as shown following.
4. Choose the t2.micro instance type, as shown following, and then choose Next: Configure Instance
Details.
5. On the Configure Instance Details page, shown following, set these values and leave the other
values as their defaults:
* Network: Choose an existing VPC, for example: vpc-f1b76594 (10.0.0.0/16) | tutorial-vpc
* Subnet: Choose an existing public subnet, for example: subnet-fe2adba7(10.0.0.0/24)|
Tutorial-public | us-west-2a
* Auto-assign Public IP: Enable
6. Choose Next: Add Storage.
7. On the Add Storage page, leave the default values and choose Next: Tag Instance.
8. On the Tag Instance page, shown following, set Value for the Name tag to tutorial-web-server, and
then choose Next: Configure Security Group.
9. On the Configure Security Group page, shown following, choose Select an existing security group,
and then choose an existing security group, for example: tutorial-securitygroup. The security
group must include inbound rules for SSH and HTTP access.
10. Choose Review and Launch
11. On the Review Instance Launch page, shown following, verify your settings and then choose
Launch.
12. On the Select an existing key pair or create a new key pair page, shown following, choose Create
a new key pair and set Key pair name to tutorial-key-pair. Choose Download Key Pair, and
then save the key pair file on your local machine. You use this key pair file to connect to your EC2
instance.
13. To launch your EC2 instance, choose Launch Instances. On the Launch Status page, shown
following, note the identifier for your new EC2 instance, for example: i-7abfcfb8.
14. To find your instance, choose View Instances.
15. Wait until Instance Status for your instance reads as running before continuing.
