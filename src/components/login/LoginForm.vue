<template lang="pug">
.login-form
  fish-form
    fish-field
      fish-input(iconleft="true" icon="fa fa-user")
    fish-field
      fish-input(iconleft="true" icon="fa fa-lock")
    fish-field
      fish-checkbox(index="yes") Remember me?
    fish-button(type="primary") Submit
    fish-field.signup
      span No account?&nbsp;
      router-link(:to="{ name: 'sign-up' }") Sign Up!
</template>

<script>
export default {
  name: 'LoginForm'
}
</script>

<style scoped lang="sass">
.login-form
  line-height: 1
  width: 200px
.fish.form .field.signup
  margin-top: 2rem
</style>
