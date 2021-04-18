<template>
<div class="authorization">
  <div>Choose user</div>
  <div class="user-list">
    <Link to="/home">
      <User 
        v-for="user in userList"
        :key="user.id"
        :userName="user.userName"
        :userSrc="user.userSrc"
        :id="user.id"
      />
    </Link>
  </div>
</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import User from './User.vue'
import Link from '../pages/Link.vue'
import { useStore } from '../../store/store'

export default defineComponent({
  components: {
    User,
    Link
  },
  setup() {
    let store = useStore();
    let userList = computed(() => store.state.userList)

    return {
      userList,
    }
  },
})
</script>
