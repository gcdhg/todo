<template>
  <b-container fluid>
    <div v-if="projects.length">
      <ProjectIteam
        v-for="(project, i) of projects"
        :key="project._id"
        v-bind:index="i"
        v-bind:project="projects"
      />
    </div>
    <div v-else>no projects created yet!</div>
  </b-container>
</template>

<script>
import ProjectIteam from "../Project/ProjectIteam";

export default {
  props: {
    projects: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  components: {
    ProjectIteam,
  },
};
</script>