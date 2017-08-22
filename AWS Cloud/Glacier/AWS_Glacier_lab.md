Amazon Glacier
===


### Crear un Vault

```bash
$ aws glacier create-vault --account-id - --vault-name iot-cloud-mis-respaldos
{
    "location": "/805750336955/vaults/iot-cloud-mis-respaldos"
}
```

Obtenemos la descripción del vault creado:
```bash
$ aws glacier describe-vault --account-id - --vault-name iot-cloud-mis-respaldos
{
    "VaultARN": "arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-mis-respaldos",
    "VaultName": "iot-cloud-mis-respaldos",
    "CreationDate": "2017-08-22T17:15:01.608Z",
    "NumberOfArchives": 0,
    "SizeInBytes": 0
}
```

O podemos listar todos nuestros vaults:
```bash
$ aws glacier list-vaults --account-id -
{
    "VaultList": [
        {
            "VaultARN": "arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-mis-respaldos",
            "VaultName": "iot-cloud-mis-respaldos",
            "CreationDate": "2017-08-22T17:15:01.608Z",
            "NumberOfArchives": 0,
            "SizeInBytes": 0
        },
        {
            "VaultARN": "arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-vault-01",
            "VaultName": "iot-cloud-vault-01",
            "CreationDate": "2017-08-17T17:53:40.893Z",
            "LastInventoryDate": "2017-08-22T14:27:25.122Z",
            "NumberOfArchives": 3,
            "SizeInBytes": 9541428
        },
        {
            "VaultARN": "arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-vault-02",
            "VaultName": "iot-cloud-vault-02",
            "CreationDate": "2017-08-17T18:47:42.244Z",
            "LastInventoryDate": "2017-08-22T14:27:21.078Z",
            "NumberOfArchives": 2,
            "SizeInBytes": 12651336
        }
    ]
}
```

### Subiendo archivos
Archivos a subir:
$ ls -laR ./work
./work:
total 4
drwxr-xr-x 1 VM 197121 0 ago 22 14:21 ./
drwxr-xr-x 1 VM 197121 0 ago 22 14:21 ../
drwxr-xr-x 1 VM 197121 0 ago 22 14:21 respaldos/

./work/respaldos:
total 5668
drwxr-xr-x 1 VM 197121       0 ago 22 14:21 ./
drwxr-xr-x 1 VM 197121       0 ago 22 14:21 ../
-rw-r--r-- 1 VM 197121 5798098 ago 22 14:03 respaldo01.tar.gz
-rw-r--r-- 1 VM 197121    2803 ago 22 14:04 respaldo02.tar.gz


Subo el primer archivo:
$ aws glacier upload-archive --vault-name iot-cloud-mis-respaldos --account-id - --archive-description "20170822-respaldo01" --body ./work/respaldos/respaldo01.tar.gz
{
    "location": "/805750336955/vaults/iot-cloud-mis-respaldos/archives/grHW86f7glvFFhFgMCDNDYehZcfTg_h9yMRkrSeroT1iaUzIki8S0hIu1TG2W3Tr0yl1EIGWqoz1gnk5LFLEF-y-RmwQlwN19Zd-dPSivzB3ohRgozkPfBGL6s9Ji1r0tRI4dzfafA",
    "checksum": "ca6d26f5487ba41e5e10a06502e1ea96efcea8f35624cc9c6ec3920653cc3c0e",
    "archiveId": "grHW86f7glvFFhFgMCDNDYehZcfTg_h9yMRkrSeroT1iaUzIki8S0hIu1TG2W3Tr0yl1EIGWqoz1gnk5LFLEF-y-RmwQlwN19Zd-dPSivzB3ohRgozkPfBGL6s9Ji1r0tRI4dzfafA"
}

Subo el segundo archivo:
$ aws glacier upload-archive --vault-name iot-cloud-mis-respaldos --account-id - --archive-description "20170822-respaldo02" --body ./work/respaldos/respaldo02.tar.gz
{
    "location": "/805750336955/vaults/iot-cloud-mis-respaldos/archives/gP0DzSjjWYTOEWffBN16bbRW8aVnIjjZQURb2g5cisi57KjOgkBHyVKdVW-jYJRhK0ADPiJIznaL-vFJRnu319J_ZTvqfv4FyeGWTR1zUnXc0b6QtWhK3fDSoJZwFn2DjmV5B7cUXw",
    "checksum": "b90737ab33703c878fa3ff5b15ca7f5ca93a62fe4a10e4ca4d07408777696b9e",
    "archiveId": "gP0DzSjjWYTOEWffBN16bbRW8aVnIjjZQURb2g5cisi57KjOgkBHyVKdVW-jYJRhK0ADPiJIznaL-vFJRnu319J_ZTvqfv4FyeGWTR1zUnXc0b6QtWhK3fDSoJZwFn2DjmV5B7cUXw"
}


### Listar contenido del Vault
$ aws glacier initiate-job --account-id - --vault iot-cloud-mis-respaldos --job-parameters '{ "Type": "inventory-retrieval" }'

An error occurred (ResourceNotFoundException) when calling the InitiateJob operation: Inventory retrieval jobs for vault arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-mis-respaldos cannot be initiated yet, as Amazon Glacier has not yet generated an initial inventory for this vault.








### con iot-cloud-vault-02

$ aws glacier initiate-job --account-id - --vault iot-cloud-vault-02 --job-parameters '{ "Type": "inventory-retrieval" }'
{
    "location": "/805750336955/vaults/iot-cloud-vault-02/jobs/vk-GKPNNmjrinm5A6gDh3UF3hdN6f80R2yJ-PJvzw7ne6BDrZLJhDvsdOK_pxTO5uyqufgwp4Jtxi2iMe90Fn7-qq113",
    "jobId": "vk-GKPNNmjrinm5A6gDh3UF3hdN6f80R2yJ-PJvzw7ne6BDrZLJhDvsdOK_pxTO5uyqufgwp4Jtxi2iMe90Fn7-qq113"
}

$ aws glacier list-jobs --account-id - --vault-name iot-cloud-vault-02
{
    "JobList": [
        {
            "JobId": "vk-GKPNNmjrinm5A6gDh3UF3hdN6f80R2yJ-PJvzw7ne6BDrZLJhDvsdOK_pxTO5uyqufgwp4Jtxi2iMe90Fn7-qq113",
            "Action": "InventoryRetrieval",
            "VaultARN": "arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-vault-02",
            "CreationDate": "2017-08-22T17:29:04.670Z",
            "Completed": false,
            "StatusCode": "InProgress",
            "InventoryRetrievalParameters": {
                "Format": "JSON"
            }
        }
    ]
}



### con iot-cloud-vault-01

$ aws glacier initiate-job --account-id - --vault iot-cloud-vault-01 --job-parameters '{ "Type": "inventory-retrieval" }'                                       {
    "location": "/805750336955/vaults/iot-cloud-vault-01/jobs/u7Hws7bdNTmgaNfFPTDsX2aLLykKvfLidUYePPT1f8e7rAbHWtSMzaxMJVGnDCe1yHTwL__79wR8UUinVCmlcX62B6pr",
    "jobId": "u7Hws7bdNTmgaNfFPTDsX2aLLykKvfLidUYePPT1f8e7rAbHWtSMzaxMJVGnDCe1yHTwL__79wR8UUinVCmlcX62B6pr"
}


$ aws glacier list-jobs --account-id - --vault-name iot-cloud-vault-01                                                                                          {
    "JobList": [
        {
            "JobId": "u7Hws7bdNTmgaNfFPTDsX2aLLykKvfLidUYePPT1f8e7rAbHWtSMzaxMJVGnDCe1yHTwL__79wR8UUinVCmlcX62B6pr",
            "Action": "InventoryRetrieval",
            "VaultARN": "arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-vault-01",
            "CreationDate": "2017-08-22T17:34:23.482Z",
            "Completed": false,
            "StatusCode": "InProgress",
            "InventoryRetrievalParameters": {
                "Format": "JSON"
            }
        }
    ]
}
