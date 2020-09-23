import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    meta: {
      title: "Home"
    },
    component: Home
  }, {
    path: "/rooms/person",
    name: "Rooms",
    meta: {
      title: "Room"
    },
    component: () => import("../views/Room.vue")
}];

const router = new VueRouter({
  routes
});

export default router;