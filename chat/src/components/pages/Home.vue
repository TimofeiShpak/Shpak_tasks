<template>
  <div class='Chat'>
    <Navigation />
    <Main />
    <Profile />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Navigation from '../navigation/Navigation.vue'
import Main from '../main/Main.vue'
import Profile from '../profile/Profile.vue'

export default defineComponent({
  components: {
    Navigation,
    Main, 
    Profile
  }
})
</script>

