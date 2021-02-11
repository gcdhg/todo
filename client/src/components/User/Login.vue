<template>
  <div class="container">
    <hr />
    <b-row>
      <b-card class="col-6">
        <b-form @submit="onSubmit" @reset="onReset">
          <!-- email -->
          <b-form-group
            id="input-group-email"
            label="Email address:"
            label-for="input-email"
          >
            <b-form-input
              id="input-4"
              type="email"
              v-model="form.email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>
          <!-- password -->
          <b-form-group
            id="input-group-password"
            label="Password:"
            label-for="input-password"
          >
            <b-form-input
              id="input-5"
              type="password"
              v-model="form.password"
              required
              placeholder="Enter password"
            ></b-form-input>
          </b-form-group>
          <!-- button -->
          <b-button type="submit" variant="primary">Create</b-button>
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
import { mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["LOGIN_USER"]),
    async onSubmit(event) {
      event.preventDefault();
      const res = await this.LOGIN_USER(this.form);
      if (res) {
        this.$nextTick(() => {
          this.$router.push(`/${this.form.username}`);
        });
      }
      await this.makeToast();
    },
    async onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.name = "";
      this.form.surname = "";
      this.form.email = "";
      this.form.password = "";
    },
    async makeToast(append = false) {
      await this.$bvToast.toast(`Wrong user data`, {
        title: "Wrong input",
        toaster: "b-toaster-bottom-right",
        variant: "warning",
        autoHideDelay: 5000,
        appendToast: append,
      });
    },
  },
};
</script>
