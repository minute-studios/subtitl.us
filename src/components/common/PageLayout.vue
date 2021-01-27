<template lang="pug">
.page
  header.header
    slot(name="header")
  .content
    slot(name="content")
  footer.footer
    slot(name="footer")
</template>

<script>
export default {
  name: 'PageLayout',
  props: {
  }
}
</script>

<style lang="sass" scoped>
.page
  display: flex
  flex-direction: column
  min-height: 100vh
  .header
    display: flex
    flex-direction: column
    background: $blue-grey
    color: $light-grey
  .content
    display: flex
    flex-direction: column
    flex: 1
  .footer
    display: flex
    flex-direction: column
    background: $blue-grey
    color: $light-grey
    padding: 1rem
</style>
