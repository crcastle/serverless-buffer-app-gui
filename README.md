# Serverless Buffer App
[![Screenshot of app front page](http://f.cl.ly/items/431C322x1Z1n0k3A2K0j/Screen%20Shot%202015-12-11%20at%209.21.46%20PM.png)](http://tweet.crc.io)

Check out a [live version of the app](http://tweet.crc.io) (*work in progress*).

or

Use the [setup instructions](#setup) below to make one for yourself!

## Requirements
* An [Amazon Web Services](https://aws.amazon.com/) account
* [Node.js and NPM](https://nodejs.org/en/download/)
* [Amazon Web Services Command Line Interface](https://aws.amazon.com/cli/) command
  * Mac or Linux: Python >= 2.6.5 then `pip install awscli`
  * Mac: Use [Homebrew](http://brew.sh): `brew install awscli`
  * Windows: Use [AWS's CLI installer](https://aws.amazon.com/cli/)
* A Google account

## Setup

1. Clone this repo and the [serverless-buffer-app-lambda](https://github.com/crcastle/serverless-buffer-app-lambda) repo to your dev machine.  The first one contains all the front-end code.  The second one contains the AWS Lambda function code, which is effectively the server code.
1. Let's create an IAM user with access only to the AWS services we need.  This is more secure as the IAM user has restricted permissions compared to your primary AWS user.  In general, it's a bad idea to use your primary AWS user's credentials for building apps.
  1. <img src="http://cl.ly/071Z3E2U3V1q/Screen%20Shot%202015-12-23%20at%204.52.10%20PM.png" alt="AWS Console" style="width: 400px; vertical-align: top;"/>
  2. <img src="http://cl.ly/2O0C450Q0322/Screen%20Shot%202015-12-23%20at%204.54.15%20PM.png" alt="Drawing" style="width: 400px; vertical-align: top;"/>
  3. <img src="http://cl.ly/2o0P3x0C0d1k/Screen%20Shot%202015-12-23%20at%204.57.33%20PM.png" alt="Drawing" style="width: 400px; vertical-align: top;"/>
2. Type `aws configure` on the command line and copy/paste the new user's Access Key ID and Secret Access Key to configure the AWS CLI tool.
  1. <img src="http://cl.ly/350j0q0I4041/Screen%20Shot%202015-12-23%20at%205.02.19%20PM.png" alt="Drawing" style="width: 400px; vertical-align: top;"/>
  2. <img src="http://cl.ly/0H3V2b0q353k/Screen%20Shot%202015-12-23%20at%205.19.57%20PM.png" alt="Drawing" style="width: 400px; vertical-align: top;"/>
2. Now attach the following AWS IAM policies to the user.  These policies give the user permissions for only the specific AWS services we need for our Serverless Buffer App.
  1. AmazonAPIGatewayAdministrator
  2. AmazonAPIGatewayInvokeFullAccess
  3. AmazonAPIGatewayPushToCloudWatchLogs
  2. AWSLambdaFullAccess
  3. AmazonDynamoDBFullAccess  
  <img src="http://cl.ly/2T0n0W0K1O3S/Screen%20Shot%202015-12-23%20at%205.29.37%20PM.png" alt="Drawing" style="width: 400px; vertical-align: top;"/>
  4. The user's list of policies should look like this when you're done.
  <img src="http://cl.ly/0K2Z2z2d2v3g/Screen%20Shot%202015-12-23%20at%205.30.15%20PM.png" alt="Drawing" style="width: 400px; vertical-align: top;"/>
3. Now let's create a policy that will give our AWS Lambda functions permissions to make DynamoDB queries and send log info to CloudWatch.
  1. <img src="http://cl.ly/103R1X473m2l/Screen%20Shot%202015-12-23%20at%206.45.13%20PM.png" alt="Create IAM policy" style="width: 400px; vertical-align: top;"/>
  2. <img src="http://cl.ly/413c2j0f1v3W/Screen%20Shot%202015-12-23%20at%206.47.31%20PM.png" alt="Create custom IAM policy" style="width: 400px; vertical-align: top;"/>
  3. Configure the policy as shown below.  
  <img src="http://cl.ly/2j1U1I3O1426/Screen%20Shot%202015-12-23%20at%206.52.39%20PM.png" alt="IAM Policy configuration" style="width: 400px; vertical-align: top;"/>

  Here is the JSON to paste in as the Policy Document:
  ```JSON
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "Stmt1428341300017",
        "Action": [
          "dynamodb:DeleteItem",
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:UpdateItem"
        ],
        "Effect": "Allow",
        "Resource": "*"
      },
      {
        "Sid": "",
        "Resource": "*",
        "Action": [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        "Effect": "Allow"
      }
    ]
  }
  ```
4. Now create a role that uses this policy.  This role will be assigned to the Lambda functions.
  1. <img src="http://cl.ly/2G1E1Z3J3G3j/Screen%20Shot%202015-12-23%20at%207.06.27%20PM.png" alt="Create IAM role" style="width: 400px; vertical-align: top;"/>
  2. <img src="http://cl.ly/1y2U211m1d3q/Screen%20Shot%202015-12-23%20at%207.09.07%20PM.png" alt="Name IAM role" style="width: 400px; vertical-align: top;"/>
  3. <img src="http://cl.ly/1Z2T1j2h0B0E/Screen%20Shot%202015-12-23%20at%207.09.19%20PM.png" alt="Select role type" style="width: 400px; vertical-align: top;"/>
  4. Select the policy created in the previous step.  You can search for it by name.  
  <img src="http://cl.ly/2n2p0y0m2t41/Screen%20Shot%202015-12-23%20at%207.09.58%20PM.png" alt="Attach policy to role" style="width: 400px; vertical-align: top;"/>
  5. <img src="http://cl.ly/1g3y1X3u2y1I/Screen%20Shot%202015-12-23%20at%207.10.16%20PM.png" alt="Finalize role creation" style="width: 400px; vertical-align: top;"/>
3. Nice, now we're ready to start creating the good stuff...  Let's create the AWS DynamoDB table that will store the scheduled tweets before they're posted to Twitter. ($$$)
  1. Open the DynamoDB management console and create a table named `scheduledTweets` configured with the Primary Key, Sort Key, and other settings as shown in the screenshot below https://console.aws.amazon.com/dynamodb/home
  2. <img src="http://cl.ly/1K3A3i3e1I0N/Screen%20Shot%202015-12-23%20at%205.37.21%20PM.png" alt="Drawing" style="width: 400px; vertical-align: top;"/>
  3. <img src="http://cl.ly/0q0s1K35333z/Screen%20Shot%202015-12-23%20at%205.40.43%20PM.png" alt="Drawing" style="width: 400px; vertical-align: top;"/>
4. It will take a little while for the DynamoDB table to be created.  In the meantime, we can setup the AWS Lambda functions.  We'll create three functions: one to schedule a new tweet, one to list scheduled tweets, and one to post tweets on a specified scheduled.
  1. From the AWS Lambda console, you'll either click "Get Started" or "Create a Lambda function".  Then you'll be shown several Lambda blueprints from which to choose.  Do not use a blueprint.  Click the "Skip" button at the bottom.
  <img src="http://cl.ly/31380i1d3m32/Screen%20Shot%202015-12-23%20at%206.18.52%20PM.png" alt="Skip AWS Lambda blueprint selection" style="width: 400px; vertical-align: top;"/>
  2. Configure the first function as shown in the next two screenshots.
  <img src="http://cl.ly/2N1740203i2U/Screen%20Shot%202015-12-23%20at%206.25.28%20PM.png" alt="Skip AWS Lambda blueprint selection" style="width: 400px; vertical-align: top;"/>  
  Generate the ZIP file to upload by running `npm run build` from your cloned copy of the [serverless-buffer-app-lambda](https://github.com/crcastle/serverless-buffer-app-lambda) repo.  It will create a file named `lambda-code.zip`
  <img src="http://cl.ly/3U3x0R1B1L1D/Screen%20Shot%202015-12-23%20at%207.20.27%20PM.png" alt="Skip AWS Lambda blueprint selection" style="width: 400px; vertical-align: top;"/>
  3. Create and configure the other two in the same way but with the following changes:
    1. scheduledTweetList
      1. Name: `scheduledTweetList`
      2. Description: `Returns all scheduled tweets to post with a specified time range`
      3. Handler: `index.scheduledTweetList`
    2. scheduledTweetWorker
      1. Name: `scheduledTweetWorker`
      2. Description: `A worker function to post scheduled tweets to Twitter.`
      3. Handler: `index.scheduledTweetWorker`
5. Alright, more than half way done.  Last major step is to create the AWS API Gateway endpoints.  The front-end code will use these HTTPS endpoints to trigger the Lambda functions and get data back from them.
  1.

## Contributing
I'd love your help!  Check out the [open issues](https://github.com/crcastle/serverless-buffer-app-gui/issues) to find something you can help on.

## License
##### [ISC License](https://opensource.org/licenses/ISC) (MIT-like, but better)
Copyright (c) 2015, Chris Castle

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
