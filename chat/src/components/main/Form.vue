<template>
  <div class="main__search">
    <div class="results"  v-if="isSearch">
      <div class="results__text">
        find {{ result.length }} results
      </div>
      <span>{{ resultText }}</span>
      <div v-if="result.length">
        <button class="results__button" @click="prevResult">⋀</button>
        <button class="results__button" @click="nextResult">⋁</button>
      </div>
    </div>
    <div class="input-wrapper">
    <input 
        type="text" 
        placeholder="search..." 
        class="main__input"
        :value="value"
        @input="updateSearch"
    />
    <button class="search" @click="searchText"></button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapGetters, mapState } from 'vuex';

export default defineComponent({
  methods: {
    ...mapActions('search', ['searchText', 'nextResult', 'prevResult', 'updateSearch'])
  },
  computed: {
    ...mapState('search', ['value', 'result', 'isSearch']),
    ...mapGetters('search', ['resultText'])
  },
})
</script>
