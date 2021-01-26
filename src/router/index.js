import Vue from 'vue'
import VueRouter from 'vue-router'
import StubComponent from '@/components/StubComponent.vue'
import Feed from '@/pages/Feed.vue'
import Page404 from '@/pages/Page404.vue'
import Channel from '@/pages/subtitler/Channel.vue'
import VideoCaptioning from '@/pages/subtitler/VideoCaptioning.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'feed',
    component: Feed
  },
  {
    path: '/channel/:channelSlug',
    name: 'channel',
    component: Channel,
    props: true
  },
  {
    path: '/video/:videoId',
    name: 'captioning',
    component: VideoCaptioning,
    props: true
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: StubComponent
  },
  {
    path: '/user/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "user" */ '@/pages/user/Profile.vue')
  },
  {
    path: '/user/channels',
    name: 'mychannels',
    component: () => import(/* webpackChunkName: "user" */ '@/pages/user/MyChannels.vue')
  },
  {
    path: '/user/drafts',
    name: 'drafts',
    component: () => import(/* webpackChunkName: "user" */ '@/pages/user/MyDrafts.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    redirect: { name: 'feed' },
    beforeEnter: (to, from, next) => {
      // logout
      next()
    }
  },
  {
    path: '*',
    component: Page404
  }
]

const router = new VueRouter({
  routes
})

export default router
