<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <ToDoList>

    </ToDoList>
  </div>
</template>

<script>
import ToDoList from './components/ToDoList.vue';

const API_URL = 'http://localhost:3000';

export default {
  name: 'App',
  components: {
    ToDoList,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
