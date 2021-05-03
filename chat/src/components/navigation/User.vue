<template>
  <div class="user-item" :class="{ 'user-item-active': data.isOnline }" :data-id="data.id">
    <img class="user-item__img" alt="fullName" :src="data.src"/>
    {{ data.fullName }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { User } from '../../store/components/Users/user'

export default defineComponent({
  props: {
    data: Object as () => User,
  },
})
</script>
