<script>
import { RouterLink } from "vue-router";
import NavDropdownItem from "./NavDropdownItem.vue";

export default {
  components: {
    RouterLink,
    NavDropdownItem,
  },
  setup() {},
  data() {
    return {};
  },
  props: {
    route: {
      required: true,
    },
  },
};
</script>

<template>
  <li class="nav-item dropdown">
    <a
      class="nav-link dropdown-toggle"
      href="#"
      id="navbarDropdownMenuLink"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {{ route.headline }}
    </a>
    <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
      <NavDropdownItem
        v-for="(subRoute, index) of route.subRoutes"
        :route="subRoute"
        :route-prefix="route.routePrefix"
        :key="subRoute.title + index"
      ></NavDropdownItem>
    </ul>
  </li>
</template>
