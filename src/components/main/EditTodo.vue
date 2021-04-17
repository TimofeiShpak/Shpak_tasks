<template>
  <div class="modal-wrapper">
    <div class="modal">
      <div>New Task</div>
      <form class="modal__form" @submit.prevent="saveTodo">
        <div class="modal__content">
          <div class="label-list">
            <label 
              v-for="inputData in inputListData"
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
              :id="inputListData[1]" 
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
        <input type="submit" class="modal__btn" value="Save" />
        <input 
          type="reset" 
          class="modal__btn_cancel" 
          value="Cancel" 
          @click="changeVisibilityEditTodo" 
        />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { mapActions, mapMutations } from 'vuex'
import { useStore } from '../../store/store'
import TodoItem from './TodoItem.vue'

export default defineComponent({
  setup() {
    let store = useStore();
    let inputListData = computed(() => store.state.inputListData);
    let author = computed(() => store.state.userData.userName);
    let newTodo = computed(() => store.state.newTodo);
    let updateNewTodo = (event: any, index: number) => store.commit('updateNewTodo', ({ event, index }));

    return {
      inputListData,
      author,
      updateNewTodo,
      newTodo,
    }
  },
  methods: {
    ...mapActions(['saveTodo']),
    ...mapMutations(['changeVisibilityEditTodo'])
  },
  components: {
    TodoItem
  }
})
</script>
