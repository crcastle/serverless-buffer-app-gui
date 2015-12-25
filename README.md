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

## Setup your own!
*(instructions not yet complete)*

*Give yourself an 1-2 hours to complete this setup.  It is a long process -- too long, I think.  That is the current reality in this world of stitching AWS services together like this.  In January 2016, I am going to [create a script](https://github.com/crcastle/serverless-buffer-app-gui/issues/16) that will do the bulk of this work.  This will greatly speed up and simplify the setup process.*

1. Clone this repo and the [serverless-buffer-app-lambda](https://github.com/crcastle/serverless-buffer-app-lambda) repo to your dev machine.  The first one contains all the front-end code.  The second one contains the AWS Lambda function code, which is effectively the server code.
1. Let's create an IAM user with access only to the AWS services we need.  This is more secure as the IAM user has restricted permissions compared to your primary AWS user.  In general, it's a bad idea to use your primary AWS user's credentials for building apps.  
<img src="http://cl.ly/071Z3E2U3V1q/Screen%20Shot%202015-12-23%20at%204.52.10%20PM.png" alt="AWS Console" style="width: 400px; vertical-align: top;"/>  
<img src="http://cl.ly/2O0C450Q0322/Screen%20Shot%202015-12-23%20at%204.54.15%20PM.png" alt="Drawing" style="width: 400px; vertical-align: top;"/>  
<img src="http://cl.ly/2o0P3x0C0d1k/Screen%20Shot%202015-12-23%20at%204.57.33%20PM.png" alt="Drawing" style="width: 400px; vertical-align: top;"/>
2. Type `aws configure` on the command line and copy/paste the new user's Access Key ID and Secret Access Key to configure the AWS CLI tool.  
<img src="http://cl.ly/350j0q0I4041/Screen%20Shot%202015-12-23%20at%205.02.19%20PM.png" alt="Drawing" style="width: 400px; vertical-align: top;"/>  
<img src="http://cl.ly/0H3V2b0q353k/Screen%20Shot%202015-12-23%20at%205.19.57%20PM.png" alt="Drawing" style="width: 400px; vertical-align: top;"/>
2. Now attach the following AWS IAM policies to the user.  These policies give the user permissions for only the specific AWS services we need for our Serverless Buffer App.
  1. AmazonAPIGatewayAdministrator
  2. AmazonAPIGatewayInvokeFullAccess
  3. AmazonAPIGatewayPushToCloudWatchLogs
  2. AWSLambdaFullAccess
  3. AmazonDynamoDBFullAccess  
  <img src="http://cl.ly/2T0n0W0K1O3S/Screen%20Shot%202015-12-23%20at%205.29.37%20PM.png" alt="Drawing" style="width: 400px; vertical-align: top;"/>  
  The user's list of policies should look like this when you're done.  
  <img src="http://cl.ly/0K2Z2z2d2v3g/Screen%20Shot%202015-12-23%20at%205.30.15%20PM.png" alt="Drawing" style="width: 400px; vertical-align: top;"/>
3. Now let's create a policy that will give our AWS Lambda functions permissions to make DynamoDB queries and send log info to CloudWatch.  
<img src="http://cl.ly/103R1X473m2l/Screen%20Shot%202015-12-23%20at%206.45.13%20PM.png" alt="Create IAM policy" style="width: 400px; vertical-align: top;"/>  
<img src="http://cl.ly/413c2j0f1v3W/Screen%20Shot%202015-12-23%20at%206.47.31%20PM.png" alt="Create custom IAM policy" style="width: 400px; vertical-align: top;"/>  
Configure the policy as shown below.  
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
<img src="http://cl.ly/2G1E1Z3J3G3j/Screen%20Shot%202015-12-23%20at%207.06.27%20PM.png" alt="Create IAM role" style="width: 400px; vertical-align: top;"/>  
<img src="http://cl.ly/1y2U211m1d3q/Screen%20Shot%202015-12-23%20at%207.09.07%20PM.png" alt="Name IAM role" style="width: 400px; vertical-align: top;"/>  
<img src="http://cl.ly/1Z2T1j2h0B0E/Screen%20Shot%202015-12-23%20at%207.09.19%20PM.png" alt="Select role type" style="width: 400px; vertical-align: top;"/>  
Select the policy created in the previous step.  You can search for it by name.  
<img src="http://cl.ly/2n2p0y0m2t41/Screen%20Shot%202015-12-23%20at%207.09.58%20PM.png" alt="Attach policy to role" style="width: 400px; vertical-align: top;"/>  
<img src="http://cl.ly/1g3y1X3u2y1I/Screen%20Shot%202015-12-23%20at%207.10.16%20PM.png" alt="Finalize role creation" style="width: 400px; vertical-align: top;"/>
3. Nice, now we're ready to start creating the good stuff...  Let's create the AWS DynamoDB table that will store the scheduled tweets before they're posted to Twitter. ($$$)
  1. Open the DynamoDB management console and create a table named `scheduledTweets` configured with the Primary Key, Sort Key, and other settings as shown in the screenshot below https://console.aws.amazon.com/dynamodb/home  
  <img src="http://cl.ly/1K3A3i3e1I0N/Screen%20Shot%202015-12-23%20at%205.37.21%20PM.png" alt="Drawing" style="width: 400px; vertical-align: top;"/>  
  <img src="http://cl.ly/0q0s1K35333z/Screen%20Shot%202015-12-23%20at%205.40.43%20PM.png" alt="Drawing" style="width: 400px; vertical-align: top;"/>
4. It will take a little while for the DynamoDB table to be created.  In the meantime, we can setup the AWS Lambda functions.  We'll create three functions: one to schedule a new tweet, one to list scheduled tweets, and one to post tweets on a specified scheduled.
  1. From the AWS Lambda console, you'll either click "Get Started" or "Create a Lambda function".  Then you'll be shown several Lambda blueprints from which to choose.  Do not use a blueprint.  Click the "Skip" button at the bottom.  
  <img src="http://cl.ly/31380i1d3m32/Screen%20Shot%202015-12-23%20at%206.18.52%20PM.png" alt="Skip AWS Lambda blueprint selection" style="width: 400px; vertical-align: top;"/>
  2. Configure the first function as shown in the next two screenshots.  
  <img src="http://cl.ly/2N1740203i2U/Screen%20Shot%202015-12-23%20at%206.25.28%20PM.png" alt="Skip AWS Lambda blueprint selection" style="width: 400px; vertical-align: top;"/>  
  Generate the ZIP file to upload by running `npm run build` from your cloned copy of the [serverless-buffer-app-lambda](https://github.com/crcastle/serverless-buffer-app-lambda) repo.  It will create a file named `lambda-code.zip`  
  <img src="http://cl.ly/3U3x0R1B1L1D/Screen%20Shot%202015-12-23%20at%207.20.27%20PM.png" alt="Skip AWS Lambda blueprint selection" style="max-width: 60%; vertical-align: bottom;"/>
  3. Create and configure the other two in the same way but with the following changes:
    1. scheduledTweetList
      1. Name: `scheduledTweetList`
      2. Description: `Returns all scheduled tweets to post with a specified time range`
      3. Handler: `index.scheduledTweetList`
    2. scheduledTweetWorker
      1. Name: `scheduledTweetWorker`
      2. Description: `A worker function to post scheduled tweets to Twitter.`
      3. Handler: `index.scheduledTweetWorker`
5. Alright, more than half way done.  Last big step is to create the AWS API Gateway endpoints.  The front-end code will use these HTTPS endpoints to trigger the Lambda functions and get data back from them.
  1. From the AWS API Gateway console, create a new API and set it up like the screenshots below.  
  <img src="http://cl.ly/171J0614022o/Screen%20Shot%202015-12-23%20at%2011.29.16%20PM.png" alt="Name new API" style="max-width: 60%; vertical-align: bottom;"/>
  2. Create a new resource named `scheduled-tweet`.  
  <img src="http://cl.ly/0a3Q3p3g1k2b/Screen%20Shot%202015-12-23%20at%2011.36.41%20PM.png" alt="Create new resource" style="max-width: 60%; vertical-align: bottom;"/>  
  <img src="http://cl.ly/2V0i2U013T32/Screen%20Shot%202015-12-23%20at%2011.37.40%20PM.png" alt="Name resource" style="max-width: 60%; vertical-align: bottom;"/>  
  3. Create a GET method for this resource and configure it as shown.  Note that the `Lambda Region` you choose needs to be the AWS region in which you created the Lambda functions.  If you didn't choose a region, you probably used `us-east-1`.  
  <img src="http://cl.ly/230i0Y3x1V1B/Screen%20Shot%202015-12-23%20at%2011.42.07%20PM.png" alt="Create new method" style="max-width: 60%; vertical-align: bottom;"/>  
  <img src="http://cl.ly/192e3h243A2G/Screen%20Shot%202015-12-23%20at%2011.44.34%20PM.png" alt="Configure GET method" style="max-width: 60%; vertical-align: bottom;"/>  
  4. Change the `Method Request` `Authorization Type` to `AWS_IAM`.  
  <img src="http://cl.ly/1o433k3P0E3Z/Screen%20Shot%202015-12-23%20at%2011.49.15%20PM.png" alt="Request Method" style="max-width: 60%; vertical-align: bottom;"/>  
  <img src="http://cl.ly/200L233a2D39/Screen%20Shot%202015-12-23%20at%2011.49.49%20PM.png" alt="Authorization Type" style="max-width: 60%; vertical-align: bottom;"/>  
  5. Enable `Invoke with caller credentials` from the `Integration Request` section.  
  <img src="http://cl.ly/3y0n022u1H14/Screen%20Shot%202015-12-23%20at%2011.54.20%20PM.png" alt="Integration Request" style="max-width: 60%; vertical-align: bottom;"/>  
  <img src="http://cl.ly/3q0v3U060c2H/Screen%20Shot%202015-12-23%20at%2011.54.59%20PM.png" alt="Invoke with caller credentials" style="max-width: 60%; vertical-align: bottom;"/>  
  5. Create a POST method for this resource and configure it as shown.  
  <img src="http://cl.ly/0Z2h1U2C0N1J/Screen%20Shot%202015-12-23%20at%2011.58.08%20PM.png" alt="Configure POST method" style="max-width: 60%; vertical-align: bottom;"/>  
  6. Configure the `Method Request` `Authentication Type` and `Integration Request` `Invoke with caller credentials` the same way as the GET request.
  7. Now we need to enable [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) on these two request methods so that the front-end JavaScript code is allowed to make requests to the API.
    1. Click the `scheduled-tweet` resource on the left.  Then click the `Enable CORS` button.  
    <img src="http://cl.ly/021J1j3Y1u1j/Screen%20Shot%202015-12-24%20at%2012.05.22%20AM.png" alt="Enable CORS" style="max-width: 60%; vertical-align: bottom;"/>
    2. Configure CORS as shown below.  Note that `x-amz-security-token` needs to be added to the comma-separated list in the `Access-Control-Allow-Headers` field.  
    <img src="http://cl.ly/04160R0q3q23/Screen%20Shot%202015-12-24%20at%2012.08.00%20AM.png" alt="Configure CORS" style="max-width: 60%; vertical-align: bottom;"/>  
    You should see all green check marks after confirming these changes as they are being made.
  8. Deploy a version of the API, creating a stage for it.  
    <img src="" alt="Click Deploy" style="max-width: 60%; vertical-align: bottom;"/>  
    <img src="" alt="Configure deploy and create stage" style="max-width: 60%; vertical-align: bottom;"/>  
  9. Download the JavaScript SDK for this deploy.  AWS API Gateway auto-generates the code to make HTTPS request to your API -- including the code to generate the security token for the request.  
    <img src="" alt="Download JavaScript SDK" style="max-width: 60%; vertical-align: bottom;"/>  
  10. Extract the folder in this zip into `serverless-buffer-app-gui/static/js/`.  
    <img src="" alt="Enable CORS" style="max-width: 60%; vertical-align: bottom;"/>  
6. Now we need to create a Google project whose only purpose will be for authentication for the Serverless Buffer App.  This is what will control who is allowed to login.  Only the Google account you specify will be allowed to schedule tweets and see the list of previously scheduled tweets.
  1. Create a Google project.  
    <img src="" alt="Create Google project" style="max-width: 60%; vertical-align: bottom;"/>
  2. Add an email address and product name to enable OAuth authentication in this project.  
    <img src="" alt="API Manager" style="max-width: 60%; vertical-align: bottom;"/>  
    <img src="" alt="Google OAuth email address and product name" style="max-width: 60%; vertical-align: bottom;"/>
  3. Setup OAuth and get client ID.  Save the client ID for later.  
    <img src="" alt="Create new credentials" style="max-width: 60%; vertical-align: bottom;"/>  
    <img src="" alt="Configure credentials" style="max-width: 60%; vertical-align: bottom;"/>  
    <img src="" alt="Save client ID" style="max-width: 60%; vertical-align: bottom;"/>
  4. Now create an AWS IAM role that will use Google as the authentication provider.  
    <img src="" alt="Create IAM role" style="max-width: 60%; vertical-align: bottom;"/>  
    <img src="" alt="Name IAM role" style="max-width: 60%; vertical-align: bottom;"/>  
    <img src="" alt="Grant web access to identity providers" style="max-width: 60%; vertical-align: bottom;"/>  
    <img src="" alt="Choose Google and paste client ID" style="max-width: 60%; vertical-align: bottom;"/>  
    <img src="" alt="Restrict to your Google account ID" style="max-width: 60%; vertical-align: bottom;"/>  
  5. Copy/paste the new role's ARN to the serverless-buffer-app-gui config file.  
    <img src="" alt="Copy/paste role ARN" style="max-width: 60%; vertical-align: bottom;"/>  


## Contributing
I'd love your help!  Check out the [open issues](https://github.com/crcastle/serverless-buffer-app-gui/issues) to find something you can help on.

## License
##### [ISC License](https://opensource.org/licenses/ISC) (MIT-like, but better)
Copyright (c) 2015, Chris Castle

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
