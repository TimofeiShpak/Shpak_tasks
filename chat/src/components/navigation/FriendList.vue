<template>
  <div class="friends">
    <div class="navigation__title">
      Friends 
      <span class="number-channels">
          {{ friends.length }}
      </span>
    </div>
    <ul>
      <User 
        v-for="user in friends"
        :key="user.id"
        :data="user" 
        @click="setProfile"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import User from './User.vue'

export default defineComponent({
  computed: {
    ...mapGetters('userListData', ['friends'])
  },
  methods: {
    ...mapActions('profileData', ['setProfile'])
  },
  components: {
    User
  }
})
</script>
