<template>
  <div>
    <b-form-input
      v-model="newProject"
      placeholder="Enter new project name"
      required
    ></b-form-input>
    <b-button class="padding" variant="success" v-on:click="createNewProject" size="sm"
      >Create new project</b-button
    >
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      newProject: "",
    };
  },
  methods: {
    ...mapActions(["CREATE_NEW_PROJECT"]),
    async createNewProject() {
      this.CREATE_NEW_PROJECT(this.newProject);
      this.newProject = "";
    },
  },
};
</script>

<style scoped>
.padding {
  margin-top: 10px;
}
</style>