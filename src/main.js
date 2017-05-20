import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import App from './app';
import router from './router/router';
import 'element-ui/lib/theme-default/index.css';

Vue.use(VueRouter);
Vue.use(ElementUI);

new Vue({ // eslint-disable-line
  el: '#app',
  router,
  render: h => h(App)
});
