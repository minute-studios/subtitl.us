<template lang="pug">
fish-row.browse-header(align="middle")
  fish-col(type="auto")
    fish-menu.menu(mode="horizontal" defaul-tactive="1", size="large")
      fish-option(index="feed")
        router-link(:to="{ name: 'feed' }") Browse Channels
      fish-option(index="profile")
        router-link(:to="{ name: 'profile' }") Profile
      fish-option(index="drafts")
        router-link(:to="{ name: 'drafts' }") My Drafts
  fish-col(type="auto")
    fish-form(inline)
      fish-fields
        fish-field
          fish-input(hint="Search")
        fish-field
          fish-button()
            i.fa.fa-search
  fish-col.align-right(type="fixed", :width="200")
    fish-dropdown(align="bottom-right")
      fish-button(slot="title", type="basic") Login / Sign Up
      .login-dropdown-content
        LoginForm
</template>

<script>
import LoginForm from '@/components/login/LoginForm'

export default {
  name: 'BrowseHeader',
  components: {
    LoginForm
  }
}
</script>

<style lang="sass" scoped>
.browse-header
  padding: 1rem
  box-shadow: 0px 0px 3px $shadow-color
.fish.menu
  border-bottom: none
.login-dropdown-content
  padding: 1rem
  background: $mint
::v-deep a
  color: rgba(255, 255, 255, 0.9)
</style>
