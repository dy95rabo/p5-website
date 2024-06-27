import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      meta: {
        hideNavbar: false,
       },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/day1",
      meta: {
        hideNavbar: true,
       },
      children: [
        {
          path: "01-random-lines",
          component: () => import("../components/p5/day1/RandomLines.vue"),
        },
        {
          path: "02-floating-bubbles",
          component: () => import("../components/p5/day1/Bubble.vue"),
        },
        {
          path: "03-random-maze",
          component: () => import("../components/p5/day1/Diagonals.vue"),
        },
        {
          path: "04-random-squares",
          component: () => import("../components/p5/day1/Squares.vue"),
        },
      ],
    },
    {
      path: "/day2",
      meta: {
        hideNavbar: true,
       },
      children: [
        {
          path: "01-image-pixel-manipulation",
          component: () =>
            import("../components/p5/day2/ImageManipulation.vue"),
        },
        {
          path: "02-max-pixel-value",
          component: () => import("../components/p5/day2/ImageMaxValues.vue"),
        },
        {
          path: "03-glitch-effect",
          component: () => import("../components/p5/day2/ImageOverlayEffect.vue"),
        },
      ],
    },
    {
      path: "/day3",
      meta: {
        hideNavbar: true,
       },
      children: [
        {
          path: "01-circle-fill",
          component: () => import("../components/p5/day3/CirclesFill.vue"),
        },
        {
          path: "02-pipe",
          component: () => import("../components/p5/day3/Pipe.vue"),
        },
      ],
    },
    
    {
      path: "/day4",
      meta: {
        hideNavbar: true,
       },
      children: [
        {
          path: "01-l-system",
          component: () => import("../components/p5/day4/LSystem.vue"),
        },
        {
          path: "02-tree-generator",
          component: () => import("../components/p5/day4/Fractals.vue"),
        },
        {
          path: "03-lighting-generator",
          component: () => import("../components/p5/day4/LightningGenerator.vue"),
        },
      ],
    },
    {
      path: "/day5",
      meta: {
        hideNavbar: true,

       },
      children: [
        {
          path: "01-shakespear-gpt",
          component: () => import("../components/p5/day5/Shakespeare.vue"),
        },
        {
          path: "02-word-cloud",
          component: () => import("../components/p5/day5/WordCloud.vue"),
        },
      ],
    },
    {
      path: "/day6",
      meta: {
        hideNavbar: true,
       },
      children: [
        {
          path: "01-conway-game-of-life",
          component: () => import("../components/p5/day6/GameOfLife.vue"),
        },
        {
          path: "02-falling-sand-simulator",
          component: () => import("../components/p5/day6/FallingSand.vue"),
        },
      ],
    },
    {
      path: "/day7",
      meta: {
        hideNavbar: true,
       },
      children: [
        {
          path: "01-mandelbrot-set",
          component: () => import("../components/p5/day7/MandelbrotSet.vue"),
        },
        {
          path: "02-sorting-algorithms",
          component: () => import("../components/p5/day7/SortingAlgorithm.vue"),
        },
        {
          path: "03-starwars-hyperspace",
          component: () => import("../components/p5/day7/StarWarsHyperspace.vue"),
        },
        {
          path: "04-swarm-simulator",
          component: () => import("../components/p5/day7/SwarmSimulator.vue"),
        },
        {
          path: "05-kaleidoscope",
          component: () => import("../components/p5/day7/Kaleidoscope.vue"),
        },
      ],
    },
    {
      path: "/extra",
      meta: {
        hideNavbar: true,
       },
      children: [
        {
          path: "01-prime-spiral",
          component: () => import("../components/p5/extra/PrimeSpiral.vue"),
        },
        {
          path: "02-ascii-picture-generator",
          component: () => import("../components/p5/extra/AsciiPictureGenerator.vue"),
        },
        // {
        //   path: "03-starwars-hyperspace",
        //   component: () => import("../components/p5/day7/StarWarsHyperspace.vue"),
        // },
        // {
        //   path: "04-swarm-simulator",
        //   component: () => import("../components/p5/day7/SwarmSimulator.vue"),
        // },
        // {
        //   path: "05-kaleidoscope",
        //   component: () => import("../components/p5/day7/Kaleidoscope.vue"),
        // },
      ],
    },
  ],
});

export default router;
