<template>
  <div class="main">
    <MainHeader />
    <MessageList />
    <InputMessage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MainHeader from './MainHeader.vue'
import MessageList from './MessageList.vue'
import InputMessage from './InputMessage.vue'

export default defineComponent({
  components: {
    MainHeader,
    MessageList,
    InputMessage
  }
})
</script>

