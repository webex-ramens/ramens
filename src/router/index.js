import Vue from 'vue'
import VueRouter from 'vue-router'
import BeforeSignIn from '@/views/BeforeSignIn.vue'
import AfterSignIn from '@/views/AfterSignIn.vue'
import firebase from 'firebase'
// import ListVIPTicket from '../views/ListVIPTicket.vue'
import ShowVIPTicket from '../views/ShowVIPTicket.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/BeforeSignIn',
  },
  {
    path: '/BeforeSignIn',
    name: 'BeforeSignIn',
    component: BeforeSignIn,
  },
  {
    path: '/AfterSignIn',
    name: 'AfterSignIn',
    component: AfterSignIn,
  },
  {
    path: '/show/ticket/:id',
    name: 'ShowVIPTicket',
    component: ShowVIPTicket,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

let isSignedIn = () => {
  return firebase.auth().currentUser
}

router.beforeEach((to, from, next) => {
  if (to.name !== 'BeforeSignIn' && !isSignedIn()) {
    next('/BeforeSignIn')
  } else {
    next()
  }
})

export default router
