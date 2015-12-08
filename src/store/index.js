export default {

  test: (text, num) => {
    console.log(text);
    console.log('the num is ' + num)
  },

  scheduleTweet: (text, callback) => {
    AWS.config.region = 'us-west-2'
    AWS.config.credentials = new AWS.WebIdentityCredentials({
      RoleArn: 'arn:aws:iam::765429118403:role/serverless-buffer-app',
      WebIdentityToken: googleUser.po.id_token
    })

    AWS.credentials.refresh(function(err) {
      if (err) { console.log('Error getting AWS credentials.'); console.log(err); return; }
      // console.log(AWS.config.credentials);

      var apigClient = apigClientFactory.newClient({
          accessKey: AWS.config.credentials.accessKeyId,
          secretKey: AWS.config.credentials.secretAccessKey,
          sessionToken: AWS.config.credentials.sessionToken //OPTIONAL: If you are using temporary credentials you must include the session token
          // region: 'eu-west-1' // OPTIONAL: The region where the API is deployed, by default this parameter is set to us-east-1
      });

      var params            = {};
      var body              = { "operation": "create",
                                "status": "Hi from Serverless Buffer App. test" + Math.floor(Math.random()*1000000) };
      var additionalParams  = {};

      apigClient.tweetPost(params, body, additionalParams)
          .then(function(result){
              //This is where you would put a success callback
              console.log('Success!');
              console.log(result);
              callback(null, result)
          }).catch( function(result){
              //This is where you would put an error callback
              console.log('Error');
              console.log(result);
              callback(result, null)
          });
    });
  }
}
