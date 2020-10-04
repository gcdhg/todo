<template>
  <b-list-group>
    <h5>Options:</h5>
    <b-list-group-item
      class="d-flex justify-content-between align-items-center"
      v-bind:active="Boolean(RETURN_MODE.privateTasks)"
      v-on:click="changeStatePrivate"
      type="button"
    >
      Private
      <b-badge variant="light" pill>{{ RETURN_TODOS.length }}</b-badge>
    </b-list-group-item>

    <b-list-group-item
      class="d-flex justify-content-between align-items-center"
      v-bind:active="Boolean(RETURN_MODE.ownedTasks)"
      v-on:click="changeStateOwned"
      type="button"
    >
      Owned Projects
      <b-badge variant="light" pill>{{ RETURN_PROJECTS.length }}</b-badge>
    </b-list-group-item>

    <b-list-group-item
      class="d-flex justify-content-between align-items-center"
      v-bind:active="Boolean(RETURN_MODE.partTasks)"
      v-on:click="changeStatePart"
      type="button"
    >
      Part of the project
      <b-badge variant="light" pill>{{ RETURN_PART_OF.length }}</b-badge>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      privateTasks: true,
      ownedTasks: false,
      partTasks: false,
    };
  },
  computed: mapGetters([
    "RETURN_MODE",
    "RETURN_TODOS",
    "RETURN_PROJECTS",
    "RETURN_PART_OF",
  ]),
  methods: {
    ...mapActions([
      "CHANGE_STATE_PRIVATE",
      "CHANGE_STATE_OWNED",
      "CHANGE_STATE_PART",
    ]),
    async changeStatePrivate() {
      this.CHANGE_STATE_PRIVATE();
    },
    async changeStateOwned() {
      this.CHANGE_STATE_OWNED();
    },
    async changeStatePart() {
      this.CHANGE_STATE_PART();
    },
  },
};
</script>