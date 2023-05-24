import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import AppLayout from '../layouts/AppLayout.vue';
const ErrorRoutes: RouteRecordRaw[] = [
  {
    path: '/not-found',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      layout: AppLayout,
      requiresAuth: true
    }
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: () => import('../views/UnAuthorized.vue'),
    meta: {
      layout: AppLayout,
      requiresAuth: false
    }
  }
]

const ClientRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      layout: AppLayout,
      requiresAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...ClientRoutes,
    ...ErrorRoutes,
    {
      path: '/:pathMatch(.*)*',
      redirect: () => ({ name: 'NotFound' })
    }
  ],
  linkActiveClass: 'active'
})

export default router
