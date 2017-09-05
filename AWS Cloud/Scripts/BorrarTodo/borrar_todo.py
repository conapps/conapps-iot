import boto3
import re

"""
Script that deletes all instances, volumes and snapshots whithout the tag {'Borrar': 'No'}
"""

# Counter to keep track of erased instances
deleted_instances = 0

# Counter to keep track of erased volumes
deleted_volumes = 0

# Counter to keep track of erased snapshots
deleted_snapshots = 0

# Function that receives an instance resource and deletes it if it is not already terminated
def delete_instance(instance):
    if instance.state['Name'] != 'terminated':
        print('\tEliminando la instancia con id: ' + instance.id)
        instance.terminate()
        return 1
    else:
        return 0

# Function that receives a volume resource and deletes it if it is not attached to an instance
def delete_volume(volume):
    if len(volume.attachments) != 0:
        print('\tEl volumen con id:', volume.id,
              'aun se encuentra attachado y no se eliminara. Intente nuevamente mas tarde')
        return 0
    else:
        try:
            volume.delete()
            print('\tEliminando volumen con id:', volume.id)
            return 1
        except Exception as error:
            print('\tError al borrar el volumen:', volume.id)
            print(error)
            return 0

# Function that receives a snapshot and deletes it
def delete_snapshot(snapshot):
    print('\tEliminando el snapshot con id:', snapshot.id)
    try:
        snapshot.delete()
        return 1
    except Exception as error:
        print('\tError al borrar el snapshot con id:', snapshot.id)
        print(error)
        return 0


# Creating a list with the name of the regions
print('Construyendo lista de regiones...')
client = boto3.client('ec2')
json_regions = client.describe_regions()
regions_names = []
for region in json_regions['Regions']:
    regions_names.append(region['RegionName'])
print('\tListo!')

# Creating a list of ec2 resources, one per region
print('Construyendo lista de recursos de instancia, uno por cada region...')
ec2_resources = []
for name in regions_names:
    ec2_resources.append(boto3.resource('ec2', region_name=name))
print('\tListo!')

# Creating a list of users, just for informational purposes
# Here I also parse the account_id, this will be used later to filter Snapshot resources.
iam_rosource = boto3.resource('iam')
users = iam_rosource.users.all()
print('Estos son los usuarios activos:')
for user in users:
    arn = user.arn
    # This field that I call pseudo_id, (because I dont know the real name), is what it needs to be passed as parameter
    # to the Snapshot resource in order to filter it.
    account_id = re.search('.*::(.*):.*', arn).group(1)
    to_print = '{:<25}{:<50}'.format('\tUsername:' + user.user_name, ' UserId: ' + user.user_id)
    #print('\tUsername:', user.user_name, ', UserId:', user.user_id)
    print(to_print)
print('')


# Here starts the process of terminating all instances
print('Comenzando proceso de eliminacion de instancias...')
for resource in ec2_resources:
    instances = resource.instances.all()
    for instance in instances:
        if instance.tags is not None:
            borrar = True
            for tag in instance.tags:
                if tag['Key'].upper() == 'BORRAR' and tag['Value'].upper() == 'NO':
                    borrar = False
            if borrar:
                deleted_instances += delete_instance(instance)
            else:
                print('\tLa instancia con id:', instance.id, 'no se eliminara.')
        else:
            deleted_instances += delete_instance(instance)
print('\tListo!\n')

# Here starts the process of deleting all volumes
print('Comenzando el proceso de eliminacion de volumenes...')
for resource in ec2_resources:
    volumes = resource.volumes.all()
    for volume in volumes:
        if volume.tags is not None:
            borrar = True
            for tag in volume.tags:
                if tag['Key'].upper() == 'BORRAR' and tag['Value'].upper() == 'NO':
                    borrar = False
            if borrar:
                deleted_volumes += delete_volume(volume)
            else:
                print('\tEl volumen con id:', volume.id, 'no se eliminara.')
        else:
            deleted_volumes += delete_volume(volume)
print('\tListo!\n')

# Here starts the process of deleting all spanshots
print('Comenzando el proceso de eliminacion de snapshots...')
for resource in ec2_resources:
    snapshots = resource.snapshots.filter(OwnerIds=[account_id])
    for snapshot in snapshots:

        if snapshot.tags is not None:
            borrar = True
            for tag in snapshot.tags:
                if tag['Key'].upper() == 'BORRAR' and tag['Value'].upper() == 'NO':
                    print('El snapshot con id:', snapshot.id, 'no se eliminara.')
                    borrar = False

            if borrar:
                deleted_snapshots += delete_snapshot(snapshot)
        else:
            deleted_snapshots += delete_snapshot(snapshots)
print('\tListo!\n')


print('Resumen:')
print('-------------------------------------')
print('{:<21}{:<4}'.format('Instancias borradas:', deleted_instances))
print('{:<21}{:<4}'.format('Volumenes borrados:', deleted_volumes))
print('{:<21}{:<4}'.format('Snapshot borrados:', deleted_snapshots))
print('-------------------------------------')

