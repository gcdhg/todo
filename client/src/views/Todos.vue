<template>
  <div class="home">
    <div v-if="!returnUserAuthenticated" class="container col-6">
      <div class="card">
        <div class="card-body">
          <h2 class="card-title text-center">
            Please login or create new user account
          </h2>
          <hr />
          <h5 class="card-text text-center">
            <a class="dashed" href="/login">Login</a>
            <a class="dashed" href="https://github.com/gcdhg/todo">Source code on github</a>
          </h5>
        </div>
      </div>
    </div>
    <div v-else>
      <Loader v-if="returnLoading" />
      <ToDoList
        v-if="returnTodos.length"
        v-bind:todos="returnTodos"
        @complete-todo="completeTodoForThisUser"
        @remove-todo="removeTodoForThisUser"
      />
      <p v-else>No todos!</p>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import fetch from "node-fetch";
import { mapGetters, mapActions } from "vuex";

import ToDoList from "@/components/ToDoList.vue";
import Loader from "@/components/Loader.vue";

const usedComponents = {
  ToDoList,
  Loader,
};

export default {
  name: "todo",
  async mounted() {
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