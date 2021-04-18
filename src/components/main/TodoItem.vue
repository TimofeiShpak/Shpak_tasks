<template>
  <select
    :id="INPUT_LIST_DATA[index+2]"
    :value="newTodo[index+1]" 
    @change="change">
    <option
      v-for="item in lists[index]"
      :key="item">
      {{ item }}
    </option>
  </select>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '../../store/store'

export default defineComponent({
  props: {
    index: Number,
    change: Function,
  },
  setup() {
    let store = useStore();
    let INPUT_LIST_DATA = computed(() => store.state.INPUT_LIST_DATA);
    let newTodo = computed(() => store.state.newTodo);
    let lists = computed(() => store.state.lists);

    return {
      INPUT_LIST_DATA,
      newTodo,
      lists
    }
  },
})
</script>
