<template>
  <div id="app">
    <Nav />
    
    <router-view />
  </div>
</template>

<script>
import Nav from "./components/Layout/Navbar";

export default {
  components: {
    Nav,
  },
};
</script>
