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
        <small id="titleHelp" class="form-text text-muted">Please fill out this field.</small>
      </div>
      <div class="form-group">
        <label for="inputDescribtion">Describtion</label>s
        <textarea type="text" class="form-control" id="inputDescribtion" v-model.trim="todo.body" />
      </div>

      <div>
        <b-button
          variant="success"
          v-on:click="createTodo"
          type="submit"
          class="btn btn-primary"
          style="display:inline"
          href="/"
        >Create</b-button>
        <b-button
          variant="primary"
          type="submit"
          class="btn btn-primary"
          style="display:inline"
          href="/"
        >Back</b-button>
      </div>
    </form>
    <br />
    <div>
      <label for="previewTodo">Preview:</label>
      <div id="previewTodo">
        <div class="card-header">
          {{todo.title | uppercase}}
          <a v-if="todo.completed">&check; completed</a>
        </div>
        <div class="card-body">
          <div style="white-space: pre-line;" class="card-text">{{todo.body}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todo: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createTodo() {
      fetch("http://localhost:3000/create", {
        body: JSON.stringify(this.todo),
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Origin: "http://localhost:3000/create",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          setTimeout(() => {
            console.log(json);
          }, 0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  filters: {
    uppercase(value) {
      return value.toUpperCase();
    },
  },
};
</script>

<style scoped>
.container-buttons {
  display: flex;
  justify-content: space-around;
}
</style>