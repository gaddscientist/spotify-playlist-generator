import { createRouter, createWebHistory } from 'vue-router';
import FormPage from '../views/FormPage.vue';
import PlaylistPage from '../views/PlaylistPage.vue';

const routes = [
  {
    path: '/',
    name: 'FormPage',
    component: FormPage,
  },
  {
    path: '/playlist',
    name: 'PlaylistPage',
    component: PlaylistPage,
  },
  {
    path: '/authorized',
    component: PlaylistPage,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
