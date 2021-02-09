import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../components/Layout/Placeholder.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/User/Login.vue"),
  },
  {
    path: "/join",
    name: "Create USer",
    component: () => import("../components/User/CreateUser.vue"),
  },
  {
    path: "/:username",
    name: "UserProfile",
    component: () => import("../components/User/Profile.vue"),
  },
  {
    path: "/:username/p/:project",
    name: "Project",
    component: () => import("../views/Project.vue"),
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
