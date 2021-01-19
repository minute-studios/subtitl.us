<template lang="pug">
fish-layout.fill-height
  template(#header)
    BrowseHeader
  template(#content)
    .container-fluid
      h2.header From Your Subscriptions
      .media-grid
        router-link(:to="{ name: 'channel', params: { channelSlug: 'minutelabsio' } }")
          fish-card
            img(width="100%", slot="image", src="https://yt3.ggpht.com/ytc/AAUvwnhz4WmHt4YZriL-WHqEGS-5nf2QY0V5vaTTMFpW=s176-c-k-c0x00ffffff-no-rj-mo")
            h3.title minutephysics
        router-link(:to="{ name: 'channel', params: { channelSlug: 'minutelabsio' } }")
          fish-card
            img(width="100%", slot="image", src="https://yt3.ggpht.com/ytc/AAUvwngGYX8_aHh3FnTJkYR9HFBm0XDVxRGDfPg12Tu3=s176-c-k-c0x00ffffff-no-rj-mo")
            h3.title MinuteEarth
        router-link(:to="{ name: 'channel', params: { channelSlug: 'minutelabsio' } }")
          fish-card
            img(width="100%", slot="image", src="https://yt3.ggpht.com/ytc/AAUvwnjLKABCZJCxz5WsT8ORxwQxGwW1o5QMZbyZBTABVA=s176-c-k-c0x00ffffff-no-rj-mo")
            h3.title Primer
      h2.header Featured Channels
      .media-grid
        router-link(:to="{ name: 'channel', params: { channelSlug: 'minutelabsio' } }")
          fish-card
            img(width="100%", slot="image", src="https://yt3.ggpht.com/ytc/AAUvwnhz4WmHt4YZriL-WHqEGS-5nf2QY0V5vaTTMFpW=s176-c-k-c0x00ffffff-no-rj-mo")
            h3.title minutephysics

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

<style lang="sass" scoped>
.media-grid
  display: flex
  width: 100%
  > *
    width: 15%
    margin-right: 3%
</style>
