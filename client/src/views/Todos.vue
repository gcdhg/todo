<template>
  <div>
    <div v-if="!RETURN_USER_AUTHENTICATED" class="container col-6">
      <Placeholder />
    </div>
    <div v-else class="row">
      <div class="col-md-2">
        <div class="container">
          <Options />
        </div>
      </div>
      <div class="col-md-10">
        <div class="container" v-if="Boolean(RETURN_MODE.privateTasks)">
          <h3 class="text-left">Incoming:</h3>
          <div>
            <b-button
              v-b-toggle.collapse-create-new-todo
              variant="outline-danger"
            >
              <b-icon
                class="align-centr"
                icon="plus"
                aria-hidden="true"
              ></b-icon>
              new todo</b-button
            >
            <b-collapse id="collapse-create-new-todo" class="mt-2">
              <b-card>
                <Create v-bind:projectId="null" />
              </b-card>
            </b-collapse>
          </div>

          <hr />

          <Loader v-if="RETURN_LOADING" />

          <ToDoList v-if="RETURN_TODOS.length" v-bind:todos="RETURN_TODOS" />
          <div class="text-center" v-else>
            <h1>No projects!</h1>
            <h2>you've completed all projects</h2>
          </div>
        </div>
        <div class="container" v-else-if="Boolean(RETURN_MODE.ownedTasks)">
          <div v-if="RETURN_PROJECTS.length">
            <CreateNewProject />

            <ProjectsList
              v-for="(project, i) of RETURN_PROJECTS"
              :key="project._id"
              v-bind:index="i"
              v-bind:project="project"
            />

          </div>
          <div class="text-center" v-else>
            <h1>No projects!</h1>
            <h2>you've completed all projects</h2>
          </div>
        </div>
        <div v-else-if="Boolean(RETURN_MODE.partTasks)" class="container">
          <div v-if="RETURN_PART_OF.length">
            <ProjectsList
              v-for="(project, i) of RETURN_PART_OF"
              :key="project._id"
              v-bind:index="i"
              v-bind:project="project"
            />
          </div>
          <div class="text-center" v-else>
            <h1>No projects!</h1>
            <h2>you've completed all projects</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import fetch from "node-fetch";
import { mapGetters, mapActions } from "vuex";

import ToDoList from "@/components/todo/ToDoList.vue";
import Loader from "@/components/layout/Loader.vue";
import Placeholder from "@/components/layout/Placeholder.vue";
import Create from "@/views/Create.vue";
import Options from "@/components/layout/Options.vue";
import ProjectsList from "@/components/project/ProjectsList.vue";
import CreateNewProject from "@/components/project/CreateNewProject.vue";

const usedComponents = {
  ToDoList,
  Loader,
  Create,
  Placeholder,
  Options,
  ProjectsList,
  CreateNewProject
};

export default {
  name: "todo",
  data() {
    return {
      form: {
        email: "",
        name: "",
        filter: "all todos",
        checked: [],
      },
    };
  },
  async created() {
    this.UPDATE_PRIVATE_TASKS(localStorage.token);
    this.GET_ALL_DATA();
  },
  components: usedComponents,
  computed: mapGetters([
    "RETURN_TODOS",
    "RETURN_PROJECTS",
    "RETURN_LOADING",
    "RETURN_USER_AUTHENTICATED",
    "RETURN_ALL_DATA",
    "RETURN_MODE",
    "RETURN_PART_OF",
  ]),
  methods: {
    ...mapActions([
      "REMOVE_TODO",
      "COMPLETE_TODO",
      "UPDATE_PRIVATE_TASKS",
      "GET_ALL_DATA",
      "GET_ALL_DATA",
      "DELETE_PROJECT",
    ]),
  },
};
</script>
