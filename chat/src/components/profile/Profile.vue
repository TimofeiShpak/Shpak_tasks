<template>
  <div class="profile-wrapper" :class="{'close': !isOpen}">
    <div class="profile">
      <div class="profile__img">
        <img :alt="profile.fullName" :src="profile.src" />
      </div>
      <div class="profile__info">
        <div class="profile__main-info">
          <div class='profile__title' :class="{'online': profile.isOnline}">{{ profile.fullName }}</div>
          <div class="subtitle">{{ profile.specialty }}</div>
        </div>
        <SocialLinks />
        <ProfileButtons />
        <ExtraInfo />
      </div>
      <AllUsers />
    </div>
    <button class="close-profile" @click="closeProfile"></button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SocialLinks from './SocialLinks.vue'
import ProfileButtons from './ProfileButtons.vue'
import ExtraInfo from './ExtraInfo.vue'
import AllUsers from './AllUsers.vue'
import { mapMutations, mapState } from 'vuex'

export default defineComponent({
  computed: {
    ...mapState('profileData', ['profile', 'isOpen'])
  },
  methods: {
    ... mapMutations('profileData', ['closeProfile'])
  },
  components: {
    SocialLinks,
    ProfileButtons,
    ExtraInfo,
    AllUsers,
  }
})
</script>
