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

```bash
$ aws glacier upload-archive --account-id - --vault-name iot-cloud-vault-02 --body lab-glacier.zip
{
    "location": "/805750336955/vaults/iot-cloud-vault-02/archives/SZIARej9QQzpLDM7mJStkAoA3RnY-WpNJ8Fz46ay1bYYTG5VSzCnsyHVEY4jn7lne9-943LSwt1xE1N8fRt0iCgsreAytNWYwpYih7_HW3DEcDSN0HRIKjwozCPLjxHmVnWy72W1YQ",
    "checksum": "657a715f87baa9d89b651d185d8bc73147e686ee91252edcd57bae3c310b7490",
    "archiveId":"SZIARej9QQzpLDM7mJStkAoA3RnY-WpNJ8Fz46ay1bYYTG5VSzCnsyHVEY4jn7lne9-943LSwt1xE1N8fRt0iCgsreAytNWYwpYih7_HW3DEcDSN0HRIKjwozCPLjxHmVnWy72W1YQ"
}

$ aws glacier upload-archive --account-id - --vault-name iot-cloud-vault-02 --body lab-glacier2.zip
{
    "location": "/805750336955/vaults/iot-cloud-vault-02/archives/Soqd_sa_vc88Q0uMkTDqGgq0hywCo-djEaD4Z3c5se09vg1TAucV_tIHVTx1WNdcI32smfV4evMeH4QK24QHX2ybR32MxUvu2fMhNku-xVzHu4GZcsAT0_iEdRLKFgvCE6hOYe27rQ",
    "checksum": "657a715f87baa9d89b651d185d8bc73147e686ee91252edcd57bae3c310b7490",
    "archiveId":"Soqd_sa_vc88Q0uMkTDqGgq0hywCo-djEaD4Z3c5se09vg1TAucV_tIHVTx1WNdcI32smfV4evMeH4QK24QHX2ybR32MxUvu2fMhNku-xVzHu4GZcsAT0_iEdRLKFgvCE6hOYe27rQ"
}

$ aws glacier describe-vault --account-id - --vault-name iot-cloud-vault-02
{
    "VaultARN": "arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-vault-02",
    "VaultName": "iot-cloud-vault-02",
    "CreationDate": "2017-08-17T18:47:42.244Z",
    "LastInventoryDate": "2017-08-22T21:36:38.267Z",
    "NumberOfArchives": 2,
    "SizeInBytes": 12585800
}

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

$ aws glacier list-jobs --account-id - --vault-name iot-cloud-vault-02
{
    "JobList": [
        {
            "JobId": "vk-GKPNNmjrinm5A6gDh3UF3hdN6f80R2yJ-PJvzw7ne6BDrZLJhDvsdOK_pxTO5uyqufgwp4Jtxi2iMe90Fn7-qq113",
            "Action": "InventoryRetrieval",
            "VaultARN": "arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-vault-02",
            "CreationDate": "2017-08-22T17:29:04.670Z",
            "Completed": true,
            "StatusCode": "Succeeded",
            "StatusMessage": "Succeeded",
            "InventorySizeInBytes": 766,
            "CompletionDate": "2017-08-22T21:20:21.826Z",
            "InventoryRetrievalParameters": {
                "Format": "JSON"
            }
        }
    ]
}


$ aws glacier get-job-output --account-id - --vault-name iot-cloud-vault-02 --job-id vk-GKPNNmjrinm5A6gDh3UF3hdN6f80R2yJ-PJvzw7ne6BDrZLJhDvsdOK_pxTO5uyqufgwp4Jtxi2iMe90Fn7-qq113 lista-iot-cloud-vault-02.out
{
    "status": 200,
    "acceptRanges": "bytes",
    "contentType": "application/json"
}

$ cat lista-iot-cloud-vault-02.out
{
  "VaultARN":"arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-vault-02",
  "InventoryDate":"2017-08-22T07:32:12Z",
  "ArchiveList":[
    {
      "ArchiveId":"SZIARej9QQzpLDM7mJStkAoA3RnY-WpNJ8Fz46ay1bYYTG5VSzCnsyHVEY4jn7lne9-943LSwt1xE1N8fRt0iCgsreAytNWYwpYih7_HW3DEcDSN0HRIKjwozCPLjxHmVnWy72W1YQ",
      "ArchiveDescription":"",
      "CreationDate":"2017-08-21T18:38:59Z",
      "Size":6292900,
      "SHA256TreeHash":"657a715f87baa9d89b651d185d8bc73147e686ee91252edcd57bae3c310b7490"
    },
    {
      "ArchiveId":"Soqd_sa_vc88Q0uMkTDqGgq0hywCo-djEaD4Z3c5se09vg1TAucV_tIHVTx1WNdcI32smfV4evMeH4QK24QHX2ybR32MxUvu2fMhNku-xVzHu4GZcsAT0_iEdRLKFgvCE6hOYe27rQ",
      "ArchiveDescription":"",
      "CreationDate":"2017-08-21T18:42:22Z",
      "Size":6292900,
      "SHA256TreeHash":"657a715f87baa9d89b651d185d8bc73147e686ee91252edcd57bae3c310b7490"
      }
    ]
  }

Iniciar JOB para recuperar objeto:
$ cat objeto-a-recuperar.json
{
   "Type": "archive-retrieval",
   "ArchiveId":"SZIARej9QQzpLDM7mJStkAoA3RnY-WpNJ8Fz46ay1bYYTG5VSzCnsyHVEY4jn7lne9-943LSwt1xE1N8fRt0iCgsreAytNWYwpYih7_HW3DEcDSN0HRIKjwozCPLjxHmVnWy72W1YQ",
   "Description": "2017-08-22 Recuperacion lab-glacier.zip"
}


$ aws glacier initiate-job --account-id - --vault-name iot-cloud-vault-02 --job-parameters file://objeto-a-recuperar.json
{
    "location": "/805750336955/vaults/iot-cloud-vault-02/jobs/s91WSVf0ef_6HB7Dq4FoPqxoLgDWPwYlbvBKJzN5-_EewG3L41y0-yCaIvsRvF0KSo7I5Od6EyC5oUwkOkppQ-anfr6p",
    "jobId": "s91WSVf0ef_6HB7Dq4FoPqxoLgDWPwYlbvBKJzN5-_EewG3L41y0-yCaIvsRvF0KSo7I5Od6EyC5oUwkOkppQ-anfr6p"
}

$ aws glacier list-jobs --account-id - --vault-name iot-cloud-vault-02
{
    "JobList": [
        {
            "JobId": "s91WSVf0ef_6HB7Dq4FoPqxoLgDWPwYlbvBKJzN5-_EewG3L41y0-yCaIvsRvF0KSo7I5Od6EyC5oUwkOkppQ-anfr6p",
            "JobDescription": "2017-08-22 Recuperacion lab-glacier.zip",
            "Action": "ArchiveRetrieval",
            "ArchiveId": "SZIARej9QQzpLDM7mJStkAoA3RnY-WpNJ8Fz46ay1bYYTG5VSzCnsyHVEY4jn7lne9-943LSwt1xE1N8fRt0iCgsreAytNWYwpYih7_HW3DEcDSN0HRIKjwozCPLjxHmVnWy72W1YQ",
            "VaultARN": "arn:aws:glacier:us-west-2:805750336955:vaults/iot-cloud-vault-02",
            "CreationDate": "2017-08-22T23:38:40.747Z",
            "Completed": false,
            "StatusCode": "InProgress",
            "ArchiveSizeInBytes": 6292900,
            "SHA256TreeHash": "657a715f87baa9d89b651d185d8bc73147e686ee91252edcd57bae3c310b7490",
            "ArchiveSHA256TreeHash": "657a715f87baa9d89b651d185d8bc73147e686ee91252edcd57bae3c310b7490",
            "RetrievalByteRange": "0-6292899",
            "Tier": "Standard"
        }
    ]
}


$ aws glacier get-job-output --account-id - --vault-name iot-cloud-vault-02 --job-id "s91WSVf0ef_6HB7Dq4FoPqxoLgDWPwYlbvBKJzN5-_EewG3L41y0-yCaIvsRvF0KSo7I5Od6EyC5oUwkOkppQ-anfr6p" lab-glacier-recuperado.zip


```
