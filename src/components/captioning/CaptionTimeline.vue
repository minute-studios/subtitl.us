<template lang="pug">
fish-timeline.caption-timeline
  fish-timeline-item(v-for="cue in cues", :key="cue.data.start", color="grey")
    fish-input(type="textarea", @keydown="$emit('keydown', $event)", :value="cue.data.text")
</template>

<script>
import CaptionData from '@/lib/caption-data'

export default {
  name: 'CaptionTimeline',
  props: {
    captions: CaptionData
  },
  computed: {
    cues(){
      return this.captions.nodes.filter(n => n.type === 'cue')
    }
  }
}
</script>

<style lang="sass" scoped>
.caption-timeline
  padding-right: 2rem
  ::v-deep .fish.input
    width: 100%
  ::v-deep textarea
    resize: none
</style>
