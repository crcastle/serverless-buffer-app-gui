<template>
  <div class="site-wrapper">

    <div class="site-wrapper-inner">

      <div class="cover-container">

        <div class="masthead clearfix">
          <div class="inner">
            <h3 class="masthead-brand">Serverless Buffer App</h3>
            <nav>
              <ul class="nav masthead-nav">
                <li><a v-link="{ path: '/', exact: true }">Home</a></li>
                <li><a v-link="{ path: '/tweet' }">Schedule<br>a Tweet</a></li>
                <li><a v-link="{ path: '/scheduled' }">Scheduled<br>Tweets</a></li>
              </ul>
            </nav>
          </div>
        </div>

        <div class="inner cover">
          <div>
            <!-- main view -->
            <router-view
              class="view"
              keep-alive
              transition
              transition-mode="out-in">
            </router-view>
          </div>
        </div>

        <div class="mastfoot">
          <div class="inner">
            <p>by <a href="https://crc.io">Chris Castle</a>, <a href="https://twitter.com/crc">@crc</a></p>
          </div>
        </div>

      </div>

    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="static/js/jquery.min.js"><\/script>')</script>
    <script src="static/js/bootstrap.min.js"></script>
    <script src="static/js/ie10-viewport-bug-workaround.js"></script>
  </div>
</template>


<style>
</style>
