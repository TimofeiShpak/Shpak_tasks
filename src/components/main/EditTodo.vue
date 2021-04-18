<template>
  <div class="modal-wrapper">
    <div class="modal">
      <div>New Task</div>
      <form class="modal__form" @submit.prevent="saveTodo">
        <div class="modal__content">
          <div class="label-list">
            <label 
              v-for="inputData in INPUT_LIST_DATA"
              :key="inputData"
              :for="inputData"
              :class="inputData">
              {{ inputData }}:
            </label>
          </div>
          <div class="input-list">
            <div>{{ author }}</div>
            <textarea
              class="modal__textarea" 
              type="text" 
              :id="INPUT_LIST_DATA[1]" 
              :value="newTodo[0]" 
              @input="(event) => updateNewTodo(event, 0)"
              required
            />
            <TodoItem 
              v-for="(item, index) in newTodo.slice(0,3)"
              :key="[`${item}-id`]"
              :index="index"
              :change="(event) => updateNewTodo(event, index+1)"
            />
          </div>
        </div>
        <input type="submit" class="modal__btn_add" value="Save" />
        <input 
          type="reset" 
          class="modal__btn" 
          value="Cancel" 
          @click="closeEditTodo" 
        />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { mapActions } from 'vuex'
import { useStore } from '../../store/store'
import TodoItem from './TodoItem.vue'

export default defineComponent({
  setup() {
    let store = useStore();
    let INPUT_LIST_DATA = computed(() => store.state.INPUT_LIST_DATA);
    let author = computed(() => store.state.userData.userName);
    let newTodo = computed(() => store.state.newTodo);
    let updateNewTodo = (event: Event, index: number) => store.commit('updateNewTodo', ({ event, index }));

    return {
      INPUT_LIST_DATA,
      author,
      updateNewTodo,
      newTodo,
    }
  },
  methods: {
    ...mapActions(['saveTodo', 'closeEditTodo'])
  },
  components: {
    TodoItem
  }
})
</script>
