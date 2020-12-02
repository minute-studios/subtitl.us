<template lang="pug">
fish-row.browse-header
  fish-col(type="auto")
    fish-menu.menu(mode="horizontal" defaultactive="1")
      fish-option(index="0" content="One")
      fish-option(index="1" content="Two")
      fish-option(index="2" content="Three")
  fish-col.align-right(type="fixed", :width="200")
    fish-dropdown(align="bottom-right")
      fish-button(slot="title", type="primary") Login / Sign Up
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
</style>
