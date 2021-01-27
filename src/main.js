import '@/config/setup'
import Vue from 'vue'
import App from './App.vue'
// import FishUI from 'fish-ui'
import router from './router'
import store from './store'
import Vuikit from 'vuikit'
import VuikitIcons from '@vuikit/icons'
import vSelect from 'vue-select'
import filters from '@/plugins/filters'
import '@vuikit/theme'

import '@/components/common/_globals'
import '@/styles/main.sass'

Vue.use(Vuikit)
Vue.use(VuikitIcons)
Vue.component('v-select', vSelect)
Vue.use(filters)

// Vue.use(FishUI)
Vue.config.productionTip = false

// Utility for routing
Vue.prototype.$href = (name) => {
  return router.resolve({ name }).href
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
