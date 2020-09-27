<template>
  <div class="container">
    <form v-on:submit.prevent="loginUser">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          v-model="user.email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          v-model="user.password"
        />
      </div>

      <b-button type="submit" variant="success" class="btn btn-primary"
        >Submit</b-button
      >
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
        token: "",
      },
    };
  },
  methods: {
    loginUser: async function () {
      this.$store.dispatch("loginUser", this.user);
      localStorage.token = String(this.user.token);
    },
  },
};
</script>