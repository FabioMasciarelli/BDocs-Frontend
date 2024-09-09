import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import DoctorProfile from "./pages/DoctorProfile.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
        path: "/",
        name: "home",
        component: HomePage,
      },
      {
        path: '/doctors/:id',
        name: 'DoctorProfile',
        component: DoctorProfile,
      },
  ],
});

export { router };