<template lang="pug">
fish-layout.fill-height
  template(#header)
    BrowseHeader
  template(#content)
    .container-fluid
      h1.header {{video.title}}
      fish-row
        fish-col(type="auto")
          CaptionTimeline(
            v-if="captionData",
            :current-time="currentTime",
            :captions="captionData",
            @typing="onTyping",
            @prompt-click="playCue",
            @focus-cue="playCue"
          )
        fish-col(type="fixed", :width="640")
          fish-form.pad-v(inline)
            fish-field(label="Pause while typing?")
              fish-switch(v-model="pauseWhileTyping")
            fish-field(label="Delay")
              fish-input-number.pause-delay(v-model="pauseDelay", label="s", step="0.5", min="0.5", max="20")
          VideoPlayer(ref="player", :youtubeId="videoId", @playing="onPlaying")

          .tips
            h6 Helpful keyboard shortcuts
            ul
              li Enter: Move to next line and play
              li Shift+Enter: Play current line
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
    currentTime: -1,
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
    // const player = this.$refs.player
    // player.setCaptions(this.captionData.getVtt())
  },
  methods: {
    onTyping(e){
      const player = this.$refs.player
      clearTimeout(this.keyboardTimeout)

      // player.setCaptions(this.captionData.getVtt())

      if (!this.pauseWhileTyping){ return }
      if (player.player.paused()){ return }
      player.pause()
      this.keyboardTimeout = setTimeout(() => {
        player.play()
      }, this.pauseDelay * 1000)
    },

    onPlaying({ time, fraction }){
      this.currentTime = time
    },

    playCue(cueData){
      const fudge = 50
      const player = this.$refs.player
      player.seek(cueData.start + fudge)
      setTimeout(() => {
        player.playTo(cueData.end - fudge)
      }, 100)
    }
  }
}
</script>

<style lang="sass" scoped>
.pause-delay
  width: 100px !important
</style>
