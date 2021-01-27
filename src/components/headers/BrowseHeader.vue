<template lang="pug">
vk-navbar.browse-header(transparent)
  vk-navbar-nav(slot="left")
    vk-navbar-nav-item(title="Browse Channels", active, :href="$href('feed')")
    vk-navbar-nav-item(title="Profile", :href="$href('profile')")
    vk-navbar-nav-item(title="My Drafts", :href="$href('drafts')")
  vk-navbar-nav(slot="center")
    form.search-form(action="javascript:void(0)")
      input.uk-input.uk-form-width-small.uk-margin-small-right(type="text", placeholder="Search")
  vk-navbar-nav(slot="right")
    template(v-if="loggedIn")
      vk-icon.clickable(icon="user")
      vk-dropdown(mode="click")
        vk-nav-dropdown
          vk-nav-item(title="Profile")
          vk-nav-item(title="My Channels")
          vk-nav-item(title="Log Out")
    vk-navbar-nav-item(v-else, title="Log In / Sign Up")
</template>

<script>
export default {
  name: 'BrowseHeader',
  components: {
  },
  data: () => ({
    loggedIn: true
  })
}
</script>

<style lang="sass" scoped>
.browse-header
  padding: 1rem
  .uk-navbar-nav > li > a
    color: $light-grey
  .uk-navbar-nav > li.uk-active > a
    color: white
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
