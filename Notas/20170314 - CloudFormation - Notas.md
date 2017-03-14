20170314 - CloudFormation - Notas
===

Sources
---

- Introduction to AWS CloudFormation. aCloud.guru course.

Create a S3 Bucket
---

```json
{
  "Type": "AWS:S3:Bucket",
  "Properties": {
    "AccessControl": <String>,
    "BucketName": <String>,
    "CorsConfiguration": <CORS Configuration>,
    "LifecycleConfiguration": <Lifecycle Configuration>,
    "LogginConfiguration": <Logging Configuration>,
    "NotificationConfiguration": <Notification Configuration>,
    "ReplicationConfiguration": <Replication Configuration>,
    "Tags": [Resource Tag, ...],
    "VersioningConfiguration": <Versioning Configuration>,
    "WebsiteConfiguration": <Website Configuration>
  }
}
```

- Some properties are required, others not.
- Remember to `tag` anything.
- Basic S3 CloudFormation template:

```json
{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Parameters": {
    "BucketName": {
      "Description": "Name of MyS3Bucket",
      "Type": "String",
      "Default": "mys3bucketacloudgurutraining"
    }
  },
  "Resources": {
    "S3Bucket": {
      "Type": "AWS:S3:Bucket",
      "Properties": {
        "BucketName": { "Ref": "BucketName" }
      }
    }
  },
  "Outputs": {
    {
      "S3BucketName": {
        "Value": { "Ref": "S3Bucket" },
        "Description": "Name of S3 Bucket"
      }
    }
  }
}
```

OBS: If we do not choose a S3 bucket name, aws will generate one for us.

OBS: You can't rename an S3 bucket with CloudFormation. It will remove and create a new one.

OBS: The parameters can be set on the CloudFormation console or from the AWS CLI.

Infraestructure as a Service
---

```json
{
  "Parameters": {
    "CIDRRange": {
      "Description": "VPCCIDR Range (will be a /16 block)",
      "Type": "String",
      "Default": "10.251.0.0",
      "AllowedValues": ["10.250.0.0", "10.251.0.0"]
    }
  },
  "Mappings": {
    "VPCRanges": {
      "10.250.0.0": {
        "PublicSubnetAZ1": "10.250.0.0/22",
        "PublicSubnetAZ2": "10.250.4.0/22",
        "PrivateSubnetAZ1": "10.250.32.0/21",
        "PrivateSubnetAZ2": "10.250.40.0/21"
      },
      "10.252.0.0": {
        "PublicSubnetAZ1": "10.251.0.0/22",
        "PublicSubnetAZ2": "10.251.4.0/22",
        "PrivateSubnetAZ1": "10.251.32.0/21",
        "PrivateSubnetAZ2": "10.252.44.0/21"
      }
    }
  },
  "Resources": {
    "VPCBase": {
      "Type": "AWS::EC3::VPC",
      "Properties": {
        "CidrBlock" { "Fn::Join": ["", [{ "Ref": "CIDRRange" }, "/16"]] },
        "EnableDnsSupport": "True",
        "EnableDnsHostnames": "True",
        "Tags": [
          { "Key": "Name", "Value": { "Fn::Join": ["", [{ "Ref": "AWS::StackName" }, "-VPC"]] } }
        ]
      }
    },
    "PublicNetAZ1": {
      "Type": "AWS:EC2::Subnet",
      "Properties": {
        "AvailavilityZone": { "Fn::Select": ["0", { "Fn::GetAZs": { "Ref": "AWS::Region" } }] },
        "CidrBlock": { "Fn::FindInMap": ["VPCRanges", { "Ref": "CIDRRange" }, "PublicSubnetAZ1"] }
        "MapPublicIpOnLunch": "True",
        "Tags": [
          { "Key": "Name", "Value": { "Fn::Join": ["", [{ "Ref": "AWS::StackName" }, "-PublicAZ1"]] } }
        ],
        "VpcId": { "Ref": "VPCBase" }
      }
    }
    "PublicNetAZ2": {
      "Type": "AWS:EC2::Subnet",
      "Properties": {
        "AvailavilityZone": { "Fn::Select": ["1", { "Fn::GetAZs": { "Ref": "AWS::Region" } }] },
        "CidrBlock": { "Fn::FindInMap": ["VPCRanges", { "Ref": "CIDRRange" }, "PublicSubnetAZ2"] }
        "MapPublicIpOnLunch": "True",
        "Tags": [
          { "Key": "Name", "Value": { "Fn::Join": ["", [{ "Ref": "AWS::StackName" }, "-PublicAZ2"]] } }
        ],
        "VpcId": { "Ref": "VPCBase" }
      }
    }
    "PrivateNetAZ1": {
      "Type": "AWS:EC2::Subnet",
      "Properties": {
        "AvailavilityZone": { "Fn::Select": ["0", { "Fn::GetAZs": { "Ref": "AWS::Region" } }] },
        "CidrBlock": { "Fn::FindInMap": ["VPCRanges", { "Ref": "CIDRRange" }, "PrivateSubnetAZ1"] }
        "MapPublicIpOnLunch": "False",
        "Tags": [
          { "Key": "Name", "Value": { "Fn::Join": ["", [{ "Ref": "AWS::StackName" }, "-PrivateAZ1"]] } },
          { "Key": "Network", "Value": "private" }
        ],
        "VpcId": { "Ref": "VPCBase" }
      }
    }
    "PrivateNetAZ2": {
      "Type": "AWS:EC2::Subnet",
      "Properties": {
        "AvailavilityZone": { "Fn::Select": ["1", { "Fn::GetAZs": { "Ref": "AWS::Region" } }] },
        "CidrBlock": { "Fn::FindInMap": ["VPCRanges", { "Ref": "CIDRRange" }, "PrivateSubnetAZ2"] }
        "MapPublicIpOnLunch": "False",
        "Tags": [
          { "Key": "Name", "Value": { "Fn::Join": ["", [{ "Ref": "AWS::StackName" }, "-PrivateAZ2"]] } }
          { "Key": "Network", "Value": "private" }
        ],
        "VpcId": { "Ref": "VPCBase" }
      }
    },
    "IGWBase": {
      "Type": "AWS::EC2::InternetGateway",
      "Properties": {
        "Tags": [
          { "Key": "Name", "Value": { "Fn::Join": ["", [{ "Ref": "AWS::StackName" }, "-IGW"]] } }
        ]
      }
    },
    "VGAIGWBase": {
      "Type": "AWS::EC2::VPCGatewayAttachment",
      "Properties": {
        "InternetGatewayId": { "Ref": "IGWBase" },
        "VpcID": { "Ref": "VPCBase" }
      }
    },
    "RoutePublicDefault": {
      "DependsOn": ["VGAIGWBase"],
      "Type": "AWS::EC2::Route",
      "Properties": {
        "RouteTableId": { "Ref": "RouteTablePublic" },
        "DestinationCidrBlock": "0.0.0.0/0",
        "GatewayId": { "Ref": "IGWBase" }
      }
    },
    "RouteTablePublic": {
      "Type": "AWS::EC2::RouteTable",
      "Properties": {
        "VpcId": { "Ref": "VPCBase" },
        "Tags": [
          { "Key": "Name", "Value": { "Fn::Join": ["", [{ "Ref": "AWS::StackName" }, "-PublicRT"]] } }
        ]
      }
    },
    "RouteTablePrivateAZ1": {
      "Type": "AWS::EC2::RouteTable",
      "Properties": {
        "VpcId": { "Ref": "VPCBase" },
        "Tags": [
          { "Key": "Name", "Value": { "Fn::Join": ["", [{ "Ref": "AWS::StackName" }, "-PrivateAZ1RT"]] } }
        ]
      }
    },
    "RouteTablePrivateAZ2": {
      "Type": "AWS::EC2::RouteTable",
      "Properties": {
        "VpcId": { "Ref": "VPCBase" },
        "Tags": [
          { "Key": "Name", "Value": { "Fn::Join": ["", [{ "Ref": "AWS::StackName" }, "-PrivateAZ2RT"]] } }
        ]
      }
    },
    "RouteAssociationPublicAZ1Default": {
      "Type": "AWS::EC2::SubnetRouteTableAssociation",
      "Properties": {
        "SubnetId": { "Ref": "PublicNetAZ1" },
        "RouteTableId": { "Ref": "RouteTablePublic" }
      }
    },
    "RouteAssociationPublicAZ2Default": {
      "Type": "AWS::EC2::SubnetRouteTableAssociation",
      "Properties": {
        "SubnetId": { "Ref": "PublicNetAZ2" },
        "RouteTableId": { "Ref": "RouteTablePublic" }
      }
    },
    "RouteAssociationPrivateAZ1Default": {
      "Type": "AWS::EC2::SubnetRouteTableAssociation",
      "Properties": {
        "SubnetId": { "Ref": "PrivateNetAZ1" },
        "RouteTableId": { "Ref": "RouteTablePrivateAZ1" }
      }
    },
    "RouteAssociationPrivateAZ2Default": {
      "Type": "AWS::EC2::SubnetRouteTableAssociation",
      "Properties": {
        "SubnetId": { "Ref": "PrivateNetAZ2" },
        "RouteTableId": { "Ref": "RouteTablePrivateAZ2" }
      }
    },
    "NATAZ1": {
      "Type": "AWS::EC2::NatGateway",
      "DependsOn": "VGAIGWBase",
      "Properties": {
        "AllocationId": { "Fn::GetAtt": ["EIPNATAZ1", "AllocationId"] },
        "SubnetId": { "Ref": "PublicNetAZ1" }
      }
    },
    "EIPNATAZ1": {
      "Type": "AWS::EC2::EIP",
      "Properties": {
        "Domain": "vpc"
      }
    },
    "NATAZ1Route": {
      "Type": "AWS::EC2::Route",
      "Properties": {
        "RouteTableId": { "Ref": "RouteTablePrivateAZ1" },
        "DestinationCidrBlock": "0.0.0.0/0",
        "NatGatewayId": { "Ref": "NATAZ1" }
      }
    }
    "NATAZ2": {
      "Type": "AWS::EC2::NatGateway",
      "DependsOn": "VGAIGWBase",
      "Properties": {
        "AllocationId": { "Fn::GetAtt": ["EIPNATAZ2", "AllocationId"] },
        "SubnetId": { "Ref": "PublicNetAZ2" }
      }
    },
    "EIPNATAZ2": {
      "Type": "AWS::EC2::EIP",
      "Properties": {
        "Domain": "vpc"
      }
    },
    "NATAZ2Route": {
      "Type": "AWS::EC2::Route",
      "Properties": {
        "RouteTableId": { "Ref": "RouteTablePrivateAZ2" },
        "DestinationCidrBlock": "0.0.0.0/0",
        "NatGatewayId": { "Ref": "NATAZ2" }
      }
    }
  },
  "Outputs": {
    "VPCID": { "Value": { "Ref": "VPCBase" } },
    "ElasticIP1": { "Value": { "Ref": "EIPNATAZ1" } },
    "ElasticIP2": { "Value": { "Ref": "EIPNATAZ2" } },
    "SubnetPublicAZ1": { "Value": { "Ref": "PublicNetAz1" } },
    "SubnetPublicAZ2": { "Value": { "Ref": "PublicNetAZ2" } },
    "SubnetPrivateAZ1": { "Value": { "Ref": "PrivateNetAZ1" } },
    "SubnetPrivateAZ2": { "Value": { "Ref": "PrivateNetAZ2" } },
    "DefaultSG": { "Value": { "Fn::GetAtt": ["VPCBase", "DefaultSecurityGroup" ] } }
  }
}
```

Wordpress Application
---

```json
{
  "Parameters": {
    "VPCID": {
      "Type": "AWS::EC2::VPC::Id",
      "Description": "Select Virtual Private Cloud ID"
    },
    "ELBSubnet": {
      "Type": "List<AWS::EC2::Subnet::Id>",
      "Description": "Subnets for Elastic Loadbalancee"
    },
    "PrivateSubnets": {
      "Type": "List<AWS::EC2::Subnet::Id>",
      "Description": "Subnets for RDS and EC2"
    },
    "InstanceType": {
      "Description": "WebServer EC2 instance type",
      "Type": "String",
      "Default": "t2.micro",
      "AllowedValues": ["t2.micro"],
      "ConstraintDescription": "must be a valid EC2 instance type"
    },
    "SSHLocation": {
      "Description": "The IP address range that can be used to SSH to the EC2 instances",
      "Type": "String",
      "MinLength": "9",
      "MaxLength": "18",
      "Default": "0.0.0.0/0",
      "AllowedPattern": "(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})/(\\d{1,2})",
      "ConstraintDescription": "must be a valid IP CIDR range of the form a.b.c.d/x"
    },
    "DBClass": {
      "Decription": "Database instance class",
      "Type": "String",
      "Default": "db.t2.micro",
      "AllowedValues": ["db.t2.micro"],
      "ConstraintDescription": "must select a valid database instance type"
    },
    "DBName": {
      "Default": "wordpressdb",
      "Description": "The WordPress database name",
      "Type": "String",
      "MinLength": "1",
      "MaxLength": "64",
      "AllowedPattern" : "[a-zA-Z][a-zA-Z0-9]*",
      "ConstraintDescription": "must begin with a letter and contain only alphanumeric characters"
    },
    "DBUser": {
      "NoEcho": "true",
      "Description": "The WordPress database admin account username",
      "Type": "String",
      "MinLength": "1",
      "MaxLength": "16",
      "AllowedPattern" : "[a-zA-Z][a-zA-Z0-9]*",
      "ConstraintDescription" : "must begin with a letter and contain only alphanumeric characters."
    },
    "DBPassword" : {
      "NoEcho": "true",
      "Description" : "The WordPress database admin account password",
      "Type": "String",
      "MinLength": "8",
      "MaxLength": "41",
      "AllowedPattern" : "[a-zA-Z0-9]*",
      "ConstraintDescription" : "must contain only alphanumeric characters."
    },
    "MultiAZDatabase": {
      "Default": "false",
      "Description" : "Create a Multi-AZ MySQL Amazon RDS database instance",
      "Type": "String",
      "AllowedValues" : [ "true", "false" ],
      "ConstraintDescription" : "must be either true or false."
    },
    "WebServerCapacity": {
      "Default": "1",
      "Description" : "The initial number of WebServer instances",
      "Type": "Number",
      "MinValue": "1",
      "MaxValue": "5",
      "ConstraintDescription" : "must be between 1 and 5 EC2 instances."
    },
    "DBAllocatedStorage" : {
      "Default": "5",
      "Description" : "The size of the database (Gb)",
      "Type": "Number",
      "MinValue": "5",
      "MaxValue": "1024",
      "ConstraintDescription" : "must be between 5 and 1024Gb."
    }
  },
  "Mappings": {
    "AWSInstanceType2Arch": {
      "t2.micro": { "Arch": "HVM64" }
    },
    "AWSRegionArch2AMI" : {
      "us-east-1"        : { "HVM64" : "ami-f5f41398" },
      "us-west-2"        : { "HVM64" : "ami-d0f506b0" },
      "us-west-1"        : { "HVM64" : "ami-6e84fa0e" },
      "eu-west-1"        : { "HVM64" : "ami-b0ac25c3" }
    }
  },
  "Resources" : {
    "ElasticLoadBalancer" : {
      "Type" : "AWS::ElasticLoadBalancing::LoadBalancer",
      "Properties" : {
        "Subnets": { "Ref" : "ELBSubnet" },
        "CrossZone" : "true",
        "SecurityGroups": [ { "Ref": "ELBSecurityGroup" } ],
        "LBCookieStickinessPolicy" : [ {
          "PolicyName" : "CookieBasedPolicy",
          "CookieExpirationPeriod" : "30"
        } ],
        "Listeners" : [ {
          "LoadBalancerPort" : "80",
          "InstancePort" : "80",
          "Protocol" : "HTTP",
          "PolicyNames" : [ "CookieBasedPolicy" ]
        } ],
        "HealthCheck" : {
          "Target" : "HTTP:80/wordpress/wp-admin/install.php",
          "HealthyThreshold" : "2",
          "UnhealthyThreshold" : "5",
          "Interval" : "10",
          "Timeout" : "5"
        }
      }
    },
    "InstanceSecurityGroup": {
      "Type": "AWS::EC2::SecurityGroup",
      "Properties": {
        "GroupDescription": "Enable inbound network access access to EC2 instance.",
        "VpcId": { "Ref": "VPCID" },
        "SecurityGroupIngress": [
          {"ToPort": "80", "IpProtocol": "tcp", "SourceSecurityGroupId": {"Ref": "ELBSecurityGroup"}, "FromPort": "80"}
        ],
        "Tags" : [
          { "Key": "Name", "Value": { "Fn::Join" : ["", [{ "Ref" : "AWS::StackName" }, "-EC2SecurityGrp"]] } }
        ]
      }
    },
    "ELBSecurityGroup": {
      "Type": "AWS::EC2::SecurityGroup",
      "Properties": {
        "GroupDescription": "Enable inbound network access to load balancer.",
        "VpcId": { "Ref": "VPCID" },
        "SecurityGroupIngress": [
          {"ToPort": "80", "IpProtocol": "tcp", "FromPort": "80", "CidrIp": "0.0.0.0/0"}
        ],
        "Tags" : [
          { "Key": "Name", "Value": { "Fn::Join" : ["", [{ "Ref" : "AWS::StackName" }, "-AppGroupName"]] } }
        ]
      }
    },
    "WebServerGroup" : {
      "Type" : "AWS::AutoScaling::AutoScalingGroup",
      "Properties" : {
        "VPCZoneIdentifier": { "Ref" : "PrivateSubnets" },
        "LaunchConfigurationName" : { "Ref" : "LaunchConfig" },
        "MinSize" : "1",
        "MaxSize" : "5",
        "DesiredCapacity" : { "Ref" : "WebServerCapacity" },
        "LoadBalancerNames" : [ { "Ref" : "ElasticLoadBalancer" } ]
      },
      "CreationPolicy" : {
        "ResourceSignal" : {
          "Timeout" : "PT15M"
        }
      },
      "UpdatePolicy": {
        "AutoScalingRollingUpdate": {
          "MinInstancesInService": "1",
          "MaxBatchSize": "1",
          "PauseTime" : "PT15M",
          "WaitOnResourceSignals": "true"
        }
      }
    },
    "LaunchConfig": {
      "Type" : "AWS::AutoScaling::LaunchConfiguration",
      "Metadata" : {
        "AWS::CloudFormation::Init" : {
          "configSets" : {
            "wordpress_install" : ["install_cfn", "install_wordpress" ]
          },
          "install_cfn" : {
            "files": {
              "/etc/cfn/cfn-hup.conf": {
                "content": { "Fn::Join": [ "", ["[main]\n","stack=", { "Ref": "AWS::StackId" }, "\n","region=", { "Ref": "AWS::Region" }, "\n"]]},
                "mode"  : "000400",
                "owner" : "root",
                "group" : "root"
              },
              "/etc/cfn/hooks.d/cfn-auto-reloader.conf": {
                "content": { "Fn::Join": [ "", ["[cfn-auto-reloader-hook]\n","triggers=post.update\n","path=Resources.LaunchConfig.Metadata.AWS::CloudFormation::Init\n","action=/opt/aws/bin/cfn-init -v ",
                          "         --stack ", { "Ref" : "AWS::StackName" },
                          "         --resource LaunchConfig ",
                          "         --configsets wordpress_install ",
                          "         --region ", { "Ref" : "AWS::Region" }, "\n"
                ]]},          
                "mode"  : "000400",
                "owner" : "root",
                "group" : "root"
              }
            },
            "services" : {
              "sysvinit" : {
                "cfn-hup" : { "enabled" : "true", "ensureRunning" : "true",
                              "files" : ["/etc/cfn/cfn-hup.conf", "/etc/cfn/hooks.d/cfn-auto-reloader.conf"]}
              }
            }
          },
          "install_wordpress" : {
            "packages" : {
              "yum" : {"php": [],"php-mysql" : [],"mysql": [],"httpd": []}
            },
            "sources" : {
              "/var/www/html" : "http://wordpress.org/latest.tar.gz"
            },
            "files" : {
              "/tmp/create-wp-config" : {
                "content" : { "Fn::Join" : [ "", [
                  "#!/bin/bash\n",
                  "cp /var/www/html/wordpress/wp-config-sample.php /var/www/html/wordpress/wp-config.php\n",
                  "sed -i \"s/'database_name_here'/'",{ "Ref" : "DBName" }, "'/g\" wp-config.php\n",
                  "sed -i \"s/'username_here'/'",{ "Ref" : "DBUser" }, "'/g\" wp-config.php\n",
                  "sed -i \"s/'password_here'/'",{ "Ref" : "DBPassword" }, "'/g\" wp-config.php\n",
                  "sed -i \"s/'localhost'/'",{ "Fn::GetAtt" : [ "DBInstance", "Endpoint.Address" ] }, "'/g\" wp-config.php\n"
                ]]},
                "mode" : "000500",
                "owner" : "root",
                "group" : "root"
              }
            },
            "commands" : {
              "01_configure_wordpress" : {
                "command" : "/tmp/create-wp-config",
                "cwd" : "/var/www/html/wordpress"
              }
            },
            "services" : {
              "sysvinit" : {
                "httpd" : { "enabled" : "true", "ensureRunning" : "true" }
              }
            }
          }
        }
      },
      "Properties": {
        "ImageId" : { "Fn::FindInMap" : [ "AWSRegionArch2AMI", { "Ref" : "AWS::Region" },
                          { "Fn::FindInMap" : [ "AWSInstanceType2Arch", { "Ref" : "InstanceType" }, "Arch" ] } ] },
        "InstanceType"   : { "Ref" : "InstanceType" },
        "SecurityGroups" : [ {"Ref" : "InstanceSecurityGroup"} ],
        "UserData" : { "Fn::Base64" : { "Fn::Join" : ["", [
                       "#!/bin/bash -xe\n",
                       "yum update -y aws-cfn-bootstrap\n",

                       "/opt/aws/bin/cfn-init -v ",
                       "         --stack ", { "Ref" : "AWS::StackName" },
                       "         --resource LaunchConfig ",
                       "         --configsets wordpress_install ",
                       "         --region ", { "Ref" : "AWS::Region" }, "\n",

                       "/opt/aws/bin/cfn-signal -e $? ",
                       "         --stack ", { "Ref" : "AWS::StackName" },
                       "         --resource WebServerGroup ",
                       "         --region ", { "Ref" : "AWS::Region" }, "\n"
        ]]}}
      }
    },
    "DBEC2SecurityGroup": {
      "Type": "AWS::EC2::SecurityGroup",
      "Properties" : {
        "VpcId": { "Ref": "VPCID" },
        "GroupDescription": "Open database for access",
        "SecurityGroupIngress" : [{
          "IpProtocol" : "tcp",
          "FromPort" : "3306",
          "ToPort" : "3306",
          "SourceSecurityGroupId" : { "Ref" : "InstanceSecurityGroup" }
        }]
      }
    },
    "DBSubnetGroup" : {
      "Type": "AWS::RDS::DBSubnetGroup",
      "Properties" : {
        "DBSubnetGroupDescription" : "RDS DB Subnet",
        "SubnetIds" : { "Ref" : "PrivateSubnets" }
      }
    },
    "DBInstance" : {
      "Type": "AWS::RDS::DBInstance",
      "Properties": {
        "DBName"            : { "Ref" : "DBName" },
        "DBSubnetGroupName" : { "Ref" : "DBSubnetGroup" },
        "Engine"            : "MySQL",
        "MultiAZ"           : { "Ref": "MultiAZDatabase" },
        "MasterUsername"    : { "Ref" : "DBUser" },
        "MasterUserPassword": { "Ref" : "DBPassword" },
        "DBInstanceClass"   : { "Ref" : "DBClass" },
        "AllocatedStorage"  : { "Ref" : "DBAllocatedStorage" },
        "VPCSecurityGroups" : [{ "Ref" : "DBEC2SecurityGroup" }]       
      }
    }
  },
  "Outputs" : {
    "WebsiteURL" : {
      "Value" : { "Fn::Join" : ["", ["http://", { "Fn::GetAtt" : [ "ElasticLoadBalancer", "DNSName" ]}, "/wordpress" ]]},
      "Description" : "WordPress Website"
    }
  }
}
```

Nested Stacks
---

- Nested stacks under the main stack are considered resources.
- S3 with name template

```json
{
  "AWSTemplateFormatVersion" : "2010-09-09",
  "Parameters" : {
    "BucketName": {
      "Description": "Name of MyS3Bucket",
      "Type": "String",
      "Default": "mys3bucketacloudgurutraining"
    }
  },
  "Resources" : {
    "S3Bucket" : {
      "Type" : "AWS::S3::Bucket",
      "Properties" : {
      "BucketName": { "Ref": "BucketName" }
      }
    }
  },
  "Outputs" : {
    "S3BucketName" : {
      "Value" : {"Ref": "S3Bucket"},
      "Description" : "Name of S3 bucket"
    }
  }
}
```

- Nested template

```json
{
  "AWSTemplateFormatVersion" : "2010-09-09",
  "Description": "Template for combining all templates into one nested template for testing.",
  "Parameters": {
    "VpcURL": {
      "Type": "String",
      "Default": "https://s3.amazonaws.com/mys3bucketacloudguru/vpc.template",
      "Description": "Template URL for VPC Network."
    },
    "WordpressURL": {
      "Type": "String",
      "Default": "https://s3.amazonaws.com/mys3bucketacloudguru/wordpress.template",
      "Description": "Template URL for Wordpress and RDS."
    },
    "s3URL": {
      "Type": "String",
      "Default": "https://s3.amazonaws.com/mys3bucketacloudguru/s3.template",
      "Description": "Template URL for S3 Bucket."
    }    
  },
  "Resources" : {
    "Vpc" : {
       "Type" : "AWS::CloudFormation::Stack",
     	   "Properties" : {
         "TemplateURL" : { "Ref": "VpcURL" },
         "Parameters" :
          {
            "CIDRRange": "10.250.0.0"
          }
	       }
    },
    "Mys3Bucket" : {
       "Type" : "AWS::CloudFormation::Stack",
         "Properties" : {
         "TemplateURL" : { "Ref": "s3URL" }
       }
    },
    "WordpressApp" : {
       "Type" : "AWS::CloudFormation::Stack",
         "DependsOn" : "Vpc",         
         "Properties" : {
         "TemplateURL" : { "Ref": "WordpressURL" },
         "Parameters" :
          {
            "VPCID"               : {"Fn::GetAtt": ["Vpc", "Outputs.VPCID"]},
            "PrivateSubnets"      : {"Fn::Join": [",", [{"Fn::GetAtt": ["Vpc", "Outputs.SubnetPrivateAZ1"]}, {"Fn::GetAtt": ["Vpc", "Outputs.SubnetPrivateAZ2"]}]]},
            "ELBSubnet"           : {"Fn::Join": [",", [{"Fn::GetAtt": ["Vpc", "Outputs.SubnetPublicAZ1"]}, {"Fn::GetAtt": ["Vpc", "Outputs.SubnetPublicAZ2"]}]]},
            "DBUser"              : "mywordpressuser",
            "DBPassword"          : "mysup3rs3cr3tP4sSw0rd"
          }
       }
    }
  },
  "Outputs": {
    "WordpressURL"  : { "Value": {"Fn::GetAtt": ["WordpressApp", "Outputs.WebsiteURL"]}}
  }
}
```

AWS CloudFormation Designer
---

- Is a graphic tool for creating, viewing and modifying AWS CloudFormation templates.

AWS CloudFormation CLI
---

- You can create, monitor, update and delete stacks from the terminal.

```bash
aws cloudformation --region=eu-west-1 create-stack Europe \
  --template-url https://s3.amazonaws.com/mys3bucketacloudguru/vpc.template \
  --parameters \
    ParameterKey="CIDRRange",ParameterValue="10.250.0.0" \
  --capabilities CAPABILITY_IAM
```

- We can use the `--use-previous-template` option to update a stack.