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
        v-on:click="removeTodoForThisUser"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <div class="card-body">
      <div class="container">
        <div class="row">
          <small id="titleHelp" class="form-text text-muted pader">
            Created at: {{ todo.createdAt | dateTimeFormater }}
          </small>
          <small
            id="titleHelp"
            class="form-text text-muted pader"
            v-if="todo.completedAt"
            >Completed at: {{ todo.completedAt | dateTimeFormater }}</small
          >
        </div>
      </div>

      <div style="white-space: pre-line" class="card-text">{{ todo.body }}</div>
      <div class="btn-group">
        <b-button variant="success" v-on:click="completeTodoForThisUser">
          Done
        </b-button>
        <b-button v-bind:href="'/edit/' + todo._id" variant="primary">
          Edit
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

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
    dateTimeFormater(value) {
      const ye = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(Date.parse(value));
      return ye;
    },
  },
  methods: {
    ...mapActions(["REMOVE_TODO", "COMPLETE_TODO"]),

    async removeTodoForThisUser() {
      this.REMOVE_TODO(this.todo);
    },

    async completeTodoForThisUser() {
      this.COMPLETE_TODO(this.todo);
    },
  },
};
</script>

<style scoped>
.pader {
  padding-right: 10px;
}
</style>