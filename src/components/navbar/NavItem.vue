<script>
import { RouterLink } from "vue-router";

export default {
  components: {
    RouterLink,
  },
  setup() {},
  data() {
    return {};
  },
  props: {
    routePrefix: {
      type: String,
      default: "",
    },
    route: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <li class="nav-item active">
    <RouterLink class="nav-link" :to="routePrefix + route.path">{{
      route.title
    }}</RouterLink>
  </li>
</template>
