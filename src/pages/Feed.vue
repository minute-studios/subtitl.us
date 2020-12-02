<template lang="pug">
fish-layout.fill-height(sider="l")
  template(#header)
    BrowseHeader
  template(#sider) Left
  template(#content)
    router-view
  template(#footer) Footer
</template>

<script>
import BrowseHeader from '@/components/headers/BrowseHeader'

export default {
  name: 'Feed',
  components: {
    BrowseHeader
  }
}
</script>
