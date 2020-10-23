<template>
  <div class="container">
    <hr />
    <b-row>
      <b-card class="col-6">
        <b-form>
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

          <b-button @click.prevent="loginUser" type="submit" variant="primary"
            >Submit</b-button
          >
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </b-card>
      <div class="col-6">
        <b-img
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
    };
  },
  computed: mapGetters(["RETURN_USERNAME"]),
  methods: {
    ...mapActions(["LOGIN_USER"]),
    async loginUser() {
      const user = {
        email: this.email,
        password: this.password,
      };
      const isLogedIn = await this.LOGIN_USER(user);
      if (!isLogedIn) {
        await this.makeToast();
        this.email = "";
        this.password = "";
      } else {
        this.$router.push(`/${this.RETURN_USERNAME}`);
      }
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