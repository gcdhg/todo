<template>
  <b-container fluid>
    <div v-if="tasks.length">
      <TaskIteam
        v-for="(task, i) of tasks"
        :key="task._id"
        v-bind:index="i"
        v-bind:task="tasks"
      />
    </div>
    <div v-else>no tasks created yet!</div>
  </b-container>
</template>

<script>
import TaskIteam from "../Task/TaskIteam";

export default {
  props: {
    tasks: {
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