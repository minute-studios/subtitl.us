<template lang="pug">
fish-layout.fill-height
  template(#header)
    BrowseHeader
  template(#content)
    .container-fluid
      h1.header {{video.title}}
      fish-row
        fish-col(type="auto")
          CaptionTimeline(v-if="captionData", :captions="captionData", @typing="onTyping", @focus="onCaptionFocus")
        fish-col(type="fixed", :width="640")
          fish-form.pad-v(inline)
            fish-field(label="Pause while typing?")
              fish-switch(v-model="pauseWhileTyping")
            fish-field(label="Delay")
              fish-input-number.pause-delay(v-model="pauseDelay", label="s", step="0.5", min="0.5", max="20")
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
    captionData: null,
    pauseWhileTyping: true,
    pauseDelay: 1.5
  }),
  async mounted(){
    const res = await axios({
      method: 'get',
      url: '/data/captions.srt',
      responseType: 'text'
    })

    this.captionData = new CaptionData(res.data)
    const player = this.$refs.player
    player.setCaptions(this.captionData.getVtt())
  },
  methods: {
    onTyping(e){
      const player = this.$refs.player
      clearTimeout(this.keyboardTimeout)

      player.setCaptions(this.captionData.getVtt())

      if (!this.pauseWhileTyping){ return }
      if (player.player.paused()){ return }
      player.pause()
      this.keyboardTimeout = setTimeout(() => {
        player.play()
      }, this.pauseDelay * 1000)
    },

    onCaptionFocus(cueData){
      const player = this.$refs.player
      player.seek(cueData.start)
      setTimeout(() => {
        player.playTo(cueData.end)
      }, 100)
    }
  }
}
</script>

<style lang="sass" scoped>
.pause-delay
  width: 100px !important
</style>
