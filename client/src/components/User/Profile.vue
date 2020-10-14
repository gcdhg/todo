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
            v-bind:active="RETURN_MODE === 'personalData'"
            @click="getPersonalData"
          >
            Personal data
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
            v-bind:active="RETURN_MODE === 'freinds'"
            @click="getFreinds"
          >
            Friends
          </b-list-group-item>
        </b-list-group>
      </b-card>

      <b-card class="col-9" v-if="RETURN_MODE === 'personalData'">
        <b-card-text> Name: {{ this.RETURN_USER_DATA.name }} </b-card-text>
        <b-card-text>
          Username: {{ this.RETURN_USER_DATA.username }}
        </b-card-text>
        <b-card-text> Email: {{ this.RETURN_USER_DATA.email }} </b-card-text>
        <b-card-text> Password: *********** </b-card-text>
      </b-card>

      <b-card v-else-if="RETURN_MODE === 'projects'" class="col-9">
        <b-card-text>
          <ProjectList />
        </b-card-text>
      </b-card>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import ProjectList from "../Project/ProjectList";

export default {
  async mounted() {
    this.GET_USER_DATA(this.$route.params.username);
    await this.GET_ALL_USER_PROJECTS();
  },
  computed: mapGetters([
    "RETURN_USERNAME",
    "RETURN_USER_DATA",
    "RETURN_MODE",
    "RETURN_PROJECTS",
  ]),
  methods: {
    ...mapActions(["GET_USER_DATA", "CHANGE_MODE", "GET_ALL_USER_PROJECTS"]),
    async getPersonalData() {
      await this.CHANGE_MODE("personalData");
    },
    async getProjects() {
      await this.CHANGE_MODE("projects");
      await this.GET_ALL_USER_PROJECTS();
    },
    async getFreinds() {
      await this.CHANGE_MODE("freinds");
    },
  },
  components: {
    ProjectList,
  },
};
</script>