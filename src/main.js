import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router/router';
import ElementUI from 'element-ui';
import App from './app';
import 'element-ui/lib/theme-default/index.css';

Vue.use(VueRouter);
Vue.use(ElementUI);

const router = new VueRouter({
  routes
});
new Vue({ // eslint-disable-line
  el: '#app',
  router,
  render: h => h(App)
});
