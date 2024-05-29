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
      showNavbar: false,
      onNavbar: false,
      routes: [
        {
          headline: "Day 1",
          routePrefix: "/day1",
          subRoutes: [
            {
              title: "Random lines",
              path: "/random-lines",
            },
            {
              title: "Floating bubbles",
              path: "/bubbles",
            },
            {
              title: "Random maze",
              path: "/diagonal-maze",
            },
            {
              title: "Parallax squares",
              path: "/random-squares",
            },
          ],
        },
        {
          headline: "Day 2",
          routePrefix: "/day2",

          subRoutes: [
            {
              title: "Different color values",
              path: "/basic-image-manipulation",
            },
            {
              title: "Max color values",
              path: "/max-value-pixels",
            },
            {
              title: "Color Glitch",
              path: "/image-glitch-effect",
            },
          ],
        },
        {
          headline: "Day 3",
          routePrefix: "/day3",
          subRoutes: [
            {
              title: "Circles Fill",
              path: "/circles-fill",
            },
            {
              title: "Pipe",
              path: "/pipe",
            },
          ],
        },
        {
          headline: "Day 4",
          routePrefix: "/day4",
          subRoutes: [
            {
              title: "L-System",
              path: "/l-system",
            },
            {
              title: "Fractal Tree Generator",
              path: "/recursive-tree-generator",
            },
            {
              title: "Lightning Strike Generator",
              path: "/lighting-generator",
            },
          ],
        },
        {
          headline: "Day 5",
          routePrefix: "/day5",
          subRoutes: [
            {
              title: "Shakespeare-GPT",
              path: "/shakespeare-gpt",
            },
            {
              title: "WordCloud",
              path: "/word-cloud",
            },
          ],
        },
        {
          headline: "Day 6",
          routePrefix: "/day6",
          subRoutes: [
            {
              title: "Game of life",
              path: "/game-of-life",
            },
            {
              title: "Falling Sand Simulator",
              path: "/falling-sand",
            },
          ],
        },
        {
          headline: "Day 7",
          routePrefix: "/day7",
          subRoutes: [
            {
              title: "Sorting Algorithms",
              path: "/sorting-algorithms",
            },
            {
              title: "Mandelbrot-Set",
              path: "/mandelbrot-set",
            },
            {
              title: "StarWars Hyperspace",
              path: "/starwars-hyperspace",
            },
            {
              title: "Swarm Simulator",
              path: "/swarm-simulator",
            },
          ],
        },
      ],
    };
  },
};
</script>

<template>
  <div
    class="floating-div"
    @mouseover="showNavbar = true"
    @mouseleave="showNavbar = false"
  ></div>
  <Transition>
    <nav
      @wheel.prevent
      @touchmove.prevent
      @scroll.prevent
      @mouseover="onNavbar = true"
      @mouseleave="onNavbar = false"
      v-show="!$route.meta.hideNavbar || showNavbar || onNavbar"
      class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark on-top"
    >
      <div class="container-fluid">
        <RouterLink class="navbar-brand" :to="'/'">Home</RouterLink>
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
            <NavDropDown
              v-for="(route, index) of routes"
              :key="index"
              :route="route"
            ></NavDropDown>
          </ul>
        </div>
      </div>
    </nav>
  </Transition>
</template>

<style scoped>
.floating-div {
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 2%;
  width: 100%;
  user-select: none;
}
.on-top {
  z-index: 1;
}
</style>
