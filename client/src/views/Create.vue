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
        <!-- need improvment -->
        <b-button
          variant="success"
          v-on:click="updateTodo"
          v-if="urlArr[1]"
          type="submit"
          class="btn btn-primary"
          style="display:inline"
          href="/"
        >Edit</b-button>
        <b-button
          variant="success"
          v-on:click="createTodo"
          v-else
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
        <!--  -->
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
// need improvment
const urlArr = window.location.href.split("edit/");
console.log(urlArr);
// const currentUrl = new Url (window.location.href);
// 

export default {
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
  mounted() {
    if (urlArr[1])
      this.fetchData();
    else {
      this.todo.id = ""
      this.todo.title = "";
      this.todo.body = "";
    }
  },
  methods: {
    fetchData() {
      fetch("http://localhost:3000/edit/" + urlArr[1])
      .then((res) => res.json())
      .then((json) => {
        setTimeout(() => {
          console.log(json);
          this.todo.id = json._id;
          this.todo.title = json.title;
          this.todo.body = json.body;
        }, 0);
      })
      .catch(err => console.log(err));
    },
    updateTodo () {
      fetch("http://localhost:3000/edit/" + urlArr[1], {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Origin: "http://localhost:3000/edit",
        },
        body: JSON.stringify(this.todo),
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
