import Vue from 'vue'

import 'normalize.css/normalize.css' // 规格化css

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // 全局css

import App from './App'
// 引入vuex
import store from './store'
import router from './router'

import '@/icons' // 图标
import '@/permission' // 动态路由权限控制

Vue.use(ElementUI)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
