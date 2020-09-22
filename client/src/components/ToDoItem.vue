<template>
  <div class="card">
    <div class="card-header">
      {{todo.title | uppercase}}
      <a v-if="todo.completed">&check; completed</a>
    </div>
    <div class="card-body">
      <div style="white-space: pre-line;" class="card-text">{{todo.body}}</div>
      <div class="btn-group">
        <form action="/" method="PUT">
          <b-button variant="success" v-on:click="$emit('complete-todo', todo._id)">Done</b-button>
        </form>
        <form action="/" method="GET">
          <b-button v-bind:href="'/edit/' + todo._id" variant="primary" v-on:click="$emit('edit-todo', todo._id)">Edit</b-button>
        </form>
        <form action="/" method="DELETE">
          <b-button variant="danger" v-on:click="$emit('remove-todo', todo._id)">Delete</b-button>
        </form>
      </div>
    </div>
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
