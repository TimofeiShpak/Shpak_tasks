<template>
  <header class="header">
    <div class="search">
      <button class="search__button"></button>
      <input type="text" class="search__input" placeholder="Search for any training you want">
    </div>
    <div class="user">
      <button class="user__notifications user__notifications_active"></button>
      <div class="icon-wrapper">
        <div 
          class="header__icon"
          :style="{ background: `url(${userSrc}) 50% 30%` }">
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '../../store/store';

export default defineComponent({
  setup() {
    let store = useStore()

    return {
      userSrc: computed(() => store.state.userData.userSrc)
    }
  }
})
</script>

