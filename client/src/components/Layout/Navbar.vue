<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="nav">
      <b-navbar-brand to="/">TODO</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot --> 
            <template v-slot:button-content>
              <em>{{ RETURN_USERNAME }}</em>
            </template>
            <b-dropdown-item v-bind:to="`/${RETURN_USERNAME}`">Profile</b-dropdown-item>
            <b-dropdown-item @click="logoutUser">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: mapGetters(["RETURN_USERNAME"]),
  methods: {
    ...mapActions(["LOGOUT_USER_ONCE"]),
    async logoutUser () {
      this.LOGOUT_USER_ONCE();
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.nav {
  background-color: #026aa7;
  margin-bottom: 25px;
}
</style>