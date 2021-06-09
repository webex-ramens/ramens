import Vue from 'vue'
import VueRouter from 'vue-router'
import ListVIPTicket from '../views/ListVIPTicket.vue'
import ShowVIPTicket from '../views/ShowVIPTicket.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ListVIPTicket',
    component: ListVIPTicket,
  },
  {
    path: '/show--vip-ticket/:id',
    name: 'ShowVIPTicket',
    component: ShowVIPTicket,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
