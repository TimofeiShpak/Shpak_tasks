<template>
<div class="authorization">
  <div>Authorization</div>
  <HeaderLink to="/">Home</HeaderLink>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderLink from '../pages/HeaderLink.vue';

export default defineComponent({
  components: {
    HeaderLink
  }
})
</script>
