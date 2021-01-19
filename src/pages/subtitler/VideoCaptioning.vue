<template lang="pug">
fish-layout.fill-height
  template(#header)
    BrowseHeader
  template(#content)
    fish-layout.fill-height
      template(#header)
        fish-row(align="middle")
          fish-col.pad-h(type="auto")
            h3.header
              small.muted Translating
              .title {{video.title}}
          fish-col(type="auto")
            fish-form.pad-v(inline)
              fish-field(label="Target Language")
                fish-select(search, v-model="targetLang")
                  fish-option(content="English", index="en", disabled)
                  fish-option(content="French", index="fr")
          fish-col(type="auto")
            fish-form.pad-v.pad-r.align-right(inline)
              fish-field
                fish-button()
                  span Save as Draft

              fish-field
                fish-button(type="positive", size="huge")
                  span Review and Submit
                  i.fa.fa-chevron-right

      template(#content)
        fish-row.full
          fish-col(type="fixed", :width="348")
            .video-panel.pad-h
              VideoPlayer(ref="player", :youtubeId="videoId", @playing="onPlaying")
              .tips
                h6 Helpful keyboard shortcuts
                ul
                  li Enter: Move to next line and play
                  li Shift+Enter: Play current line

              fish-form.pad-v(inline)
                fish-field
                  Confirm(@confirm="clearTranslation")
                    template(#default="{ trigger }")
                      fish-button(@click="trigger") Delete changes
                fish-field
                  fish-button(type="primary", @click="autoTranslate") Auto Translate

          fish-col.main-area.inset-shadow(type="auto")
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
            fish-segment.placeholder.choose-target-language(v-else)
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
.header
  margin: 0
.pause-delay
  width: 100px !important
.row.full
  height: 100%
  align-items: stretch
.main-area
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
.video-panel
  .header
    margin-top: 1em
.choose-target-language
  height: 100%
  margin: 0
</style>
