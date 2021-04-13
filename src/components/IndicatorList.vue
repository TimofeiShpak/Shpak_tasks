<template>
   <div className="indicators">
    <IndicatorItem 
    v-for="option in options"
    :key="option.name"
    :value="optionsValue[option.name]"
    :title="option.title"
    :name="option.name" />
   </div>
</template>


<script lang="ts">
import { defineComponent, computed } from 'vue'
import IndicatorItem from './IndicatorItem.vue'
import { useStore } from '../store/store'

export default defineComponent({
  setup () {
     const store = useStore()
    
    return {
      options: computed(() => store.state.options),
      optionsValue: computed(() => store.state.optionValues)
    }
  },
  components: {
    IndicatorItem
  },
})
</script>