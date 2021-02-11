<template>
  <div>
    hi there
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      this.$router.go(`join`);
    });
  },
};
</script>
