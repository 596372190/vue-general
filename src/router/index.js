import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/common/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path:"/home",
    name:"home",
    component:Home,
  }
];

const router = new VueRouter({
  routes
});

export default router;
