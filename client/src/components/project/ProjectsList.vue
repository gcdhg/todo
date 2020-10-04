<template>
  <div>
    <hr />
    <h3 class="text-left">{{ project.title }}:</h3>
    <hr>
    {{project.participants}}
    <div>
      <div class="col"></div>

      <b-button
        v-b-toggle="'collapse-create-new-todo' + Index"
        variant="outline-danger"
        class="padder"
      >
        <b-icon class="align-centr" icon="plus" aria-hidden="true"></b-icon>
        new todo
      </b-button>

      <b-button
        v-b-toggle="'collapse-add-new-user' + Index"
        variant="outline-danger"
        class="padder"
      >
        <b-icon class="align-centr" icon="plus" aria-hidden="true"></b-icon>
        add new user
      </b-button>

      <b-button v-on:click="deleteProject" variant="danger">
        Delete project
      </b-button>

      <b-collapse v-bind:id="'collapse-create-new-todo' + Index" class="mt-2">
        <b-card>
          <Create v-bind:projectId="project._id" />
        </b-card>
      </b-collapse>

      <b-collapse v-bind:id="'collapse-add-new-user' + Index" class="mt-2">
        <b-card>
          <FindAndAddUser v-bind:id="project._id" />
        </b-card>
      </b-collapse>
    </div>

    <hr />

    <Loader v-if="RETURN_LOADING" />

    <ToDoList v-if="project.tasks.length" v-bind:todos="project.tasks" />
    <div class="text-center" v-else>
      <h1>No projects!</h1>
      <h2>you've completed all projects</h2>
    </div>
    <hr />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import ToDoList from "@/components/todo/ToDoList.vue";
import Loader from "@/components/layout/Loader.vue";
import Placeholder from "@/components/layout/Placeholder.vue";
import FindAndAddUser from "@/components/project/FindAndAddUser.vue";
import Create from "@/views/Create.vue";

const usedComponents = {
  ToDoList,
  Loader,
  Create,
  Placeholder,
  FindAndAddUser,
};

export default {
  props: {
    project: {
      type: Object,
      reqired: true,
    },
    Index: Number,
  },
  mounted() {
    this.Index += 1;
  },
  data() {
    return {
      newProject: "",
    };
  },
  components: usedComponents,
  computed: mapGetters([
    "RETURN_TODOS",
    "RETURN_PROJECTS",
    "RETURN_LOADING",
    "RETURN_USER_AUTHENTICATED",
    "RETURN_ALL_DATA",
    "RETURN_MODE",
  ]),
  methods: {
    ...mapActions([
      "REMOVE_TODO",
      "COMPLETE_TODO",
      "UPDATE_PRIVATE_TASKS",
      "GET_ALL_DATA",
      "CREATE_NEW_PROJECT",
      "DELETE_PROJECT",
    ]),

    async deleteProject() {
      this.DELETE_PROJECT(this.project._id);
    },
  },
};
</script>

<style scoped>
.padder {
  margin-right: 10px;
}
</style>