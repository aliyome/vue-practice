import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/unko',
    redirect: '/about',
  },
  {
    path: '/',
    name: 'home',
    props: true,
    components: {
      default: Home,
      sub: About,
    },
  },
  {
    path: '/foo/:id',
    name: 'foo',
    // props: { p: 'fooooo' },
    props: (route: any) => ({ id: route.params.id, p: '2' }),
    component: Home,
    meta: { requiredAuth: true },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   console.log(to, from);
//   next(false);
// });
router.beforeResolve((to, from, next) => {
  // console.log(to, from);
  console.log(to.matched.some(record => record.meta.requiredAuth));
  next();
});

export default router;
