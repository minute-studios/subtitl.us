<template lang="pug">
fish-timeline.caption-timeline
  fish-timeline-item(v-for="(cue, i) in cues", :key="cue.data.start", :color="cue === activeCue ? 'green' : 'grey'", ref="cueEls")
    .prompt.clickable(@click="$emit('prompt-click', cue.data)", :class="{ active: cue === activeCue }")
      span.timestamp {{ cue.data.start | duration }}
      span.original-text {{ cue.data.text }}
    fish-input(
      type="text",
      @keydown.enter.native="onEnterKey($event, i)"
      @keydown.shift.enter.native="onEnterKey($event, i - 1)"
      @keyup.native="onKeyup",
      v-model="targetCues[i].data.text"
      v-focus="i === focused"
    )
  fish-timeline-item
    span END
</template>

<script>
import _sortedIndexBy from 'lodash/sortedIndexBy'
import CaptionData from '@/lib/caption-data'

const directives = {
  focus: {
    update(el, binding){
      if (binding.value === true && el !== document.activeElement){
        el.focus()
        const ch = el.querySelector('input')
        if (ch){
          ch.focus()
        }
      }
    }
  }
}

export default {
  name: 'CaptionTimeline',
  props: {
    value: CaptionData,
    currentTime: Number,
    captions: {
      type: CaptionData,
      required: true
    }
  },
  directives,
  data: () => ({
    focused: -1,
    translations: [],
    target: new CaptionData()
  }),
  watch: {
    captions: {
      handler: 'sanitizeTarget',
      deep: true,
      immediate: true
    },
    value: {
      handler: 'copyInput',
      immediate: true
    },
    target: {
      handler(){
        this.$emit('input', this.target)
      },
      deep: true
    }
  },
  computed: {
    cues(){
      return this.captions.cues
    },
    targetCues(){
      return this.target.cues
    },
    activeCue(){
      const idx = _sortedIndexBy(this.cues, { data: { start: this.currentTime } }, o => o.data.start )
      return this.cues[idx - 1]
    }
  },
  methods: {
    sanitizeTarget(){
      this.target = this.captions.clone()
      this.target.cues.forEach(n => { n.data.text = '' })
      this.copyInput()
    },
    copyInput(){
      if (!this.value){ return }
      this.target.cues.forEach((n, i) => {
        const s = this.value && this.value.cues[i]
        n.data.text = s ? s.data.text : ''
      })
    },
    onKeyup(e){
      const inp = String.fromCharCode(event.keyCode)
      // only emit event if it's a language character
      if (/[a-zA-Z0-9-_.,?:;'"!@#$%^&*() ]/.test(inp)){
        this.$emit('typing', e)
      }
    },
    onEnterKey(e, i){
      this.focused = i + 1
      this.$nextTick(() => {
        this.focused = -1
      })
      this.$emit('focus-cue', this.cues[i + 1].data)
    }
  }
}
</script>

<style lang="sass" scoped>
.caption-timeline
  ::v-deep .fish.input
    width: 100%
  ::v-deep textarea
    resize: none

  .event
    margin-bottom: 1rem

.prompt
  color: $text-muted

  span
    margin-right: 1ex

  .timestamp
    color: $text
    font-family: $font-monospace

  &.active
    color: $text-green
    .timestamp
      color: $text-green

  &:hover
    color: $text-blue
    .timestamp
      color: $text-blue
.input
  color: $text-blue
</style>
