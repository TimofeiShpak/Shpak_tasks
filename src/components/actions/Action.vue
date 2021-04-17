<template>
  <div class="action">
    <div class="icon-wrapper">
        <div 
          class="icon"
          :style="{ background: `url(${userSrc}) 50% 30%` }">
        </div>
    </div>
    <div class="action__info">
      <div class="action__topic">
        <div class="action__userName">{{ userName }}</div>
        <div class="action__time">- {{ time }}</div>
      </div>
      <div class="action__text">
        {{ text }}
        <span class="action__subtext">{{ subtext }}</span>
      </div>
      <div class="action__comment" v-if="comment">
        {{ comment }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    userName: String,
    text: String,
    time: String,
    userSrc: String,
    subtext: String,
    comment: String 
  }
})
</script>
