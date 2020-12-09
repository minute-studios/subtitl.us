<template lang="pug">
fish-timeline.caption-timeline
  fish-timeline-item(v-for="cue in cues", :key="cue.data.start", color="grey")
    .timestamp {{ cue.data.start | duration }}
    fish-input(type="textarea", @keydown.native="$emit('typing', $event)", @click.native="$emit('focus', cue.data)", v-model="cue.data.text")
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
