import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { createRouter, createWebHistory } from "vue-router";
import BlogList from "./components/pages/BlogList";
import BlogCreate from "./components/pages/BlogCreate";
import BlogEdit from "./components/pages/BlogEdit";
import BlogShow from "./components/pages/BlogShow";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.interceptors.request.use(function (config) {
  config.headers["X-Binarybox-Api-Key"] = process.env.VUE_APP_API_KEY;
  return config;
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: BlogList },
    { path: "/create", component: BlogCreate },
    { path: "/edit/:id", component: BlogEdit },
    { path: "/show/:id", component: BlogShow },
  ],
});

createApp(App).use(router).mount("#app");
