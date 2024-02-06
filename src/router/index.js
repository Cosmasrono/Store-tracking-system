import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Admin from "../views/Admin.vue"; // Import the Admin component

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    {
      path: "/admin",
      name: "Admin", // Ensure the name is 'Admin'
      component: Admin,
      props: true,
    },

    {
      path: "/LoginView",
      name: "LoginView",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/ProductView",
      name: "ProductView",
      component: () => import("../views/ProductView.vue"),
    },
    {
      path: "/CartView",
      name: "CartView",
      component: () => import("../views/CartView.vue"),
    },
    {
      path: "/PaymentView",
      name: "PaymentView",
      component: () => import("../views/PaymentView.vue"),
    },
  ],
});

export default router;
