<template>
  <ul class="social-icons">
    <li 
      v-for="link in socialLinksData"
      :key="link.id">
       <a 
        :class="[`social-icon ${link.name}-icon`]" 
        :href="link.href" 
        target="_blank"
        rel="noreferrer"> 
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex';

export default defineComponent({
  computed: {
    ...mapGetters('profileData', ['socialLinksData'])
  },
})
</script>
