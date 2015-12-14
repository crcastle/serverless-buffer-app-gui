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
                <li><login></login></li>
              </ul>
            </nav>
          </div>
        </div>

        <div class="inner cover">
          <div class="alert alert-danger alert-dismissible" v-if="showError" transition="expand" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="showError = false"><span aria-hidden="true">&times;</span></button>
            <strong>Error!</strong> {{message}}
          </div>
          <div class="alert alert-success" v-if="showSuccess" transition="expand" role="alert">
            <strong>Success!</strong> {{message}}
          </div>
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
  </div>
</template>


<script>
import Login from './Login.vue'
import store from './../store'

export default {
  name: 'App',
  components: {
    Login
  },

  data: () => {
    return {
      showError: false,
      showSuccess: false,
      message: '',
      store: store
    }
  },

  events: {
    'logged-in': function(googleUser) {
      store.user.authenticated = true
      store.setGoogleUser(googleUser)
    },
    'logged-out': function() {
      store.user.authenticated = false
    },
    'error': function(message) {
      console.error(message)
      this.message = message
      this.showError = true
    },
    'success': function(message) {
      console.info(message)
      this.message = message
      this.showSuccess = true

      const that = this
      setTimeout(function() {
        that.showSuccess = false
        that.message = ''
      },3000)
    }
  }
}
</script>


<style>
/* always present */
.expand-transition {
  transition: all .3s ease;
  height: 50px;
  /*padding: 15px;*/
  /*margin-bottom: 20px;*/
}

/* .expand-enter defines the starting state for entering */
/* .expand-leave defines the ending state for leaving */
.expand-enter, .expand-leave {
  height: 0;
  /*padding: 0 10px;*/
  /*opacity: 0;*/
}
</style>
