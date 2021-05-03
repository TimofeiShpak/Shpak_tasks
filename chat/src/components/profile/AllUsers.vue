<template>
  <div class="users">
    <div class="users__title">
      Users 
      <span class="user__numbers">
        {{ userList.length }}
      </span>
    </div>
    <ul>
      <User 
        v-for="user in userList"
        :key="user.id"
        :data="user"
        @click="setProfile"
      /> 
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'vuex';
import User from '../navigation/User.vue'

export default defineComponent({
  computed: {
    ...mapState('userListData', ['userList'])
  },
  methods: {
    ...mapActions('profileData', ['setProfile'])
  },
  components: {
    User,
  }
})
</script>
