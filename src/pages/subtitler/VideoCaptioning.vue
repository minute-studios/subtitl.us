<template lang="pug">
PageLayout
  template(#header)
    BrowseHeader
  template(#content)
    .video-captioning
      vk-grid.upper.uk-flex-middle.pad-h
        .uk-width-auto
          h3.heading
            small.muted Translating
            .title {{video.title}}
        .uk-width-expand
          label Target Language
          v-select(v-model="targetLang", :options="languageChoices")
        .uk-width-auto
          vk-button-group
            vk-button()
              span Save as Draft

            vk-button(type="primary")
              span Review and Submit
              i.fa.fa-chevron-right

      .main
        .sidebar
          .video-panel.pad-h
            VideoPlayer(ref="player", :youtubeId="videoId", @playing="onPlaying")
            .tips
              h6 Helpful keyboard shortcuts
              ul
                li Enter: Move to next line and play
                li Shift+Enter: Play current line

            .pad-v
              Confirm(@confirm="clearTranslation")
                template(#default="{ trigger }")
                  vk-button(@click="trigger", size="small") Delete changes
              vk-button(type="primary", @click="autoTranslate", size="small") Auto Translate

        .main-area.inset-shadow
          .pad-vh.scroll-area(v-if="targetLang")
            CaptionTimeline(
              v-if="captionData",
              v-model="translatedCaptionData",
              :current-time="currentTime",
              :captions="captionData",
              @typing="onTyping",
              @prompt-click="playCue",
              @focus-cue="playCue"
            )
          .choose-target-language(v-else)
            p To start, choose a <strong>Target Language</strong> above.

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
    languageChoices: [
      { label: 'English', code: 'en' },
      { label: 'French', code: 'fr' }
    ],
    targetLang: null,
    currentTime: -1,
    captionData: new CaptionData(),
    translatedCaptionData: null,
    pauseWhileTyping: false,
    pauseDelay: 1.5
  }),
  async mounted(){
    const res = await axios({
      method: 'get',
      url: 'data/captions.vtt',
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
        url: 'data/captions_fr.vtt',
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
.video-captioning
  flex: 1
  display: flex
  flex-direction: column
  height: 100%
.upper
  height: 100px
  .heading
    margin-bottom: 0
.main
  flex: 1
  display: flex
  .sidebar
    width: 354px
  .main-area
    display: flex
    flex-direction: column
    justify-content: center
    flex: 1
    background: $bg-subtle
    &:before
      border-radius: 3px 0 0 0
.scroll-area
  overflow: scroll
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
.choose-target-language
  text-align: center
  align-self: center
  justify-self: center
</style>
