<template>
  <div class='modal-wrapper' v-if="isShowModal">
    <div class="modal">
      <div>Вы проиграли</div>
      <button class="btn btn-modal" @click="closeModal">ОК</button>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '../store/store'
import { mapMutations } from 'vuex'

export default defineComponent({
  setup () {
    const store = useStore()
    
    return {
      isShowModal: computed(() => store.state.isShowModal)
    }
  },
  methods: {
    ...mapMutations(['closeModal'])
  }
})
</script>