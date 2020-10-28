import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3upload from '@aws-cdk/aws-s3-deployment'; // <--------------------
import * as events from '@aws-cdk/aws-events';
import * as events from '@aws-cdk/aws-events';
import * as lambda from '@aws-cdk/aws-lambda';
import * as targets from '@aws-cdk/aws-events-targets';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as iam from '@aws-cdk/aws-iam';


// Instantiate Bucket with bucketName and versioned properties
const bucket = new s3.Bucket(this, 'MyBucket', {
  bucketName: 'my-bucket',
   versioned: true,
});


//******************************************************************

//The following code creates a new role, trusting the Amazon EC2 service.
const role = new iam.Role(this, 'Role', {
  assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),   // required
});

// Add a policy to a Role
role.addToPolicy(new iam.PolicyStatement({
  effect: iam.Effect.ALLOW,
  resources: ['*'],
  actions: [
      'logs:CreateLogStream',
      'logs:PutLogEvents',
      'logs:CreateLogGroup',
      'cloudwatch:*',
      'dynamodb:*',
      's3:*',
      'lambda:*',
      'dynamodb: *']
    })
); 

// Add a managed policy to a role you can use
role.addManagedPolicy(
    ManagedPolicy.fromAwsManagedPolicyName('SDG-D1-pipeline-policy')
);

****************************************************************************************



class FirstStack(core.Stack):
    def __init__(self, app: core.App, id: str) -> None:
        super().__init__(app, id)

        # input variable Section

        _bucket_name = core.CfnParameter(
            self, "uploadBucketName", type="String")
        first_lambda_name = core.CfnParameter(
            self, "FirstLambdaName", type="String")

        first_lambda_Role_name = first_lambda_name.value_as_string + 'Role'
        first_lambda_Rule_name = first_lambda_name.value_as_string + 'Rule'

        # bucket Creation

        bucket = s3.Bucket(self,
                           "oneone",
                           bucket_name=_bucket_name.value_as_string,
                           public_read_access=False,
                           versioned=True
                           )

        # fileUpload after bucket creation

        UpLoad = s3upload.BucketDeployment(self,
                                           "onetwo",
                                           destination_bucket=bucket,
                                           sources=[
                                               s3upload.Source.asset('./files')]
                                           )

   

        with open("files/lambdafiles/lambda-handler1.py", encoding="utf8") as fp:
            handler_code = fp.read()

        lambdaFunction = lambda_.Function(
            self, "onefour",
            function_name=first_lambda_name.value_as_string,
            code=lambda_.InlineCode(handler_code),
            handler="index.main",
            timeout=core.Duration.seconds(300),
            runtime=lambda_.Runtime.PYTHON_3_7,
            role=iamRole
        )

        rule = events.Rule(
            self, "onefive",
            rule_name=first_lambda_Rule_name,
            schedule=events.Schedule.cron(
                minute='0/5',
                hour='*',
                month='*',
                week_day='MON-FRI',
                year='*'),
        )

        rule.add_target(targets.LambdaFunction(lambdaFunction))

        # OutPut Section
        core.CfnOutput(self, "bucket_name", value=bucket.bucket_name)
        core.CfnOutput(self, "_FirstLambdaName",
                       value=lambdaFunction.function_name)


        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
class SecondStack(core.Stack):
    def __init__(self, app: core.App, id: str) -> None:
        super().__init__(app, id)

        second_lambda_name = core.CfnParameter(
            self, "SecondLambdaName", type="String")

        second_lambda_Role_name = second_lambda_name.value_as_string + 'Role'
        second_lambda_Rule_name = second_lambda_name.value_as_string + 'Rule'

        iamRole = aws_iam.Role(self,
                               "twoone",
                               role_name=second_lambda_Role_name,
                               assumed_by=aws_iam.ServicePrincipal(
                                   "lambda.amazonaws.com")
                               )

        iamRole.add_to_policy(aws_iam.PolicyStatement(
            effect=aws_iam.Effect.ALLOW,
            actions=["logs:CreateLogGroup",
                     "logs:CreateLogStream",
                     "logs:PutLogEvents",
                     "cloudwatch:*",
                     "dynamodb:*",
                     "s3:*"],
            resources=["*"]
        ))

        with open("files/lambdafiles/lambda-handler2.py", encoding="utf8") as fp:
            handler_code = fp.read()

        lambdaFunction = lambda_.Function(
            self, "twotwo",
            function_name=second_lambda_name.value_as_string,
            code=lambda_.InlineCode(handler_code),
            handler="index.main",
            timeout=core.Duration.seconds(300),
            runtime=lambda_.Runtime.PYTHON_3_7,
            role=iamRole
        )

        rule = events.Rule(
            self, "twothree",
            rule_name=second_lambda_Rule_name,
            schedule=events.Schedule.cron(
                minute='0/5',
                hour='*',
                month='*',
                week_day='MON-FRI',
                year='*'),
        )

        rule.add_target(targets.LambdaFunction(lambdaFunction))

        core.CfnOutput(self, "_SecondLambdaName",
                       value=lambdaFunction.function_name)


class ThreeStack(core.Stack):
    def __init__(self, app: core.App, id: str) -> None:
        super().__init__(app, id)

        third_lambda_name = core.CfnParameter(
            self, "ThirdLambdaName", type="String")

        third_lambda_Role_name = third_lambda_name.value_as_string + 'Role'
        third_lambda_Rule_name = third_lambda_name.value_as_string + 'Rule'

        iamRole = aws_iam.Role(self,
                               "threeone",
                               role_name=third_lambda_Role_name,
                               assumed_by=aws_iam.ServicePrincipal(
                                   "lambda.amazonaws.com")
                               )

        iamRole.add_to_policy(aws_iam.PolicyStatement(
            effect=aws_iam.Effect.ALLOW,
            actions=["logs:CreateLogGroup",
                     "logs:CreateLogStream",
                     "logs:PutLogEvents",
                     "cloudwatch:*",
                     "dynamodb:*",
                     "s3:*"],
            resources=["*"]
        ))

        with open("files/lambdafiles/lambda-handler3.py", encoding="utf8") as fp:
            handler_code = fp.read()

        lambdaFunction = lambda_.Function(
            self, "threetwo",
            function_name=third_lambda_name.value_as_string,
            code=lambda_.InlineCode(handler_code),
            handler="index.main",
            timeout=core.Duration.seconds(300),
            runtime=lambda_.Runtime.PYTHON_3_7,
            role=iamRole
        )

        rule = events.Rule(
            self, "threethree",
            rule_name=third_lambda_Rule_name,
            schedule=events.Schedule.cron(
                minute='0/5',
                hour='*',
                month='*',
                week_day='MON-FRI',
                year='*'),
        )

        rule.add_target(targets.LambdaFunction(lambdaFunction))

        core.CfnOutput(self, "_ThirdLambdaName",
                       value=lambdaFunction.function_name)


class FourStack(core.Stack):
    def __init__(self, app: core.App, id: str) -> None:
        super().__init__(app, id)

        fourth_lambda_name = core.CfnParameter(
            self, "FourthLambdaName", type="String")

        fourth_lambda_Role_name = fourth_lambda_name.value_as_string + 'Role'
        fourth_lambda_Rule_name = fourth_lambda_name.value_as_string + 'Rule'

        iamRole = aws_iam.Role(self,
                               "fourone",
                               role_name=fourth_lambda_Role_name,
                               assumed_by=aws_iam.ServicePrincipal(
                                   "lambda.amazonaws.com")
                               )

        iamRole.add_to_policy(aws_iam.PolicyStatement(
            effect=aws_iam.Effect.ALLOW,
            actions=["logs:CreateLogGroup",
                     "logs:CreateLogStream",
                     "logs:PutLogEvents",
                     "cloudwatch:*",
                     "dynamodb:*",
                     "s3:*"],
            resources=["*"]
        ))

        with open("files/lambdafiles/lambda-handler4.py", encoding="utf8") as fp:
            handler_code = fp.read()

        lambdaFunction = lambda_.Function(
            self, "fourtwo",
            function_name=fourth_lambda_name.value_as_string,
            code=lambda_.InlineCode(handler_code),
            handler="index.main",
            timeout=core.Duration.seconds(300),
            runtime=lambda_.Runtime.PYTHON_3_7,
            role=iamRole
        )

        rule = events.Rule(
            self, "fourthree",
            rule_name=fourth_lambda_Rule_name,
            schedule=events.Schedule.cron(
                minute='0/5',
                hour='*',
                month='*',
                week_day='MON-FRI',
                year='*'),
        )

        rule.add_target(targets.LambdaFunction(lambdaFunction))

        core.CfnOutput(self, "_FourthLambdaName",
                       value=lambdaFunction.function_name)


class FifthStack(core.Stack):
    def __init__(self, app: core.App, id: str) -> None:
        super().__init__(app, id)

        first_dynamodb_name = core.CfnParameter(
            self, "FirstDynamodbName", type="String")
        second_dynamodb_name = core.CfnParameter(
            self, "SecondDynamodbName", type="String")
        third_dynamodb_name = core.CfnParameter(
            self, "ThirdDynamodbName", type="String")
        fourth_dynamodb_name = core.CfnParameter(
            self, "FourthDynamodbName", type="String")

        # create dynamo table
        _first_dynamo_table = aws_dynamodb.Table(
            self, "onesix",
            table_name=first_dynamodb_name.value_as_string,
            partition_key=aws_dynamodb.Attribute(
                name="id",
                type=aws_dynamodb.AttributeType.STRING
            )
        )

        _second_dynamo_table = aws_dynamodb.Table(
            self, "twofour",
            table_name=second_dynamodb_name.value_as_string,
            partition_key=aws_dynamodb.Attribute(
                name="id",
                type=aws_dynamodb.AttributeType.STRING
            )
        )

        _third_dynamo_table = aws_dynamodb.Table(
            self, "threefour",
            table_name=third_dynamodb_name.value_as_string,
            partition_key=aws_dynamodb.Attribute(
                name="id",
                type=aws_dynamodb.AttributeType.STRING
            )
        )
        _fourth_dynamo_table = aws_dynamodb.Table(
            self, "fourfour",
            table_name=fourth_dynamodb_name.value_as_string,
            partition_key=aws_dynamodb.Attribute(
                name="id",
                type=aws_dynamodb.AttributeType.STRING
            )
        )
        core.CfnOutput(self, "_FirstdynamodbName",
                       value=_first_dynamo_table.table_name)
        core.CfnOutput(self, "_SeconddynamodbName",
                       value=_second_dynamo_table.table_name)
        core.CfnOutput(self, "_ThirddynamodbName",
                       value=_third_dynamo_table.table_name)
        core.CfnOutput(self, "_FourthdynamodbName",
                       value=_fourth_dynamo_table.table_name)


app = core.App()
FirstStack(app, "First-Stack")
SecondStack(app, "Second-Stack")
ThreeStack(app, "Third-Stack")
FourStack(app, "Fourth-Stack")
app.synth()
