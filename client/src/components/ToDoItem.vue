<template>
  <div class="container">
    <li>
      <div v-bind:class="{done: todo.completed}">
        <form action="/{todo.id}" method="post"></form>
        <input
          type="checkbox"
          v-if="todo.completed"
          checked
          v-on:change="todo.completed = !todo.completed"
        />
        <input
          type="checkbox"
          v-if="!todo.completed"
          unchecked
          v-on:change="todo.completed = !todo.completed"
        />
        <strong>{{index + 1}}</strong>
        <a>{{todo.title | uppercase}}</a>
        <br />
        <a>{{todo.body}}</a>
      </div>
      <b-button variant="success" v-on:click="$emit('remove-todo', todo.id)">Complite</b-button>
      <b-button variant="primary" v-on:click="$emit('remove-todo', todo.id)">Update</b-button>
      <b-button variant="danger" v-on:click="$emit('remove-todo', todo.id)">delete</b-button>
      <form />
    </li>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
    index: Number,
  },
  filters: {
    uppercase(value) {
      return value.toUpperCase();
    },
  },
};
</script>

<style scoped>
li {
  border: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  margin-bottom: 1rem;
}

.rm {
  background: red;
  color: #fff;
  border-radius: 50%;
  font-weight: bold;
}

input {
  margin-right: 1rem;
}

.done {
  text-decoration: line-through;
}
</style>