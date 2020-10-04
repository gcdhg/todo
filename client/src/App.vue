<template>
  <div id="app">
    <Header
    />
    <div id="nav"></div>
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'

export default {
  name: "App",
  components: {
    Header
  },
}
</script>
