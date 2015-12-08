import Vue from 'vue'
import Router from 'vue-router'
import { fromNow } from './filters'
import App from './components/App.vue'
import Home from './components/Home.vue'
import ScheduleTweet from './components/ScheduleTweet.vue'
import TweetView from './components/TweetView.vue'

// install plugins
Vue.use(Router)

// register filters globally
Vue.filter('fromNow', fromNow)

// routing
var router = new Router({
  linkActiveClass: 'active'
})

router.map({
  '/': {
    component: Home
  },
  '/tweet': {
    component: ScheduleTweet,
    auth: true
  },
  '/scheduled': {
    component: TweetView,
    auth: true
  }
})

// always scroll to the top when changing page
router.beforeEach(function () {
  window.scrollTo(0, 0)
})

// check if user is authenticated on certain pages
router.beforeEach(function (transition) {
  // if (transition.to.auth) {
    // if (isAuthenticated)
      transition.next()
    // } else {
      // transition.abort()
    //}
  // }
})

router.redirect({
  '*': '/'
})

router.start(App, '#app')
