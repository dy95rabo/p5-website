import "./assets/main.css";

import { createApp } from "vue";

import { autoAnimatePlugin } from "@formkit/auto-animate/vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import App from "./App.vue";
import router from "./router";
import p5vue from "p5vue";

const app = createApp(App);

app.use(autoAnimatePlugin);
app.use(p5vue);
app.use(router);

app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
