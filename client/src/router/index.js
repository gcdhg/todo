import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '../views/Home.vue'
import Menu from "@/views/Menu";
import Profile from "@/components/Profile";
// import Tasks from "@/components/Tasks";
// import Join from "@/components/Placeholders/Join";
import Choose from "../components/Placeholders/LoginOrJoin";
// import Login from "../components/User/Login";
// import CreateUser from "../components/User/CreateUser";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Choose,
  },
  {
    path: "/join",
    component: () => import("../components/User/CreateUser"),
  },
  {
    path: "/:username",
    name: "Menu",
    component: Menu,
    children: [
      {
        path: "profile",
        name: "Profile",
        component: Profile,
      },
      {
        path: "tasks",
        name: "Tasks",
        component: () => import("@/components/Tasks"),
      },
    ],
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
];

const router = new VueRouter({
  routes,
});

export default router;
