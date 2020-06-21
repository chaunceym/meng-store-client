import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

import {Tabbar, TabbarItem,Tab, Tabs, PullRefresh,Button, Row, Col, Icon, Swipe, SwipeItem, Lazyload, List, NavBar, Field} from 'vant';

Vue.use(Button).use(Tab).use(Tabbar).use(TabbarItem).use(PullRefresh).use(Tabs).use(Row).use(Col).use(Icon)
  .use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(NavBar).use(Field);
Vue.use(VueAwesomeSwiper, /* { default options with global component } */);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

//得到手机屏幕的宽度
let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
if (htmlWidth > 750) htmlWidth = 750;
//得到html的Dom元素
const htmlDom = document.getElementsByTagName('html')[0];
//设置根元素字体大小
htmlDom.style.fontSize = htmlWidth / 20 + 'px';
