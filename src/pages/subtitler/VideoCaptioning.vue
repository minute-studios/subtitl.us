<template lang="pug">
fish-layout.fill-height
  template(#header)
    BrowseHeader
  template(#content)
    .container-fluid
      h1.header {{video.title}}
      fish-row
        fish-col(type="auto")
          CaptionTimeline(v-if="captionData", :captions="captionData", @keydown="onKeydown")
        fish-col(type="fixed", :width="640")
          VideoPlayer(ref="player", :youtubeId="videoId")
  template(#footer) Footer
</template>

<script>
import axios from 'axios'
import CaptionData from '@/lib/caption-data'
import BrowseHeader from '@/components/headers/BrowseHeader'
import VideoPlayer from '@/components/captioning/VideoPlayer'
import CaptionTimeline from '@/components/captioning/CaptionTimeline'

export default {
  name: 'VideoCaptioning',
  props: {
    videoId: String
  },
  components: {
    BrowseHeader,
    VideoPlayer,
    CaptionTimeline
  },
  data: () => ({
    video: {
      title: 'The Most Realistic Pokemon'
    },
    captionData: null
  }),
  async mounted(){
    const res = await axios({
      method: 'get',
      url: '/data/captions.srt',
      responseType: 'text'
    })

    this.captionData = new CaptionData(res.data)
  },
  methods: {
    onKeydown(e){
      const player = this.$refs.player.player
      player.pause()
      clearTimeout(this.keyboardTimeout)
      this.keyboardTimeout = setTimeout(() => {
        player.play()
      }, 500)
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
