<template>
  <div class="container">
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input
          type="text"
          class="form-control"
          id="inputName"
          required
          v-model="user.name"
        />
      </div>
      <div class="form-group">
        <label for="inputUserName">Login</label>
        <input
          type="text"
          class="form-control"
          id="inputUserName"
          required
          v-model="user.username"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          required
          v-model="user.email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          required
          v-model="user.password"
        />
      </div>

      <b-button
        type="submit"
        variant="success"
        class="btn btn-primary"
        v-on:click.prevent="loginUser"
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
        name: "",
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    loginUser: async function () {
      await this.$store.dispatch("loginUser", this.user);
    },
  },
};
</script>