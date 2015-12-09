<template>
  <div>
    <textarea class="new-tweet"
              autofocus autcomplete="off"
              placeholder="What's the happs?"
              v-model="newTweet"
              rows="8" cols="40"></textarea>
    <button id="schedule-tweet" v-on:click="scheduleTweet">Show Modal</button>



    <!-- use the modal component, pass in the prop -->
    <modal :show.sync="showModal">
      <!--
        you can use custom content here to overwrite
        default content
      -->
      <h3 slot="header">custom header</h3>
    </modal>
</template>


<script>
// Get modal component to use for error messages from Twitter
import Modal from './Modal.vue'
import store from './../store'

export default {
  name: 'ScheduleTweet',

  components: {
    'modal': Modal
  },

  data () {
    return {
      showModal: false,
      newTweet: '',
      error: null,
      success: null
    }
  },

  methods: {
    scheduleTweet: function(event) {
      let that = this
      this.$root.store.createNewScheduledTweet(this.newTweet, function(err, response) {
        if (err) { console.log('Error creating tweet'); console.log(err); }
        console.log(response)
        that.newTweet = ''
      })
    }
  }
}
</script>


<style>
textarea {
  background-color: #ccc;
  color: #666;
  font-size: 2em;
}

button.submit {
  margin: 20px;
}
</style>
