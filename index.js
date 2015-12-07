console.log('Loading function');

var Twitter = require('twitter');

var config = require('./config.json').development;
var client = new Twitter({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token_key: config.access_token_key,
  access_token_secret: config.access_token_secret,
});

/**
 * Provide an event that contains the following key:
 *
 *   - operation: one of the operations in the switch statement below
 */
exports.handler = function(event, context) {
    console.log('Received event:', JSON.stringify(event, null, 2));

    var operation = event.operation;

    switch (operation) {
        case 'create':
            var status = event.status;
            if (!status) {
              return context.fail(new Error('Invalid or missing "status" parameter.'));
            }

            client.post('statuses/update', {status: status},  function(error, tweet, response){
              if(error) {
                console.error('Error posting tweet');
                console.error(error);
                return context.fail(new Error('Error posting tweet: ' + error));
              }

              console.info('Tweet posted');
              console.info(tweet);  // Tweet body.
              return context.succeed(tweet);
            });
            break;
        case 'ping':
            return context.succeed('pong');
        default:
            context.fail(new Error('Unrecognized operation "' + operation + '"'));
    }
};
