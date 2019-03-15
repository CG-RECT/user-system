import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import hui from 'h_ui/dist/h_ui.min.js'
import 'h_ui/dist/h_ui.min.css'
import './style/main.scss'
import HCharts from 'h_charts'
import http from '@/libs/http.js'

if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.prototype.$config = window.LOCAL_CONFIG
Vue.prototype.$http = http

Vue.use(hui)
Vue.use(HCharts)
Vue.config.productionTip = false

import HPanel from './components/Hpanel.vue'
Vue.component('h-panel', HPanel)

Vue.config.productionTip = false
Vue.config.debug = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
