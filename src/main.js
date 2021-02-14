import Vue from 'vue'
import App from './App.vue'
import router from "./router";
Vue.config.productionTip = false

// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/swiper-bundle.css'
// Vue.use(VueAwesomeSwiper)
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
