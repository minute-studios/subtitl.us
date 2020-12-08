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
  }),
  computed: {
    options(){
      return {
        width: 640,
        height: 320,
        autoplay: false,
        controls: true,
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
      this.$emit('ready')
    })
  },

  beforeDestroy(){
    if (this.player){
      this.player.dispose()
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
