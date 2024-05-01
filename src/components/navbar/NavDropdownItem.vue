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
  <li>
    <!-- ! not sure if the to="route.route" is correct= -->
    <RouterLink class="dropdown-item" :to="routePrefix + route.path">{{
      route.title
    }}</RouterLink>
  </li>
</template>
