<template>
  <main class="main">
    <div class="main__header">
      <div class="main__title">
        You’ve got 
        <span class="todo-number"> 7 task </span> 
        today
      </div>
      <button class="main__btn">Add New</button>
    </div>
    <TodoList :isActive="true">On Hold</TodoList>
    <TodoList :isActive="false">Completed</TodoList>
  </main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import TodoList from './TodoList.vue'
import { useStore } from '../../store/store'

export default defineComponent({
  setup () {
     const store = useStore()
    
    return {
      // todoList: computed(() => store.state.onHold),
    }
  },
  components: {
    TodoList
  },
})
</script>
