<template>
  <div class="user-link" @click="setUserData(id)">
    <div class="icon-wrapper">
        <div 
          class="icon"
          :style="{ background: `url(${userSrc}) 50% 30% / cover` }">
        </div>
      </div>
      <div class="action__userName">{{ userName }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'

export default defineComponent({
  props: {
    userSrc: String,
    userName: String,
    id: String,
  },
  methods: {
    ...mapMutations(['setUserData'])
  }
})
</script>
