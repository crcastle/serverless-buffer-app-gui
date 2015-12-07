import Vue from 'vue'
import Router from 'vue-router'
import { fromNow } from './filters'
import App from './components/App.vue'
import Home from './components/Home.vue'
import ScheduleTweet from './components/ScheduleTweet.vue'
import TweetView from './components/TweetView.vue'

// install router
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
    component: ScheduleTweet
  },
  '/scheduled': {
    component: TweetView
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/'
})

router.start(App, '#app')
