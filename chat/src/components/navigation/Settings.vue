<template>
  <div class="settings" @click="changeShowSettings">
    <button class="settings__btn"></button>
    <ul class="settings__list" v-if="isShowSettings">
      <li
        v-for="setting in nameSettings"
        :key="setting"
        class="settings__item"
        @click="setFunction(setting)">
        {{ setting }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapMutations, mapState } from 'vuex';

export default defineComponent({
  computed: {
    ...mapState('userListData', ['isShowSettings', 'nameSettings'])
  },
  methods: {
    ...mapMutations('userListData', ['changeShowSettings']),
    ...mapActions('userListData', ['setFunction']),
  }
})
</script>


