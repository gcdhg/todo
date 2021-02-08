import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '../views/Home.vue'

import Login from "../components/User/Login.vue";
import Profile from "../components/User/Profile.vue";
import Project from "../views/Project.vue";
import Placeholder from "../components/Layout/Placeholder.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Placeholder,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/:username",
    name: "UserProfile",
    component: Profile,
  },
  {
    path: "/:username/p/:project",
    name: "Project",
    component: Project,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "*",
    component: { render: (h) => h("div", ["404! Page Not Found!"]) },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
