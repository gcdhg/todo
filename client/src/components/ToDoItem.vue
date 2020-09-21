<template>
  <div class="card">
    <div class="card-header">{{todo.title | uppercase}}</div>
    <div class="card-body">
      <div class="card-text">{{todo.body}}</div>
      <br>
      <div class="btn-group">
        <form action="/" method="PUT">
          <b-button variant="success" v-on:click="$emit('complete-todo', todo._id)">Done</b-button>
        </form>
        <form action="/" method="GET">
          <b-button variant="primary" v-on:click="$emit('update-todo', todo._id)">Update</b-button>
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
