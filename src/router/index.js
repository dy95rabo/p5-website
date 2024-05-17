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
          path: "exercise1",
          component: () => import("../components/p5/day1/RandomLines.vue"),
        },
        {
          path: "exercise2",
          component: () => import("../components/p5/day1/Bubble.vue"),
        },
        {
          path: "exercise3",
          component: () => import("../components/p5/day1/Diagonals.vue"),
        },
        {
          path: "exercise4",
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
          path: "exercise1",
          component: () =>
            import("../components/p5/day2/ImageManipulation.vue"),
        },
        {
          path: "exercise2",
          component: () => import("../components/p5/day2/ImageMaxValues.vue"),
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
          path: "exercise1",
          component: () => import("../components/p5/day3/CirclesFill.vue"),
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
          path: "exercise1",
          component: () => import("../components/p5/day4/Fractals.vue"),
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
          path: "exercise1",
          component: () => import("../components/p5/day5/Shakespeare.vue"),
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
          path: "exercise1",
          component: () => import("../components/p5/day6/WayOfLife.vue"),
        },
      ],
    },
  ],
});

export default router;
