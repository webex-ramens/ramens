import Vue from 'vue'
import VueRouter from 'vue-router'
import ListVIPTicket from '../views/ListVIPTicket.vue'
import ShowVIPTicket from '../views/ShowVIPTicket.vue'
import PostVIPTicket from '../views/PostVIPTicket.vue'
import Chat from '../components/Chat.vue'
import AfterSuccessfulBid from '../views/AfterSuccessfulBid.vue'
import ListVIPProfile from '../views/ListVIPProfile.vue'
import EditProfile from '../components/EditProfile.vue'
import InfluencerProfile from '../views/InfluencerProfile.vue'

// import firebase from 'firebase'
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
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
  },
  {
    path: '/after-successful-bid/:id',
    name: 'AfterSuccessfulBid',
    component: AfterSuccessfulBid,
  },
  {
    path: '/listVIPProfile',
    name: 'ListVIPProfile',
    component: ListVIPProfile,
  },
  {
    path: '/show/user/:id',
    name: 'InfluencerProfile',
    component: InfluencerProfile,
  },
  {
    path: '/editProfile',
    name: 'EditProfile',
    component: EditProfile,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

// let isSignedIn = () => {
//   return firebase.auth().currentUser
// }

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'BeforeSignIn' && !isSignedIn()) {
//     next('/BeforeSignIn')
//   } else {
//     next()
//   }
// })

export default router
