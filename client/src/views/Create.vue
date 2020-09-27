<template>
  <div class="container">
    <form>
      <div class="form-group">
        <label for="inputTitle">Title</label>
        <input
          type="text"
          required
          class="form-control"
          id="inputTitle"
          aria-describedby="titleHelp"
          v-model.trim="todo.title"
        />
        <small id="titleHelp" class="form-text text-muted"
          >Please fill out this field.</small
        >
      </div>
      <div class="form-group">
        <label for="inputDescribtion">Describtion</label>s
        <textarea
          type="text"
          class="form-control"
          id="inputDescribtion"
          v-model.trim="todo.body"
        />
      </div>

      <div>
        <!-- need improvment -->
        <b-button
          variant="success"
          v-on:click="updateTodoById"
          v-if="urlArr[1]"
          type="submit"
          class="btn btn-primary"
          style="display: inline"
          href="/"
          >Edit</b-button
        >
        <b-button
          variant="success"
          v-on:click="createTodo"
          v-else
          type="submit"
          class="btn btn-primary"
          style="display: inline"
          href="/"
          >Create</b-button
        >
        <b-button
          variant="primary"
          type="submit"
          class="btn btn-primary"
          style="display: inline"
          href="/"
          >Back</b-button
        >
        <!--  -->
      </div>
    </form>
    <br />
    <div>
      <label for="previewTodo">Preview:</label>
      <div id="previewTodo">
        <div class="card-header">
          {{ returnOneTodoById.title  | uppercase }}
        </div>
        <div class="card-body">
          <div style="white-space: pre-line" class="card-text">
            {{ returnOneTodoById.body }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

// need improvment
const urlArr = window.location.href.split("edit/");
console.log(urlArr);
//

export default {
  name: "Create",
  data() {
    return {
      todo: {
        id: "",
        title: "",
        body: "",
      },
      urlArr,
    };
  },
  computed: mapGetters(["returnOneTodoById", "returnCreateEditMode"]),
  async created() {
    if (urlArr[1]) {
      this.fetchDataById();
    } else {
      this.todo = {
        id: "",
        title: "",
        body: "",
      };
    }
  },
  watch: {
    
  },
  methods: {
    ...mapActions(["updateOneToEditTodo", "createNewTodo", "fetchData"]),
    async fetchDataById() {
      await this.fetchData(this.urlArr[1]);
      this.todo = this.$store.getters.returnOneTodoById;
    },
    async updateTodoById() {
      this.updateOneToEditTodo(this.urlArr[1], this.todo);
      this.todo = this.$store.getters.returnOneTodoById;
    },
    async createTodo() {
      this.createNewTodo(this.todo);
      this.todo = this.$store.getters.returnOneTodoById;
    },
  },
  filters: {
    uppercase(value) {
      return value.toUpperCase();
    },
  },
};
</script>
