import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/price',
      name: 'price',
      component: () => import('../views/home/index.vue')
    },
  ]
})

export default router
