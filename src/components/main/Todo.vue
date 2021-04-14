<template>
  <li class="todo">
    <p class="todo__text">{{ text }}</p>
    <span :class="[classTodoProgress]">{{ progress }}</span>
    <span :class="[statusName]">{{ status }}</span>
    <span class="todo__users"></span>
    <button class="todo__buttons"></button>
  </li>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    text: String,
    status: { type: String, default: '' },
    progress: { type: String, default: '' }
  },
  setup(props) {
    let progressName = props.progress.toLowerCase().split(' ').join('-');
    let statusName = props.status.toLowerCase();
    
    return {
      classTodoProgress: computed(() => `todo__progress todo__progress_${progressName}`),
      statusName: computed(() => `todo__status todo__status_${statusName}`)
    }
  }
})
</script>