import Vue from 'vue';
import Vuetify from 'vuetify';
import BootstrapVue from 'bootstrap-vue';
import 'vuetify/dist/vuetify.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(BootstrapVue);
Vue.use(Vuex);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
