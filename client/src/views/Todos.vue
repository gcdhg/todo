<template>
  <div class="home">
    <Loader v-if="returnLoading" />
    <ToDoList
      v-else-if="returnTodos.length"
      v-bind:todos="returnTodos"
      @complete-todo="completeTodoForThisUser"
      @remove-todo="removeTodoForThisUser"
    />
    <p v-else>No todos!</p>

    {{getToken}}
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

let returnData = {
  loading: false,
};

export default {
  name: "todo",
  data() {
    return returnData;
  },
  async mounted() {
    this.updateData(localStorage.token);
  },
  components: usedComponents,
  computed: mapGetters(["returnTodos", "returnLoading", "getToken"]),
  methods: {
    ...mapActions(["removeTodo", "completeTodo", "updateData"]),
    removeTodoForThisUser(id) {
      this.removeTodo(id);
    },

    completeTodoForThisUser(id) {
      this.completeTodo(id);
    },
  },
};
</script>
