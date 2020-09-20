<template>
  <div class="container">
    <TodoItem v-for="(todo, i) of todos" 
        :key="todo"
        v-bind:todo="todo" 
        v-bind:index="i"
    />
  </div>
</template>

<script>
import TodoItem from '@/components/ToDoItem'

export default {
  props: ["todos"],
  components: {
    TodoItem,
  },
};
</script>