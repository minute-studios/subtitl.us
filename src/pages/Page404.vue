<template lang="pug">
fish-layout.fill-height
  template(#header)
    BrowseHeader
  template(#content)
    .container-fluid
      .align-center
        h2 Page Not Found

  template(#footer) Footer
</template>

<script>
import BrowseHeader from '@/components/headers/BrowseHeader'

export default {
  name: 'Page404',
  components: {
    BrowseHeader
  }
}
</script>

<style lang="sass" scoped>
</style>
