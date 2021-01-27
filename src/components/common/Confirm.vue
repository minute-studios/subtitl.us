<template lang="pug">
.confirm
  .to-confirm
    slot(v-bind:trigger="trigger")
  vk-card.confirmation(v-if="active")
    p {{ msg }}
    vk-button-group
      vk-button(type="danger", size="small", @click="confirm") Confirm
      vk-button(size="small", @click="reset") Cancel
</template>

<script>
export default {
  name: 'Confirm',
  props: {
    msg: {
      type: String,
      default: 'Are you sure?'
    }
  },
  data(){
    return {
      ready: false,
      active: false,
      trigger: (e) => this.prompt(e)
    }
  },
  methods: {
    prompt(e){
      this.active = true
    },
    confirm(){
      this.reset()
      this.$emit('confirm')
    },
    reset(){
      this.ready = false
      this.active = false
    }
  }
}
</script>

<style lang="sass" scoped>
.confirm
  display: inline-block
  position: relative
  .confirmation
    position: absolute
    top: 100%
    margin-top: -1px
    border: 1px solid $light-border
    border-radius: 3px
</style>
