<template>
  <button  
  :class="[`btn btn_${name}`]" 
  @click="func(index)"
  >{{name}}</button>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    value: Number,
    func: Function,
    name: String,
    index: Number
  },
})
</script>