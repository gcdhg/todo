<template>
  <b-row>
    <b-card
      bg-variant="success"
      text-variant="light"
      border-variant="dark"
      varinat="primary"
      class="text-center col-3 board-tile-details"
      v-for="project in RETURN_PROJECTS"
      :key="project.title"
      type="button"
    >
      <b-card-text @click="redirectToProject(project)">
        {{ project.title }}
      </b-card-text>
    </b-card>

    <b-button
      border-variant="dark"
      class="col-3 fixed-height"
      variant="danger"
      @click="show = true"
    >
      Create New Project
    </b-button>

    <div>
      <b-modal v-model="show" title="Create Project">
        <b-container fluid>
          <b-form-group
            id="input-group-new-project-title"
            label="New project title:"
            label-for="input-new-project-title"
          >
            <b-form-input
              id="input-new-project-title"
              type="text"
              v-model="newProjectTitle"
              required
              placeholder="Enter new project title"
            ></b-form-input>
          </b-form-group>
        </b-container>

        <template v-slot:modal-footer>
          <div class="w-100">
            <b-button
              variant="success"
              class="float-right"
              @click="createNewProject"
            >
              Create
            </b-button>
          </div>
        </template>
      </b-modal>
    </div>
  </b-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: mapGetters(["RETURN_PROJECTS", "RETURN_USERNAME"]),
  data() {
    return {
      show: false,
      newProjectTitle: "",
    };
  },
  methods: {
    ...mapActions(["CREATE_NEW_PROJECT"]),
    async createNewProject() {
      this.show = false;
      const newProject = this.newProjectTitle.trim();
      await this.CREATE_NEW_PROJECT({
        title: newProject,
      });
      this.newProjectTitle = "";
    },
    async redirectToProject(value) {
      this.$router.push({
        name: "Project",
        params: {
          username: this.RETURN_USERNAME,
          project: value.title.replaceAll(" ", "-"),
        },
      });
    },
  },
};
</script>

<style scoped>
.board-tile-details {
  margin-right: 25px;
  margin-bottom: 25px;
  display: flex;
  height: 80px;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
}
.fixed-height {
  height: 80px;
}
</style>
