<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '../store/store'

export default defineComponent({
  setup() {
    let store = useStore();

    store.dispatch('checkLogIn');

  },
})
</script>
