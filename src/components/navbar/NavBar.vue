<script>
import { RouterLink } from "vue-router";
import NavDropDown from "./NavDropDown.vue";
import NavItem from "./NavItem.vue";

export default {
  components: {
    RouterLink,
    NavDropDown,
    NavItem,
  },
  setup() {},
  data() {
    return {
      routes: [
        {
          headline: "Day 1",
          routePrefix: "/day1",
          subRoutes: [
            {
              title: "Exercise 1",
              path: "/exercise1",
            },
            {
              title: "Exercise 2",
              path: "/exercise2",
            },
            {
              title: "Exercise 3",
              path: "/exercise3",
            },
            {
              title: "Exercise 4",
              path: "/exercise4",
            },
          ],
        },
        {
          headline: "Day 2",
          routePrefix: "/day2",

          subRoutes: [
            {
              title: "Exercise 1",
              path: "/exercise1",
            },
            {
              title: "Exercise 2",
              path: "/exercise2",
            },
          ],
        },
        {
          headline: "Day 3",
          routePrefix: "/day3",
          subRoutes: [
            {
              title: "Exercise 1",
              path: "/exercise1",
            },
          ],
        },
        {
          headline: "Day 4",
          routePrefix: "/day4",
          subRoutes: [
            {
              title: "Exercise 1",
              path: "/exercise1",
            },
          ],
        },
      ],
    };
  },
};
</script>

<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <!-- ! ###########   ADD ITEMS HERE ################## -->
          <template v-for="(route, index) of routes" :key="index">
            <NavDropDown
              v-if="route.subRoutes.length > 1"
              :route="route"
            ></NavDropDown>
            <NavItem
              v-else
              :route-prefix="route.routePrefix"
              :route="route.subRoutes[0]"
            ></NavItem>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>
