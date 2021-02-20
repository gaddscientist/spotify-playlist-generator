import { createRouter, createWebHistory } from 'vue-router';
import FormPage from '../views/FormPage.vue';
import LandingPage from '../views/LandingPage.vue';
import PlaylistPage from '../views/PlaylistPage.vue';

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
  },
  {
    path: '/form',
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
  {
    path: '/github',
    beforeEnter: () => {
      location.href =
        'https://github.com/hilldrupbf/spotify-playlist-generator';
    },
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
