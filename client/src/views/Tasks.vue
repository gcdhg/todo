<template>
  <b-container fluid>
    <b-row>
      <Options v-bind:project="RETURN_ONE_PROJECT" />
    </b-row>
    <b-row>
      <b-form-input
        v-model="title"
        placeholder="Enter new task"
        @keyup.enter="createNewTask"
      ></b-form-input>
    </b-row>
    <b-row>
      <h1>
        <TaskList v-bind:tasks="RETURN_USER_DATA.tasks" />
      </h1>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Options from "../components/Project/Options";
import TaskList from "../components/Task/TaskList";

export default {
  data() {
    return {
      title: "",
    };
  },
  components: {
    Options,
    TaskList,
  },
  computed: mapGetters(["RETURN_ONE_PROJECT"]),
  async mounted() {
    this.GET_ONE_PROJECT(this.$route.params.project);
  },
  methods: {
    ...mapActions(["GET_ONE_PROJECT", "CREATE_NEW_TASK"]),
    async createNewTask() {
      const body = {
        title: this.title,
        project: this.RETURN_ONE_PROJECT._id,
      };
      this.CREATE_NEW_TASK(body);
    },
  },
};
</script>