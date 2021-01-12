<template lang="pug">
fish-layout.fill-height(sider="l")
  template(#header)
    BrowseHeader
  template(#sider) Left
  template(#content)
    .container-fluid
      h1.header Featured Channels
      fish-row
        fish-col(type="auto")
          router-link(:to="{ name: 'channel', params: { channelSlug: 'minutelabsio' } }")
            fish-col.thumbnail(type="fixed", :width="400")
              fish-image(url="https://yt3.ggpht.com/W4mDLBwUkR5-t4IYbHgLEho_GnqxNaMLwHw2imVO7O7aCt8Tr5301Q1nrjGou2kmLSvK_WCBEQ=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj" rounded)
            fish-col
              h3.title MinuteLabs.io

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
