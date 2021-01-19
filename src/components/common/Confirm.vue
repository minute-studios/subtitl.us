<template lang="pug">
span.confirm
  .confirmation(v-if="active")
    fish-button(type="negative", :disabled="!ready", @click="confirm")
      i.fa.fa-question-circle(v-if="ready")
      i.fa.fa-hourglass-half(v-else)
      span {{ msg }}
  .to-confirm(v-else)
    slot(v-bind:trigger="trigger")
</template>

<script>
export default {
  name: 'Confirm',
  props: {
    popup: {
      type: Boolean,
      default: true
    },
    msg: {
      type: String,
      default: 'Are you sure?'
    },
    timeout: {
      type: Number,
      default: 1000
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
      if (this.popup){
        this.$popup.confirm(e, this.msg, () => {
          this.confirm()
        }, 'Yes', 'No')
      } else {
        this.active = true
        setTimeout(() => {
          this.ready = true
        }, this.timeout)
      }
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
</style>
