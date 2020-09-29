<template>
  <div class="card">
    <div class="card-header">
      {{ todo.title | uppercase }}
      <b-badge variant="success" v-if="todo.completed"
        >&check; completed</b-badge
      >
      <button
        type="button"
        class="close"
        aria-label="Close"
        v-on:click="$emit('remove-todo', todo._id)"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <div class="card-body">
      <small id="titleHelp" class="form-text text-muted">
        Please fill out this field. {{ todo.createdAt }}
      </small>
      <div style="white-space: pre-line" class="card-text">{{ todo.body }}</div>
      <div class="btn-group">
        <b-button
          variant="success"
          v-on:click="$emit('complete-todo', todo._id)"
        >
          Done
        </b-button>
        <b-button
          v-bind:href="'/edit/' + todo._id"
          variant="primary"
          v-on:click="$emit('edit-todo', todo._id)"
        >
          Edit
        </b-button>
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
  data() {
    return {
      username: "",
    };
  },
  filters: {
    uppercase(value) {
      return value.toUpperCase();
    },
  },
};
</script>
