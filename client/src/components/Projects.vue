<template>
  <div class="container">
    <b-row>
      <b-form-input
        v-model="title"
        placeholder="Enter new project name"
        @keyup.enter="creteProject"
      ></b-form-input>
    </b-row>
    <b-row>
      <!-- {{ RETURN_ALL_PROJECTS.map((p) => p.title) }} -->
      <ProjectList v-bind:projects="RETURN_ALL_PROJECTS" />
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import ProjectList from "../components/Project/ProjectList";

export default {
  data() {
    return {
      title: "",
    };
  },
  async mounted() {
    await this.GET_ALL_PROJECTS();
  },
  computed: mapGetters(["RETURN_ALL_PROJECTS"]),
  methods: {
    ...mapActions(["GET_ALL_PROJECTS", "CREATE_PROJECT"]),
    async creteProject() {
      await this.CREATE_PROJECT({ title: this.title });
      this.title = "";
    },
  },
  components: {
    ProjectList,
  },
};
</script>
