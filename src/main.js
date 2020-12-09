import '@/config/setup'
import Vue from 'vue'
import App from './App.vue'
import FishUI from 'fish-ui'
import router from './router'
import store from './store'
import filters from '@/plugins/filters'

import '@/styles/main.sass'

Vue.use(filters)

Vue.use(FishUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
