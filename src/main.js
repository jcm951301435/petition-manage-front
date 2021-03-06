import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '@/styles/index.css'
import '@/router/permission.js'
import menuUtils from '@/utils/menu'

import { mockXHR } from './mock'
if (process.env.VUE_APP_USE_MOCK === 'true') {
  mockXHR()
}

Vue.prototype.$checkMenuShow = menuUtils.checkMenu

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
