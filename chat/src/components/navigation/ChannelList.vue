<template>
  <div class="channels">
    <div class="navigation__title">
      Channels 
      <span class="number-channels">
        {{ channelList.length }}
      </span>
    </div>
    <ul>
      <ChannelItem 
        v-for="channel in channelList"
        :key="channel.id"
        :text="channel.name"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex';
import ChannelItem from './ChannelItem.vue'

export default defineComponent({
  components: {
    ChannelItem,
  },
  computed: {
    ...mapState('channelData', ['channelList'])
  }
})
</script>


