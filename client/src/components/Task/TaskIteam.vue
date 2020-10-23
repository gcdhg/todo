<template>
  <div>
    {{ task[index].title }}
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    index: Number,
  },
};
</script>