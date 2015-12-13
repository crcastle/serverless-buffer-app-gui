<template>
  <div>
    <div id="login"></div>
  </div>
</template>

<script>
// console.log(gapi)
export default {
  name: 'Login',
  methods: {
    onSuccess(googleUser) {
      console.log('*** User authenticated successfully')
      this.$dispatch('logged-in', googleUser)
    },
    onFailure(error) {
      console.log('*** User authentication failed')
      this.$dispatch('logged-out')
    }
  },

  ready() {
    window.gapi.signin2.render('login', {
      'scope': 'https://www.googleapis.com/auth/plus.login',
      // 'width': 250,
      // 'height': 50,
      // 'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSuccess,
      'onfailure': this.onFailure
    });
  }
}
</script>
