<template>
  <div>
    <TodoItem
      v-for="(todo, i) of todos"
      :key="todo._id"
      v-bind:todo="todo"
      v-bind:index="i"
    />
  </div>
</template>

<script>
import TodoItem from "@/components/todo/ToDoItem";

export default {
  props: {
    todos: {
      type: Array
    },
  },
  components: {
    TodoItem,
  }
};
</script>