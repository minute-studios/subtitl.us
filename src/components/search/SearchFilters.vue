<template lang="pug">
.search-filters
  fish-row
    fish-col(span="12")
      fish-form
        fish-fields
          fish-field(span="24")
            fish-input(icon="fa fa-search", hint="Search...")
        fish-fields
          fish-field
            label.field-text Filter videos that
          fish-field
            fish-select(v-model="languageIncludes")
              fish-option(index="0", content="are missing")
              fish-option(index="1", content="already have")
          fish-field
            fish-select(multiple, v-model="languages", hint="Filter By Language")
              fish-option(v-for="lang in supportedLanguages", :index="lang.id", :key="lang.id", :content="`${lang.name} (${lang.enName})`")
</template>

<script>
import _keyBy from 'lodash/keyBy'
import Promise from 'bluebird'
import axios from 'axios'

const supportedLangsPromise = Promise.all([
  axios.get('/data/supported-languages.json').get('data'),
  axios.get('/data/languages.json').get('data')
]).spread((supported, languages) => {
  const languagesById = _keyBy(
    languages.map(([id, enName, name]) => ({ id, enName, name })),
    'id'
  )
  return supported.items.map(({ id }) => {
    return languagesById[id] || { id, name: id, enName: id }
  })
})

export default {
  name: 'SearchFilters',
  data: () => ({
    languages: [],
    languageIncludes: '0',

    supportedLanguages: []
  }),
  async mounted(){
    this.supportedLanguages = await supportedLangsPromise
  }
}
</script>

<style lang="sass" scoped>
.fish.select.multiple
  height: auto
  min-height: 37px
.field-text
  line-height: 37px
</style>
