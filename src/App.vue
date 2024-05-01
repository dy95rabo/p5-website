<script>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/navbar/NavBar.vue";

export default {
  components: {
    RouterView,
    RouterLink,
    NavBar,
  },
  setup() {},
  data() {
    return {};
  },
};
</script>

<template>
  <NavBar />
  <RouterView />
</template>

<style scoped></style>
