<template>
  <div>
    <textarea name="name" rows="8" cols="40"></textarea>
    <button id="show-modal" @click="showModal = true">Show Modal</button>

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
import Modal from './Modal.vue'

export default {
  name: 'ScheduleTweet',

  components: {
    Modal
  },

  data () {
    return {
      showModal: false
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
