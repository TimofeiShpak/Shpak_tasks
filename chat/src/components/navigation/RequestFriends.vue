<template>
  <div class="friends" v-if="friendRequests.length">
    <div class="navigation__title">
      Friend requests 
      <span class="number-channels">
          {{ friendRequests.length }}
      </span>
    </div>
    <ul>
      <li v-for="user in friendRequests" :key="user.id">
        <div class="request">
          <User 
            :data="user" 
            @click="setProfile"
          />
          <div>
            <button class="request__btn" @click="accept(user.id)">✓</button>
            <button class="request__btn" @click="cancel(user.id)">✘</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import User from './User.vue'
import { ACCEPT_REQUEST, CANCEL_REQUEST } from '../../store/helpers/constants';

export default defineComponent({
  computed: {
    ...mapGetters('userListData', ['friendRequests'])
  },
  methods: {
    ...mapActions('profileData', ['setProfile']),
    ...mapActions('userListData', { accept: ACCEPT_REQUEST, cancel: CANCEL_REQUEST })
  },
  data() {
    return { ACCEPT_REQUEST, CANCEL_REQUEST }
  },
  components: {
    User
  }
})
</script>