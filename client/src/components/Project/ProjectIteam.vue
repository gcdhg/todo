<template>
  <div class="mt-3">
    <b-card-group deck>
      <b-card bg-variant="light" class="text-left">
        <b-card-text>
          <b-card-text @dblclick="editProject" v-if="!edit">
            {{ project[index].title }}
            <b-icon icon="pencil" aria-hidden="true"></b-icon>
            <b-icon icon="trash" aria-hidden="true"></b-icon>
          </b-card-text>

          <b-input-group class="mt-3" v-else>
            <b-form-input
              v-model="project[index].title"
              @keypress.enter="saveProject"
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="success" @click="saveProject">
                save
              </b-button>
              <b-button variant="danger" @click="deleteProject"
                >delete</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      edit: false,
    };
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
  methods: {
    ...mapActions(["EDIT_PROJECT", "DELETE_PROJECT"]),
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
    },
  },
};
</script>
