import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import ShoppingMall from '../views/ShoppingMall.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  { path: '/', name: 'ShoppingMall', component: ShoppingMall },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
];

const router = new VueRouter({
  routes
});

export default router;
