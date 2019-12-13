import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/photo',
      name: 'photo',
      component: () => import(/* webpackChunkName: "photo" */ './views/Photo.vue'),
    },
    {
      path: '/documents',
      name: 'documents',
      component: () => import(/* webpackChunkName: "documents" */ './views/Documents.vue'),
    },
    {
      path: '/video',
      name: 'video',
      component: () => import(/* webpackChunkName: "video" */ './views/Video.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      props: true,
      component: () => import(/* webpackChunkName: "auth" */ './views/Auth.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue'),
    },
  ],
});
