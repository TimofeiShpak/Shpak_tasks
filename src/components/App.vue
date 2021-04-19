<template>
  <Loading v-if="isLoading"/>
  <router-view v-else/>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '../store/store'
import Loading from './pages/Loading.vue'

export default defineComponent({
  setup() {
    let store = useStore();
    store.dispatch('initApp');

    return {
      isLoading: computed(() => store.state.isLoading)
    }
  },
  components: {
    Loading
  }
})
</script>
