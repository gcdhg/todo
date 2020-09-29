<template>
  <div class="container">

    
    <b-button @click="$bvModal.show('modal-scoped')">Open Modal</b-button>
    <b-modal id="modal-scoped">
      <template v-slot:modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <b-button size="sm" variant="outline-danger" @click="close()">
          Close Modal
        </b-button>
        <h5>Modal Header</h5>
      </template>

      <template v-slot:default="{ hide }">
        <p>Modal Body with button</p>
        <b-button @click="hide()">Hide Modal</b-button>
      </template>

      <template v-slot:modal-footer="{ ok, cancel, hide }">
        <b>Custom Footer</b>
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="success" @click="ok()"> OK </b-button>
        <b-button size="sm" variant="danger" to='/create' @click="cancel()">
          Cancel
        </b-button>
        <!-- Button with custom close trigger value -->
        <b-button size="sm" variant="outline-secondary" @click="hide('forget')">
          Forget it
        </b-button>
      </template>
    </b-modal>

    <form href="/" v-on:submit.prevent="loginUser">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          required
          v-model="user.email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          required
          v-model="user.password"
        />
      </div>

      <b-button type="submit" variant="success" class="btn btn-primary"
        >Submit</b-button
      >
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    loginUser: async function () {
      await this.$store.dispatch("loginUser", this.user);
    },
  },
};
</script>