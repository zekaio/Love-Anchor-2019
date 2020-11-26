import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { instance } from './js/api';

instance.defaults.timeout = 10000 * 3;
Vue.prototype.axios = instance;

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
