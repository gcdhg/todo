<template>
  <div>
    <p>name: {{ RETURN_USER_DATA.name }}</p>
    <p>surname: {{ RETURN_USER_DATA.surname }}</p>
    <p>email: {{ RETURN_USER_DATA.email }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["RETURN_USER_DATA"]),
};
</script>
