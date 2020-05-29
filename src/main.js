import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueScrollTo from 'vue-scrollto'
import {
  requestNotificationPermission
} from "./js/notifications";
import push from "./js/push-notifications";

requestNotificationPermission();

Vue.use(VueScrollTo)
Vue.prototype.Caman = window.Caman;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

(function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("Service worker registered", reg))
      .catch((err) => console.log("Service worker not registered", err));
    push()
  }
}())