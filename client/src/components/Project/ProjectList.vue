<template>
  <b-container fluid>
    <div v-if="projects.length">
      <ProjectIteam
        v-for="(task, i) of projects"
        :key="task._id"
        v-bind:index="i"
        v-bind:task="projects"
      />
    </div>
    <div v-else>no projects created yet!</div>
  </b-container>
</template>

<script>
import TaskIteam from "../Task/TaskIteam";

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
    TaskIteam,
  },
};
</script>
