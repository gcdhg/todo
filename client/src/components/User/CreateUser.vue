<template>
  <div class="container">
    <hr />
    <b-row>
      <b-card class="col-6">
        <b-form>
          <b-form-group
            id="input-group-email"
            label="Email address:"
            label-for="input-username"
            description="We'll never share your username with anyone else."
          >
            <b-form-input
              id="input-1"
              type="text"
              v-model="username"
              required
              placeholder="Enter username"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-email"
            label="Email address:"
            label-for="input-email"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="input-1"
              type="email"
              v-model="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-password"
            label="Password:"
            label-for="input-password"
          >
            <b-form-input
              id="input-password"
              type="password"
              v-model="password"
              required
              placeholder="Enter password"
            ></b-form-input>
          </b-form-group>

          <b-button @click.prevent="createUser" type="submit" variant="primary"
            >Create</b-button
          >
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </b-card>
      <div class="col-6">
        <b-img
          rel="preload"
          src="https://static.tildacdn.com/tild3037-6231-4538-b038-333137666566/bigstock-Lock-Vector.png"
          fluid
          alt="Responsive image"
        ></b-img>
      </div>
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      username: "",
    };
  },
  computed: mapGetters(["RETURN_USERNAME"]),
  methods: {
    ...mapActions(["CREATE_USER"]),
    async createUser() {
      const user = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      await this.CREATE_USER(user);

      this.$router.push(`/login`);
    },
    async makeToast(append = false) {
      await this.$bvToast.toast(`Wrong user data`, {
        title: "Wrong imput",
        toaster: "b-toaster-bottom-right",
        variant: "warning",
        autoHideDelay: 5000,
        appendToast: append,
      });
    },
  },
};
</script>
