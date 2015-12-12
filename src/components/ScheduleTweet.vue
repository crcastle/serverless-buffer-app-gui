<template>
  <div>
    <textarea class="new-tweet"
              autofocus autcomplete="off"
              placeholder="What's the happs?"
              v-model="newTweet"
              rows="8" cols="40"></textarea>
    <input id="datetimepicker" size="16"
              type="text" v-model="date">
    <button class="btn btn-primary" id="schedule-tweet" v-on:click="scheduleTweet">Schedule Tweet</button>


    <!-- TODO: move modal to App.vue -->
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
      date: null,
      error: null,
      success: null
    }
  },

  computed: {
    isoDate: function() {
      return new Date(this.date).toISOString()
    },
    millisecondsUtcDate: function() {
      return new Date(this.date).valueOf()
    }
  },

  methods: {
    scheduleTweet: function(event) {
      let that = this
      this.$root.store.createNewScheduledTweet(this.newTweet, this.millisecondsUtcDate, function(err, response) {
        if (err) {
          console.error('Error creating tweet');
          console.error(err);
          return;
        }

        console.info(response)
        that.newTweet = ''
      })
    }
  },
  ready: () => {
    $('#datetimepicker').datetimepicker({
      showMeridian: true,
      minuteStep: 15
    })
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
