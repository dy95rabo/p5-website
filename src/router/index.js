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
          path: "random-lines",
          component: () => import("../components/p5/day1/RandomLines.vue"),
        },
        {
          path: "bubbles",
          component: () => import("../components/p5/day1/Bubble.vue"),
        },
        {
          path: "diagonal-maze",
          component: () => import("../components/p5/day1/Diagonals.vue"),
        },
        {
          path: "random-squares",
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
          path: "basic-image-manipulation",
          component: () =>
            import("../components/p5/day2/ImageManipulation.vue"),
        },
        {
          path: "max-value-pixels",
          component: () => import("../components/p5/day2/ImageMaxValues.vue"),
        },
        {
          path: "image-glitch-effect",
          component: () => import("../components/p5/day2/ImageOverlayEffect.vue"),
        },
      ],
    },
    {
      path: "/day3",
      meta: {
        hideNavbar: true,
       },
      meta: {
        hideNavbar: true,
       },
      children: [
        {
          path: "circles-fill",
          component: () => import("../components/p5/day3/CirclesFill.vue"),
        },
        {
          path: "pipe",
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
          path: "l-system",
          component: () => import("../components/p5/day4/LSystem.vue"),
        },
        {
          path: "recursive-tree-generator",
          component: () => import("../components/p5/day4/Fractals.vue"),
        },
        {
          path: "lighting-generator",
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
          path: "shakespeare-gpt",
          component: () => import("../components/p5/day5/Shakespeare.vue"),
        },
        {
          path: "word-cloud",
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
          path: "game-of-life",
          component: () => import("../components/p5/day6/GameOfLife.vue"),
        },
        {
          path: "falling-sand",
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
          path: "sorting-algorithms",
          component: () => import("../components/p5/day7/SortingAlgorithm.vue"),
        },
        {
          path: "mandelbrot-set",
          component: () => import("../components/p5/day7/MandelbrotSet.vue"),
        },
        {
          path: "starwars-hyperspace",
          component: () => import("../components/p5/day7/StarWarsHyperspace.vue"),
        },
        {
          path: "swarm-simulator",
          component: () => import("../components/p5/day7/SwarmSimulator.vue"),
        },
      ],
    },
  ],
});

export default router;
