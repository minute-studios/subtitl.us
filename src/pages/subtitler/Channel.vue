<template lang="pug">
fish-layout.fill-height(sider="l")
  template(#header)
    BrowseHeader
  template(#sider) Left
  template(#content)
    .container
      h1.header {{channelSlug}}
      SearchFilters
      .results
        .result(v-for="result in results")
          fish-row
            fish-col.thumbnail(type="fixed", :width="200")
              fish-image(:url="result.thumbnail" rounded)
            fish-col
              h3.title {{result.title}}
              .languages
                fish-tag(v-for="lang in result.languages", :index="lang", :key="lang") {{lang}}
            fish-col
              fish-button(type="primary", size="large")
                router-link(:to="{ name: 'captioning', params: { videoId: '6nMo8T3T0L4' } }", tag="span") Translate
  template(#footer) Footer
</template>

<script>
import BrowseHeader from '@/components/headers/BrowseHeader'
import SearchFilters from '@/components/search/SearchFilters'

export default {
  name: 'Channel',
  props: {
    channelSlug: String
  },
  components: {
    BrowseHeader,
    SearchFilters
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

.results .result
  padding: 1rem 0
  border-bottom: 1px solid rgba(0, 0, 0, 0.1)
  .thumbnail
    margin-right: 1rem
    .image
      margin-bottom: 0
</style>
