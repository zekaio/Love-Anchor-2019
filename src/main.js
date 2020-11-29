import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { instance } from './js/api';
import { Loading, Overlay } from 'vant';

instance.defaults.timeout = 10000 * 3;
Vue.prototype.axios = instance;

Vue.config.productionTip = false;
Vue.use(Loading).use(Overlay);
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
