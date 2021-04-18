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
        :statusClass="statusClass(todo.status)"
        :progress="todo.progress"
        :progressClass="progressClass(todo.progress)"
        :author="todo.author"
        :creator="todo.creator"
        :userList="userList(todo.author, todo.creator, todo.comments)"
        :id="todo.id"
        :comments="todo.comments"
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
    isActive: { type: Boolean, default: false }
  },
  setup(props) {
    let store = useStore();
    let todoList = computed(() => store.getters.todoList(props.isActive));
    let progressClass = store.getters.progressClass;
    let statusClass = store.getters.statusClass;
    let userList = store.getters.todoUsers;

    return {
      todoList,
      progressClass,
      statusClass,
      userList,
    }
  },
  components: {
    Todo
  },
})
</script>