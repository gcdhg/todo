<template>
  <div class="home">
    <Loader v-if="loading" />
    <ToDoList
      v-else-if="todos.length"
      v-bind:todos="todos"
      @complete-todo="completeTodo"
      @remove-todo="removeTodo"
    />
    <p v-else>No todos!</p>
  </div>
</template>

<script>
import fetch from "node-fetch";

import ToDoList from "@/components/ToDoList.vue";
import Loader from "@/components/Loader";

export default {
  name: "app",
  data() {
    return {
      todos: [],
      loading: true,
    };
  },
  mounted() {
    fetch("http://localhost:3000")
      .then((res) => res.json())
      .then((json) => {
        setTimeout(() => {
          this.todos = json;
          this.loading = false;
        }, 0);
      });
  },
  components: {
    ToDoList,
    Loader,
  },
  methods: {
    removeTodo(id) {
      fetch("http://localhost:3000", {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Origin": "http://localhost:3000",
        },
        method: "DELETE",
        body: JSON.stringify({
          id,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          setTimeout(() => {
            console.log(json);
            this.updateData();
          })
        })
        .catch((err) => console.log(err));
    },

    completeTodo(id) {
        fetch("http://localhost:3000", {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Origin: "http://localhost:3000",
        },
        method: "PUT",
        body: JSON.stringify({
          id,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          setTimeout(() => {
            console.log(json);
            this.updateData();
          })
        })
        .catch((err) => console.log(err));
    },

    updateData() {
      fetch("http://localhost:3000")
        .then((res) => res.json())
        .then((json) => {
          setTimeout(() => {
            this.todos = json;
          }, 0);
        });
    },
  },
};
</script>
