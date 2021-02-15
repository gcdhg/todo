<template>
  <div class="container">
    <b-row>
      <b-form-input
        v-model="title"
        placeholder="Enter new task"
        @keyup.enter="createNewTask"
      ></b-form-input>
    </b-row>
    <!-- {{ GET_PRIVATE_TASKS }} -->
    <b-row>
      <TaskList v-bind:tasks="GET_PRIVATE_TASKS" />
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TaskList from "./Task/TaskList";

export default {
  data() {
    return {
      title: "",
    };
  },
  computed: mapGetters(["RETURN_USER_DATA", "GET_PRIVATE_TASKS"]),
  methods: {
    ...mapActions(["CREATE_NEW_TASK", "GET_ALL_USER_TASKS"]),
    async createNewTask() {
      await this.CREATE_NEW_TASK({ title: this.title });
      this.title = "";
    },
  },
  async mounted() {
    await this.GET_ALL_USER_TASKS();
  },
  components: {
    TaskList,
  },
};
</script>
