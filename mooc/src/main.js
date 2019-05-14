// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
// import Router from 'vue-router'
// import goods from '@/components/goods'
// import ratings from '@/components/ratings'
// import seller from '@/components/seller'

Vue.config.productionTip = false

Vue.use(VueResource)

// Vue.use(Router)

// let app = Vue.extend(App)
//
// let router = new Router()
//
// router.map({
//   '/goods': {
//     component: goods
//   },
//   '/ratings': {
//     component: ratings
//   },
//   '/seller': {
//     component: seller
//   }
// })
//
// router.start(app, '#app')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
