import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AboutCompositionApi from '../views/AboutCompositionApi.vue'
import AboutMultipleVmodel from '../views/AboutMultipleVmodel.vue'
import AboutBetterReactivity from '../views/AboutBetterReactivity.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about-composition-api",
    name: "AboutCompositionApi",
    component: AboutCompositionApi
  },
  {
    path: "/about-multiple-vmodel",
    name: "AboutMultipleVmodel",
    component: AboutMultipleVmodel
  },
  {
    path: "/about-better-reactivity",
    name: "AboutBetterReactivity",
    component: AboutBetterReactivity
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router