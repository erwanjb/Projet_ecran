import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import {routes} from "./routes" 
import fontawesome from "@fortawesome/fontawesome";
import regular from "@fortawesome/fontawesome-free-regular";
import brands from "@fortawesome/fontawesome-free-brands";
import solid from "@fortawesome/fontawesome-free-solid";
import VModal from 'vue-js-modal'
import axios from 'axios' 
import store from './store'
require('./axios-auth')

Vue.use(VModal, { dynamic: true })



fontawesome.library.add(regular, brands, solid);

Vue.use(VueRouter)
const router = new VueRouter({
  routes,
  mode:"history"

})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        path: '/Sign_in',
      })
    } else {
      next()
    }
  }
  else if (to.matched.some(record => record.meta.requiresVistor)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters.loggedIn) {
      next({
        path: '/',
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
