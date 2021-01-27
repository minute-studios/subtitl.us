<template lang="pug">
PageLayout
  template(#header)
    BrowseHeader
  template(#content)
    .container-fluid
      h2.heading From Your Subscriptions
      .media-grid
        router-link(:to="{ name: 'channel', params: { channelSlug: 'minutelabsio' } }")
          vk-card
            template(#media-top)
              img(width="100%", src="https://yt3.ggpht.com/ytc/AAUvwnhz4WmHt4YZriL-WHqEGS-5nf2QY0V5vaTTMFpW=s176-c-k-c0x00ffffff-no-rj-mo")
            vk-card-title minutephysics
        router-link(:to="{ name: 'channel', params: { channelSlug: 'minutelabsio' } }")
          vk-card
            template(#media-top)
              img(width="100%", src="https://yt3.ggpht.com/ytc/AAUvwngGYX8_aHh3FnTJkYR9HFBm0XDVxRGDfPg12Tu3=s176-c-k-c0x00ffffff-no-rj-mo")
            vk-card-title MinuteEarth
        router-link(:to="{ name: 'channel', params: { channelSlug: 'minutelabsio' } }")
          vk-card
            template(#media-top)
              img(width="100%", src="https://yt3.ggpht.com/ytc/AAUvwnjLKABCZJCxz5WsT8ORxwQxGwW1o5QMZbyZBTABVA=s176-c-k-c0x00ffffff-no-rj-mo")
            vk-card-title Primer
      h2.heading Featured Channels
      .media-grid
        router-link(:to="{ name: 'channel', params: { channelSlug: 'minutelabsio' } }")
          vk-card
            template(#media-top)
              img(width="100%", src="https://yt3.ggpht.com/ytc/AAUvwnhz4WmHt4YZriL-WHqEGS-5nf2QY0V5vaTTMFpW=s176-c-k-c0x00ffffff-no-rj-mo")
            vk-card-title minutephysics

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
    width: 18%
    margin-right: 3%
</style>
