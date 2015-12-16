<template>
  <div>
    <textarea v-bind:disabled="schedulingInProgress"
              class="new-tweet"
              autofocus autcomplete="off"
              placeholder="What's the happs?"
              v-model="newTweet"
              rows="5" cols="40"></textarea>
    <input v-bind:disabled="schedulingInProgress"
           id="datetimepicker" size="16"
           data-date-format="mm/dd/yyyy hh:ii"
           type="text" v-model="date"></input>
    <button v-bind:disabled="buttonDisabled"
            class="btn btn-default btn-lg"
            id="schedule-tweet"
            v-on:click="scheduleTweet">
              <i v-if="schedulingInProgress" class="fa fa-refresh fa-spin"></i>
              Schedule Tweet</button>
    <span id="characters-left" v-bind:class="{ 'red': isTooLong }">{{charactersLeft}} characters left</span>
</template>


<script>
import store from './../store'
import twttr from 'twitter-text'

export default {
  name: 'ScheduleTweet',

  data () {
    return {
      newTweet: '',
      date: null,
      error: null,
      success: null,
      schedulingInProgress: false
    }
  },

  computed: {
    millisecondsUtcDate: function() {
      return new Date(this.date).valueOf()
    },
    charactersLeft: function() {
      if (this.newTweet.length == 0) return 140
      return 140 - twttr.getTweetLength(this.newTweet)
    },
    isTooLong: function() {
      return this.charactersLeft < 0
    },
    buttonDisabled: function() {
      return this.schedulingInProgress || this.isTooLong
    }
  },

  methods: {
    scheduleTweet: function(event) {
      let that = this
      this.schedulingInProgress = true
      this.$root.store.createNewScheduledTweet(this.newTweet, this.millisecondsUtcDate, function(err, response) {
        that.schedulingInProgress = false
        if (err) {
          console.error('Error scheduling tweet');
          console.error(err);
          that.$dispatch('error', 'Tweet was not scheduled.')
          return;
        }

        console.info(response)
        that.$dispatch('success', 'Tweet scheduled.')
        that.newTweet = ''
        that.date = ''
      })
    }
  },
  ready: () => {
    $('#datetimepicker').datetimepicker({
      autoclose: true,
      todayBtn: true,
      todayHighlight: true,
      pickerPosition: 'top-right',
      showMeridian: true,
      viewSelect: 'decade'
    })
  }
}
</script>


<style>
textarea {
  background-color: #333;
  color: #999;
  font-size: 2em;
}

input {
  text-align: center;
  background-color: #333;
  color: #999;
  font-size: 1.5em;
  margin-top: 5px;
}

.datetimepicker {
  background-color: #eee;
}

.datetimepicker table tr td,
.datetimepicker table thead,
.datetimepicker table tfoot {
  color: #333;
}

[class*=" datetimepicker-dropdown-top"]:after {
  border-top: 6px solid #eee;
}

button {
  margin-top: -7px;
}

#characters-left { color: #ccc; }
#characters-left.red { color: rgba(220, 78, 65, 1); }
</style>
