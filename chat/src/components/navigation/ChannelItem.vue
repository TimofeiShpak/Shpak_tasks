<template>
  <div @click="() => setChannel(text)">
    <li class="channel-item" :class="{ 'channel-item_active': channel === text }">
      {{ text }}
    </li>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'vuex'

export default defineComponent({
  props: {
    text: String,
  },
  computed: {
    ...mapState('channelData', ['channel'])
  },
  methods: {
    ...mapActions('channelData', ['setChannel'])
  }
})
</script>
