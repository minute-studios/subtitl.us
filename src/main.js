import Vue from 'vue'
import App from './App.vue'
import FishUI from 'fish-ui'
import router from './router'
import store from './store'

import '@/styles/main.sass'

Vue.use(FishUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
