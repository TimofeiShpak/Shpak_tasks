<template>
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

export default defineComponent({
  setup () {
    const store = useStore()
    
    return {
      actionsText: computed(() => store.state.actionsText)
    }
  }
})
</script>