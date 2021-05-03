<template>
  <div class="navigation-wrapper">
    <div class="navigation">
      <div class="user-wrapper">
        <User :data="userData" @click="setProfile"/>
        <Settings />
      </div>
      <ChannelList />
      <RequestFriends />
      <FriendList />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import User from './User.vue'
import ChannelList from './ChannelList.vue'
import { mapActions, mapState } from 'vuex'
import Settings from './Settings.vue'
import FriendList from './FriendList.vue'
import RequestFriends from './RequestFriends.vue'

export default defineComponent({
  computed: {
    ...mapState('userListData', ['userData'])
  },
  methods: {
    ...mapActions('profileData', ['setProfile'])
  },
  components: {
    User,
    ChannelList,
    Settings, 
    FriendList,
    RequestFriends
  }
})
</script>

