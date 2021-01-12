<template lang="pug">
fish-layout.fill-height
  template(#header)
    BrowseHeader
  template(#content)
    .container-fluid
      h1.header {{video.title}}
      fish-row
        fish-col(type="auto")
          fish-form.pad-vh(inline)
            fish-field(label="Target Language")
              fish-select(search, v-model="targetLang")
                fish-option(content="English", index="en")
                fish-option(content="French", index="fr")
            fish-field
              fish-button(type="primary", @click="autoTranslate") Auto Translate
            fish-field
              fish-button(@click="clearTranslation") Delete changes

          CaptionTimeline(
            v-if="captionData",
            v-model="translatedCaptionData",
            :current-time="currentTime",
            :captions="captionData",
            @typing="onTyping",
            @prompt-click="playCue",
            @focus-cue="playCue"
          )
        fish-col(type="fixed", :width="640")
          VideoPlayer(ref="player", :youtubeId="videoId", @playing="onPlaying")
          fish-form.pad-v(inline)
            fish-field
              fish-button(type="primary", @click="watchWithTranslations")
                i.fa.fa-play
                span Watch with my captions
            //- fish-field(label="Pause while typing?")
            //-   fish-switch(v-model="pauseWhileTyping")
            //- fish-field(label="Delay")
            //-   fish-input-number.pause-delay(v-model="pauseDelay", label="s", step="0.5", min="0.5", max="20")

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
    targetLang: 'fr',
    currentTime: -1,
    captionData: new CaptionData(),
    translatedCaptionData: null,
    pauseWhileTyping: true,
    pauseDelay: 1.5
  }),
  async mounted(){
    const res = await axios({
      method: 'get',
      url: '/data/captions.vtt',
      responseType: 'text'
    })

    this.captionData = new CaptionData(res.data)
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
    },

    async autoTranslate(){
      const res = await axios({
        method: 'get',
        url: '/data/captions_fr.vtt',
        responseType: 'text'
      })

      this.translatedCaptionData = new CaptionData(res.data)
    },

    clearTranslation(){
      this.translatedCaptionData = new CaptionData()
    },

    watchWithTranslations(){
      const player = this.$refs.player
      player.setCaptions(this.translatedCaptionData.getVtt())
      player.seek(0)
      player.play()
    }
  }
}
</script>

<style lang="sass" scoped>
.pause-delay
  width: 100px !important
</style>
