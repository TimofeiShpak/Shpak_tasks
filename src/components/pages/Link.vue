<template>
  <div>
    <router-link :to="to" class="nav-link">
      <slot />
    </router-link>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    to: { type: String, required: true },
  }
})
</script>
