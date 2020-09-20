<template>
  <div class="home">
    <Loader v-if="loading" />
    <ToDoList 
      v-else-if="todos.length"
      v-bind:todos="todos"
    />
    <p v-else>No todos!</p>
  </div>
</template>

<script>
import ToDoList from '@/components/ToDoList.vue'
import Loader from '@/components/Loader'

import fetch from 'node-fetch'

export default {
  name: 'app',
  data() {
    return {
      todos: [],
      loading: true,
    }
  },
  mounted() {
    fetch('http://localhost:3000')
      .then(res => res.json())
      .then(json => {
        setTimeout(() => {
          this.todos = json
          this.loading = false
        }, 0)
      })
  },
  components: {
    ToDoList, Loader
  }
}
</script>
