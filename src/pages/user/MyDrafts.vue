<template lang="pug">
fish-layout.fill-height
  template(#header)
    BrowseHeader
  template(#content)
    .container-fluid
      p My Drafts

  template(#footer) Footer
</template>

<script>
import BrowseHeader from '@/components/headers/BrowseHeader'

export default {
  name: 'MyDrafts',
  components: {
    BrowseHeader
  }
}
</script>

<style lang="sass" scoped>
</style>
