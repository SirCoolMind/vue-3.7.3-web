import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Dashboard from "../views/Dashboard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/Auth/Login.vue"),
      meta: { guestOnly: true }
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../views/Auth/Register.vue"),
      meta: { guestOnly: true }
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      meta: { authOnly: true }
    },
    {
      path: "/tasks",
      name: "tasks",
      component: () => import("../views/Tasks/Listing.vue"),
      meta: { authOnly: true }
    },
    {
      path: "/tasks/create",
      name: "tasks-create",
      component: () => import("../views/Tasks/Create.vue"),
      meta: { authOnly: true }
    },
    {
      path: "/tasks/:recordId/edit",
      name: "tasks-edit",
      component: () => import("../views/Tasks/Edit.vue"),
      meta: { authOnly: true }
    },
  ],
});

function isLoggedIn() {
  return localStorage.getItem("token");
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guestOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (isLoggedIn()) {
      next({
        path: "/dashboard",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});


export default router;
