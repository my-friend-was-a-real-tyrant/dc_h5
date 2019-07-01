// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import '@/rem.js'
Vue.config.productionTip = false

import axios from 'axios'
var instance = axios.create({
  baseURL: 'https://api.haoxianghuaqian.com/',  // api的base_url
  timeout: 5000  // 请求超时时间
})
instance.interceptors.request.use(config => {
  return config;
},
  error => {
    Promise.reject(error)
  })
instance.interceptors.response.use(response => {
  return response.data;
},
  error => {
    Promise.reject(error)
  })
Vue.prototype.$axios = instance;

Vue.prototype.console = function(msg,data) {
  console.info(msg,data)
}

router.beforeEach((to,from,next)=>{
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
