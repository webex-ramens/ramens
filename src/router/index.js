import Vue from 'vue'
import VueRouter from 'vue-router'
import ListVIPTicket from '../views/ListVIPTicket.vue'
import ShowVIPTicket from '../views/ShowVIPTicket.vue'
import PostVIPTicket from '../views/PostVIPTicket.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ListVIPTicket',
    component: ListVIPTicket,
  },
  {
    path: '/show/ticket/:id',
    name: 'ShowVIPTicket',
    component: ShowVIPTicket,
  },
  {
    path: '/post',
    name: 'PostVIPTicket',
    component: PostVIPTicket,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
