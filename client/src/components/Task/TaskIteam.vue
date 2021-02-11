<template>
  <div class="mt-3">
    <b-card-group deck>
      <b-card bg-variant="light" class="text-left">
        <b-card-text>
          {{ task[index].title }}
        </b-card-text>
      </b-card>
    </b-card-group>
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
  methods: {
    async editTask() {},
    async deletTask() {},
  },
};
</script>
