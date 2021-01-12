<template lang="pug">
.video-player
  video(ref="player" class="video-js")
</template>

<script>
import videojs from 'video.js'
import 'videojs-youtube'

import 'video.js/dist/video-js.css'

export default {
  name: 'VideoPlayer',
  props: {
    youtubeId: {
      type: String,
      required: true
    }
  },
  data: () => ({
    playToTime: false
  }),
  computed: {
    options(){
      return {
        width: 640,
        height: 320,
        autoplay: false,
        controls: true,
        preload: 'auto',
        html5: {
          nativeTextTracks: false
        },
        techOrder: ['youtube'],
        sources: [{
          type: 'video/youtube',
          src: `https://www.youtube.com/watch?v=${this.youtubeId}`
        }],
        youtube: {
          cc_load_policy: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0
        }
      }
    }
  },

  mounted(){
    this.player = videojs(this.$refs.player, this.options, () => {
      const duration = this.player.duration() * 1000
      this.player.setInterval(() => {
        const time = this.player.currentTime() * 1000
        this.$emit('playing', { time, fraction: time / duration })
      }, 100)

      this.$emit('ready', duration)
    })

    this.$on('playing', ({ time }) => {
      if (this.playToTime && this.playToTime <= time){
        this.playToTime = false
        this.pause()
      }
    })
  },

  beforeDestroy(){
    if (this.player){
      this.player.dispose()
    }
  },

  methods: {
    seek(timeMs){
      if (this.player.bufferedPercent() <= 0){
        this.player.one('play', () => {
          this.player.currentTime(timeMs / 1000)
        })
        this.play()
      } else {
        this.player.currentTime(timeMs / 1000)
      }
      return this
    },

    play(){
      this.player.play()
      return this
    },

    pause(){
      this.player.pause()
      return this
    },

    playTo(timeMs){
      this.playToTime = timeMs
      this.play()
    },

    setCaptions(vttText){
      const srt = new Blob([vttText], { type: 'text/vtt; charset=UTF-8' })
      const url = URL.createObjectURL(srt)
      if (this.textTrack){
        this.textTrack.mode = 'hidden'
        this.player.removeRemoteTextTrack(this.textTrack)
      }

      this.textTrack = this.player.addRemoteTextTrack({
        src: url,
        label: 'Your Captions',
        mode: 'showing',
        default: true
      }, false)

      this.player.setTimeout(() => {
        this.textTrack.mode = 'showing'
        // console.log(this.textTrack)
      }, 20)
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
