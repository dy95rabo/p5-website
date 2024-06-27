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
    return {
      routes: [
        {
          headline: "Day 1",
          routePrefix: "/day1",
          subRoutes: [
            {
              title: "Random lines",
              path: "/01-random-lines",
              headline: "Random Lines",
              description: "Generate random lines",
            },
            {
              title: "Floating bubbles",
              path: "/02-floating-bubbles",
              headline: "Floating Bubbles",
              description: "pop some floating Bubbles",
            },
            {
              title: "Random maze",
              path: "/03-random-maze",
              headline: "Random Maze",
              description:
                "Creates a random Maze. You can create a new maze with every click",
            },
            {
              title: "Parallax squares",
              path: "/04-random-squares",
              headline: "Random Rectangles",
              description:
                "Generate random Rectangles with a parallax effect when you move your mouse cursor",
            },
          ],
        },
        {
          headline: "Day 2",
          routePrefix: "/day2",
          subRoutes: [
            {
              title: "Different color values",
              path: "/01-image-pixel-manipulation",
              headline: "Image Pixel Manipulation",
              description:
                "With every click you can se a different type of pixel manipulation, like: red-, green-, blue-filters, color-inversion and grayscale",
            },
            {
              title: "Max color values",
              path: "/02-max-pixel-value",
              headline: "Max Color Values",
              description: "",
            },
            {
              title: "Color Glitch",
              path: "/03-glitch-effect",
              headline: "Glitch Effect",
              description: "Glitch effect that moves according to the mouse",
            },
          ],
        },
        {
          headline: "Day 3",
          routePrefix: "/day3",
          subRoutes: [
            {
              title: "Circles Fill",
              path: "/01-circle-fill",
              headline: "Random Circle Fill",
              description:
                "Fill the screen with lots and lots of random circles",
            },
            {
              title: "Pipe",
              path: "/02-pipe",
              headline: "Pipe",
              description:
                "Draw images with the help of the pipe, it will follow your cursor",
            },
          ],
        },
        {
          headline: "Day 4",
          routePrefix: "/day4",
          subRoutes: [
            {
              title: "L-System",
              path: "/01-l-system",
              headline: "Lindenmayer System",
              description: "Use L-Systems to generate plant like structures",
            },
            {
              title: "Fractal Tree Generator",
              path: "/02-tree-generator",
              headline: "Recursive Tree Generator",
              description:
                "Generate a new Random Tree with every click (can be a bit slow!!)",
            },
            // {
            //   title: "Lightning Strike Generator",
            //   path: "/03-lighting-generator",
            //   headline: "Work In progress",
            //   description:
            //     "please don't knock on the glass, it scares the developer",
            // },
          ],
        },
        {
          headline: "Day 5",
          routePrefix: "/day5",
          subRoutes: [
            {
              title: "Shakespeare-GPT",
              path: "/01-shakespear-gpt",
              headline: "Shakespear-GPT",
              description:
                "This hightech AI-Chat bot learned from one of the greatest poets of the last millenium",
            },
            {
              title: "WordCloud",
              path: "/02-word-cloud",
              headline: "Word Cloud",
              description:
                "Shows you random words, the more often they are used the bigger they are",
            },
          ],
        },
        {
          headline: "Day 6",
          routePrefix: "/day6",
          subRoutes: [
            {
              title: "Game of life",
              path: "/01-conway-game-of-life",
              headline: "Conway's Game of Life",
              description: "A simulator for Conway's Game of Life",
            },
            {
              title: "Falling Sand Simulator",
              path: "/02-falling-sand-simulator",
              headline: "Falling Sand Simulator",
              description: "A visually pleasing falling sand simulation",
            },
          ],
        },
        {
          headline: "Day 7",
          routePrefix: "/day7",
          subRoutes: [
            {
              title: "Mandelbrot-Set",
              path: "/01-mandelbrot-set",
              headline: "Mandelbrot/Julia Set",
              description:
                "Generate a Colorful version of the Mandelbrot Set or a variation of Julia Sets",
            },
            {
              title: "Sorting Algorithms",
              path: "/02-sorting-algorithms",
              headline: "Sorting Algorithm",
              description:
                "Visualization of (different) Sorting Algorithms",
            },
            {
              title: "StarWars Hyperspace",
              path: "/03-starwars-hyperspace",
              headline: "StarWars hyperspace simulation",
              description:
                "Experience the thrill of interstellar travel",
            },
            // {
            //   title: "Swarm Simulator",
            //   path: "/04-swarm-simulator",
            //   headline: "Work In progress",
            //   description:
            //     "please don't knock on the glass, it scares the developer",
            // },
            {
              title: "Kaleidoscope",
              path: "/05-kaleidoscope",
              headline: "Kaleidoscope",
              description:
                "Create your own mandalas using this Kaleidoscope",
            },
          ],
        },
        {
          headline: "Extra",
          routePrefix: "/extra",
          subRoutes: [
            {
              title: "Prime spiral",
              path: "/01-prime-spiral",
              headline: "Prime spiral",
              description:
                "A prime spiral, also called a Ulam-Spiral",
            },
            {
              title: "AsciiPictureGenerator",
              path: "/02-ascii-picture-generator",
              headline: "Ascii Picture Generator",
              description:
                "Transforms a normal Image into a black and white ASCII version",
            },
            // {
            //   title: "StarWars Hyperspace",
            //   path: "/03-starwars-hyperspace",
            //   headline: "StarWars hyperspace simulation",
            //   description:
            //     "Experience the thrill of interstellar travel",
            // },
            // {
            //   title: "Swarm Simulator",
            //   path: "/04-swarm-simulator",
            //   headline: "Work In progress",
            //   description:
            //     "please don't knock on the glass, it scares the developer",
            // },
            // {
            //   title: "Kaleidoscope",
            //   path: "/05-kaleidoscope",
            //   headline: "Kaleidoscope",
            //   description:
            //     "Create your own mandalas using this Kaleidoscope",
            // },
          ],
        },
      ],
    };
  },
  methods: {
    handler: function (e) {
      e.preventDefault();
    },
  },
};
</script>

<template>
  <div @contextmenu.prevent="handler">
    <NavBar :routes="routes" />
    <RouterView :routes="routes" />
  </div>
</template>

<style>
.no-scroll {
  overflow: hidden;
}
</style>
