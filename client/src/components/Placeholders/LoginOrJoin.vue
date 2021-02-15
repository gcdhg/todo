<template>
  <b-container>
    <div class="card">
      <div class="card-body">
        <h2 class="card-title text-center">
          Please login or create new user account
        </h2>
        <hr />
        <h5 class="card-text text-center">
          <a class="dashed" @click="createUser">Create user</a>
          <a class="dashed" @click="loginUser">Login</a>
          <a class="dashed" href="https://github.com/gcdhg/todo">
            Source code on github
          </a>
        </h5>
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: mapGetters(["RETURN_USER_DATA", "RETURN_TOKEN"]),
  async mounted() {
    if (this.RETURN_TOKEN !== undefined) {
      this.$nextTick(() => {
        this.$router.push(`${this.RETURN_USER_DATA.username}/tasks`);
      });
    }
  },
  methods: {
    ...mapActions(["GET_USER_DATA"]),
    async createUser() {
      this.$router.push("/join");
    },
    async loginUser() {
      this.$router.push("/login");
    },
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
