<template>
  <b-container fluid>
    <b-row>
      <h1>
        {{ this.$route.params.project.replaceAll("-", " ") }}
        {{ RETURN_PROJECT_ID }}
      </h1>
      
    </b-row>

    <b-row>
      <h1>
        {{ RETURN_ONE_PROJECT }}
      </h1>
    </b-row>

    <div>
      <b-card-group deck>
        <b-card
          bg-variant="primary"
          text-variant="white"
          header="Primary"
          class="text-center"
        >
          <b-card-text
            >Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.</b-card-text
          >
        </b-card>

        <b-card
          bg-variant="secondary"
          text-variant="white"
          header="Secondary"
          class="text-center"
        >
          <b-card-text
            >Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.</b-card-text
          >
        </b-card>

        <b-card
          bg-variant="success"
          text-variant="white"
          header="Success"
          class="text-center"
        >
          <b-card-text
            >Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.</b-card-text
          >
        </b-card>
      </b-card-group>
    </div>
    <div class="mt-3">
      <b-card-group deck>
        <b-card
          bg-variant="info"
          text-variant="white"
          header="Info"
          class="text-center"
        >
          <b-card-text
            >Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.</b-card-text
          >
        </b-card>

        <b-card
          bg-variant="warning"
          text-variant="white"
          header="Warning"
          class="text-center"
        >
          <b-card-text
            >Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.</b-card-text
          >
        </b-card>

        <b-card
          bg-variant="danger"
          text-variant="white"
          header="Danger"
          class="text-center"
        >
          <b-card-text
            >Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.</b-card-text
          >
        </b-card>
      </b-card-group>
    </div>
    <div class="mt-3">
      <b-card-group deck>
        <b-card bg-variant="light" header="Light" class="text-center">
          <b-card-text
            >Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.</b-card-text
          >
        </b-card>

        <b-card
          bg-variant="dark"
          header="Dark"
          text-variant="white"
          class="text-center"
        >
          <b-card-text
            >Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.</b-card-text
          >
        </b-card>

        <b-card header="Default" class="text-center">
          <b-card-text
            >Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.</b-card-text
          >
        </b-card>
      </b-card-group>
    </div>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: mapGetters(["RETURN_PROJECT_ID", "RETURN_ONE_PROJECT"]),
  async mounted() {
    this.GET_ONE_PROJECT(this.$route.params.project);
  },
  methods: {
    ...mapActions(["GET_ONE_PROJECT"]),
  },
};
</script>