#!/usr/bin/env sh

# Create IAM user
# Alternatively, user can run `aws configure` and input the access key and secret access key
# aws iam create-user --user-name serverless-buffer-app
# aws iam create-access-key --user-name serverless-buffer-app

# Give permissions to user
aws iam attach-user-policy --policy-arn arn:aws:iam::aws:policy/AmazonAPIGatewayAdministrator --user-name serverless-buffer-app
aws iam attach-user-policy --policy-arn arn:aws:iam::aws:policy/AmazonAPIGatewayInvokeFullAccess --user-name serverless-buffer-app
aws iam attach-user-policy --policy-arn arn:aws:iam::aws:policy/AmazonAPIGatewayPushToCloudWatchLogs --user-name serverless-buffer-app
aws iam attach-user-policy --policy-arn arn:aws:iam::aws:policy/AWSLambdaFullAccess --user-name serverless-buffer-app
aws iam attach-user-policy --policy-arn arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess --user-name serverless-buffer-app

# Create policy to give DynamoDB permissions to Lambda
aws iam create-policy --policy-name serverless-buffer-app-lambda-policy --policy-document file://serverless-buffer-app-lambda-policy.json --description "This policy gives our Serverless Buffer App Lambda functions access to query DynamoDB and send log data to CloudWatch logs."
aws iam create-role --role-name serverless-buffer-app-role
aws iam attach-role-policy --role-name serverless-buffer-app-role --policy-arn ???

# Create DynamoDB table


# Create scheduledTweetPost Lambda function


# Create scheduledTweetList Lambda function


# Create scheduledTweetWorker Lambda function


# Create API Gateway API


# Create scheduled-tweet API Gateway resource


# Create API Gateway GET method


# Create API Gateway POST method


# Enable CORS on GET and POST methods


# Create a stage and deploy a version of the API


# Download generated Javascript SDK for API


###########################
# Setup Google OAuth project
###########################

# Create IAM role for Google to be an OAuth provider
