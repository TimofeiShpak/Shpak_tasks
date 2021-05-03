<template>
  <div class="main__header">
    <div class="main__topic">
      <div class="main__title">{{ channel }}</div>
    </div>
    <Form />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex';
import Form from './Form.vue'

export default defineComponent({
  computed: {
    ...mapState('channelData', ['channel'])
  },
  components: {
    Form,
  }
})
</script>
