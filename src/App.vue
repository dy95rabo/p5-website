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
  methods: {
    handler : function(e) {
        e.preventDefault();
     }
  },
};
</script>

<template >
  <div @contextmenu.prevent="handler">
    <NavBar />
    <RouterView />
  </div>
  </template>

<style scoped></style>
