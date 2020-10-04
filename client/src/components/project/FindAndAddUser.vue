<template>
  <div>
    <b-form-input
      v-model="username"
      placeholder="Enter new project title"
    ></b-form-input>
    <b-button variant="nothing" v-on:click="findUser" size="sm"
      >Search user</b-button
    >
    <div v-if="RETURN_USER_DATA">
        {{ RETURN_USER_DATA }}
        <b-button v-on:click="addUserToProject" variant="success">
          Add
        </b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    id: String,
  },
  data() {
    return {
      username: "",
    };
  },
  computed: mapGetters(["RETURN_USER_DATA"]),
  methods: {
    ...mapActions(["FIND_USER_BY_USERNAME", "ADD_USER_TO_PROJECT"]),
    async findUser() {
      const body = { projectId: this.id, username: this.username };
      await this.FIND_USER_BY_USERNAME(body);
    },
    async addUserToProject(){
      const data = {newUser: this.RETURN_USER_DATA, projectId: this.id};
      await this.ADD_USER_TO_PROJECT(data)
    }
  },
};
</script>