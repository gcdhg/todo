<template>
  <b-container fluid>
    <b-row fluid>
      <div v-if="!edit">
        <b-button variant="light" @click="edit = !edit">
          {{ this.project.title }}
        </b-button>
      </div>
      <div v-else>
        <b-form-input @keyup.enter="editProjectTitle" v-model="project.title">
        </b-form-input>
      </div>
      <div>
        <b-dropdown variant="light" id="dropdown-1" text="Participants">
          <div
            v-for="participant in project.participants"
            :key="participant._id"
          >
            <b-dropdown-item v-bind:to="'/' + participant.user.username">
              {{ participant.user.username }}
            </b-dropdown-item>
            <b-dropdown-item>Add new User</b-dropdown-item>
          </div>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item disabled>Owner</b-dropdown-item>
          <b-dropdown-item>{{ this.project.owner.username }}</b-dropdown-item>
        </b-dropdown>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    project: {
      type: Object,
      default() {
        return {
          owner: {
            username: "",
          },
        };
      },
    },
  },
  data() {
    return {
      edit: false,
    };
  },
  computed: mapGetters(["RETURN_USERNAME"]),
  methods: {
    ...mapActions(["EDIT_PROJECT_TITLE"]),
    async editProjectTitle() {
      const body = {
        projectId: this.project._id,
        title: this.project.title,
      };
      this.$router.push(
        `/${this.RETURN_USERNAME}/p/${this.project.title.replaceAll(" ", "-")}`
      );
      this.EDIT_PROJECT_TITLE(body);
      this.edit = !this.edit;
    },
  },
};
</script>
