<template>
  <div id="grid">
    <form id="search">
      Search <input name="query" v-model="searchQuery">
    </form>
    <grid
      :data="gridData"
      :columns="gridColumns"
      :filter-key="searchQuery">
    </grid>
  </div>
</template>

<script>
import Grid from './Grid.vue'
export default {
  name: 'TweetView',
  components: {
    Grid
  },

  data: () => {
    return {
      searchQuery: '',
      gridColumns: ['createdDate', 'postedDate', 'statusText'],
      gridData: [
        { createdDate: 123, postedDate: 'hi', statusText: 'hello'}
      ]
    }
  },

  route: {
    data: (transition) => {
      let that = this
      transition.from.router.app.store.getScheduledTweets(null, null, function(err, response) {
        if (err) {
          console.error('Error getting scheduled tweets');
          console.error(err);
          transition.from.router.app.$emit('error', 'Could not get scheduled tweets.')
          return;
        }

        console.info(response)
        transition.next({ gridData: response.data.Items })
      })
    }
  }
}
</script>

<style>
#grid {
  text-align: center;
}
</style>
