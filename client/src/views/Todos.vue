<template>
  <div>
    <div v-if="!returnUserAuthenticated" class="container col-6">
      <div class="card">
        <div class="card-body">
          <h2 class="card-title text-center">
            Please login or create new user account
          </h2>
          <hr />
          <h5 class="card-text text-center">
            <a class="dashed" href="/login">Login</a>
            <a class="dashed" href="https://github.com/gcdhg/todo"
              >Source code on github</a
            >
          </h5>
        </div>
      </div>
    </div>
    <div v-else class="container">
      <h3 class="text-left">Incoming:</h3>
      <div>
        <b-button v-b-toggle.collapse-create-new-todo variant="outline-danger">
          <b-icon class="align-centr" icon="plus" aria-hidden="true"></b-icon>
          new todo</b-button
        >
        <b-collapse id="collapse-create-new-todo" class="mt-2">
          <b-card>
            <Create />
          </b-card>
        </b-collapse>
      </div>
      <hr />

      <Loader v-if="returnLoading" />

      <ToDoList
        v-if="returnTodos.length"
        v-bind:todos="returnTodos"
        @complete-todo="completeTodoForThisUser"
        @remove-todo="removeTodoForThisUser"
      />
      <div class="text-center" v-else>
        <h1>No todos!</h1>
        <h2>you've completed all tasks</h2>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import fetch from "node-fetch";
import { mapGetters, mapActions } from "vuex";

import ToDoList from "@/components/ToDoList.vue";
import Loader from "@/components/Loader.vue";
import Create from "@/views/Create.vue";

const usedComponents = {
  ToDoList,
  Loader,
  Create,
};

export default {
  name: "todo",
  async created() {
    this.updateData(localStorage.token);
  },
  components: usedComponents,
  computed: mapGetters([
    "returnTodos",
    "returnLoading",
    "returnUserAuthenticated",
  ]),
  methods: {
    ...mapActions(["removeTodo", "completeTodo", "updateData"]),
    async removeTodoForThisUser(id) {
      this.removeTodo(id);
    },

    async completeTodoForThisUser(id) {
      this.completeTodo(id);
    },
  },
};
</script>

<style scoped>
.dashed {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-decoration-line: underline;
  text-align: center;
  margin-right: 10px;
}
</style>