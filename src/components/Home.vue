<template>
  <div>
    <p class="lead">I wanted to send some tweets about important stuff worth sharing™.
    But not all at once and piss off all my people!</p>
    <p class="lead">I could use <a href="https://buffer.com">Buffer</a>...
    <br>Or I could build something myself and run it for pocket change per month!</p>
    <div id="made-up-of">
      <ul>
        <li><a href="http://vuejs.org"><img class="logo" id="vue" src="/static/img/vuejs.svg" alt="Vue.js"></a><br>Vue.js as a single page app framework.</li>
        <li><a href="https://pages.github.com/"><img class="logo" id="github" src="/static/img/octocat.svg" alt="AWS S3"></a><br>GitHub Pages to serve the single page app.</li>
        <li><a href="https://aws.amazon.com/lambda/"><img class="logo" src="/static/img/lambda.svg" alt="AWS Lambda"></a><br>AWS Lambda to schedule and send tweets to Twitter.</li>
        <li><a href="https://aws.amazon.com/api-gateway/"><img class="logo" src="/static/img/api-gateway.svg" alt="AWS API Gateway"></a><br>AWS API Gateway to expose AWS Lambda functions over HTTPS.</li>
        <li><a href="https://aws.amazon.com/dynamodb/"><img class="logo" src="/static/img/dynamodb.svg" alt="AWS DynamoDB"></a><br>AWS DynamoDB to store scheduled tweets.</li>
        <li><a href="https://aws.amazon.com/iam/"><img class="logo" id="iam" src="/static/img/iam.svg" alt="AWS IAM"></a><br>AWS IAM (and Google OpenID) so that only I can schedule and post tweets.</li>
      </ul>
    </div>
    <em>No server setup or ongoing administration.<br>An order of magnitude cheaper than an EC2 micro instance!</em><br>
    <a href="https://github.com/crcastle/serverless-buffer-app#readme" class="btn btn-lg btn-default">Learn More</a>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style>
p.lead {
  font-weight: 200;
}

.lead a, #made-up-of a
{ color: #aaa; text-decoration: underline; }

#made-up-of {
  margin-top: 50px;
}

#made-up-of ul {
  overflow: auto;
  list-style-type: none;
}

#made-up-of li {
  width: 100px;
  float: left;
  margin-right: 0px;
  padding: 0 20px;
  color: #aaa;
  font-size: 10px;
}

#made-up-of .logo {
  width: 50px;
}

#made-up-of .logo#iam {
  width: 30px;
}

#made-up-of .logo#vue {
  width: 70px;
}

#made-up-of .logo#github {
  width: 60px;
}


a.btn {
  margin: 20px;
}
</style>
