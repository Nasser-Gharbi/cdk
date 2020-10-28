cloud development kit

| Operating System |
| --------------- |
| ubuntu machine ( x64 ) |

| configure aws credentials |
| --------------- |
| aws configure |

| Dependencies Packages |
| --------------- |
| sudo apt update |
| sudo npm install -g typescript |
| npm update -g typescript |

| Creating a project |
| --------------- |
| mkdir SDG-D1-pipeline-typescript |
| cd SDG-D1-pipeline-typescript |
| cdk init app --language typescript|

| Managing AWS Construct Library modules |
| --------------- |
| npm install @aws-cdk/aws-s3 @aws-cdk/aws-lambda  @aws-cdk/aws-dynamodb |

Reference: 

- https://docs.aws.amazon.com/cdk/latest/guide/work-with-cdk-typescript.html
- https://docs.aws.amazon.com/cdk/api/latest/typescript/api/index.html
