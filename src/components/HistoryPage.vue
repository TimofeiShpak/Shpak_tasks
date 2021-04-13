<template>
 <HeaderLink to="/">Home</HeaderLink>
  <div className="title">History</div>
  <div class="activities">
    <div
      v-for="text in actionsText"
      :key="text"
      class="action">
      {{text}}
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '../store/store'
import HeaderLink from './HeaderLink.vue'

export default defineComponent({
  setup () {
    const store = useStore()
    
    return {
      actionsText: computed(() => store.state.allActions)
    }
  },
  components: { HeaderLink }
})
</script>