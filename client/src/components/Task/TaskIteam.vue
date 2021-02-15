<template>
  <div class="mt-3">
    <b-card-group deck>
      <b-card bg-variant="light" class="text-left">
        <b-card-text>
          <b-input-group class="mt-3">
            <b-form-input
              v-model="task[index].title"
              @keypress.enter="saveTask"
              v-bind:disabled="!edit"
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="success" @click="saveTask" v-if="edit">
                save
              </b-button>
              <b-button variant="success" @click="editTask" v-else>
                edit
              </b-button>
              <b-button variant="danger" @click="deletTask">delete</b-button>
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
    task: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    index: Number,
  },
  methods: {
    ...mapActions(["EDIT_TASK", "DELETE_TASK"]),
    async editTask() {
      this.edit = !this.edit;
    },
    async saveTask() {
      await this.EDIT_TASK(this.task[this.index]);
      this.edit = !this.edit;
    },
    async deletTask() {
      this.DELETE_TASK(this.task[this.index]);
      this.edit = !this.edit;
      // this.$nextTick(() => {
      //   this.GET_ONE_PROJECT(this.project[this.index]);
      // });
    },
  },
};
</script>
