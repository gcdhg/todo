<template>
  <div class="container">
    <hr />
    <b-row>
      <b-card class="col-6">
        <b-form @submit="onSubmit" @reset="onReset">
          <!-- name -->
          <b-form-group
            id="input-group-name"
            label="Name:"
            label-for="input-name"
          >
            <b-form-input
              id="input-1"
              type="text"
              v-model="form.name"
              required
              placeholder="Enter your name"
            ></b-form-input>
          </b-form-group>
          <!-- surname -->
          <b-form-group
            id="input-group-surname"
            label="Surname:"
            label-for="input-surname"
          >
            <b-form-input
              id="input-2"
              type="text"
              v-model="form.surname"
              required
              placeholder="Enter your surname"
            ></b-form-input>
          </b-form-group>
          <!-- username -->
          <b-form-group
            id="input-group-username"
            label="Username:"
            label-for="input-username"
          >
            <b-form-input
              id="input-3"
              type="text"
              v-model="form.username"
              required
              placeholder="Enter username"
            ></b-form-input>
          </b-form-group>
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
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        name: "",
        surname: "",
        email: "",
        password: "",
        username: "",
      },
    };
  },
  computed: mapGetters(["RETURN_USERNAME"]),
  methods: {
    ...mapActions(["CREATE_USER"]),
    async onSubmit(event) {
      event.preventDefault();
      const res = await this.CREATE_USER(this.form);
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
