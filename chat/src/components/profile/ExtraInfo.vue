<template>
  <div class="extra-info">
    <div v-for="data in extraInfoData"
    :key="data.id">
      <div class="type-info">{{ data.type }}</div>
      <div>{{ data.value }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  computed: {
    ...mapGetters('profileData', ['extraInfoData'])
  },
})
</script>
