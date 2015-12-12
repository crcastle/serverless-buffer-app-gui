const store = Object.create(null)
export default store

store.googleUser = null
store.user = Object.create(null)
store.user.authenticated = false

store.test = (text, cb) => {
  console.log(text)
}

store.setGoogleUser = (user) => {
  store.googleUser = user
}

store.createNewScheduledTweet = (text, date, cb) => {
  getAwsClient(function(err, client) {
    if (err) { cb(err, null); return; }

    // set params for AWS API Gateway request to make tweet
    var params            = {};
    var body              = { "operation": "create",
                              "status": text,
                              "date": date };
    var additionalParams  = {};

    // send request to schedule tweet
    client.scheduledTweetPost(params, body, additionalParams)
      .then(function(result) {
        cb(null, result);
      }).catch(function(result) {
        console.error('Error scheduling tweet');
        console.error(result);
        cb(result, null);
      });
  });
}

store.createNewTweet = (text, cb) => {
  getAwsClient(function(err, client) {
    if (err) { cb(err, null); return; }

    // set params for AWS API Gateway request to make tweet
    var params            = {};
    var body              = { "operation": "create", "status": text };
    var additionalParams  = {};

    // send request to make tweet
    client.tweetPost(params, body, additionalParams)
      .then(function(result){
          cb(null, result);
      }).catch( function(result){
          console.error('Error posting tweet');
          console.error(result);
          cb(result, null);
      });
  });
}

function getAwsClient(cb) {
  var idToken = store.googleUser.getAuthResponse().id_token
  AWS.config.region = 'us-west-2'
  AWS.config.credentials = new AWS.WebIdentityCredentials({
    RoleArn: 'arn:aws:iam::765429118403:role/serverless-buffer-app',
    WebIdentityToken: idToken
  })

  AWS.config.credentials.refresh(function(err) {
    if (err) { console.log('Error getting AWS credentials.'); console.log(err); return; }
    // console.log(AWS.config.credentials);

    var apigClient = apigClientFactory.newClient({
        accessKey: AWS.config.credentials.accessKeyId,
        secretKey: AWS.config.credentials.secretAccessKey,
        sessionToken: AWS.config.credentials.sessionToken //OPTIONAL: If you are using temporary credentials you must include the session token
        // region: 'eu-west-1' // OPTIONAL: The region where the API is deployed, by default this parameter is set to us-east-1
    });
    cb(null, apigClient);
  });
}
