import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'FindUser',
    component: () => import('../components/FindUser.vue'),
  },
  {
    path: '/user',
    name: 'CardUser',
    component: () => import('../components/CardUser.vue'),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
