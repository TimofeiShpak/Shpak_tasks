<template>
  <div className="button-group">
    <ButtonItem 
    v-for="(option, index) in options"
    :key="option.name"
    :title="option.title"
    :name="option.btnName"
    :index="index"
    :func="action" />
  </div>
</template>


<script lang="ts">
import { defineComponent, computed } from 'vue'
import ButtonItem from './ButtonItem.vue'
import { useStore } from '../store/store'
import { mapActions } from 'vuex'

export default defineComponent({
  setup () {
    const store = useStore()
    
    return {
      options: computed(() => store.state.options)
    }
  },
  components: {
    ButtonItem
  },
  methods: {
    ...mapActions(['action'])
  }
})
</script>