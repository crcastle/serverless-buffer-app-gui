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
    scheduleTweet: function(text, event) {
      // alert(this.newTweet);
      // this.newTweet = '';
      // console.log(event);

      store.test('hi there', 42)
      // store.scheduleTweet(text, function(error, response) {
      //   if (error) { console.log('error posting tweet') }
      //
      //   console.log('tweet posted')
      // })
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
