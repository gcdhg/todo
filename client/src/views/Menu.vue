<template>
  <b-container>
    <b-row>
      <b-card
        img-src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png"
        class="col-3"
        v-bind:title="this.RETURN_USER_DATA.username"
      >
        <b-list-group flush>
          <b-list-group-item
            type="button"
            v-bind:active="RETURN_MODE === 'tasks'"
            @click="getTasks"
          >
            Tasks
          </b-list-group-item>
          <b-list-group-item
            type="button"
            v-bind:active="RETURN_MODE === 'projects'"
            @click="getProjects"
          >
            Projects
          </b-list-group-item>
          <b-list-group-item
            type="button"
            v-bind:active="RETURN_MODE === 'profile'"
            @click="getPersonalData"
          >
            Personal data
          </b-list-group-item>
          <b-list-group-item class="text-center" type="button" @click="logout">
            Logout
          </b-list-group-item>
        </b-list-group>
      </b-card>
      <b-card class="col-9">
        <router-view></router-view>
      </b-card>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: mapGetters(["RETURN_MODE", "RETURN_USER_DATA"]),
  async created() {
    await this.GET_USER_DATA();
  },
  methods: {
    ...mapActions(["CHANGE_MODE", "GET_USER_DATA", "LOGOUT_USER_ONCE"]),
    async getPersonalData() {
      if (this.RETURN_MODE !== "profile") {
        await this.CHANGE_MODE("profile");
        this.$router.push(`/${this.RETURN_USER_DATA.username}/profile`);
      }
    },
    async getTasks() {
      if (this.RETURN_MODE !== "tasks") {
        await this.CHANGE_MODE("tasks");
        this.$router.push(`/${this.RETURN_USER_DATA.username}/tasks`);
      }
    },
    async getProjects() {
      if (this.RETURN_MODE !== "projects") {
        await this.CHANGE_MODE("projects");
        this.$router.push(`/${this.RETURN_USER_DATA.username}/projects`);
      }
    },
    async logout() {
      await this.LOGOUT_USER_ONCE();
    },
  },
};
</script>
