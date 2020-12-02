<template lang="pug">
fish-layout.fill-height(sider="l")
  template(#header)
    BrowseHeader
  template(#sider) Left
  template(#content)
    .container
      fish-row
        fish-col(span="8")
          h1 {{channelSlug}}
        fish-col.align-right(span="18")
          fish-input(icon="fa fa-search")

      .results
        .result(v-for="result in results")
          fish-row
            fish-col.thumbnail(type="fixed", :width="200")
              fish-image(:url="result.thumbnail" rounded)
            fish-col
              h3.title {{result.title}}
              .languages
                h5 Languages
                fish-tag(v-for="lang in result.languages", :index="lang") {{lang}}
            fish-col
              fish-button(type="primary", size="large") Translate
  template(#footer) Footer
</template>

<script>
import BrowseHeader from '@/components/headers/BrowseHeader'

export default {
  name: 'Channel',
  props: {
    channelSlug: String
  },
  components: {
    BrowseHeader
  },
  data: () => ({
    results: Array(12).fill(0).map(a => (
      {
        title: 'Title of the video',
        thumbnail: 'https://i.ytimg.com/vi/Sk10Bz_TKPU/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC0XMceyjZmElEVKkstaVl9u-22Pw',
        languages: [
          'english',
          'french',
          'russian'
        ]
      }
    ))
  })
}
</script>

<style lang="sass" scoped>
.container
  padding: 2rem 2rem 0
  max-width: 1080px
  margin: auto

.results .result
  padding: 1rem 0
  border-bottom: 1px solid rgba(0, 0, 0, 0.1)
  .thumbnail
    margin-right: 1rem
    .image
      margin-bottom: 0
</style>
