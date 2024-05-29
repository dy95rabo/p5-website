import "./assets/main.css";

// import Vue from 'vue'

import { createApp } from "vue";
// import { createPinia } from "pinia";
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import App from "./App.vue";
import router from "./router";
import p5vue from "p5vue";

const app = createApp(App);
// app.use(BootstrapVue)
// app.use(IconsPlugin)

// const pinia = createPinia();
// pinia.use(piniaPluginPersistedstate);

app.use(autoAnimatePlugin);
// app.use(pinia);
app.use(p5vue);
app.use(router);

app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
