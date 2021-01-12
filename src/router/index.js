import Vue from 'vue'
import VueRouter from 'vue-router'
import StubComponent from '@/components/StubComponent.vue'
import Feed from '@/pages/Feed.vue'
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
  }
]

const router = new VueRouter({
  routes
})

export default router
