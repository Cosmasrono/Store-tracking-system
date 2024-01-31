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
      name: "admin",
      component: Admin,
      props: true // Allow passing route params as props to the component
    },
    // Other routes if any
  ]
});

export default router;
