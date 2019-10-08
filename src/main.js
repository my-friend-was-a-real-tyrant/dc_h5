// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Popup } from 'vant';
import '@/rem.js'
Vue.config.productionTip = false

import axios from 'axios'
var instance = axios.create({
  timeout: 5000  // 请求超时时间
})

import Crypt from '@/aes.js';
Vue.use(Popup);
instance.interceptors.request.use(config => {
  //console.log('config',config.data);
  config.data = Crypt.enc(JSON.stringify(config.data));
  return config;
},
  error => {
    Promise.reject(error)
  })
instance.interceptors.response.use(response => {
  return JSON.parse(Crypt.dec(response.data));
},
  error => {
    Promise.reject(error)
  })
Vue.prototype.$axios = instance;

Vue.prototype.$get_time = () => {
  return (new Date()).getTime() / 1000;
}

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
