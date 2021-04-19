<template>
  <div class="action-list">
      <ActionItem 
        v-for="action in actionList"
        :key="action.id"
        :userName="action.userName"
        :text="action.text"
        :time="action.time"
        :userSrc="action.userSrc"
        :subtext="action.subtext"
        :comment="action.comment"
        :editedOptionList="action.editedOptionList"
      />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import ActionItem from './Action.vue'
import { useStore } from '../../store/store'

export default defineComponent({
  setup() {
    let store = useStore();
    
    return {
      actionList: computed(() => store.state.actionList)
    }
  },
  components: {
    ActionItem
  }
})
</script>
