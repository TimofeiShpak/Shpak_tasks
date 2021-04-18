<template>
  <main class="main">
    <div class="main__header">
      <div class="main__title">
        You’ve got 
        <span class="todo-number"> 7 task </span> 
        today
      </div>
      <button class="main__btn_add" @click="changeVisibilityEditTodo">Add New</button>
    </div>
    <div class="all-todos">
      <TodoList :isActive="true">On Hold</TodoList>
      <TodoList :isActive="false">Completed</TodoList>
    </div>
    <EditTodo v-if="isShowEditTodo" />
    <Comments v-else-if="isShowComments"/>
  </main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { mapMutations } from 'vuex'
import TodoList from './TodoList.vue'
import { useStore } from '../../store/store'
import EditTodo from './EditTodo.vue'
import Comments from './Comments.vue'

export default defineComponent({
  setup () {
     const store = useStore();
    
    return {
      isShowEditTodo: computed(() => store.state.isShowEditTodo),
      isShowComments: computed(() => store.state.isShowComments),
    }
  },
  methods: {
    ...mapMutations(['changeVisibilityEditTodo'])
  },
  components: {
    TodoList,
    EditTodo,
    Comments
  },
})
</script>
