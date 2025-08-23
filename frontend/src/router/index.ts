import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('@/views/wigs/Wigs.vue') },
    { path: '/settings', component: () => import('@/views/settings/Settings.vue') },
  ],
})

export default router
