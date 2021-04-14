<template>
  <section class="main-item" :class="{ 'main-item_inactive': !isActive }">
    <div class="main-item__title">
      <slot></slot>
      <span v-show="!isActive" class="inactive">inactive</span>
    </div>
    <ul class="todo__list">
      <Todo 
        v-for="todo in todoList" 
        :key="todo.id"
        :text="todo.text"
        :status="todo.status"
        :progress="todo.progress"
      />
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import Todo from './Todo.vue'
import { useStore } from '../../store/store'

export default defineComponent({
  props: {
    isActive: {type: Boolean, default: false }
  },
  setup(props) {
    let store = useStore();
    let todoList = computed(() => store.getters.todoList(props.isActive));
    
    return {
      todoList
    }
  },
  components: {
    Todo
  },
})
</script>