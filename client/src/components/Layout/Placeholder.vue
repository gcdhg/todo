<template>
  <b-container>
    <div class="card">
      <div class="card-body">
        <h2 class="card-title text-center">
          Please login or create new user account
        </h2>
        <hr />
        <h5 class="card-text text-center">
          <a class="dashed" href="/join">Create user</a>
          <a class="dashed" href="/login">Login</a>
          <a class="dashed" href="https://github.com/gcdhg/todo">
            Source code on github
          </a>
        </h5>
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["RETURN_USER_AUTHENTICATED", "RETURN_USERNAME"]),
  mounted() {
    if (this.RETURN_USER_AUTHENTICATED) {
      this.$router.push(`/${this.RETURN_USERNAME}`);
    }
  },
};
</script>

<style scoped>
.dashed {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-decoration-line: underline;
  text-align: center;
  margin-right: 10px;
}
</style>
