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
              title: "Random lines",
              path: "/exercise1",
            },
            {
              title: "Floating bubbles",
              path: "/exercise2",
            },
            {
              title: "Random maze",
              path: "/exercise3",
            },
            {
              title: "Parallax squares",
              path: "/exercise4",
            },
          ],
        },
        {
          headline: "Day 2",
          routePrefix: "/day2",

          subRoutes: [
            {
              title: "Different color values",
              path: "/exercise1",
            },
            {
              title: "Max color values",
              path: "/exercise2",
            },
          ],
        },
        {
          headline: "Day 3",
          routePrefix: "/day3",
          subRoutes: [
            {
              title: "Circles",
              path: "/exercise1",
            },
          ],
        },
        {
          headline: "Day 4",
          routePrefix: "/day4",
          subRoutes: [
            {
              title: "Fractal",
              path: "/exercise1",
            },
          ],
        },
        {
          headline: "Day 5",
          routePrefix: "/day5",
          subRoutes: [
            {
              title: "Word cloud",
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
      <RouterLink class="navbar-brand" :to="'/'" >Home</RouterLink>
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
              :route="route"
            ></NavDropDown>

          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>
