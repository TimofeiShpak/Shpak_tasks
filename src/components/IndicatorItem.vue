<template>
  <div class="indicator">
    <div class="indicator__name">{{title}}</div>
    <div :class="[`progress-bar progress-bar_${name}`]" >
      <div 
          :class="[`progress progress_${name}`]" 
          :style="{width:`${value}%`}">
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    value: Number,
    name: String,
    title: String
  },
})
</script>