<template>
  <div class="message-list-wrapper">
    <div class="message-list">
      <Message
        v-for="message in data"
        :key="message.id"
        :message="message"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex';
import Message from './Message.vue'

export default defineComponent({
  computed: {
    ...mapGetters('messageListData', ['data'])
  },
  components: {
    Message
  }
})
</script>
