<template>
  <select
    :id="inputListData[index+2]"
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
    let inputListData = computed(() => store.state.inputListData);
    let newTodo = computed(() => store.state.newTodo);
    let lists = computed(() => store.state.lists);

    return {
      inputListData,
      newTodo,
      lists
    }
  },
})
</script>
