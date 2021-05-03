<template>
  <div class="authorization-wrapper">
    <div class="authorization__title">Welcome</div>
      <div class="authorization">
        <div class="authorization__choose-user">
          <div class="authorization__subtitle">Choose user</div>
          <ul class="authorization__user-list">
            <User 
              v-for="user in authorizationUsers"
              :key="user.id"
              :data="user"
              @click="setId"
            /> 
          </ul>
      </div>
      <EditProfile :isNew="true"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import User from '../navigation/User.vue';
import EditProfile from './EditProfile.vue';

export default defineComponent({
  computed: {
    ...mapGetters('userListData', ['authorizationUsers'])
  },
  methods: {
    ...mapActions('userListData', ['setId'])
  },
  components: {
    User,
    EditProfile
  }
})
</script>
