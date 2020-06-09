/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-06-06 11:27:42
 * @LastEditTime 2020-06-07 14:57:13
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
