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
      gridColumns: ['postOn', 'created', 'text'],
      gridData: [
        { postOn: 'hi', created: 'bye', text: 'hello'},
        { postOn: 'yo', created: 'asdf', text: 'lkjh'}
      ]
    }
  }
}
</script>

<style>
#grid {
  text-align: center;
}
</style>
