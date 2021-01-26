<template lang="pug">
fish-row.browse-header(align="middle")
  fish-col(span="8")
    fish-menu.menu(mode="horizontal" defaul-tactive="1", size="large")
      fish-option(index="feed")
        router-link(:to="{ name: 'feed' }") Browse Channels
      fish-option(index="profile")
        router-link(:to="{ name: 'profile' }") Profile
      fish-option(index="drafts")
        router-link(:to="{ name: 'drafts' }") My Drafts
  fish-col(type="auto")
    fish-form.search-form()
      fish-fields(span="24")
        fish-field(span="22")
          fish-input(hint="Search")
        fish-field
          fish-button(type="basic")
            i.fa.fa-search
  fish-col.align-right(type="fixed", :width="200")
    fish-dropdown(v-if="loggedIn", align="bottom-right")
      fish-button(slot="title", type="basic")
        i.fa.fa-user
      fish-option(index="profile")
        router-link(:to="{ name: 'profile' }") Profile
      fish-option(index="mychannels")
        router-link(:to="{ name: 'mychannels' }") My Channels
      fish-option(index="logout")
        router-link(:to="{ name: 'logout' }") Log Out
    fish-dropdown(v-else, align="bottom-right")
      fish-button(slot="title", type="basic") Log In / Sign Up
      .login-dropdown-content
        LoginForm
</template>

<script>
import LoginForm from '@/components/login/LoginForm'

export default {
  name: 'BrowseHeader',
  components: {
    LoginForm
  },
  data: () => ({
    loggedIn: true
  })
}
</script>

<style lang="sass" scoped>
.browse-header
  padding: 1rem
.fish.menu
  border-bottom: none
  background: transparent
  .item:not(.header):not(.submenu)
    &:hover,
    &.active
      background: transparent
      border-color: white
  ::v-deep a
    color: rgba(255, 255, 255, 0.9)
.fish.form.search-form
  ::v-deep .field
    padding: 0

  ::v-deep .fish.input
    input
      border-radius: 3px 0 0 3px
      border-right: 0
      height: 2.5rem
  ::v-deep .fish.button.basic
    border-radius: 0 3px 3px 0
    border-left: 0
.login-dropdown-content
  padding: 1rem
  background: $mint

</style>
