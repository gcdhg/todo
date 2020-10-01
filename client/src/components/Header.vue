<template>
  <div>
    <b-breadcrumb class="fontsyle">
      <b-breadcrumb-item to="/">
        <b-icon
          icon="house-fill"
          scale="1.25"
          shift-v="1.25"
          aria-hidden="true"
        >
        </b-icon>
        Home
      </b-breadcrumb-item>
      <b-breadcrumb-item to="/about"> About </b-breadcrumb-item>
      <b-breadcrumb-item v-bind:active="!returnUserAuthenticated" to="/create">
        Create
      </b-breadcrumb-item>
      <b-navbar-nav class="ml-auto">
        <b-nav-form v-if="returnUserAuthenticated">
          <b-breadcrumb-item active>
            {{ getUserName }}
          </b-breadcrumb-item>
          <b-breadcrumb-item to="/" v-on:click="logoutUser">
            Logout
          </b-breadcrumb-item>
        </b-nav-form>
        <b-nav-form v-else>
          <b-breadcrumb-item v-b-modal.modal-sm> Login </b-breadcrumb-item>
        </b-nav-form>
      </b-navbar-nav>
    </b-breadcrumb>
    <b-modal id="modal-sm" size="sm" title="Login User">
      <Login />
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Login from "@/views/Login";

export default {
  name: "Header",
  computed: mapGetters(["returnUserAuthenticated", "getUserName"]),
  methods: mapActions(["logoutUser"]),
  components: {
    Login,
  },
};
</script>