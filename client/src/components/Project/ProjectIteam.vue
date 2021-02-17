<template>
  <div class="mt-3">
    <b-card-group deck>
      <b-card bg-variant="light" class="text-left">
        <b-card-text>
          <b-input-group class="mt-3">
            <b-form-input
              v-model="project[index].title"
              @keypress.enter="saveProject"
              v-bind:disabled="!edit"
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="success" @click="saveProject" v-if="edit">
                save
              </b-button>
              <b-button variant="success" @click="editProject" v-else>
                edit
              </b-button>
              <b-button variant="danger" @click="deleteProject"
                >delete</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-card-text>
        <b-card-text>
          <b-button
            v-b-toggle="`collapse-${index}`"
            @click="getProject"
            size="sm"
            variant="primary"
          >
            <b-icon icon="arrow-down" aria-hidden="true"></b-icon>
            tasks
          </b-button>
          <b-collapse v-bind:id="`collapse-${index}`" class="mt-2">
            <b-card>
              <b-form-input
                v-model="title"
                placeholder="Enter new task"
                @keyup.enter="createNewTask"
              ></b-form-input>
              <!-- {{ RETURN_ONE_PROJECT_TASKS }} -->
              <TaskList v-bind:tasks="RETURN_ONE_PROJECT_TASKS" />
            </b-card>
          </b-collapse>
        </b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import TaskList from "../Task/TaskList";

export default {
  data() {
    return {
      edit: false,
      title: "",
    };
  },
  components: {
    TaskList,
  },
  props: {
    project: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    index: Number,
  },
  computed: mapGetters(["RETURN_ONE_PROJECT_TASKS"]),
  methods: {
    ...mapActions([
      "EDIT_PROJECT",
      "DELETE_PROJECT",
      "GET_ONE_PROJECT",
      "CREATE_PROJECT_TASK",
    ]),
    async editProject() {
      this.edit = !this.edit;
    },
    async saveProject() {
      await this.EDIT_PROJECT(this.project[this.index]);
      this.edit = !this.edit;
    },
    async deleteProject() {
      this.DELETE_PROJECT(this.project[this.index]);
      this.edit = !this.edit;
      this.$nextTick(() => {
        this.GET_ONE_PROJECT(this.project[this.index]);
      });
    },
    async getProject() {
      await this.GET_ONE_PROJECT(this.project[this.index]);
    },
    async createNewTask() {
      await this.CREATE_PROJECT_TASK({
        project: this.project[this.index]._id,
        title: this.title,
      });
      this.title = "";
      this.$nextTick(() => {
        this.GET_ONE_PROJECT(this.project[this.index]);
      });
    },
  },
};
</script>
