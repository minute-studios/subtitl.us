<template lang="pug">
PageLayout
  template(#header)
    BrowseHeader
  template(#content)
    .container-fluid
      p My Channels

  template(#footer) Footer
</template>

<script>
import BrowseHeader from '@/components/headers/BrowseHeader'

export default {
  name: 'MyChannels',
  components: {
    BrowseHeader
  }
}
</script>

<style lang="sass" scoped>
</style>
