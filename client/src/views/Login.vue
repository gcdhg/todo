<template>
  <div class="container">
    
    <form>
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